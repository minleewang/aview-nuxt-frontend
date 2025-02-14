<template>
  <div class="home-container">
    <div class="text-container">
      <h2 class="title typing-animation">
        <p style="text-transform: none; font-size: 56px">
          &nbsp;
          <span style="color: white; font-weight: bold">A</span
          >rtificial&nbsp;Intelligence -
          <!-- &nbsp은 공백을 의미,대신 줄바꿈은 일어나지 않음-->
          inter<span style="color: white; font-weight: bold">V</span>iew&nbsp;
        </p>
        <!-- 메인화면의 있는 글씨를 나타냄-->
      </h2>
      <div style="margin-bottom: 10px"></div>
      <p class="subtitle">SINCE 2025</p>
      <div style="margin-bottom: 24px"></div>

      <!--메인화면 돌고있는 별-->
      <div class="loader">
        <div class="react-star">
          <div class="nucleus"></div>
          <div class="electron electron1"></div>
          <div class="electron electron2"></div>
          <div class="electron electron3"></div>
        </div>
      </div>

      <p class="description">
        AIV은 한국 IT 기업 분석 보고서와 AI 모의면접 서비스를 제공하여 <br />
        보다 많은 사람들에게 양질의 정보를 공유하고 도움을 드릴 수 있도록 최선을
        다하겠습니다.
      </p>

      <!-- 버튼 구현 안함-->
      <div style="margin-bottom: 40px"></div>
      <!-- <div class="buttons">
        <button class="goToProduct-button" @click="goToProductList">
          <b>기업 분석 보고서</b> 구경하기
        </button>
        <button class="goToSurvey-button" @click="goToSurveyList">
          <b>리뷰</b> 작성하기
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"; // 라우터 사용을 위한 선언언
import { useSurveyStore } from "../../survey/stores/surveyStore";

const router = useRouter();
const surveyStore = useSurveyStore();

// 기업분석 리스트
const goToProductList = () => {
  router.push("/companyReport/list");
};

//질문지
const goToSurveyList = async () => {
  try {
    const randomString = await surveyStore.requestRandomStringToDjango(1); // surveyId를 적절히 교체
    if (randomString) {
      router.push({
        name: "SurveyReadPage",
        params: { randomString: randomString.toString() },
      });
    } else {
      alert("질문지가 아직 등록되지 않았습니다.");
    }
  } catch (error) {
    console.error("질문지 정보를 불러오는 중 에러가 발생했습니다:", error);
    alert(
      "질문지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
  }
};
</script>

<!--선언한 class들 모음-->
<style scoped>
.home-container {
  /* 브라우저 창의 전체화면 차지하게 함*/
  position: relative;
  /* 수정: 절대 위치 대신 상대적 위치 사용 */
  top: 0;
  left: 0; /*상단 왼쪽 위치*/
  width: 100vw; /*너비*/
  height: 100vh; /*높이*/
  display: flex; /*flexbox레이아웃 모델 사용*/
  justify-content: center; /*수평 중앙*/
  align-items: center; /*수직 중앙앙*/
  text-align: center; /*텍스트 수평 중앙앙*/
  overflow: hidden; /*콘텐츠가 영역을 벗어나면 안보이도록 설정정*/
  background: url("@/assets/images/fixed/home_bg6.png") no-repeat center center;
  /*배경이미지가 반복 되지 않도록 설정, 즉 남는 공간 발생 시 이미지가 다시 생성되는 것을 막음*/
  background-size: cover;
}

.text-container {
  width: 80vw;
  padding: 20px;
  color: #fff;
}

.typing-animation
/*메인화면 들어갈 떄 글씨가 타자치면서 나오는 연출을 의미*/ {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid white;
  animation: typing 2s steps(30), blink 0.5s step-end infinite alternate;
}

/*타이핑 모션*/
@keyframes typing {
  from {
    width: 0; /*여기서부터*/
  }

  to {
    width: 100%; /*여기까지*/
  }
}

/*깜빡이는 모션*/
/*커서 올리면 나오는 컨셉셉*/
@keyframes blink {
  from {
    border-color: transparent;
  }

  to {
    border-color: white;
  }
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

.buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.goToProduct-button {
  display: flex;
  width: 248px;
  height: 72px;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 16px;
  background: #fff;
  color: #fff;

  text-shadow: 2px 2px 3px rgb(136 0 136 / 50%);
  background: linear-gradient(
      15deg,
      #0044cc,
      #3d6fde,
      #3f47cc,
      #3d6fde,
      #fefefe84,
      #3d6fde,
      #3f47cc,
      #3d6fde,
      #0044cc
    )
    no-repeat;
  border: 1px solid #fff;
  background-size: 300%;
  background-position: left center;
  transition: background 0.3s ease;
}

.goToProduct-button:hover {
  background-size: 320%;
  background-position: right center;
}

.goToSurvey-button {
  display: flex;
  width: 248px;
  height: 72px;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 16px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.08);
}

.goToSurvey-button:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

/* From Uiverse.io by OMPRABHU8125 */
.loader {
  height: 10rem;
  width: 77vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
}

.react-star {
  position: relative;
  width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  animation: rotate 3s infinite;
}

.nucleus {
  position: absolute;

  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: linear-gradient(#0738e8, cyan);
  height: 2rem;
  width: 2rem;
  animation: rotate 1s linear infinite;
}

.electron {
  position: absolute;
  width: 15rem;
  height: 6rem;
  border-radius: 50%;
  border: 0.3rem solid rgb(105, 0, 255);
  animation: revolve 1s linear infinite;
}

.electron1::before,
.electron2::before,
.electron3::before {
  content: "";
  position: absolute;
  top: 60%;
  left: 100%;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  background-color: rgb(105, 0, 255);
  border-radius: 50%;
  animation: moveElectron 1s infinite;
}

.electron2 {
  transform: rotate(60deg);
  animation-delay: -0.66s;
}

.electron2::before {
  animation-delay: -0.66s;
}

.electron3 {
  transform: rotate(-60deg);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg) scale3d(1.1, 1.1, 0);
  }
}

@keyframes revolve {
  0% {
    border-color: rgb(105, 0, 255);
    border-right: transparent;
  }

  25% {
    border-color: #00ffff9c;
    border-bottom-color: transparent;
  }

  50% {
    border-color: rgb(105, 0, 255);
    border-left-color: transparent;
  }

  75% {
    border-color: #00ffff9c;
    border-top-color: transparent;
  }

  100% {
    border-color: rgb(105, 0, 255);
    border-right-color: transparent;
  }
}

@keyframes moveElectron {
  0% {
    top: 60%;
    left: 100%;
  }

  25% {
    top: 100%;
    left: 60%;
  }

  50% {
    top: 60%;
    left: 0%;
  }

  75% {
    top: 0%;
    left: 60%;
  }

  100% {
    top: 60%;
    left: 100%;
  }
}
</style>
