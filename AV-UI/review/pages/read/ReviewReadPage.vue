<template>
  <v-container>
    <h1>{{ review?.reviewTitle }}</h1>
    <p>{{ review?.reviewDescription }}</p>
    <v-img v-if="review?.imageUrl" :src="review.imageUrl" width="400"></v-img>
    <v-btn @click="goBack">뒤로가기</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const review = ref<any>(null);

onMounted(async () => {
  const res = await fetch(`http://localhost:8000/api/review/detail/${route.params.id}`);
  review.value = await res.json();
});

const goBack = () => router.push('/review/list');
</script>
