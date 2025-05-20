<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useAccountStore } from "../../account/stores/accountStore";
import { useGoogleAuthenticationStore } from "../../googleAuthentication/stores/googleAuthenticationStore";
import { accountAction } from "../../account/stores/accountActions";

const accountStore = useAccountStore();
const googleAuthenticationStore = useGoogleAuthenticationStore();

const router = useRouter();
const route = useRoute();

const setRedirectGoogleData = async () => {
  const code = route.query.code;

  // ✅ 백엔드에서 accessToken, email, userId 받아오기
  const { accessToken, email, userId } = await googleAuthenticationStore.requestAccessToken({ code });

  // ✅ localStorage에 로그인 기본 정보 저장
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("email", email);
  localStorage.setItem("userId", userId);

  // ❌ userToken은 아직 저장하지 않음 (추가 정보 입력 후에 저장됨)
  // ❌ 로그인 상태 처리도 하지 않음

  try {
    // ✅ 사용자 프로필 정보 요청 (userToken 없이 email로 대체해도 백에서 처리)
    const res = await accountAction.requestProfileToDjango({
      email: "",
      nickname: "",
      gender: "",
      birthyear: 0
    });

    // ✅ 조건 분기: 정보 누락 여부에 따라 페이지 이동
    if (!res.data.gender || res.data.birthyear === 0) {
      router.push("/account/modify/modify-profile");
    } else {
      // 👉 유효한 정보가 이미 있으면 마이페이지로 이동
      router.push("/account/mypage");
    }
  } catch (err) {
    console.error("프로필 정보 조회 실패:", err);
    alert("프로필 정보를 불러오는 데 실패했습니다.");
    router.push("/account/login");
  }
};

onMounted(() => {
  setRedirectGoogleData();
});
</script>
