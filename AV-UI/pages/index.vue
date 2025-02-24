<template>
  <div id="Home_main">
    <section id="HomeMain">
      <HomeMain @scroll-to-home-second="goToHomeSecond" />
    </section>
    <section id="HomeSecond">
      <HomeSecond />
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HomeMain from "./components/HomeMain.vue";
import HomeSecond from "./components/HomeSecond.vue";

export default defineComponent({
  components: {
    HomeMain,
    HomeSecond,
  },
  setup() {
    function goToHomeSecond() {
      const element = document.getElementById("HomeSecond");
      if (element) {
        const offset = 50;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
    return {
      goToHomeSecond,
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
