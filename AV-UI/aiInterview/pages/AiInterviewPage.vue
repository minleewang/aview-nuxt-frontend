<template>
  <v-container v-if="!start" align="center">
    <div class="interview-container">
      <v-icon>mdi-account-tie</v-icon><br />
      <div v-html="startMessage"></div>

      <!-- ✅ 페이지 이동용 버튼 -->
      <v-btn color="secondary" class="mt-2" @click="goToCheckPage">
        면접 시작 전 기능 테스트 확인
      </v-btn>

      <!-- 기존 면접 시작 버튼 -->
      <v-btn
        color="primary"
        class="mt-2"
        @click="handleStartInterview"
        :disabled="!mediaChecked"
      >
        면접 시작
      </v-btn>
    </div>
  </v-container>
  <v-container v-else fluid class="pa-0">
    <div style="width: 75%; margin: 0 auto; padding-top: 16px">
      <v-row class="video-row" no-gutters style="margin: 0; padding: 0">
        <!-- 면접관 -->
        <v-col
          cols="6"
          class="pa-0"
          style="display: flex; justify-content: flex-end"
        >
          <div class="video-box" style="width: 100%; height: 300px">
            <img
              :src="hhImage"
              alt="면접관"
              class="interviewer-image"
              style="width: 100%; height: 130%; object-fit: contain"
            />
          </div>
        </v-col>

        <v-col class="pa-0" style="max-width: 16px"></v-col>

        <!-- 면접자 -->
        <v-col
          cols="6"
          class="pa-0"
          style="display: flex; justify-content: flex-start"
        >
          <div class="video-box" style="width: 100%; height: 300px">
            <video
              ref="userVideo"
              v-show="start"
              autoplay
              playsinline
              muted
              class="user-video"
              style="width: 100%; height: 100%; object-fit: cover"
            ></video>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-col class="pa-0" style="max-width: 16px"></v-col>

    <v-col
      cols="12"
      class="pa-0 mt-4"
      style="display: flex; justify-content: center"
    >
      <div
        v-if="visible"
        class="interview-container centered-text-box"
        style="margin-top: 0; width: 75%"
      >
        <v-icon>mdi-account-tie</v-icon><br />
        <div v-html="startMessage"></div>
      </div>
      <div
        v-else
        class="interview-container centered-text-box"
        style="margin-top: 0; width: 75%"
      >
        <v-icon>mdi-account-tie</v-icon><br />
        <h2 v-html="formattedAIMessage"></h2>
        <br />
        <div :class="{ timer: true, 'red-text': remainingTime <= 10 }">
          남은 시간: {{ Math.floor(remainingTime / 60) }}:{{
            (remainingTime % 60).toString().padStart(2, "0")
          }}
        </div>
      </div>
    </v-col>

    <div v-if="isLoading && !finished" class="message ai">
      <br />
      <p><strong>다음 질문을 준비 중입니다.</strong></p>
      <v-icon>mdi-account-tie</v-icon>
      <div class="loading-message">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>

    <v-container v-if="start && !visible" class="input-area">
      <div class="button-group">
        <button class="send-button" @click="startSTT" :disabled="recognizing">
          {{ recognizing ? "녹음 중..." : "말하기" }}
        </button>
        <button @click="replayQuestion">🗣 AI 질문 듣기</button>
      </div>
      <v-btn color="primary" @click="onAnswerComplete">답변 완료</v-btn>
      <div v-if="sttLog !== ''" class="stt-log">
        <p><strong>STT 결과:</strong> {{ sttLog }}</p>
      </div>
      <!-- ✅ 개발용 수동 입력 -->
      <v-text-field
        v-model="sttLog"
        label="개발 중: 답변 직접 입력"
        hide-details
        dense
        solo
        style="max-width: 300px"
      />
    </v-container>

    <!-- 녹화 영상 다운로드 버튼 -->
    <div v-if="downloadUrl" style="text-align: center; margin-top: 16px">
      <a
        :href="downloadUrl"
        download="interview-recording.webm"
        style="color: blue; text-decoration: underline"
      >
        🎥 녹화 영상 다운로드
      </a>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useAiInterviewStore } from "../../aiInterview/stores/aiInterviewStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import "@mdi/font/css/materialdesignicons.css";
import hhImage from "@/assets/images/fixed/al3.png"; //아바타로 나중에 대체할 계획

const router = useRouter();
const aiInterviewStore = useAiInterviewStore();

const start = ref(false);
const visible = ref(true);
const isLoading = ref(false);
const finished = ref(false);
const recognizing = ref(false);
const sttLog = ref("");
const currentAIMessage = ref("");
const currentQuestionId = ref(1);
const currentInterviewId = ref(null);
const remainingTime = ref(90);
const timer = ref(null);
const maxQuestionId = ref(10);
const startMessage = ref("");
const userVideo = ref(null);
const mediaChecked = ref(false);

