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
  const userToken = await googleAuthenticationStore.requestAccessToken({ code });

  localStorage.setItem("userToken", userToken);
  googleAuthenticationStore.isAuthenticated = true;
  googleAuthenticationStore.userToken = userToken;

  try {
    // ✅ 사용자 정보 요청
    const res = await accountAction.requestProfileToDjango({
      email: "",         // 지금 API는 email 등 안 써도 됨 (백엔드에서 userToken 기준 조회)
      nickname: "",
      gender: "",
      birthyear: 0,
    });

    // ✅ 조건 분기: 정보 누락 여부에 따라 페이지 이동
    if (!res.data.gender || res.data.birthyear === 0) {
      router.push("/account/modify");
    } else {
      router.push("/account/mypage");
    }
  } catch (err) {
    console.error("프로필 정보 조회 실패:", err);
    alert("프로필 정보를 불러오는 데 실패했습니다.");
    router.push("/account/login");
  }
};

onMounted(async () => {
  await setRedirectGoogleData();
});
</script>