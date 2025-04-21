<template>
  <v-app>
    <!-- 전체를 감싸는 wrapper 추가 -->
    <div class="layout-wrapper">
      <NavigationBar />
      <v-main class="main-wrapper">
        <NuxtPage />
      </v-main>
      <div :class="['footer-container', { 'home-footer': route.path === '/' }]">
        <p class="reserved-info">
          2025-2026 JOBSTICK Korea LLC. All Rights Reserved.
        </p>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import NavigationBar from "~/navigationBar/NavigationMenuBar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style>
/* 전체 레이아웃이 최소 높이 100vh를 가지도록 설정 */
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: transparent;
}

/* 콘텐츠 영역이 남은 공간을 채우도록 */
.main-wrapper {
  flex: 1;
}

/* 푸터 스타일 */
.footer-container {
  background-color: rgba(255, 255, 255, 0.132);
  color: #111;
  font-size: 12px;
  text-align: center;
  padding: 1px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  transition: background-color 0.3s ease;
}

.footer-container.home-footer {
  background: url("@/assets/images/fixed/home_bg2.jpg") center center;
  /*배경이미지가 반복 되지 않도록 설정, 즉 남는 공간 발생 시 이미지가 다시 생성되는 것을 막음*/
  background-size: cover;
  background-attachment: fixed;
}
</style>
