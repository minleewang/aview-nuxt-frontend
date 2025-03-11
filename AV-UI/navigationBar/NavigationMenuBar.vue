<template>
  <v-app-bar color="transparent" app dark height="72" class="menu-bar">
    <v-btn text @click="goToHome" class="navbar-logo-btn">
      <v-img class="home-icon"></v-img>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn text @click="goToHome" class="btn-text"> HOME </v-btn>

    <v-btn text @click="goToReviewListPage" class="btn-text"> REVIEW </v-btn>

    <v-btn text @click="goToProductList" class="btn-text">
      COMPANY REPORT
    </v-btn>
    <v-btn text @click="goToLlmTestPage" class="btn-text"> AI INTERVIEW </v-btn>

    <v-spacer></v-spacer>

    <!-- 로그인 후 화면-->
    <v-menu
      v-if="isAuthenticated"
      close-on-content-click
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="btn-text" style="margin-right: 14px">
          <b>My Page</b>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in myPageItems"
          :key="index"
          @click="item.action"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu
      v-if="isAdmin"
      close-on-content-click
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="btn-text" style="margin-right: 14px">
          <b>ADMIN</b>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in adminPageList"
          :key="index"
          @click="item.action"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- 로그인 버튼과 로그아웃 버튼 조건에 따라 보여주기 -->
    <v-btn
      v-if="!isAuthenticated"
      text
      @click="signIn"
      class="btn-login"
    >
      LOGIN
    </v-btn>

    <v-btn v-else text @click="signOut" class="btn-logout">
      LOGOUT
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAccountStore } from "~/account/stores/accountStore";
import { useKakaoAuthenticationStore } from "~/kakaoAuthentication/stores/kakaoAuthenticationStore";
import { useNaverAuthenticationStore } from "~/naverAuthentication/stores/naverAuthenticationStore";
import { useReviewStore } from "~/review/stores/reviewStore";
import { useGoogleAuthenticationStore } from "~/googleAuthentication/stores/googleAuthenticationStore";

// Pinia 스토어 사용
const accountStore = useAccountStore();
const kakaoAuthenticationStore = useKakaoAuthenticationStore();
const googleAuthenticationStore = useGoogleAuthenticationStore();
const naverAuthenticationStore = useNaverAuthenticationStore();
const reviewStore = useReviewStore();

const router = useRouter();

// 데이터 선언
const adminPageList = ref([
  {
    title: "사용자 관리",
    action: () => goToManagementUserPage(),
  },
  {
    title: "사용자 로그 현황",
    action: () => goToManagementUserLogList(),
  },
]);

const myPageItems = ref([
  {
    title: "회원 정보",
    action: () => goToMyPage(),
  },
  {
    title: "장바구니",
    action: () => goToCart(),
  },
  {
    title: "주문 목록",
    action: () => goToOrder(),
  },
]);

// 사용자 로그인 상태를 체크하는 변수
const isAuthenticated = ref(false);
const isAdmin = ref(false);

// 라우터 이동 함수들
const signIn = () => router.push("/account/login");
const goToHome = () => router.push("/");
const goToProductList = () => router.push("/companyReport/list");
const goToCart = () => router.push("/cart/list");
const goToOrder = () => router.push("/order/list");
const goToMyPage = () => router.push("/account/mypage");
const goToReviewListPage = () => router.push("/review/list");
const goToManagementUserPage = () => router.push("/management/user");
const goToManagementUserLogList = () => router.push("/management/log");
const goToLlmTestPage = () => router.push("/ai-interview");

// 로그아웃 처리
const signOut = async () => {
  if (process.client) {
    const loginType = sessionStorage.getItem("loginType");

    if (loginType === "KAKAO") {
      await kakaoAuthenticationStore.requestKakaoLogoutToDjango();
      kakaoAuthenticationStore.isAuthenticatedKakao = false;
      kakaoAuthenticationStore.isKakaoAdmin = false;
    } else if (loginType === "GOOGLE") {
      await googleAuthenticationStore.requestGoogleLogoutToDjango();
      googleAuthenticationStore.isAuthenticatedGoogle = false;
    } else if (loginType === "NAVER") {
      await naverAuthenticationStore.requestNaverLogoutToDjango();
      naverAuthenticationStore.isAuthenticatedNaver = false;
    } else if (loginType === "NORMAL") {
      sessionStorage.removeItem("normalToken");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("loginType");
      sessionStorage.removeItem("adminToken");

      if (sessionStorage.getItem("fileKey")) {
        sessionStorage.removeItem("fileKey");
      }

      accountStore.isAuthenticatedNormal = false;
      accountStore.isNormalAdmin = false;
      kakaoAuthenticationStore.isKakaoAdmin = false;
      googleAuthenticationStore.isGoogleAdmin = false;
      naverAuthenticationStore.isNaverAdmin = false;
    }

    router.push("/");
  }
};

// 사용자 상태 복원
onMounted(() => {
  if (process.client) {
    const userToken = sessionStorage.getItem("userToken");
    const googleUserToken = sessionStorage.getItem("googleUserToken");
    const naverUserToken = sessionStorage.getItem("naverUserToken");
    const normalToken = sessionStorage.getItem("normalToken");
    const adminToken = sessionStorage.getItem("adminToken");

    // 인증 상태 체크
    isAuthenticated.value = userToken || googleUserToken || naverUserToken || normalToken ? true : false;
    isAdmin.value = adminToken ? true : false;
  }
});
</script>

<style scoped>
.menu-bar {
  background: var(--Gradient-Liner-1, linear-gradient(94deg, #2a49e5 1.69%, #6751e0 116.61%)) !important;
}

/* 로고 이미지 버튼 */
.navbar-logo-btn {
  display: flex;
  align-items: center;
  margin-left: 80px !important;
}

.home-icon {
  height: 50px;
  width: 150px;
  background-image: url("@/assets/images/fixed/logo2.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.btn-text {
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: #fff;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 0px 10px;
  margin: 0px 10px;
}

.btn-login {
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 700px;
  color: #fff;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-right: 80px !important;
  border: 1px solid white;
  color: white;
}

.btn-logout {
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 700px;
  color: #fff;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-right: 80px !important;
  border: 1px solid white;
  color: white;
}

.btn-text:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.btn-text:focus {
  background-color: rgba(255, 255, 255, 0.25);
  color: white;
}

.v-menu > .v-overlay__content > .v-card,
.v-menu > .v-overlay__content > .v-sheet,
.v-menu > .v-overlay__content > .v-list {
  background-color: rgba(0, 0, 0, 0.25);
  color: white;
  border: 3px solid white;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.25);
}
</style>
