<template>
  <v-container class="container">
    <div class="login-wrapper">
      <div>
        <div class="login_logo">
          <!-- LOGIN 텍스트 대신 이미지 삽입 -->
        </div>

        <v-dialog v-model="dialog" max-width="400px">
          <v-card>
            <v-card-title>알림</v-card-title>
            <v-card-text>
              <p><strong>제 1 조 (목적)</strong></p>
              <p>
                본 약관은 본 서비스가 제공하는 면접 연습 및 모의 면접
                서비스(이하 "서비스")의 이용 조건 및 절차, 이용자와 서비스
                제공자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>

              <p><strong>제 2 조 (약관의 효력과 변경)</strong></p>
              <p>
                ① 본 서비스는 이용자가 본 약관 내용에 동의하는 것을 조건으로
                서비스를 제공하며, 본 서비스의 이용 행위에는 본 약관을
                우선적으로 적용합니다.
              </p>
              <p>
                ② 본 서비스는 사전 고지 없이 본 약관을 변경할 수 있으며, 변경된
                약관은 서비스 내 공지를 통해 이용자가 직접 확인할 수 있도록
                합니다. 이용자가 변경된 약관에 동의하지 않는 경우 회원 탈퇴를 할
                수 있으며, 계속 사용할 경우 변경된 약관에 동의한 것으로
                간주됩니다.
              </p>

              <p><strong>제 3 조 (개인정보의 수집 및 이용)</strong></p>
              <p>
                ① 본 서비스는 면접 연습 및 모의 면접 서비스 제공을 위해 다음과
                같은 개인정보를 수집합니다.
              </p>
              <ul>
                <li>
                  <strong>필수 정보:</strong> 이메일, 닉네임, 성별, 생년월일,
                  소셜 로그인 타입(카카오, 구글 등)
                </li>
                <li>
                  <strong>자동 수집 정보:</strong> 서비스 이용 기록, 방문 기록,
                  IP 주소
                </li>
              </ul>
              <p>② 수집된 정보는 다음의 목적을 위해 사용됩니다.</p>
              <ul>
                <li>면접 연습 서비스 제공 및 맞춤형 면접 질문 제공</li>
                <li>서비스 이용 통계 분석을 통한 품질 개선</li>
                <li>회원 관리(로그인, 인증, 탈퇴 등)</li>
                <li>불법 및 부정 이용 방지</li>
              </ul>

              <p><strong>제 4 조 (개인정보 보관 및 파기)</strong></p>
              <p>
                ① 이용자의 개인정보는 회원 탈퇴 시 즉시 삭제됩니다. 단, 관계
                법령에 의해 보관할 필요가 있는 경우 해당 법령에서 정한 기간 동안
                보관됩니다.
              </p>
              <p>
                ② 개인정보 보관 기간이 경과한 경우, 해당 정보를 복구할 수 없는
                방식으로 완전히 삭제합니다.
              </p>

              <p><strong>제 5 조 (개인정보 제공 및 공유)</strong></p>
              <p>
                ① 본 서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다.
                다만, 아래의 경우는 예외로 합니다.
              </p>
              <ul>
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령에 따라 수사기관의 요청이 있는 경우</li>
              </ul>

              <p><strong>제 6 조 (이용자의 권리 및 행사 방법)</strong></p>
              <p>
                ① 이용자는 언제든지 본인의 개인정보를 열람, 수정, 삭제 요청할 수
                있습니다.
              </p>
              <p>
                ② 회원 탈퇴를 원할 경우, 서비스 내 ‘회원 탈퇴’ 기능을 이용하면
                개인정보가 즉시 삭제됩니다.
              </p>

              <p><strong>제 7 조 (서비스 이용 제한)</strong></p>
              <p>
                ① 이용자가 다음과 같은 행위를 할 경우, 서비스 이용이 제한될 수
                있습니다.
              </p>
              <ul>
                <li>타인의 개인정보를 도용하는 행위</li>
                <li>
                  불법적인 목적 또는 부정한 방법으로 서비스를 이용하는 행위
                </li>
                <li>서비스의 정상적인 운영을 방해하는 행위</li>
              </ul>

              <p><strong>제 8 조 (책임 및 면책)</strong></p>
              <p>
                ① 본 서비스는 무료로 제공되며, 이용자가 본 서비스를 통해 얻은
                정보에 대해 보증하지 않습니다.
              </p>
              <p>
                ② 이용자가 서비스 이용 과정에서 발생한 데이터 손실, 오류, 또는
                기타 피해에 대해 본 서비스는 책임을 지지 않습니다.
              </p>

              <p><strong>제 9 조 (관할 법원)</strong></p>
              <p>
                본 서비스 이용과 관련하여 발생하는 분쟁에 대해 대한민국 법을
                적용하며, 소송이 제기될 경우 관할 법원은 대한민국 내 정한
                법원으로 합니다.
              </p>

              <p><strong>부칙</strong></p>
              <p>본 약관은 2025년 3월 1일부터 시행됩니다.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="
                  dialog = false;
                  goToKakaoLogin();
                "
                >동의</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- AIm 한줄 소개 -->
        <div class="introduction" style="color: black">
          <p>
            기업 분석과&nbsp;AI 모의면접&nbsp;|&nbsp;취업 준비는
            <b>JOBSTICK</b>에서
          </p>
        </div>

        <!-- 영역 구분선 -->
        <v-divider class="mt-5 mb-7" :thickness="3"></v-divider>

        <!--goToKakaoLogin-->
        <!-- 각 소셜 로그인 버튼들 -->
        <v-btn class="kakao-login-btn" @click="dialog = true">
          <!-- 카카오 로그인 -->
        </v-btn>

        <v-btn class="google-login-btn" @click="goToGoogleLogin">
          <!-- Google 로그인 -->
        </v-btn>

        <v-btn class="naver-login-btn" @click="goToNaverLogin">
          <!-- 네이버 로그인 -->
        </v-btn>

        <v-btn class="admin-login-btn" @click="goToAdminLogin" block>
          관리자 로그인
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/accountStore";
import { useKakaoAuthenticationStore } from "../../../kakaoAuthentication/stores/kakaoAuthenticationStore";
import { useNaverAuthenticationStore } from "../../../naverAuthentication/stores/naverAuthenticationStore";
import { useGoogleAuthenticationStore } from "../../../googleAuthentication/stores/googleAuthenticationStore";

