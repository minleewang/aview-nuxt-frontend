<template>
  <main>
    <v-container v-if="!start" align="center" class="control-margin">
      <!-- 상단 탭 버튼 -->
      <v-row class="d-flex justify-center mb-4" dense style="gap: 8px">
        <v-btn
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :color="activeTab === tab ? 'primary' : 'grey lighten-2'"
          class="mx-1"
        >
          {{ tab }}
        </v-btn>
      </v-row>

      <!-- 필터 항목 -->
      <!-- 직무 -->
      <v-slide-y-transition>
        <v-row v-if="activeTab === '직무'" class="mb-4" justify="center">
          <v-col cols="auto">
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
                @click="handleKeywordSelect(keyword)"
              >
                {{ keyword }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-slide-y-transition>

      <!-- 전공 여부 -->
      <v-slide-y-transition>
        <v-row v-if="activeTab === '전공 여부'" class="mb-4" justify="center">
          <v-col cols="auto">
            <v-chip-group v-model="selectedAcademicBackground" column>
              <v-chip
                v-for="(major, index) in academicBackgrounds"
                :key="index"
                :value="major"
                :class="
                  selectedAcademicBackground === major
                    ? 'selected-chip'
                    : 'unselected-chip'
                "
                class="academicBackground-chip"
                clickable
                @click="handleAcademicBackgroundSelect(major)"
              >
                {{ major }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-slide-y-transition>

      <!-- 경력 -->
      <v-slide-y-transition>
        <v-row v-if="activeTab === '경력'" class="mb-4" justify="center">
          <v-col cols="auto">
            <v-chip-group v-model="selectedCareer" column>
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
                @click="handleCareerSelect(career)"
              >
                {{ career }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-slide-y-transition>

      <!-- 프로젝트 경험 -->
      <v-slide-y-transition>
        <v-row
          v-if="activeTab === '프로젝트 경험'"
          class="mb-4"
          justify="center"
        >
          <v-col cols="auto">
            <v-chip-group v-model="selectedProjectExperience" column>
              <v-chip
                v-for="(project, index) in projectExperience"
                :key="index"
                :value="project"
                :class="
                  selectedProjectExperience === project
                    ? 'selected-chip'
                    : 'unselected-chip'
                "
                class="projectExperience-chip"
                clickable
                @click="handleProjectExperienceSelect(project)"
              >
                {{ project }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-slide-y-transition>

      <!-- Tech Skills -->
      <v-slide-y-transition>
        <v-row v-if="activeTab === 'Tech Skills'" class="mb-4" justify="center">
          <v-col cols="auto">
            <v-chip-group v-model="selectedTechSkills" multiple column>
              <v-chip
                v-for="(skill, index) in skills"
                :key="index"
                :value="skill"
                :class="
                  selectedTechSkills.includes(skill)
                    ? 'selected-chip'
                    : 'unselected-chip'
                "
                class="skill-chip"
                clickable
              >
                {{ skill }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-slide-y-transition>

      <!-- 안내 및 제출 -->
      <h2>안녕하십니까? AI 모의 면접 서비스입니다.</h2>
      <v-container class="draw-line" align="start">
        <v-card-title align="center"
          ><strong>※ 사전 공지 ※</strong></v-card-title
        >
        <li class="li">
          본 면접은 특정 기업 및 직무에 맞추어진
          <strong>TECH-INTERVIEW</strong>입니다.
        </li>
        <li class="li">
          모의면접에는 <strong>마이크, 카메라</strong>의 사용이 필요합니다.
        </li>
      </v-container>

      <v-card-text>
        <strong>시작에 앞서 체크리스트를 작성하여 주십시오.</strong>
      </v-card-text>

      <v-btn @click="startQuestion" color="primary">제출하기</v-btn>
    </v-container>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const start = ref(false);

const tabs = ["직무", "전공 여부", "경력", "프로젝트 경험", "Tech Skills"];
const activeTab = ref("직무");

const keywords = ref([
  "Backend",
  "Frontend",
  "App·Web",
  "AI",
  "Embeddeed",
  "DevOps",
]);
const selectedKeyword = ref("");
const keywordMap = {
  Backend: 1,
  Frontend: 2,
  Embedded: 3,
  AI: 4,
  DevOps: 5,
  "App·Web": 6,
};

const academicBackgrounds = ref(["전공자", "비전공자"]);
const selectedAcademicBackground = ref("");
const academicBackgroundMap = { 전공자: 1, 비전공자: 2 };

const careers = ref(["신입", "3년 이하", "5년 이하", "10년 이하", "10년 이상"]);
const selectedCareer = ref("");
const careerMap = {
  신입: 1,
  "3년 이하": 2,
  "5년 이하": 3,
  "10년 이하": 4,
  "10년 이상": 5,
};

const projectExperience = ref(["있음", "없음"]);
const selectedProjectExperience = ref("");
const projectExperienceMap = { 있음: 1, 없음: 2 };

const skills = ref([
  "풀스택",
  "백엔드/서버개발",
  "프론트엔드",
  "웹개발",
  "Flutter",
  "Java",
  "JavaScript",
  "Python",
  "Vue.js",
  "API",
  "MYSQL",
  "AWS",
  "ReactJS",
  "ASP",
  "Angular",
  "Bootstrap",
  "Node.js",
  "jQuery",
  "PHP",
  "JSP",
  "GraphQL",
  "HTML5",
]);
const selectedTechSkills = ref([]);
const skillsMap = Object.fromEntries(skills.value.map((s, i) => [s, i + 1]));

// 탭 이동 함수
const moveToNextTab = () => {
  const currentIndex = tabs.indexOf(activeTab.value);
  if (currentIndex < tabs.length - 1) {
    activeTab.value = tabs[currentIndex + 1];
  }
};

// chip 선택 시 함수
const handleKeywordSelect = (keyword) => {
  selectedKeyword.value = keyword;
  moveToNextTab();
};

const handleAcademicBackgroundSelect = (major) => {
  selectedAcademicBackground.value = major;
  moveToNextTab();
};

const handleCareerSelect = (career) => {
  selectedCareer.value = career;
  moveToNextTab();
};

const handleProjectExperienceSelect = (project) => {
  selectedProjectExperience.value = project;
  moveToNextTab();
};

// TTS 관련
const synth = window.speechSynthesis;

const handleBeforeUnload = () => {
  if (synth && synth.speaking) {
    synth.cancel();
  }
  localStorage.removeItem("interviewInfo");
};

onBeforeUnmount(() => {
  if (synth && synth.speaking) {
    synth.cancel();
  }
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const speakNotice = () => {
  const message = `안녕하십니까? AI 모의 면접 서비스입니다. 본 면접은 특정 기업 및 직무에 맞추어진 TECH-INTERVIEW입니다. 모의면접에는 마이크와 카메라의 사용이 필요합니다. 시작에 앞서 체크리스트를 작성하여 주십시오.`;
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "ko-KR";
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

onMounted(() => {
  if (process.client) {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      router.push("/account/login");
    } else {
      speakNotice();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
  }
});

const startQuestion = () => {
  if (
    !selectedKeyword.value ||
    !selectedCareer.value ||
    !selectedAcademicBackground.value ||
    !selectedProjectExperience.value ||
    selectedTechSkills.value.length === 0
  ) {
    alert(
      "모든 항목(직무, 경력, 전공, 프로젝트 경험, 기술스택)을 선택해 주세요."
    );
    return;
  }

  const summary = `\n선택한 직무: ${selectedKeyword.value}\n경력: ${
    selectedCareer.value
  }\n전공 여부: ${selectedAcademicBackground.value}\n프로젝트 경험: ${
    selectedProjectExperience.value
  }\n기술 스택: ${selectedTechSkills.value.join(", ")}`;
  if (!confirm(summary)) return;

  const jobstorage = {
    tech: keywordMap[selectedKeyword.value],
    exp: careerMap[selectedCareer.value],
    academic: academicBackgroundMap[selectedAcademicBackground.value],
    project: projectExperienceMap[selectedProjectExperience.value],
    skills: selectedTechSkills.value.map((s) => skillsMap[s]),
  };
  localStorage.setItem("interviewInfo", JSON.stringify(jobstorage));
  router.push("/ai-test");
};
</script>

<style scoped>
.control-margin {
  margin-top: 5%;
}
.draw-line {
  border: 1px solid #333;
  padding: 16px;
  border-radius: 10px;
  width: 90%;
}
.li {
  margin-left: 2%;
}
.selected-chip {
  background-color: #6366f1 !important;
  color: white !important;
  transition: all 0.3s ease;
}
.unselected-chip {
  background-color: #e0e0e0 !important;
  color: black !important;
  transition: all 0.3s ease;
}
.tab-button {
  min-width: 90px; /* 버튼 크기 최소 확보 */
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 12px;
}
</style>
