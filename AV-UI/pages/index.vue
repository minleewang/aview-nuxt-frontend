<template>
  <div id="Home_main">
    <section id="HomeMain">
      <HomeMain @scroll-to-home-second="goToHomeSecond" />
    </section>
    <section id="HomeSecond">
      <HomeSecond />
    </section>
    <section id="HomeThird">
      <HomeThird />
    </section>
    <section id="HomeFour">
      <HomeFour />
    </section>
    <section id="HomeFive">
      <HomeFive />
    </section>
    <section id="HomeSix">
      <!-- 🟡 GO TOP 화살표 버튼도 포함된 섹션 -->
      <HomeSix @scroll-to-home="goToUp" />
    </section>

    <!-- ✅ 푸터 위로 고정된 GO TOP 화살표 버튼 -->
    <button class="go-top-btn" @click="goToUp">▲</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HomeMain from "@/components/HomeMain.vue";
import HomeSecond from "@/components/HomeSecond.vue";
import HomeThird from "@/components/HomeThird.vue";
import HomeFour from "@/components/HomeFour.vue";
import HomeFive from "@/components/HomeFive.vue";
import HomeSix from "@/components/HomeSix.vue";

export default defineComponent({
  components: {
    HomeMain,
    HomeSecond,
    HomeThird,
    HomeFour,
    HomeFive,
    HomeSix,
  },
  setup() {
    function goToHomeSecond() {
      if (event) event.preventDefault();

      const element = document.getElementById("HomeSecond");
      if (element) {
        const offset = 50;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        requestAnimationFrame(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        });
      }
    }

    function goToUp() {
      if (event) event.preventDefault();

      const element = document.getElementById("HomeMain");
      if (element) {
        const offset = 50;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        requestAnimationFrame(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        });
      }
    }

    return {
      goToHomeSecond,
      goToUp,
    };
  },
});
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ✅ 푸터 위에 고정되는 GO TOP 화살표 버튼 */
.go-top-btn {
  position: fixed;
  bottom: 100px; /* ✅ 푸터와 겹치지 않게 여유를 둠 */
  right: 20px;
  font-size: 24px;
  background-color: transparent;
  border: none;
  color: #444;
  cursor: pointer;
  z-index: 1000;
  opacity: 0.8;
  transition: all 0.2s ease;
}

.go-top-btn:hover {
  transform: scale(1.2);
  color: #000;
  opacity: 1;
}
</style>