// import { useSessionStorage } from '@vueuse/core'; // 세션 스토리지 관리를 위해 VueUse 사용

const router = useRouter();

const form = ref(false);
const email = ref(null);
const password = ref(null);
const visible = ref(false);
const loading = ref(false);
const login_flag = ref(true);
const isEmailCollect = ref(false);
const isPasswordCollect = ref(false);
const dialog = ref(false);

// Pinia store 상태
const account = useAccountStore();
const kakaoAuthentication = useKakaoAuthenticationStore();
const googleAuthentication = useGoogleAuthenticationStore();
const naverAuthentication = useNaverAuthenticationStore();

// Google, Kakao, Naver 로그인 함수들
const goToKakaoLogin = async () => {
  localStorage.setItem("loginType", "KAKAO");
  await kakaoAuthentication.requestKakaoLoginToDjango();
};

const goToGoogleLogin = async () => {
  // alert("현재 로그인 검수 중입니다.");
  localStorage.setItem("loginType", "GOOGLE");
  await googleAuthentication.requestGoogleOauthRedirectionToDjango();
};

const goToNaverLogin = async () => {
  localStorage.setItem("loginType", "NAVER");
  await naverAuthentication.requestNaverLoginToDjango();
};

//github관리자 로그인
const goToAdminLogin = () => {
  router.push("/account/admin-code");
};

// Computed properties (Pinia 상태에 기반한 계산된 속성)
const isAuthenticatedKakao = computed(() => authentication.isAuthenticated);
const loginType = computed(() => account.loginType);
// const isAuthenticatedGoogle = computed(() => googleAuthentication.isAuthenticatedGoogle);
const isAuthenticatedNaver = computed(
  () => naverAuthentication.isAuthenticated
);

// Methods
const goToHome = () => {
  router.push("/");
};

//const goToSignUp = () => {
//  router.push("/account/register/normal");
//};

const onSubmit = async () => {
  if (!form.value) return;
  loading.value = true;

  try {
    const response = await checkPassword();
    const roleType = await account.requestRoleTypeToDjango(email.value);

    if (response) {
      login_flag.value = true; // 로그인 성공
      sessionStorage.setItem("email", email.value);
      sessionStorage.setItem("loginType", "NORMAL");

      if (roleType.data.roleType === "ADMIN") {
        // Admin 처리
        sessionStorage.removeItem("normalToken");
        sessionStorage.setItem("adminToken", true);
        account.REQUEST_IS_ADMIN_TO_DJANGO(true);
        goToHome();
      } else {
        // Normal 처리
        sessionStorage.setItem("normalToken", true);
        account.isAuthenticatedNormal = true;
        goToHome();
      }
    } else {
      login_flag.value = false; // 로그인 실패
    }
  } catch (error) {
    console.error("로그인 중 에러 발생: ", error);
    login_flag.value = false;
  } finally {
    loading.value = false;
  }
};