const checkMediaReady = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    stream.getTracks().forEach((track) => track.stop()); // 스트림 종료
    mediaChecked.value = true;
    alert("마이크와 카메라가 정상적으로 작동합니다.");
  } catch (err) {
    alert(
      "마이크 또는 카메라에 접근할 수 없습니다. 브라우저 권한을 확인하세요."
    );
    mediaChecked.value = false;
  }
};

const mediaRecorder = ref(null);
const recordedBlobs = ref([]);
const downloadUrl = ref("");
const goToCheckPage = () => {
  router.push("/ai-interview/check");
};
let recognition;
const synth = process.client ? window.speechSynthesis : null;
let currentUtteance = null;

onMounted(() => {
  if (process.client) {
    speakStartMessage();
    checkMediaReady(); // ✅ 마이크/카메라 상태 확인용 함수 호출

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = true; // ✅ 지속적으로 인식
    recognition.interimResults = true; // ✅ (선택) 중간 결과 표시
    recognition.onstart = () => (recognizing.value = true);
    recognition.onend = () => (recognizing.value = false);
    recognition.onerror = () => (recognizing.value = false);
    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      sttLog.value += finalTranscript; // ✅ 누적 저장
    };

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const attachVideo = () => {
          if (userVideo.value) {
            userVideo.value.srcObject = stream;
          } else {
            setTimeout(attachVideo, 100);
          }
        };
        attachVideo();

        mediaRecorder.value = new MediaRecorder(stream, {
          mimeType: "video/webm",
        });
        mediaRecorder.value.ondataavailable = (e) =>
          recordedBlobs.value.push(e.data);
        mediaRecorder.value.onstop = () => {
          const blob = new Blob(recordedBlobs.value, { type: "video/webm" });
          downloadUrl.value = URL.createObjectURL(blob);
        };
        mediaRecorder.value.start();
      })
      .catch((err) => {
        console.error("카메라 접근 오류:", err);
        alert("카메라를 사용할 수 없습니다. 브라우저 권한을 확인해주세요.");
      });

    window.addEventListener("beforeunload", handleBeforeUnload);
  }
});
const speakStartMessage = () => {
  startMessage.value = `
    <strong style="display: flex; flex-direction: column; align-items: center;">
      <span style="margin-bottom: 8px;">AI 모의 면접이 곧 시작됩니다.</span>
      <span style="margin-bottom: 8px;">면접 질문이 화면에 표시되며, 자동으로 음성으로 읽어드립니다.</span>
      <span style="margin-bottom: 8px;"><mark style="background: #ffecb3;">말하기 버튼</mark>을 눌러 답변을 시작해 주세요.</span>
      <span>마이크와 카메라가 정상적으로 작동 중인지 확인해 주세요.</span>
    </strong>
  `;
};

const formattedAIMessage = computed(() => {
  return currentAIMessage.value.replace(/([.?])/g, "$1<br>");
});

const replayQuestion = () => {
  if (synth?.speaking) synth.cancel();
  const utterance = new SpeechSynthesisUtterance(currentAIMessage.value);
  utterance.lang = "ko-KR";
  utterance.rate = 0.85;
  utterance.pitch = 1.0;
  setTimeout(() => synth?.speak(utterance), 100);
};

const handleBeforeUnload = (event) => {
  if (start.value) {
    event.preventDefault();
    event.returnValue = "면접이 진행 중입니다. 페이지를 나가시겠습니까?";
  }
};

const speakCurrentMessage = () => {
  clearInterval(timer.value);
  remainingTime.value = 90;
  currentUtteance = new SpeechSynthesisUtterance(currentAIMessage.value);
  currentUtteance.lang = "ko-KR";
  currentUtteance.rate = 0.85;
  currentUtteance.pitch = 1.0;
  currentUtteance.onend = () => startTimer();
  synth?.speak(currentUtteance);
};

const showStartMessage = () => {
  visible.value = false;
  speakCurrentMessage();
};

const startTimer = () => {
  clearInterval(timer.value);
  timer.value = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(timer.value);
      onAnswerComplete();
    }
  }, 1000);
};

const startSTT = () => {
  if (recognition && !recognizing.value) {
    sttLog.value = ""; // ✅ 새 답변 시 초기화
    recognition.start();
  }
};

