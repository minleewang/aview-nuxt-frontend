<template>
  <div class="home-four">
    <h1>JOBSTICK의 주요 기능</h1>
    <p class="intro-text">
      JOBSTICK을 통해 실전 면접에 필요한 여러 시스템을 이용해 보세요.
    </p>

    <div class="content-container">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        v-if="currentIndex === index" 
        class="content-box"
      >
        <div class="content-description">
<<<<<<< Updated upstream
          <h2>원하는 기업의 요구사항 정보 제공</h2>
          <p>
            기업 뿐만이 아니라 다양한 분야, 직무별로 원하는 인재상 정보들 등
            면접에 필요한 다양한 정보를 제공해드리고 있습니다.
          </p>
        </div>
        <div class="content-image">
          <!-- 첫 번째 이미지 -->
          <img :src="images[0]" alt="기업 요구사항 이미지" />
        </div>
      </div>

      <!-- 두 번째 콘텐츠 박스 -->
      <div v-if="currentIndex === 1" class="content-box">
        <div class="content-description">
          <h2>ai를 이용한 정확한 피드백 제공</h2>
          <p>
            혼자서 준비하는 면접의 가장 큰 어려움인 피드백을 ai를 통해
            사용자에게 제공합니다.
          </p>
        </div>
        <div class="content-image">
          <!-- 두 번째 이미지 -->
          <img :src="images[1]" alt="긴장 완화 이미지" />
        </div>
      </div>

      <!-- 세 번째 콘텐츠 박스 -->
      <div v-if="currentIndex === 2" class="content-box">
        <div class="content-description">
          <h2>모의 면접 녹화본 제공</h2>
          <p>
            자신의 문제점과 불필요한 행동을 파악하여 빠르게 수정할 수 있도록
            도와드립니다.
          </p>
        </div>
        <div class="content-image">
          <!-- 세 번째 이미지 -->
          <img :src="images[2]" alt="면접 준비 이미지" />
=======
          <h2>{{ contentTitles[index] }}</h2>
          <p>{{ contentDescriptions[index] }}</p>
        </div>
        <div class="content-image">
          <img :src="image" :alt="`이미지 ${index + 1}`" />
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
    <ScrollUpAnimation class="scrollupanimation" @click="goToUp" />
  </div>
</template>

<script>
<<<<<<< Updated upstream
import AOS from "aos";
import image1 from "@/assets/images/fixed/in.jpg"; // 첫 번째 이미지
import image2 from "@/assets/images/fixed/dc.jpg"; // 두 번째 이미지
import image3 from "@/assets/images/fixed/cam.jpg"; // 세 번째 이미지
import ScrollUpAnimation from "./ScrollUpAnimation.vue";
import "aos/dist/aos.css";
import { defineComponent, ref, getCurrentInstance, onMounted } from "vue";

export default defineComponent({
  name: "HomeSix",
  components: {
    ScrollUpAnimation,
  },

  setup() {
    const { emit } = getCurrentInstance();

    const images = [image1, image2, image3];
    const currentIndex = ref(0);

    function goToUp() {
      emit("scroll-to-home");
    }

    function changeContent() {
      setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % 3; // currentIndex를 0, 1, 2로 순차적으로 변경
      }, 4000);
    }

    onMounted(() => {
      changeContent();
    });
=======
import image1 from '@/assets/images/fixed/in.webp';
import image2 from '@/assets/images/fixed/dc.webp';
import image3 from '@/assets/images/fixed/cam.webp';
>>>>>>> Stashed changes

    return {
<<<<<<< Updated upstream
      images,
      currentIndex,

      changeContent,
      goToUp,
    };
  },
});
=======
      images: [image1, image2, image3],
      contentTitles: [
        '원하는 기업의 요구사항 정보 제공',
        'ai를 이용한 정확한 피드백 제공',
        '모의 면접 녹화본 제공',
      ],
      contentDescriptions: [
        '기업 뿐만이 아니라 다양한 분야, 직무별로 원하는 인재상 정보들 등 면접에 필요한 다양한 정보를 제공해드리고 있습니다.',
        '혼자서 준비하는 면접의 가장 큰 어려움인 피드백을 ai를 통해 사용자에게 제공합니다.',
        '자신의 문제점과 불필요한 행동을 파악하여 빠르게 수정할 수 있도록 도와드립니다.'
      ],
      currentIndex: 0,
    };
  },
  mounted() {
    this.changeContent();
  },
  methods: {
    changeContent() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 4000); // 4초마다 콘텐츠 변경
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
>>>>>>> Stashed changes
</script>

<style scoped>
.home-four {
  width: 100%;
  min-height: 100vh;
  background: url("@/assets/images/fixed/home_bg2.jpg") center center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 240px 30px;
  box-sizing: border-box;
}

.intro-text {
  color: #333;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  color: #333;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 10px;
  text-align: center;
}

.content-container {
  position: relative;
  width: 80%;
  height: 400px;
  overflow: hidden;
}

.content-box {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  gap: 20px;
  position: relative;
  transition: opacity 1s ease-in-out;
  justify-content: center;
  align-items: center;
  z-index: 2; /* 콘텐츠가 배경 이미지 위로 표시되도록 설정 */
}

.content-description {
  width: 50%;
  font-size: 18px;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.content-description h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.content-image {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scrollupanimation {
  position: absolute;
  bottom: 7vh;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 6s ease 0s infinite;
  animation-delay: 5s;
}

.content-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05);
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .content-container {
    width: 100%;
    height: auto;
  }

  .content-box {
    flex-direction: column;
  }

  .content-description,
  .content-image {
    width: 100%;
  }

  .content-image img {
    height: auto;
  }
}

@media (max-width: 480px) {
  /* 추가적인 스타일 */
}
</style>
