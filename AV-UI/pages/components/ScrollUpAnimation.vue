<template>
  <a class="scroll" href="#">Go Top</a>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScrollUpAnimation",
});
</script>

<style scoped>
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.scroll {
  position: relative;
  display: block;
  font-size: 1.5vh;
  color: rgba(255, 255, 255, 1);
  text-decoration: none;
  padding: 1vh 1vh 1vh 4vh;
}

.scroll::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 20%;
  width: 0;
  height: 0;
  border-left: 1vh solid transparent;
  border-right: 1vh solid transparent;
  border-bottom: 1.5vh solid white;
  transform: translate(-50%, -50%);
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-0.5vh);
  }
}

@media (max-width: 768px) {
  .scroll {
    width: 6vh;
    height: 6vh;
  }

  .scroll::before {
    border-left: 1.2vh solid transparent;
    border-right: 1.2vh solid transparent;
    border-bottom: 1.8vh solid white;
  }
}

@media (max-width: 480px) {
  .scroll {
    width: 7vh;
    height: 7vh;
  }

  .scroll::before {
    border-left: 1.4vh solid transparent;
    border-right: 1.4vh solid transparent;
    border-bottom: 2vh solid white;
  }
}
</style>
