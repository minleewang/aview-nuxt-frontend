<template>
  <div class="home-container">
    <div class="text-container">
      <transition name="fade-down">
        <div v-if="showElements" class="home-icon"></div>
      </transition>
      <div style="margin-bottom: 10px"></div>

      <h2 class="title typing-animation">
        <p style="text-transform: none; font-size: 56px">
          &nbsp;
          <span style="color: black; font-weight: bold">
            {{ typedText }}&nbsp;
          </span>
        </p>
        <div style="margin-bottom: 10px"></div>
        <p class="subtitle" style="color: black">SINCE 2025</p>
        <div style="margin-bottom: 24px"></div>
      </h2>

      <!-- 설명글 -->
      <transition name="fade-down">
        <p v-if="showElements" class="description" style="color: black">
          JOBSTICK은 한국 IT 기업 분석 보고서와 AI 모의면접 서비스를 제공하여
          <br />
          보다 많은 사람들에게 양질의 정보를 공유하고 도움을 드릴 수 있도록
          최선을 다하겠습니다.
        </p>
      </transition>

      <!-- ✅ 설문조사 하러가기 버튼 추가 -->
      <transition name="fade-down">
        <div v-if="showElements" style="margin-top: 30px">
          <v-btn color="primary" @click="goToSurvey">설문조사 하러가기</v-btn>
        </div>
      </transition>
    </div>

    <ScrollAnimation
      class="scrollanimation"
      v-if="showElements"
      @click="goToHomeSecond"
    />
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  nextTick,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import ScrollAnimation from "./ScrollAnimation.vue";

export default defineComponent({
  name: "HomeMain",
  components: {
    ScrollAnimation,
  },

  setup() {
    const fullText = ref("USE YOUR JOBSTICK!");
    const typedText = ref("");
    const typeIndex = ref(0);
    const showElements = ref(false);
    const { emit } = getCurrentInstance();
    const router = useRouter(); // ✅ 라우터 사용

    function typeText() {
      if (typeIndex.value < fullText.value.length) {
        typedText.value += fullText.value.charAt(typeIndex.value);
        typeIndex.value++;
        setTimeout(typeText, 80);
      } else {
        showElements.value = true;
        nextTick(() => {
          AOS.refresh();
        });
      }
    }

    function goToHomeSecond() {
      emit("scroll-to-home-second");
    }

    // ✅ 설문조사 페이지로 이동하는 함수
    function goToSurvey() {
      router.push("/survey");
    }

    onMounted(() => {
      typeText();
    });

    return {
      fullText,
      typedText,
      typeIndex,
      showElements,
      goToHomeSecond,
      goToSurvey,
      typeText,
    };
  },
});
</script>

<style scoped>
.home-container {
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  position: relative;
  background: url("@/assets/images/fixed/home_bg2.jpg") center center;
  background-size: cover;
  background-attachment: fixed;
}

.scrollanimation {
  position: absolute;
  bottom: 8vh;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 6s ease 0s infinite;
  animation-delay: 5s;
}

.home-icon {
  height: 130px;
  background-image: url("@/assets/images/fixed/logo1.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.text-container {
  width: 80vw;
  padding: 20px;
}

.typing-animation {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 5px solid white;
  animation: typing 2s steps(30), blink 0.5s step-end infinite alternate;
}

@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

@keyframes blink {
  from {
    border-color: transparent;
  }

  to {
    border-color: white;
  }
}

.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-down-enter-active {
  transition: all 0.8s ease-out;
}

.fade-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.subtitle {
  font-size: 24px;
  font-weight: bold;
}

.description {
  font-size: 18px;
  color: #ffffff;
  margin-top: 10vh;
}

@media screen and (max-width: 768px) {
  .home-container {
    background-position: center;
    background-size: cover;
  }

  .home-icon {
    height: 80px;
  }

  .text-container {
    width: 100vw;
    padding: 30px;
  }

  .typing-animation p {
    font-size: 26px !important;
  }

  .subtitle {
    font-size: 18px;
  }

  .description {
    font-size: 15px;
    margin-top: 5vh;
  }

  .scrollanimation {
    bottom: 5vh;
  }
}
</style>
