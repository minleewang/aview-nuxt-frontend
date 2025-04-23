<template>
  <v-app>
    <!-- 전체를 감싸는 wrapper 추가 -->
    <div class="layout-wrapper">
      <NavigationBar />
      <v-main class="main-wrapper">
        <NuxtPage />
      </v-main>
      <div :class="['footer-container', { 'home-footer': route.path === '/' }]">
        <!-- 🖼️ 위치 아이콘 이미지 (3배 크기) -->
        <img src="@/assets/images/fixed/eddi.jpg" alt="위치 아이콘" class="footer-image" />

        <!-- 주소 및 카피라이트 텍스트 (왼쪽 정렬됨) -->
        <p class="reserved-info">
          서울특별시 송파구 새말로8길 26, 3층(문정동)
        </p>
        <p class="reserved-info">
          Copyright © 2025 에디(EDDI). All rights reserved.
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
  text-align: left; /* 왼쪽 정렬 */
  padding: 1px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  transition: background-color 0.3s ease;
}

/* 홈 전용 푸터 배경 */
.footer-container.home-footer {
  background: url("@/assets/images/fixed/home_bg2.jpg") center center;
  background-size: cover;
  background-attachment: fixed;
}

/* 푸터 이미지 스타일 (3배 크기 = 144px) */
.footer-image {
  width: 144px;
  height: 144px;
  margin-bottom: 8px;
}

/* 텍스트 스타일 */
.reserved-info {
  margin: 2px 0;
}
</style>
