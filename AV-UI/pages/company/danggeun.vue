<template>
  <v-container class="py-10">
    <h1 class="text-h5 font-weight-bold mb-6">당근마켓 면접 선택</h1>

    <v-row dense>
      <v-col
        v-for="(role, index) in roles"
        :key="index"
        cols="12"
      >
        <v-card class="pa-6 mb-4 full-width-card" outlined>
          <v-row align="center" justify="space-between">
            <v-col cols="9">
              <v-card-title class="text-h6 font-weight-bold">
                {{ role.title }}
              </v-card-title>
              <v-card-subtitle class="mb-2">
                {{ role.description }}
              </v-card-subtitle>
            </v-col>

            <v-col cols="3" class="text-right">
              <v-btn color="primary" @click="startInterview(role.keyword)">
                면접 시작하기
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const roles = [
  {
    title: "백엔드 개발자",
    description: "Spring, Java 기반 서버 개발",
    keyword: "Backend",
  },
  {
    title: "프론트엔드 개발자",
    description: "Vue.js, Nuxt 기반 웹 UI 개발",
    keyword: "Frontend",
  },
  {
    title: "AI 엔지니어",
    description: "머신러닝/딥러닝 기반 서비스",
    keyword: "AI",
  },
];

const startInterview = (keyword) => {
  const jobstorage = {
    company: "당근마켓",
    academic: 2,
    exp: 1,
    project: 2,
    tech: keywordMap[keyword],
    skills: [skillsMap[keywordToSkill[keyword]]],
  };

  localStorage.setItem("interviewInfo", JSON.stringify(jobstorage));
  router.push("/ai-test");
};

const keywordMap = {
  Backend: 1,
  Frontend: 2,
  Embedded: 3,
  AI: 4,
  DevOps: 5,
  "App·Web": 6,
};

const keywordToSkill = {
  Backend: "Java",
  Frontend: "Vue.js",
  AI: "Python",
};

const skillsMap = {
  Java: 1,
  "Vue.js": 2,
  Python: 3,
};
</script>

<style scoped>
.full-width-card {
  width: 100%;
}
</style>
