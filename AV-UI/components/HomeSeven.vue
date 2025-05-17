<template>
  <v-container class="py-10" data-aos="fade-up">
    <v-row justify="center">
      <v-col cols="12" class="text-center mb-8">
        <h1 class="text-h4 font-weight-bold animate-fade-in" data-aos="fade-up">
          💸 경쟁사 대비 말도 안 되게 저렴한 가격
        </h1>
        <p class="text-subtitle-1" data-aos="fade-up" data-aos-delay="200">
          <strong class="highlight-text">₩4,000</strong>으로
          <strong class="highlight-text">1일 무제한 AI 모의면접</strong>을 제공합니다.<br />
          다른 사이트는 <strong class="red-text">1회 면접에 ₩20,000</strong>이 들 수도 있습니다.
        </p>
      </v-col>

      <!-- ✅ 텍스트 문장 애니메이션 -->
      <v-col cols="12" class="text-center">
        <div class="animated-line" style="animation-delay: 0s" data-aos="fade-up" data-aos-delay="400">
          1회권 구매 후 너무 떨리거나 실수가 많아...
        </div>
        <div class="animated-line" style="animation-delay: 0.4s" data-aos="fade-up" data-aos-delay="600">
          다시 면접을 보려면 추가 결제가 필요했던 경험 있으셨죠?
        </div>
        <div class="animated-line" style="animation-delay: 0.8s" data-aos="fade-up" data-aos-delay="800">
          <strong class="blue-text">JOBSTICK</strong>은 <strong>단 하루 ₩4,000</strong>으로
          <strong>무제한 모의 면접</strong>을 제공합니다.
        </div>
        <div class="animated-line" style="animation-delay: 1.2s" data-aos="fade-up" data-aos-delay="900">
          반복 연습은 <strong>무료처럼</strong>, 부담은 <strong>제로에 가깝게</strong>.
        </div>
      </v-col>

      <!-- ✅ CTA: 반짝이는 서류 버튼 -->
      <v-col cols="12" class="text-center mt-10" data-aos="zoom-in" data-aos-delay="400">
        <span class="shiny-button" @click="$router.push('/price')">
          📋 요금제 자세히 보기
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import AOS from "aos";
import "aos/dist/aos.css";
import { onMounted } from "vue";

onMounted(() => {
  AOS.init({ duration: 1000, once: true });
});
</script>

<style scoped>
/* 강조 텍스트 */
.highlight-text {
  color: #1976d2;
  font-weight: bold;
  animation: pulse 2s infinite;
}

.red-text {
  color: #e53935;
  font-weight: bold;
}

.blue-text {
  color: #1976d2;
  font-weight: bold;
}

/* 애니메이션 */
@keyframes pulse {
  0% { text-shadow: 0 0 0px #1976d2; }
  50% { text-shadow: 0 0 8px #1976d2; }
  100% { text-shadow: 0 0 0px #1976d2; }
}

.animate-fade-in {
  animation: fadeIn 1.2s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.animated-line {
  font-size: 18px;
  margin: 12px 0;
  opacity: 0;
  animation: slideUpFade 0.8s ease forwards;
}

@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ✨ 반짝이는 서류 버튼 스타일 */
.shiny-button {
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(135deg, #42a5f5, #1e88e5);
  padding: 14px 28px;
  border-radius: 30px;
  box-shadow: 0 0 12px rgba(66, 165, 245, 0.6), 0 0 20px rgba(66, 165, 245, 0.3);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: glow 2s infinite alternate;
  user-select: none;
}

.shiny-button:hover {
  transform: scale(1.06);
  box-shadow: 0 0 20px rgba(30, 136, 229, 0.9);
}

.shiny-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  transform: skewX(-25deg);
  animation: shine 2.5s infinite;
}

@keyframes shine {
  0% { left: -75%; }
  50% { left: 125%; }
  100% { left: 125%; }
}

@keyframes glow {
  0% { box-shadow: 0 0 12px rgba(66, 165, 245, 0.6); }
  100% { box-shadow: 0 0 22px rgba(66, 165, 245, 0.9); }
}
</style>
