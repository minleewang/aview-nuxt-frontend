<template>
  <v-container v-if="start" align="center">
    <div v-if="visible" class="interview-container">
      <v-icon>mdi-account-tie</v-icon><br />
      <div v-html="startMessage"></div>
    </div>

    <div v-if="!visible" class="interview-container">
      <v-icon>mdi-account-tie</v-icon>
      <h2 v-html="formattedAIMessage"></h2>
      <br />
      <div :class="{ timer: true, 'red-text': remainingTime <= 10 }">
        남은 시간: {{ Math.floor(remainingTime / 60) }}:{{
          (remainingTime % 60).toString().padStart(2, "0")
        }}
      </div>
    </div>

    <div v-if="isLoading && !finished" class="message ai">
      <br />
      <p><strong>다음 질문을 준비 중입니다.</strong></p>
      <v-icon>mdi:account-tie</v-icon>
      <div class="loading-message">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>

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
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useAiInterviewStore } from "../../aiInterview/stores/aiInterviewStore"; // Pinia store import
import "@mdi/font/css/materialdesignicons.css";
import { useRouter } from "vue-router";

const router = useRouter();
const aiInterviewStore = useAiInterviewStore();

const start = ref(false);
const visible = ref(true);
const isLoading = ref(false); // 로딩 상태 추가
const finished = ref(false);
const recognizing = ref(false);
const sttLog = ref("");
const currentAIMessage = ref(""); // 현재 AI 메시지를 저장하는 변수
const currentQuestionId = ref(1);
const currentInterviewId = ref(null);
const remainingTime = ref(90);
const timer = ref(null);
const startMessage =
  "<h2>안녕하세요. AI 모의 면접 서비스입니다.</h2><br><strong><span>제한 시간 내에 답변 작성 부탁드립니다.</span><br><span>지금부터 면접을 시작하겠습니다.</span></strong>";
let recognition;
let synth = window.speechSynthesis;
let currentUtteance = null;

const formattedAIMessage = computed(() => {
  return currentAIMessage.value.replace(/([.?])/g, "$1<br>");
});

//start.value가 truerk 되면showStartMessage가 진행
watch(start, (newVal) => {
  if (newVal === true) {
    showStartMessage(); // 안내 멘트 읽고
  }
});

//다시듣기
const replayQuestion = () => {
  if (synth.speaking) synth.cancel();
  const utterance = new SpeechSynthesisUtterance(currentAIMessage.value);
  utterance.lang = "KO-KR";
  utterance.rate = 1;
  utterance.pitch = 5;

  synth.speak(utterance);
};

const speakCurrentMessage = () => {
  clearInterval(timer.value); //기존 타이머 정지
  remainingTime.value = 90; //타이머 초기화
  currentUtteance = new SpeechSynthesisUtterance(currentAIMessage.value);
  currentUtteance.lang = "KO-KR";
  currentUtteance.rate = 1;
  currentUtteance.pitch = 5;
  currentUtteance.onend = () => {
    startTimer();
  };
  synth.speak(currentUtteance);
};

const showStartMessage = () => {
  currentUtteance = new SpeechSynthesisUtterance(
    startMessage.replace(/<[^>]+>/g, "")
  );
  currentUtteance.lang = "ko-KR";
  currentUtteance.rate = 1.1;
  currentUtteance.onend = () => {
    visible.value = false; // ✅ 여기서 전환됨
    speakCurrentMessage();
  };
  synth.speak(currentUtteance);
};

// 타이머
const startTimer = () => {
  clearInterval(timer.value);
  timer.value = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(timer.value);
      onAnswerComplete(); // 시간이 다 되면 자동 제출
    }
  }, 1000);
};

//STT시작
const startSTT = () => {
  if (recognition && !recognizing.value) recognition.start();
};

onMounted(() => {
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

  const info = JSON.parse(localStorage.getItem("interviewInfo") || "{}");
  if (!info.tech || !info.exp) {
    alert("면접 정보를 찾을 수 없습니다. 처음으로 돌아갑니다.");
    router.push("/ai-interview");
    return;
  }

  start.value = true;

  aiInterviewStore
    .requestCreateInterviewToDjango({
      userToken: localStorage.getItem("userToken"),
      jobCategory: info.tech,
      experienceLevel: info.exp,
    })
    .then((res) => {
      currentInterviewId.value = Number(res.interviewId);
      currentAIMessage.value = res.question;
    });
});

// 페이지 나가면 TTS 캔슬
onBeforeUnmount(() => {
  if (synth && synth.speaking) {
    synth.cancel();
  }
});

const onAnswerComplete = async () => {
  if (!sttLog.value.trim()) {
    alert("음성 인식 결과가 없습니다.");
    return;
  }
  const payload = {
    userToken: localStorage.getItem("userToken"),
    interviewId: currentInterviewId.value,
    questionId: currentQuestionId.value,
    answerText: sttLog.value,
  };

  //사용자 응답 저장
  await aiInterviewStore.requestCreateAnswerToDjango(payload);

  const followUp = await aiInterviewStore.requestFollowUpQuestionToDjango(
    payload
  );
  if (!followUp || !followUp.questions) {
    alert("다음 질문을 불러오지 못했습니다.");
    return;
  }
  console.log("📩 followUp 응답:", followUp);
  currentQuestionId.value = followUp.questionId;
  currentAIMessage.value = followUp.questions;
  sttLog.value = "";
  speakCurrentMessage();
};

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

/* 아바타 이미지 스타일 */
.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 0 10px;
  border: 2px solid transparent; /* 기본적으로 투명한 테두리 설정 */
}

.ai .avatar {
  font-size: 40px; /* 아이콘 크기 조정 */
  color: black; /* 아이콘 색상 조정 */
}

.user .avatar {
  font-size: 40px; /* 아이콘 크기 조정 */
  color: black; /* 아이콘 색상 조정 */
  margin: 20px 50px;
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
