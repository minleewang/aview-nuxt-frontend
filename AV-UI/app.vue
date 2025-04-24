<template>
  <v-app>
    <!-- 전체를 감싸는 wrapper 추가 -->
    <div class="layout-wrapper">
      <NavigationBar />
      <v-main class="main-wrapper">
        <NuxtPage />
      </v-main>
      <!-- 홈이면 배경 이미지 적용, 내부 텍스트 영역만 따로 배경색 처리 -->
      <div :class="['footer-container', { 'home-footer': route.path === '/' }]">
        <div class="footer-inner">
          <img
            src="@/assets/images/fixed/eddi1.png"
            alt="위치 아이콘"
            class="footer-image"
          />
          <p class="reserved-info">
            서울특별시 송파구 새말로8길 26, 3층(문정동)
          </p>
          <p class="reserved-info">
            Copyright © 2025 에디(EDDI). All rights reserved.
          </p>
        </div>
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

/* 푸터 최상위 컨테이너 - 홈이면 배경 이미지 적용 */
.footer-container {
  text-align: center;
  border-top: 1px solid #e0ccff;
  padding: 0;
}

/* ✅ 실제 회색 배경이 들어갈 텍스트 영역 */
.footer-inner {
  background-color: #f5f5f5; /* ✅ 연한 회색으로 변경 */
  padding: 8px 12px 4px;
}

/* 푸터 이미지 스타일 */
.footer-image {
  width: 60px;
  height: 60px;
  margin: 0 auto 2px auto;
  display: block;
}

/* 텍스트 스타일 */
.reserved-info {
  margin: 0 0 2px;
  font-size: 12px;
  color: #111;
}
</style>
