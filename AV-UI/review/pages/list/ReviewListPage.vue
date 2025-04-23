<template>
  <v-container>
    <v-row class="justify-space-between align-center mb-6">
      <h2>📋 리뷰 리스트</h2>
      <v-btn color="primary" @click="goToRegister">✍ 리뷰 작성하기</v-btn>
    </v-row>

    <v-row>
      <v-col
        v-for="review in store.reviewList"
        :key="review.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img
            v-if="review.imageUrl"
            :src="review.imageUrl"
            height="200px"
            cover
          />
          <v-card-text>{{ review.text }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useReviewStore } from '~/review/stores/reviewStore'
import { useRouter } from 'vue-router'

const store = useReviewStore()
const router = useRouter()

const goToRegister = () => {
  router.push('/review/register')
}

onMounted(() => {
  store.fetchReviews()
})
</script>
