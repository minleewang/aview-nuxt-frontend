import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePriceStore = defineStore('price', () => {
  const pricePlans = ref([])

  const fetchPricePlans = () => {
    pricePlans.value = [
      {
        id: 1,
        name: '무료 요금제',
        price: '0',
        period: '월',
        features: ['기본 면접 질문 제공', 'AI 모의 면접 3회'],
      },
      {
        id: 2,
        name: '프리미엄 요금제',
        price: '9,900',
        period: '월',
        features: ['무제한 AI 모의 면접', '기업 맞춤형 질문', '피드백 리포트'],
      },
      {
        id: 3,
        name: '기업 요금제',
        price: '99,000',
        period: '월',
        features: ['다수 계정 관리', '면접 질문 커스터마이징', '지원자 분석 리포트'],
      },
    ]
  }

  return {
    pricePlans,
    fetchPricePlans,
  }
})
