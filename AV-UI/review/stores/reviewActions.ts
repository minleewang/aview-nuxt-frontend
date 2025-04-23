import axios from 'axios'

export const reviewActions = {
  async fetchReviews(this: any) {
    // ... (기존 fetchReviews 유지)
  },

  async submitReview(this: any) {
    try {
      const formData = new FormData()
      formData.append('title', this.reviewForm.title)
      formData.append('content', this.reviewForm.content)
      if (this.reviewForm.image) {
        formData.append('image', this.reviewForm.image)
      }

      console.log("📤 리뷰 등록 요청 데이터:", this.reviewForm)

      const response = await axios.post('/av_db/review/register/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      console.log("✅ 리뷰 등록 응답 수신:", response.data)

      alert('리뷰가 성공적으로 등록되었습니다.')

      // 등록 후 초기화
      this.reviewForm.title = ''
      this.reviewForm.content = ''
      this.reviewForm.image = null

      // ✅ 목록 다시 불러오기
      await this.fetchReviews()

    } catch (error: any) {
      console.error('❌ 리뷰 등록 실패:', error.response?.data || error.message)
      alert('리뷰 등록 중 오류가 발생했습니다.')
    }
  }
}