const handleStartInterview = async () => {
  const info = JSON.parse(localStorage.getItem("interviewInfo") || "{}");
  if (!info.tech || !info.exp) {
    alert("면접 정보를 찾을 수 없습니다. 처음으로 돌아갑니다.");
    router.push("/ai-interview");
    return;
  }
  start.value = true;
  const res = await aiInterviewStore.requestCreateInterviewToDjango({
    userToken: localStorage.getItem("userToken"),
    jobCategory: info.tech,
    experienceLevel: info.exp,
    academicBackground: info.academic,
    projectExperience: info.project,
    interviewTechStack: info.skills,
    companyName: info.company,
  });
  currentInterviewId.value = Number(res.interviewId);
  currentQuestionId.value = 1;
  currentAIMessage.value = res.question;
  const utterance = new SpeechSynthesisUtterance(
    "AI 모의 면접이 곧 시작됩니다. 면접 질문이 화면에 표시되며, 자동으로 음성으로 읽어드립니다. 질문을 다 들은 뒤에 말하기 버튼을 눌러 답변을 시작해 주세요. 마이크와 카메라가 정상적으로 작동하는지 확인해 주세요."
  );
  utterance.lang = "ko-KR";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.onend = () => showStartMessage();
  synth?.cancel();
  synth?.speak(utterance);
};

const onAnswerComplete = async () => {
  if (recognition && recognizing.value) {
    recognition.stop(); // ✅ 답변 완료 시 STT 중지
  }

  if (!sttLog.value.trim()) {
    alert("음성 인식 결과가 없습니다.");
    return;
  }
  if (currentQuestionId.value >= maxQuestionId.value) {
    alert("모든 면접이 완료되었습니다");
    finished.value = true;
    if (mediaRecorder.value && mediaRecorder.value.state === "recording") {
      mediaRecorder.value.stop(); // ✅ 녹화 종료
    }
    return;
  }
  const info = JSON.parse(localStorage.getItem("interviewInfo") || "{}");
  const payload = {
    userToken: localStorage.getItem("userToken"),
    interviewId: currentInterviewId.value,
    questionId: currentQuestionId.value,
    answerText: sttLog.value,
    jobCategory: info.tech,
    experienceLevel: info.exp,
    academicBackground: info.academic,
    projectExperience: info.project,
    interviewTechStack: info.skills,
    companyName: info.company,
  };
  await aiInterviewStore.requestCreateAnswerToDjango(payload);
  let nextQuestion = null;
  let nextQuestionId = null;
  if (currentQuestionId.value === 1 || currentQuestionId.value === 2) {
    const followUp = await aiInterviewStore.requestFollowUpQuestionToDjango(
      payload
    );
    nextQuestion = followUp?.questions?.[0];
    nextQuestionId = followUp?.questionIds?.[0];
    console.log("✅ currentQuestionId 변경 후:", currentQuestionId.value);
  } else if (currentQuestionId.value === 3) {
    const projectMain =
      await aiInterviewStore.requestProjectCreateInterviewToDjango(payload);
    console.log("🧪 projectMain 응답 확인:", projectMain);
    nextQuestion = projectMain?.question?.[0];
    nextQuestionId = projectMain?.questionId;
  } else if (currentQuestionId.value === 4 || currentQuestionId.value === 5) {
    const projectFollowUp =
      await aiInterviewStore.requestProjectFollowUpQuestionToDjango(payload);
    nextQuestion = projectFollowUp?.questions?.[0];
    nextQuestionId = projectFollowUp?.questionIds?.[0];
  } else {
    alert("모든 면접 질문이 완료되었습니다.");
    finished.value = true;
    await aiInterviewStore.requestEndInterviewToDjango(payload);
    router.push("/ai-interview/result");
    return;
  }
  if (!nextQuestion || !nextQuestionId) {
    alert("다음 질문을 불러오지 못했습니다.");
    return;
  }
  currentQuestionId.value = nextQuestionId;
  currentAIMessage.value = nextQuestion;
  sttLog.value = "";
  speakCurrentMessage();
};

onBeforeUnmount(() => {
  if (synth?.speaking) synth.cancel();
  localStorage.removeItem("interviewInfo");
  clearInterval(timer.value);
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

onBeforeRouteLeave((to, from, next) => {
  if (start.value) {
    const answer = window.confirm(
      "면접이 진행 중입니다. 페이지를 나가시겠습니까?"
    );
    answer ? next() : next(false);
  } else {
    next();
  }
});
</script>

<style scoped>
.interview-container {
  margin-top: 8%;
  border: 1px solid #333;
  padding: 16px;
  border-radius: 10px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.input-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 50%;
  margin-bottom: 0;
}

.send-button {
  padding: 10px 12px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
}

.video-row {
  margin-top: 24px;
  margin-bottom: 24px;
}

.video-box {
  width: 100%;
  aspect-ratio: 4 / 3;
  border: 2px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}

.interviewer-image,
.user-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
