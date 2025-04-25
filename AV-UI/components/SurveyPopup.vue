<template>
  <div
    v-if="visible"
    class="popup-container"
    ref="popupRef"
    @mousedown="startDrag"
  >
    <v-card elevation="6" class="popup-card">
      <v-card-title class="text-subtitle-1">
        설문조사 안내
      </v-card-title>
      <v-card-text>
        안녕하세요! JOBSTICK 팀입니다.<br /><br />
        더 나은 서비스를 위해 여러분의 의견이 필요해요.<br /><br />
        짧은 설문이니 부담 없이 참여 부탁드립니다..! 😢<br /><br />
        (여러분의 소중한 피드백은 서비스 개선에 큰 힘이 됩니다.)
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text size="small" @click="visible = false">닫기</v-btn>
        <v-btn color="primary" size="small" @click="goToSurvey">참여</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const visible = ref(false);
const router = useRouter();

const popupRef = ref<HTMLElement | null>(null);
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

onMounted(() => {
  setTimeout(() => {
    visible.value = true;
  }, 1000);

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
});

const startDrag = (e: MouseEvent) => {
  if (popupRef.value) {
    isDragging = true;
    offsetX = e.clientX - popupRef.value.offsetLeft;
    offsetY = e.clientY - popupRef.value.offsetTop;
  }
};

const onDrag = (e: MouseEvent) => {
  if (isDragging && popupRef.value) {
    popupRef.value.style.left = `${e.clientX - offsetX}px`;
    popupRef.value.style.top = `${e.clientY - offsetY}px`;
  }
};

const stopDrag = () => {
  isDragging = false;
};

const goToSurvey = () => {
  visible.value = false;
  router.push("/survey");
};
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  z-index: 9999;
  cursor: move; /* 커서 모양 바꿔서 드래그 느낌 줌 */
}

.popup-card {
  width: 280px;
  background-color: #e3f2fd; /* 연한 파란색 */
  color: #0d47a1;            /* 텍스트 파랑 */
  user-select: none;         /* 드래그 시 텍스트 선택 방지 */
}
</style>