// Email, Password validation
const emailRequired = (v) => !!v || "정확한 이메일 주소를 입력하세요.";
const passwordRequired = (v) => !!v || "비밀번호는 8~20자 사이여야 합니다.";

// 비밀번호 확인 함수
const checkPassword = async () => {
  try {
    const payload = {
      email: email.value,
      password: password.value,
    };
    const response = await account.requestAccountCheckToDjango(payload);
    return response;
  } catch (error) {
    console.error("비밀번호 확인 중 에러 발생: ", error);
  }
};
</script>

<style scoped>
.container {
  max-width: 100vw;
  height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  background: url("@/assets/images/fixed/login_bg6.jpg") no-repeat center center;
  background-size: contain;
}

.login_logo {
  height: 20vh;
  margin-bottom: -2vh;
  overflow: hidden;
  background-image: url("@/assets/images/fixed/logo1.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* 로그인 박스 설정 */
.login-wrapper {
  position: relative;
  z-index: 1;
  top: 70px;
  width: 50vh;
  height: 70vh;
  overflow: hidden;
  background-color: #877e7e00;
  border-radius: 9vh;
  padding: 0vh 10vh;
  display: flex; /* Flexbox 활성화 */
  justify-content: center; /* 수평 방향 중앙 정렬 */
  align-items: center; /* 수직 방향 중앙 정렬 */
  text-align: center;
}

/* 에러 메시지 박스 설정 */
.login-error-box {
  background-color: rgb(255, 0, 0);
  padding: 10px;
  margin-bottom: 1px;
  border-radius: 20px;
  color: #fff;
}

/* 로그인 및 회원가입 버튼 설정 */
.v-btn {
  width: 100%;
  height: 50px;
  margin: 1.3vh auto;
}

.introduction {
  color: rgb(255, 255, 255);
  word-break: break-word;
}

@media (max-width: 768px) {
  .v-btn {
    height: 45px; /* 모바일 환경에서는 높이를 줄임 */
  }
  .login_logo {
    height: 19vh;
  }
}

@media (max-width: 480px) {
  .v-btn {
    height: 33px; /* 작은 모바일 환경에서는 더 작게 설정 */
  }
  .login_logo {
    height: 13vh;
  }
  .introduction {
    white-space: pre-wrap;
  }
}

/* Kakao 로그인 버튼 설정 */
.kakao-login-btn {
  background-image: url("@/assets/images/fixed/btn_login_kakao.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffea00;
  margin-bottom: 1vh;
  border-radius: 1.4vh;
}

/* Google 로그인 버튼 설정 */
.google-login-btn {
  background-image: url("@/assets/images/fixed/btn_login_google.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-bottom: 1vh;
  border-radius: 1.4vh;
}

.naver-login-btn {
  background-image: url("@/assets/images/fixed/btn_login_naver.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #03c75a;
  border-radius: 1.4vh;
}

.v-text-field input {
  background-color: transparent !important;
  color: black !important;
  /* 입력값을 검정색으로 설정 */
}

.v-label {
  color: black !important;
  /* 레이블을 검정색으로 설정 */
}

/* 로그인 폼의 텍스트 필드 라벨 색상 설정 */
:deep(.v-label.v-field-label) {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* 로그인 폼의 텍스트 필드 입력값 색상 설정 */
:deep(.v-text-field input) {
  color: #fff;
}

/* 눈 아이콘 색상 설정 */
:deep(.mdi-eye::before),
:deep(.mdi-eye-off::before) {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* 오류 메시지 스타일링 */
:deep(.v-messages__message) {
  color: rgb(0, 0, 255) !important;
  /* 메시지 색상 */
  font-size: 12px;
  /* 메시지 폰트 크기 */
}

/* 텍스트 필드 에러 상태의 레이블 색상을 초록색으로 변경 */
:deep(.v-field--error:not(.v-field--disabled) .v-label.v-field-label) {
  color: rgba(0, 0, 255) !important;
  /* 에러 상태의 레이블 색상을 초록색으로 변경 */
}

/* 관리자 로그인 버튼 스타일링 */
.admin-login-btn {
  width: 100%;
  max-width: 300px; /* 최대 너비 설정 */
  height: 50px;
  background-color: #4caf50; /* 관리자 버튼 색상 */
  color: white;
  font-weight: bold;
  border-radius: 1.4vh;
  margin-bottom: 20px; /* 카카오 로그인 버튼과의 간격 */
  cursor: pointer;
}
</style>
