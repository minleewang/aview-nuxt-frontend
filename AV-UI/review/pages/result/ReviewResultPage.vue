<template>
  <v-container>
    <v-alert type="success">리뷰 결과</v-alert>
    <pre>{{ review }}</pre>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const review = ref();

onMounted(async () => {
  const res = await fetch(`http://localhost:8000/api/review/result`);
  review.value = await res.json();
});
</script>
