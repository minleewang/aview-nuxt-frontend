<template>
  <v-container>
    <v-alert type="success">리뷰가 성공적으로 등록되었습니다!</v-alert>
    <v-btn @click="goToList">리스트로 돌아가기</v-btn>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToList = () => {
  router.push('/review/list');
};
</script>
