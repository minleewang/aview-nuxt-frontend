<template>
  <main>
    <v-container
      v-if="!start"
      align="center"
      height="100%"
      class="control-margin"
    >
      <!-- 기술 선택 부분: 필터가 열리고 닫히는 부분 -->
      <v-slide-y-transition>
        <v-row class="filter-tags-container">
          <v-col cols="12">
            <!-- 기술 -->
            <v-row class="align-center mb-4">
              <v-col cols="1" class="filter-group-title">
                <strong>기술</strong>
              </v-col>
              <v-col cols="11">
                <v-chip-group v-model="selectedKeyword" column>
                  <v-chip
                    v-for="(keyword, index) in keywords"
                    :key="index"
                    :value="keyword"
                    :class="
                      selectedKeyword === keyword
                        ? 'selected-chip'
                        : 'unselected-chip'
                    "
                    class="keyword-chip"
                    clickable
                  >
                    {{ keyword }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
            <!-- 경력 선택 부분: 기술과 같은 열에 배치 -->
            <v-row class="align-center mb-4">
              <v-col cols="1" class="filter-group-title">
                <strong>경력</strong>
              </v-col>
              <v-col cols="11">
                <v-chip-group
                  v-model="selectedCareer"
                  class="career-select-group"
                  column
                >
                  <v-chip
                    v-for="(career, index) in careers"
                    :key="index"
                    :value="career"
                    :class="
                      selectedCareer === career
                        ? 'selected-chip'
                        : 'unselected-chip'
                    "
                    class="career-chip"
                    clickable
                  >
                    {{ career }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-slide-y-transition>

      <h2>안녕하십니까? AI 모의 면접 서비스입니다.</h2>
      <br />
      <v-container class="draw-line" align="start">
        <v-card-title align="center"
          ><strong>※ 사전 공지 ※</strong></v-card-title
        ><br />
        <li class="li">
          본 면접은 특정 기업 및 직무에 맞추어진 면접인인
          <strong>TECH-INTERVIEW</strong>임을 알려드립니다.
        </li>

        <li class="li">
          모의면접에는 <strong>마이크, 카메라</strong>의 사용이 필요합니다.
        </li>
        <br /> </v-container
      ><br />
      <v-card-text
        ><strong
          >시작에 앞서 체크리스트를 작성하여 주십시오.</strong
        ></v-card-text
      >
      <!-- 제출 버튼 -->
      <v-btn @click="startQuestion" color="primary">제출하기</v-btn>
    </v-container>
    <!-- 사전준비-->
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAiInterviewStore } from "../../../aiInterview/stores/aiInterviewStore"; // Pinia store import
import { useRouter } from "vue-router";
import "@mdi/font/css/materialdesignicons.css";

// Pinia Stores
const aiInterviewStore = useAiInterviewStore();
const router = useRouter();

const start = ref(false);

//기술 모음
const keywords = ref([
  "Backend",
  "Frontend",
  "App·Web",
  "AI",
  "Embeddeed",
  "DevOps",
]);
const keywordMap = {
  Backend: 1,
  Frontend: 2,
  Embedded: 3,
  AI: 4,
  DevOps: 5,
  "App·Web": 6,
};
const selectedKeyword = ref(""); // 기술 단일 선택 (중복선택X)

//경력 모음
const careers = ref(["신입", "3년 이하", "5년 이하", "10년 이하", "10년 이상"]); // 이건 사용자한테 보여질 목록
const careerMap = {
  신입: 1,
  "3년 이하": 2,
  "5년 이하": 3,
  "10년 이하": 4,
  "10년 이상": 5,
}; // 이건 백앤드로 보낼 데이터 목록
const selectedCareer = ref(""); // 경력 단일 선택 (중복선택X)

onMounted(() => {
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    router.push("/account/login");
  }
});

// AiInterviewQuestionPage.vue로 이동
const startQuestion = async () => {
  if (!selectedKeyword.value || !selectedCareer.value) {
    alert("기술과 경력을 모두 선택해 주세요.");
    return;
  }

  const message = `선택한 기술: ${selectedKeyword.value}\n선택된 경력: ${selectedCareer.value}`;
  if (!confirm(message)) return;

  const jobstorage = {
    tech: keywordMap[selectedKeyword.value],
    exp: careerMap[selectedCareer.value],
  };
  localStorage.setItem("interviewInfo", JSON.stringify(jobstorage));
  router.push("/ai-test");
};

//면접페이지에 들어오면 출력되는 제목
useHead({
  title: `AI 모의면접 & 인성면접 | `,
  meta: [
    {
      name: "description",
      content: "AI 모의면접, AI 인성면접 🎯jobstcik에서 확인해보세요.",
    },
    {
      hid: "keywords",
      name: "keywords",
      content:
        "모의면접, ai 모의면접, 인성면접, ai 인성면접, 인적성 검사 준비, ai 인적, ai 면접, aim 모의면접, aim ai 모의면접, 에임 모의면접, 에임, 애임, AIM, AIM Sniper",
    },
  ],
});
</script>

<style scoped>
.draw-line {
  border: 1px solid #333;
  padding: 16px;
  border-radius: 10px;
  width: 57%;
}

.li {
  margin-left: 2%;
}

.control-margin {
  margin-top: 5%;
}

.interview-container {
  margin-top: 20%;
  border: 1px solid #333;
  padding: 16px;
  border-radius: 10px;
  width: 70%;
}

/* 필터 칩 스타일링 */
.filter-chip {
  margin: 5px;
  font-size: 14px;
}

.selected-chip {
  background-color: #6366f1 !important;
  color: white !important;
}

.unselected-chip {
  background-color: #e0e0e0 !important;
  color: black !important;
}

/*
.chip-selected {
  background-color: #8094f4; /* 선택된 칩의 배경색을 초록색으로 변경 
  color: white; /* 텍스트 색상을 하얀색으로 변경
} */

textarea {
  flex-grow: 1;
  border: 1px solid #ccc;
  padding: 12px;
  resize: none;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 15px;
  background-color: rgba(255, 255, 255, 1);
  color: black;
  height: 50px;
  max-height: 70px;
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
</style>
