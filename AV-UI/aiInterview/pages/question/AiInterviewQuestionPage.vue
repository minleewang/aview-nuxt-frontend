<template>
  <div class="container">
    <v-card class="pa-6 custom-card" elevation="10">
      <!-- 스크롤 가능한 영역 -->
      <div class="card-scrollable">
        <v-card-title class="text-h6 card-title">
          원하는 기술을 모두 선택해주세요
        </v-card-title>
        <v-card-text class="card-container">
          <v-checkbox v-model="answers" label="Frontend" value="frontend" />
          <v-checkbox v-model="answers" label="Backend" value="backend" />
          <v-checkbox v-model="answers" label="App" value="app" />
          <v-checkbox v-model="answers" label="Web" value="web" />
          <v-checkbox v-model="answers" label="AI" value="ai" />
          <v-checkbox v-model="answers" label="Embeddeed" value="embeddeed" />
          <v-checkbox v-model="answers" label="DevOps" value="devops" />
        </v-card-text>

        <v-card-title class="text-h6">경력을 선택해주세요</v-card-title>
        <v-card-text class="radio-container">
          <v-radio-group v-model="career">
            <div class="radio-inline">
              <v-radio label="신입" value="new" />
              <v-radio label="1년" value="first" />
              <v-radio label="2년" value="second" />
              <v-radio label="3년" value="third" />
              <v-radio label="4년 이상" value="other" />
            </div>
          </v-radio-group>
        </v-card-text>
      </div>

      <!-- 고정된 제출 버튼 -->
      <v-card-actions class="justify-end">
        <v-btn color="primary" @click="submit">제출</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.custom-card {
  max-height: 500px;
  display: flex;
  flex-direction: column;
}

.card-scrollable {
  overflow-y: auto;
  flex: 1;
}
</style>


<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";

const answers = ref([]);
const career = ref();
const router = useRouter();
const isSubmitting = ref(false);

//사용자가 값 입력했는지 여부 확인
const hasUnsavedData = () => {
  return answers.value.length > 0 || career.value !== undefined;
};

//새로고침 또는 탭 닫기 시
const handleBeforeUnload = (e) => {
  if (hasUnsavedData()) {
    e.preventDefault();
    e.returnValue = ""; // 일부 브라우저에서 필수
  }
};

//라우터 이동 감지
onBeforeRouteLeave((to, from, next) => {
  if (isSubmitting.value) {
    return next();
  }
  if (hasUnsavedData()) {
    const confirmed = window.confirm(
      "이 페이지를 벗어나면 입력한 내용이 사라집니다. 계속하시겠습니까?"
    );
    if (!confirmed) {
      return next(false); // 이동 막기
    }
  }
  next(); // 이동 허용
});

//등록 및 해제
onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
});
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const submit = () => {
  if (answers.value.length == 0 || !career.value) {
    alert("기술과 경력을 모두 선택하세요");
    return;
  }
  console.log("선택한 기술:", answers.value);
  console.log("선택한 경력:", career.value);
  alert(
    `선택한 기술: ${answers.value.join(", ")}\n 선택한 경력: ${career.value}`
  );
  isSubmitting.value = true;
  sessionStorage.setItem("startInterview", "true");
  router.push({ path: "/ai-interview", state: { start: "true" } });
};
</script>

<style scoped>
.container {
  max-width: 100vw;
  height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: rgb(122, 126, 146);
}

.card-title {
  margin-bottom: 30px; /* 원하는 만큼 조절 가능, 예: 16px, 32px 등 */
}

.custom-card {
  width: 80vw;
  height: 80vh;
  max-width: none;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 40px;
}

.radio-container {
  padding: 40px;
  font-size: 20px;
  width: 100%;
}

.radio-inline {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 20px;
  overflow-x: auto;
  width: 100%;
}

.radio-inline :deep(.v-label) {
  flex: 1 1 auto;
  min-width: 100px;
  max-width: 200px;
  white-space: nowrap;
}
</style>
