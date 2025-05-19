<template>
  <v-container class="py-10">
    <h2 class="text-h5 font-weight-bold mb-6">AI 면접결과</h2>

    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-8 text-center rounded-xl elevation-6">
          <p class="text-subtitle-2">실무자 면접</p>
          <h1 class="text-h2 font-weight-bold">{{ grade }}</h1>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      class="before-page-btn"
      @click="goToBefore"
      color="primary"
      elevation="4"
    >
      이전장
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  title: 'AI 면접 결과 | 잡스틱(JobStick)',
  description: '잡스틱(JobStick)에서 AI 모의 면접을 진행하고 나의 강점과 단점을 분석해보세요.',
  keywords: [
    '잡스틱',
    'jobstick',
    'job-stick',
    '개발자 플랫폼',
    '개발자 취업',
    '모의 면접',
    'AI 면접',
    '면접 결과',
    '면접 결과 분석',
    '결과 분석'
  ],
  ogTitle: 'AI 면접 결과 - 잡스틱(JobStick)',
  ogDescription: '잡스틱(JobStick) 면접 결과를 통해 나의 강점과 단점을 분석해보세요.',
  ogImage: '',
  robots: 'index, follow'
});

const grade = ref("");
const router = useRouter();
const goToBefore = () => {
  router.push("/ai-interview/result");
};

onMounted(async () => {
  try {
    const res = await fetch("/api/interview/result/123"); // 실제 API 경로로 교체
    const data = await res.json();
    grade.value = data.grade; // 예: "C", "A", "F" 등
  } catch (error) {
    console.error("면접 결과 불러오기 실패:", error);
  }
});
</script>
<style scoped>
.beofore-page-btn {
  position: fixed;
  bottom: 32px;
  left: 32px;
  z-index: 1000;
  padding: 10px 20px;
  border-radius: 8px;
}
</style>
