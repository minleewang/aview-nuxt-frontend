<template>
  <v-container v-if="!start" align="center">
    <div class="interview-container">
      <v-icon>mdi-account-tie</v-icon><br />
      <div v-html="startMessage"></div>
      <v-btn color="primary" @click="handleStartInterview">면접 시작</v-btn>
    </div>
  </v-container>

  <v-container v-else fluid class="pa-0">
    <!-- 감싸는 div에 75% 고정 -->
    <div style="width: 75%; margin: 0 auto">
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
              style="width: 100%; height: 100%; object-fit: cover"
            />
          </div>
        </v-col>

        <!-- 가운데 여백 -->
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

    <!-- 가운데 여백 -->
    <v-col class="pa-0" style="max-width: 16px"></v-col>
    <!-- ✅ 질문 메시지/답변 영역을 영상 바로 아래로 -->
    <v-col
      cols="12"
      class="pa-0 mt-4"
      style="display: flex; justify-content: center"
    >
      <div
        v-if="visible"
        class="interview-container"
        style="margin-top: 0; width: 75%"
      >
        <v-icon>mdi-account-tie</v-icon><br />
        <div v-html="startMessage"></div>
      </div>
      <div v-else class="interview-container" style="margin-top: 0; width: 75%">
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
    <!-- ✅ 로딩 메시지 -->
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

    <!-- ✅ 답변 입력 버튼 -->
    <v-container v-if="start && !visible" class="input-area">
      <div class="button-group">
        <button class="send-button" @click="startSTT" :disabled="recognizing">
          말하기
        </button>
        <button @click="replayQuestion">🗣 AI 질문 듣기</button>
      </div>
      <v-btn color="primary" @click="onAnswerComplete">답변 완료</v-btn>
      <div v-if="sttLog !== ''" class="stt-log">
        <p><strong>STT 결과:</strong> {{ sttLog }}</p>
      </div>
    </v-container>
  </v-container>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useAiInterviewStore } from "../../aiInterview/stores/aiInterviewStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import "@mdi/font/css/materialdesignicons.css";

const questionQueue = ref([]); // 여러 질문 담기
const currentQuestionIndex = ref(0); // 현재 질문 인덱스
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
const maxQuestionId = ref(10); // 야야야야 너는 숫자 뭐가좋니? 최대숫자를 설정해보자
const startMessage = ref("");
const userVideo = ref(null);

let recognition;
const synth = process.client ? window.speechSynthesis : null;
let currentUtteance = null;

onMounted(() => {
  if (process.client) {
    speakStartMessage();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => (recognizing.value = true);
    recognition.onend = () => (recognizing.value = false);
    recognition.onerror = () => (recognizing.value = false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sttLog.value = transcript;
    };

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (userVideo.value) userVideo.value.srcObject = stream;
    });

    window.addEventListener("beforeunload", handleBeforeUnload);
  }
});

const speakStartMessage = () => {
  startMessage.value = `
    <br>
    <strong>
      <span>AI 모의 면접이 곧 시작됩니다.</span><br>
      <span>면접 질문이 화면에 표시되며, 자동으로 음성으로 읽어드립니다.</span><br>
      <span>질문을 다 들은 뒤, <mark>말하기 버튼</mark>을 눌러 답변을 시작해 주세요.</span><br>
      <span>마이크와 카메라가 정상적으로 작동 중인지 확인해 주세요.</span>
    </strong>
  `;
};

const formattedAIMessage = computed(() => {
  return currentAIMessage.value.replace(/([.?])/g, "$1<br>");
});

const replayQuestion = () => {
  if (synth.speaking) synth.cancel();
  const utterance = new SpeechSynthesisUtterance(currentAIMessage.value);
  utterance.lang = "ko-KR";
  utterance.rate = 0.85;
  utterance.pitch = 1.0;
  setTimeout(() => synth.speak(utterance), 100);
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
  currentUtteance.onend = () => {
    startTimer();
  };
  synth.speak(currentUtteance);
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
  if (recognition && !recognizing.value) recognition.start();
};

