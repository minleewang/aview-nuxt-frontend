<template>
  <main>
    <v-container v-if="!start" align="center" height="100%" class="control-margin">
      <v-slide-y-transition>
        <v-row class="filter-tags-container">
          <v-col cols="12">
            <!-- 1. 직무 -->
            <v-row class="align-center mb-4">
              <v-col cols="1" class="filter-group-title">
                <strong>직무</strong>
              </v-col>
              <v-col cols="11">
                <v-chip-group
                  v-model="selectedKeyword"
                  column
                  @update:modelValue="handleStepSelection(1)"
                >
                  <v-chip
                    v-for="(keyword, index) in keywords"
                    :key="index"
                    :value="keyword"
                    :class="selectedKeyword === keyword ? 'selected-chip' : 'unselected-chip'"
                    class="keyword-chip"
                    clickable
                  >
                    {{ keyword }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>

            <!-- 2. 기술 스택 -->
            <v-row class="align-center mb-4">
              <v-col cols="1" class="filter-group-title">
                <strong>Tech Skills</strong>
              </v-col>
              <v-col cols="11">
                <v-chip-group
                  v-model="selectedTechSkills"
                  multiple
                  column
                  :disabled="currentStep < 2"
                  class="skills-select-group"
                  @update:modelValue="handleStepSelection(2)"
                >
                  <v-chip
                    v-for="(skill, index) in skills"
                    :key="index"
                    :value="skill"
                    :class="[
                      selectedTechSkills.includes(skill) ? 'selected-chip' : 'unselected-chip',
                      currentStep < 2 ? 'dimmed-chip' : ''
                    ]"
                    class="skill-chip"
                    clickable
                  >
                    {{ skill }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>

            <!-- 3. 전공 여부 -->
            <v-row class="align-center mb-4">
              <v-col cols="1" class="filter-group-title">
                <strong>전공 여부</strong>
              </v-col>
              <v-col cols="11">
                <v-chip-group
                  v-model="selectedAcademicBackground"
                  column
                  :disabled="currentStep < 3"
                  @update:modelValue="handleStepSelection(3)"
                >
                  <v-chip
                    v-for="(major, index) in academicBackgrounds"
                    :key="index"
                    :value="major"
                    :class="[
                      selectedAcademicBackground === major ? 'selected-chip' : 'unselected-chip',
                      currentStep < 3 ? 'dimmed-chip' : ''
                    ]"
                    class="academicBackground-chip"
                    clickable
                  >
                    {{ major }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>

            <!-- 4. 경력 -->
            <v-row class="align-center mb-4">
              <v-col cols="1" class="filter-group-title">
                <strong>경력</strong>
              </v-col>
              <v-col cols="11">
                <v-chip-group
                  v-model="selectedCareer"
                  column
                  :disabled="currentStep < 4"
                  @update:modelValue="handleStepSelection(4)"
                >
                  <v-chip
                    v-for="(career, index) in careers"
                    :key="index"
                    :value="career"
                    :class="[
                      selectedCareer === career ? 'selected-chip' : 'unselected-chip',
                      currentStep < 4 ? 'dimmed-chip' : ''
                    ]"
                    class="career-chip"
                    clickable
                  >
                    {{ career }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>

            <!-- 5. 프로젝트 경험 -->
            <v-row class="align-center mb-4">
              <v-col cols="1" class="filter-group-title">
                <strong>프로젝트 경험</strong>
              </v-col>
              <v-col cols="11">
                <v-chip-group
                  v-model="selectedProjectExperience"
                  :disabled="currentStep < 5"
                  @update:modelValue="handleStepSelection(5)"
                >
                  <v-chip
                    v-for="(project, index) in projectExperience"
                    :key="index"
                    :value="project"
                    :class="[
                      selectedProjectExperience === project ? 'selected-chip' : 'unselected-chip',
                      currentStep < 5 ? 'dimmed-chip' : ''
                    ]"
                    class="projectExperience-chip"
                    clickable
                  >
                    {{ project }}
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
        <v-card-title align="center"><strong>※ 사전 공지 ※</strong></v-card-title><br />
        <li class="li">
          본 면접은 특정 기업 및 직무에 맞추어진 면접인인 <strong>TECH-INTERVIEW</strong>임을 알려드립니다.
        </li>
        <li class="li">
          모의면접에는 <strong>마이크, 카메라</strong>의 사용이 필요합니다.
        </li>
        <br />
      </v-container><br />

      <v-card-text><strong>시작에 앞서 체크리스트를 작성하여 주십시오.</strong></v-card-text>
      <v-btn @click="startQuestion" color="primary">제출하기</v-btn>
    </v-container>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAiInterviewStore } from "../../../aiInterview/stores/aiInterviewStore";
import { useRouter } from "vue-router";
import "@mdi/font/css/materialdesignicons.css";

const aiInterviewStore = useAiInterviewStore();
const router = useRouter();

const start = ref(false);
const currentStep = ref(1);

// ✅ 수정된 handleStepSelection
const handleStepSelection = (stepNum) => {
  if (currentStep.value === stepNum) {
    currentStep.value++;
  }
};

// 선택 항목들
const keywords = ref(["Backend", "Frontend", "App·Web", "AI", "Embeddeed", "DevOps"]);
const keywordMap = { Backend: 1, Frontend: 2, Embedded: 3, AI: 4, DevOps: 5, "App·Web": 6 };
const selectedKeyword = ref("");

const skills = ref([
  "풀스택", "백엔드/서버개발", "프론트엔드", "웹개발", "Flutter", "Java", "JavaScript", "Python",
  "Vue.js", "API", "MYSQL", "AWS", "ReactJS", "ASP", "Angular", "Bootstrap", "Node.js",
  "jQuery", "PHP", "JSP", "GraphQL", "HTML5"
]);
const skillsMap = Object.fromEntries(skills.value.map((s, i) => [s, i + 1]));
const selectedTechSkills = ref([]);

const academicBackgrounds = ref(["전공자", "비전공자"]);
const academicBackgroundMap = { 전공자: 1, 비전공자: 2 };
const selectedAcademicBackground = ref("");

const careers = ref(["신입", "3년 이하", "5년 이하", "10년 이하", "10년 이상"]);
const careerMap = { 신입: 1, "3년 이하": 2, "5년 이하": 3, "10년 이하": 4, "10년 이상": 5 };
const selectedCareer = ref("");

const projectExperience = ref(["있음", "없음"]);
const projectExperienceMap = { 있음: 1, 없음: 2 };
const selectedProjectExperience = ref("");

onMounted(() => {
  if (process.client) {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      router.push("/account/login");
    }
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
    alert("모든 항목(직무, 경력, 전공, 프로젝트 경험, 기술스택)을 선택해 주세요.");
    return;
  }

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
.selected-chip {
  background-color: #2196f3 !important;
  color: white !important;
}
.unselected-chip {
  background-color: #e0e0e0 !important;
  color: black !important;
}
.dimmed-chip {
  opacity: 0.4;
  pointer-events: none;
}
</style>
