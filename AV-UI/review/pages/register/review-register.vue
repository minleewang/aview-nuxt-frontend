<template>
  <v-container>
    <h1>리뷰 작성</h1>

    <v-text-field v-model="reviewTitle" label="제목" outlined />
    <v-textarea v-model="reviewContent" label="내용" outlined />
    <v-file-input v-model="reviewImage" label="이미지 업로드" accept="image/*" />

    <v-btn color="primary" @click="submitReview">제출하기</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// ✅ 공통 로그인 스토어에서 userToken 가져오기
import { useGoogleAuthenticationStore } from '@/googleAuthentication/stores/googleAuthenticationStore'
import { useKakaoAuthenticationStore } from '@/kakaoAuthentication/stores/kakaoAuthenticationStore'
import { useNaverAuthenticationStore } from '@/naverAuthentication/stores/naverAuthenticationStore'


// ✅ SEO 메타 정보
definePageMeta({
  title: '리뷰 작성 | JobStick',
  description: 'JobStick 리뷰 작성 페이지입니다. 리뷰를 작성해보세요.',
  keywords: ['리뷰', '리뷰 작성', '리뷰 제출', 'JobStick', '잡스틱'],
  ogTitle: 'JobStick 리뷰 작성'
  ogDescription: 'JobStick 리뷰 작성 페이지입니다. 서비스 이용 후 리뷰를 남겨보세요.',
  ogImage: '', // 실제 이미지 경로
  robots: 'index, follow' // 검색 엔진 노출 허용 
});

const googleStore = useGoogleAuthenticationStore()
const kakaoStore = useKakaoAuthenticationStore()
const naverStore = useNaverAuthenticationStore()

const router = useRouter()

const reviewTitle = ref('')
const reviewContent = ref('')
const reviewImage = ref<File | null>(null)

const getUserToken = (): string | null => {
  if (googleStore.userToken) return googleStore.userToken
  if (kakaoStore.userToken) return kakaoStore.userToken
  if (naverStore.userToken) return naverStore.userToken
  return null
}

const submitReview = async () => {
  if (!reviewTitle.value || !reviewContent.value) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }

  const userToken = getUserToken()
  if (!userToken) {
    alert('로그인 후 리뷰를 작성할 수 있습니다.')
    return
  }

  const formData = new FormData()
  formData.append('title', reviewTitle.value)
  formData.append('content', reviewContent.value)
  formData.append('userToken', userToken)
  if (reviewImage.value) {
    formData.append('image', reviewImage.value)
  }

  try {
    const response = await axios.post('/av_db/blog-post/review/register/', formData, {
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
