<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" md="10" class="text-center">
        <h1 class="text-h4 font-weight-bold mb-4" data-aos="fade-up">
          🧠 AI INTERVIEW, 실제처럼 경험하세요
        </h1>
        <p class="text-subtitle-1 mb-10" data-aos="fade-up" data-aos-delay="200">
          <strong class="blue-text">JOBSTICK</strong>의 AI 모의 면접은 단순한 질문이 아닌,
          <strong>개발자 맞춤형 기술 기반 질문</strong>과<br />
          <strong>심화 꼬리 질문</strong>으로 면접자의
          <strong>논리적 사고</strong>와 <strong>실무 이해도</strong>를 깊이 있게 파악할 수 있도록 설계되었습니다.
        </p>
      </v-col>

      <!-- ✅ 면접관 이미지 삽입 -->
      <v-col cols="12" md="6" class="text-center" data-aos="zoom-in" data-aos-delay="400">
        <v-img
          src="@/assets/images/fixed/sc123.png"
          alt="면접관 예시 이미지"
          height="300"
          contain
          class="rounded-lg elevation-5"
        />
        <p class="mt-2 text-caption">※ 실제 면접관 화면 예시입니다</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    once: true,      // 한 번만 실행
    duration: 1000   // 지속 시간(ms)
  })
})
</script>

<style scoped>
.blue-text {
  color: #1976d2;
}
</style>
