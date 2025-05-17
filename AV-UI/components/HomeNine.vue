<template>
  <v-container class="py-16 white-background" fluid data-aos="fade-up">
    <!-- 상단 제목 -->
    <v-row justify="center" class="mb-10">
      <v-col cols="12" md="10" class="text-center">
        <h1 class="text-h4 font-weight-bold text-primary mb-4 animate-fade-in">
          📊 기업 분석 & 면접 대비 정보 제공
        </h1>
        <p class="text-subtitle-1">
          <strong class="blue-text">JobStick</strong>은 단순한 면접 준비를 넘어, 
          <strong>기업 채용 포인트와 예상 질문</strong>까지 분석해서 제공합니다.
        </p>
      </v-col>
    </v-row>

    <!-- 이미지 + 텍스트 설명 (텍스트는 v-card 없이 출력) -->
    <v-row align="center" justify="center" class="mb-12">
      <!-- 이미지 -->
      <v-col cols="12" md="5" class="pa-0 text-center" data-aos="fade-right">
        <div class="image-border">
          <v-img
            src="@/assets/images/fixed/sc2.png"
            alt="기업 분석"
            max-height="380"
            contain
            class="rounded-img"
          />
        </div>
        <p class="mt-2 text-caption">※ 기업 공식 채용 페이지 또는 DART 공식 기준</p>
      </v-col>

      <!-- 텍스트만 표시 -->
      <v-col cols="12" md="6" class="pa-0 pl-md-10 text-left" data-aos="fade-left">
        <h3 class="text-h5 font-weight-bold mb-4 blue-text">
          🚀 <strong class="blue-text">JobStick</strong>이 제공하는 차별화된 기능
        </h3>
        <p class="highlight-text">
          <strong class="blue-text">JobStick</strong>은 특정 기업의 
          <span class="highlight">채용 정보</span>와 <span class="highlight">실제 면접 질문</span>을 기반으로,<br />
          사용자가 선택한 기술 역량에 따라 <strong>심화 기술 질문까지 자동 생성</strong>해주는 
          국내 최초의 AI 모의 면접 플랫폼입니다.<br /><br />
          이제 단순한 연습을 넘어서, <strong>실제 기업에 맞춘 깊이 있는 면접 대비</strong>가 가능합니다.
        </p>

        <!-- 버튼 -->
        <v-row justify="center" class="mt-6">
          <v-col cols="auto">
            <v-btn class="shiny-button" size="x-large" @click="goToInterview">
              ✨ AI INTERVIEW 시작하기 ✨
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = useRouter()
const goToInterview = () => {
  router.push('/ai-interview/llm-test')
}

onMounted(() => {
  AOS.init({ once: true, duration: 1000 })
})
</script>

<style scoped>
.white-background {
  background-color: #ffffff;
}

.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.image-border {
  border: 4px solid #1976d2;
  border-radius: 16px;
  padding: 8px;
  display: inline-block;
}

.rounded-img {
  border-radius: 12px;
}

.highlight-text {
  color: #444;
  font-size: 16px;
  line-height: 1.8;
}
.highlight-text .highlight {
  color: #ffeb3b;
  font-weight: 600;
}

.shiny-button {
  background: linear-gradient(90deg, #42a5f5, #1e88e5);
  color: white;
  font-weight: bold;
  animation: shine 4s linear infinite;
  box-shadow: 0 4px 12px rgba(66, 165, 245, 0.5);
  transition: transform 0.3s ease;
  background-size: 200% auto;
  border-radius: 30px;
}
.shiny-button:hover {
  transform: scale(1.05);
}

@keyframes shine {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

.blue-text {
  color: #1976d2;
  font-weight: bold;
}

.no-shadow {
  box-shadow: none !important;
  border: none !important;
}
</style>
