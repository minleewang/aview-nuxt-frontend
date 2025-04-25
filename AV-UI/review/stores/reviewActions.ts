// 📁 review/stores/reviewActions.ts
import axios from 'axios'
import { useGoogleAuthenticationStore } from '@/googleAuthentication/stores/googleAuthenticationStore'
import { useKakaoAuthenticationStore } from '@/kakaoAuthentication/stores/kakaoAuthenticationStore'
import { useNaverAuthenticationStore } from '@/naverAuthentication/stores/naverAuthenticationStore'

export const reviewActions = {
  async fetchReviews(this: any) {
    try {
      const res = await axios.get('/av_db/review/')
      this.reviewList = res.data
    } catch (error: any) {
      console.error('❌ 리뷰 목록 불러오기 실패:', error.response?.data || error.message)
      alert('리뷰 목록을 불러오는 데 실패했습니다.')
    }
  },

  async submitReview(this: any) {
    try {
      // ✅ 로그인된 사용자 토큰 가져오기
      const googleStore = useGoogleAuthenticationStore()
      const kakaoStore = useKakaoAuthenticationStore()
      const naverStore = useNaverAuthenticationStore()

      const userToken =
        googleStore.userToken ||
        kakaoStore.userToken ||
        naverStore.userToken

      if (!userToken) {
        alert('로그인 후 리뷰를 작성할 수 있습니다.')
        return
      }

      const formData = new FormData()
      formData.append('title', this.reviewForm.title)
      formData.append('content', this.reviewForm.content)
      formData.append('userToken', userToken)

      if (this.reviewForm.image) {
        formData.append('image', this.reviewForm.image)
      }

      console.log("📤 리뷰 등록 요청 데이터:", this.reviewForm)

      // ❗ headers 생략! 브라우저가 자동으로 설정해야 오류가 안 남
      const response = await axios.post('/blog-post/review/register/', formData)

      console.log("✅ 리뷰 등록 응답 수신:", response.data)
      alert('리뷰가 성공적으로 등록되었습니다.')

      // ✅ 폼 초기화
      this.reviewForm.title = ''
      this.reviewForm.content = ''
      this.reviewForm.image = null

      // ✅ 리뷰 목록 갱신
      await this.fetchReviews()

    } catch (error: any) {
      console.error('❌ 리뷰 등록 실패:', error.response?.data || error.message)
      alert('리뷰 등록 중 오류가 발생했습니다.')
    }
  }
}
