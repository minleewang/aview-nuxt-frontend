<template>
  <div class="home-six">
    <h1>🌟 JOBSTICK을 통해 모의 면접을 완료하신 분들에게는 행운 부적을 랜덤 증정 🌟</h1>
    
    <!-- 이미지 컨테이너 -->
    <div class="image-container">
      <img :src="imageSrc" alt="부적 이미지" />
    </div>
  </div>
</template>

<script>
import imageSrc from '@/assets/images/fixed/star.jpg'; // 이미지 경로를 import 방식으로 가져옵니다.

export default {
  name: "HomePage6",
  data() {
    return {
      imageSrc, // 가져온 imageSrc를 데이터로 사용
    };
  },
};
</script>

<style scoped>
.home-six {
  font-family: Arial, sans-serif;
  text-align: center;
  background: url("@/assets/images/fixed/home_bg2.jpg") center center; /* Page5에서 사용한 배경 이미지 적용 */
  background-size: cover; /* 배경 이미지를 화면에 맞게 확대 */
  background-attachment: fixed; /* 배경 이미지를 고정 */
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column; /* 세로로 배치 */
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
}

h1 {
  color: #333;
  margin-top: 0; /* 상단 여백 제거 */
  font-size: 2rem; /* 텍스트 크기 설정 */
  margin-bottom: 20px; /* 제목과 이미지 사이 여백 */
}

.image-container {
  margin-top: 20px;
}

.image-container img {
  width: 300px;  /* 이미지 크기 설정 */
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