const handleStartInterview = async () => {
  const info = JSON.parse(localStorage.getItem("interviewInfo") || "{}");
  if (!info.tech || !info.exp) {
    alert("면접 정보를 찾을 수 없습니다. 처음으로 돌아갑니다.");
    router.push("/ai-interview");
    return;
  }

  start.value = true;
  const techSkillNumberList = info.skills;

  const res = await aiInterviewStore.requestCreateInterviewToDjango({
    userToken: localStorage.getItem("userToken"),
    jobCategory: info.tech,
    experienceLevel: info.exp,
    academicBackground: info.academic,
    projectExperience: info.project,
    interviewTechStack: techSkillNumberList,
  });

  currentInterviewId.value = Number(res.interviewId);
  currentAIMessage.value = res.question;

  const message = `AI 모의 면접이 곧 시작됩니다. 면접 질문이 화면에 표시되며, 자동으로 음성으로 읽어드립니다.
  질문을 다 들은 뒤에 말하기 버튼을 눌러 답변을 시작해 주세요.
  마이크와 카메라가 정상적으로 작동하는지 확인해 주세요.`;

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "ko-KR";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.onend = () => {
    showStartMessage();
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const onAnswerComplete = async () => {
  if (!sttLog.value.trim()) {
    alert("음성 인식 결과가 없습니다.");
    return;
  }
  // 🔁 최대질문 갯수 조정
  if (currentQuestionId.value >= maxQuestionId.value) {
    alert("모든 면접이 완료되었습니다");
    finished.value = true;
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
  };

  // 🔄 답변 저장
  await aiInterviewStore.requestCreateAnswerToDjango(payload);

  let nextQuestion = null; // ✅ 공통 변수 선언

  // 질문 흐름에 따른 분기
  if (currentQuestionId.value === 1 || currentQuestionId.value === 2) {
    const followUp = await aiInterviewStore.requestFollowUpQuestionToDjango(
      payload
    );
    nextQuestion = followUp?.questions?.[0];
  } else if (currentQuestionId.value === 3) {
    const projectMain =
      await aiInterviewStore.requestProjectCreateInterviewToDjango(payload);
    nextQuestion = projectMain?.question?.[0];
  } else if (currentQuestionId.value === 4 || currentQuestionId.value === 5) {
    const projectFollowUp =
      await aiInterviewStore.requestProjectFollowUpQuestionToDjango(payload);
    nextQuestion = projectFollowUp?.questions?.[0];
  } else {
    alert("모든 면접 질문이 완료되었습니다.");
    finished.value = true;
    router.push("/ai-interview/result");
    return;
  }

  if (!nextQuestion) {
    alert("다음 질문을 불러오지 못했습니다.");
    return;
  }

  currentQuestionId.value += 1;
  currentAIMessage.value = nextQuestion;
  sttLog.value = "";
  speakCurrentMessage();
};

onBeforeUnmount(() => {
  if (synth && synth.speaking) synth.cancel();
  localStorage.removeItem("interviewInfo");
  clearInterval(timer.value);
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

onBeforeRouteLeave((to, from, next) => {
  if (start.value) {
    const answer = window.confirm(
      "면접이 진행 중입니다. 페이지를 나가시겠습니까?"
    );
    if (answer) {
      clearInterval(timer.value);
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

useHead({
  title: `AI 모의면접 & 인성면접 | `,
  meta: [
    {
      name: "description",
      content: "AI 모의면접, AI 인성면접 🎯AIV에서 확인해보세요.",
    },
    {
      hid: "keywords",
      name: "keywords",
      content:
        "모의면접, ai 모의면접, 인성면접, ai 인성면접, 인적성 검사 준비, ai 인적, ai 면접, aim 모의면접, aim ai 모의면접, AIV 모의면접, AIV, AIV, AIV, AIV Sniper",
    },
  ],
});
</script>

<style scoped>
.interview-container {
  margin-top: 20%;
  border: 1px solid #333;
  padding: 16px;
  border-radius: 10px;
  width: 70%;
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

.interviewer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes loading-animation {
  0%,
  80%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}

.context-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.context-menu li {
  padding: 10px;
  cursor: pointer;
}
.context-menu li:hover {
  background-color: #f0f0f0;
}
</style>
