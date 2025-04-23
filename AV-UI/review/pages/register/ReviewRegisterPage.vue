<template>
  <v-container>
    <h1>리뷰 작성</h1>

    <v-text-field v-model="reviewTitle" label="제목" outlined />
    <v-textarea v-model="reviewContent" label="내용" outlined />
    <v-file-input v-model="reviewImage" label="이미지 업로드" accept="image/*" />

    <!-- ✅ 버튼을 클릭했을 때만 실행되도록 -->
    <v-btn color="primary" @click="submitReview">제출하기</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const reviewTitle = ref('')
const reviewContent = ref('')
const reviewImage = ref<File | null>(null)
const router = useRouter()

// ✅ 버튼 클릭 시에만 실행되는 함수
const submitReview = async () => {
  if (!reviewTitle.value || !reviewContent.value) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }

  const formData = new FormData()
  formData.append('title', reviewTitle.value)
  formData.append('content', reviewContent.value)
  if (reviewImage.value) {
    formData.append('image', reviewImage.value)
  }

  try {
    const response = await axios.post('/av_db/review/register/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    console.log('리뷰 등록 성공:', response.data)
    alert('리뷰가 성공적으로 등록되었습니다.')
    router.push('/review/list')
  } catch (error) {
    console.error('리뷰 등록 실패:', error)
    alert('리뷰 등록 중 오류가 발생했습니다.')
  }
}
</script>
