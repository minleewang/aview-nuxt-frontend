<template>
  <v-app>
    <v-main>
      <HomePage />
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue"; // vue사용을 선언
import HomePage from "~/home/pages/HomePage.vue"; // HomePage에 루트연결

export default defineComponent({
  //컴포넌트 생성성
  name: "IndexPage",
  components: {
    HomePage,
  },
});
</script>
