<template>
  <div id="Home_main">
    <section id="HomeMain">
      <HomeMain @scroll-to-home-second="goToHomeSecond" />
    </section>
    <section id="HomeSecond">
      <HomeSecond />
    </section>
    <section id="HomeThird">
      <HomeThird @scroll-to-home="goToUp" />
    </section>
    <section id="HomeFour">
      <HomeFour @scroll-to-home="goToUp" />
    </section>
    <section id="HomeFive">
      <HomeFive @scroll-to-home="goToUp" />
    </section>
    <section id="HomeSix">
      <HomeSix @scroll-to-home="goToUp" />
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HomeMain from "./components/HomeMain.vue";
import HomeSecond from "./components/HomeSecond.vue";
import HomeThird from "./components/HomeThird.vue";
import HomeFour from "./components/HomeFour.vue";
import HomeFive from "./components/HomeFive.vue";
import HomeSix from "./components/HomeSix.vue";

export default defineComponent({
  components: {
    HomeMain,
    HomeSecond,
    HomeThird,
    HomeFour,
    HomeFive,
    HomeSix
  },
  setup() {
    function goToHomeSecond(event) {
      if (event) event.preventDefault();

      const element = document.getElementById("HomeSecond");
      if (element) {
        const offset = 50;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        // requestAnimationFrame을 사용해 부드러운 스크롤 유도
        requestAnimationFrame(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        });
      }
    }

    function goToUp(event) {
      if (event) event.preventDefault();

      const element = document.getElementById("HomeMain");
      if (element) {
        const offset = 50;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        // requestAnimationFrame을 사용해 부드러운 스크롤 유도
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
</style>
