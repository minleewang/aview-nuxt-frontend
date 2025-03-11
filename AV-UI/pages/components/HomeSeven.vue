<template>
  <div class="home-four">
    <!-- h1 아래에 작은 텍스트 추가 -->
    <h1>JOBSTICK의 주요 기능</h1>
    <p class="intro-text">JOBSTICK을 통해 실전 면접에 필요한 여러 시스템을 이용해 보세요.</p>

    <!-- 큰 직사각형 컨테이너 안에 콘텐츠가 이동 -->
    <div class="content-container">
      <!-- 첫 번째 콘텐츠 박스 -->
      <div v-if="currentIndex === 0" class="content-box">
        <div class="content-description">
          <h2>원하는 기업의 요구사항 정보 제공</h2>
          <p>기업 뿐만이 아니라 다양한 분야, 직무별로 원하는 인재상 정보들 등 면접에 필요한 다양한 정보를 제공해드리고 있습니다.</p>
        </div>
        <div class="content-image">
          <img :src="imageSrc" alt="123.jpg" />
        </div>
      </div>

      <!-- 두 번째 콘텐츠 박스 -->
      <div v-if="currentIndex === 1" class="content-box">
        <div class="content-description">
          <h2>면접 중에 지나치게 긴장해서 머리가 하얗게 될까 걱정이에요</h2>
          <p>긴장 완화 방법과 면접에 대한 자신감을 가지는 방법을 안내드립니다.</p>
        </div>
        <div class="content-image">
          <img :src="imageSrc" alt="긴장 이미지" />
        </div>
      </div>

      <!-- 세 번째 콘텐츠 박스 -->
      <div v-if="currentIndex === 2" class="content-box">
        <div class="content-description">
          <h2>면접을 준비하기 막막해요</h2>
          <p>면접 준비를 체계적으로 할 수 있는 방법을 제공하여 부담을 줄여 드립니다.</p>
        </div>
        <div class="content-image">
          <img :src="imageSrc" alt="123.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imageSrc from '@/assets/images/fixed/123.jpg'; // 이미지 경로를 import로 불러옵니다.

export default {
  name: "HomePage7",
  data() {
    return {
      imageSrc, // 가져온 이미지 경로를 데이터로 사용
      currentIndex: 0, // 현재 보이는 칸의 인덱스
    };
  },
  mounted() {
    this.changeContent();
  },
  methods: {
    // 2초마다 콘텐츠를 변경하는 함수
    changeContent() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % 3; // currentIndex를 0, 1, 2로 순차적으로 변경
      }, 2000); // 2초마다 실행
    }
  }
};
</script>

<style scoped>
/* 페이지 전체 틀 및 백그라운드 이미지 */
.home-four {
  width: 100%;
  min-height: 100vh; /* 페이지가 적어도 전체 화면을 덮도록 설정 */
  background: url("@/assets/images/fixed/home_bg2.jpg") center center;
  background-size: cover; /* 배경 이미지 크기를 화면 크기에 맞추어 조정 */
  background-attachment: fixed; /* 배경 이미지를 고정하여 스크롤 시에도 배경이 고정되도록 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 240px 30px; /* 여백을 2배로 늘림 (원래 120px에서 240px로) */
  box-sizing: border-box; /* 패딩을 포함한 크기 계산 */
}

.intro-text {
  color: #666; /* 색상 변경 */
  font-size: 1.2rem; /* 글씨 크기 */
  text-align: center;
  margin-bottom: 20px; /* 하단 여백 */
}

h1 {
  color: #333;
  font-size: 3rem; /* 글씨 크기 */
  font-weight: bold;
  margin-bottom: 20px; /* 하단 여백 */
  margin-top: 10px; /* 상단 여백을 살짝 추가 */
  text-align: center;
}

.content-container {
  position: relative;
  width: 80%; /* 큰 직사각형의 너비 */
  height: 400px; /* 직사각형의 높이 */
  overflow: hidden; /* 자식 요소가 직사각형 밖으로 나가지 않도록 */
}

.content-box {
  width: 100%; /* 한 콘텐츠 박스가 전체 영역을 차지하도록 설정 */
  height: 100%; /* 콘텐츠 박스의 높이를 부모 높이와 동일하게 설정 */
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  display: flex;
  flex-direction: row; /* 텍스트와 이미지를 가로로 배치 */
  gap: 20px;
  position: absolute; /* 각 콘텐츠가 겹치지 않도록 위치를 절대값으로 설정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 1s ease-in-out; /* 1초간 페이드 인/아웃 효과 */
}

.content-description {
  width: 50%; /* 왼쪽 절반은 글씨 영역 */
  font-size: 16px; /* 설명 글씨 크기 */
  color: #333;
}

.content-description h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.content-image {
  width: 50%; /* 오른쪽 절반은 이미지 영역 */
  overflow: hidden;
}

.content-image img {
  width: 100%; /* 이미지 크기를 칸 크기에 맞추기 */
  height: 100%; /* 이미지의 높이를 절반 높이에 맞추기 */
  object-fit: cover; /* 이미지가 비율을 유지하면서 잘리지 않게 설정 */
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* 이미지에 그림자 추가 */
}

/* 반응형 웹 디자인: 화면이 좁을 경우 레이아웃을 자동으로 변경 */
@media (max-width: 768px) {
  .content-container {
    width: 100%; /* 작은 화면에서는 전체 너비를 차지하도록 */
    height: auto; /* 작은 화면에서는 높이를 자동으로 맞춤 */
  }

  .content-box {
    flex-direction: column; /* 작은 화면에서는 텍스트와 이미지를 세로로 배치 */
  }

  .content-description,
  .content-image {
    width: 100%; /* 작은 화면에서는 텍스트와 이미지가 모두 100% 크기를 차지하도록 */
  }

  .content-image img {
    height: auto; /* 이미지 비율을 유지하도록 설정 */
  }
}
</style>
