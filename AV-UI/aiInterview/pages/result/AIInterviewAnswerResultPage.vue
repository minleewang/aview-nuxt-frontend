<template>
  <main>
    <v-container class="report-containeer">
      <h1 class="report-title">AI 모의면접 결과</h1>
      <v-divider class="my-4" thickness="2" color="white" />

      <v-row
        v-for="(item, index) in inputList"
        :key="index"
        class="question-box my-6"
      >
        <v-col cols="12">
          <h3 class="question-title">{{ index + 1 }}.{{ item[0] }}</h3>

          <div class="answer-section">
            <h4>📄 당신의 답변</h4>
            <p class="answer-text">{{ item[1] }}</p>
          </div>

          <div class="evaluation-section">
            <h4>AI 평가 결과</h4>
            <p><strong>의도파악:</strong>{{ item[2] }}</p>
            <p><strong>점수:</strong>{{ item[3] }}</p>
            <p><strong>피드백:</strong></p>
            <p class="feedback-text">{{ item[4] }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAiInterviewStore } from "../../../aiInterview/stores/aiInterviewStore"; // Pinia store import
import markdownIt from "markdown-it";

// Pinia Store
const aiInterviewStore = useAiInterviewStore();
const router = useRouter();
// Component State
const userToken = localStorage.getItem("userToken");
const inputList = ref([]);
const md = ref(new markdownIt());

// Lifecycle Hooks
onMounted(async () => {
  await getScoreResultList(userToken);
});

// Methods
const getScoreResultList = async (userToken) => {
  inputList.value = await aiInterviewStore.requestGetInterviewResultToDjango({
    userToken: userToken,
  });

  inputList.value.forEach((item) => {
    const feedback = item[3];
    if (feedback) {
      const [score, feedback] = splitScoreFeedback(feedback);
      item.pop();
      item.push(score);
      item.push(feedback);
    }
  });
};

const splitScoreFeedback = (feedback) => {
  const parts = feedback.split("<s>");
  if (parts.length === 2) {
    return [parts[0].replace("score:", ""), parts[1].replace("feedBack:", "")];
  } else {
    return ["점수 없음", feedback.replace(/<.*?>/g, "")];
  }
};
</script>

<style>
.report-container {
  max-width: 850px;
  margin: auto;
  padding: 40px 30px;
  background-color: #ffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}

.report-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #333;
}

.question-box {
  background-color: #f0f5ff;
  border-radius: 12px;
  margin-bottom: 24px;
  padding: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.question-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.answer-section,
.evaluation-section {
  margin-top: 12px;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffff;
  border: 1px solid #cbd7f1;
}

.answer-section h4,
.evaluation-section h4 {
  margin-bottom: 10px;
  font-weight: 600;
  color: #2c3e50;
}

.answer-text,
.feedback-text {
  font-size: 15px;
  line-height: 1.7;
  white-space: pre-line;
  color: #444;
  padding-left: 10px;
}
</style>
