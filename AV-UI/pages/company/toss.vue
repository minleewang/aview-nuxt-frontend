<template>
  <v-container class="py-10">
    <h1 class="text-h5 font-weight-bold mb-6">Toss 면접 선택</h1>

    <v-row class="d-flex flex-nowrap" style="overflow-x: auto">
      <v-col
        v-for="(role, index) in roles"
        :key="index"
        cols="12"
        sm="4"
        md="3"
        class="flex-shrink-0"
      >
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-bold">{{ role.title }}</v-card-title>
          <v-card-subtitle class="mb-2">{{ role.description }}</v-card-subtitle>

          <v-btn color="primary" @click="startInterview(role.keyword)">
            면접 시작하기
          </v-btn>
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
    title: "프론트엔드 개발자",
    description: "React, Typescript 기반 Toss Web",
    keyword: "Frontend",
  },
  {
    title: "백엔드 개발자",
    description: "Kotlin 기반 API 및 결제 시스템",
    keyword: "Backend",
  },
];

const startInterview = (keyword) => {
  const jobstorage = {
    company: "Toss",
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
  AI: 4,
};
const keywordToSkill = {
  Backend: "Java",
  Frontend: "ReactJS",
};
const skillsMap = {
  Java: 1,
  ReactJS: 2,
};
</script>

<style scoped>
.v-card {
  min-height: 180px;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
</style>
