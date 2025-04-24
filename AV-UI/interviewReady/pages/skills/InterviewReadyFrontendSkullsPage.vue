<template>
    <div>
        <h1>{{ role }}Frontend 기술 선택</h1>
        <v-checkbox-group v-model="selectedSkills">
            <v-checkbox v-for="tech in techMap[role]" :key="tech" :label="tech" :value="tech" />
        </v-checkbox-group>
        <v-btn @click="goToNext">다음</v-btn>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()

const role = route.query.role as string
const selectedSkills = ref<string[]>([])

const techMap: Record<string, string[]> = {
    Frontend: [
        // 현재 임의로 값을 지정한 상태입니다. 추후에 변경될 수 있습니다.
        'Vue.js',
        'React',
        'Svelte',
        'HTML',
        'CSS',
        'JavaScript',
        'AngularJS',
        'Next.js',
        'TypeScript',
        'Jquery',
        'EmberJs',
        'BackbonJs',
        'Foundation',
        'Semantic-UI'
    ]
}

function goToNext() {
    router.push('/experience')
}
</script>

<style scoped>
/* 기본 레이아웃 스타일 */
h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
}

/* 다크 모드 대응 */
:deep(.v-card), :deep(.v-checkbox), :deep(.v-btn) {
    transition: background-color 0.3s ease, color 0.3s ease;
}

:deep(.theme--dark .v-checkbox) {
    color: #fff;
}

/* 버튼 스타일 개선 */
:deep(.v-btn) {
    margin-top: 1.5rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    min-width: 150px;
}

:deep(.v-btn:hover) {
    filter: brightness(1.1);
}

/* 반응형 스타일 */
@media (max-width: 600px) {
    h1 {
        font-size: 1.3rem;
        padding: 0 1rem;
    }

    :deep(.v-btn) {
        width: 100%;
    }

    :deep(.v-checkbox) {
        font-size: 0.95rem;
    }
}
</style>