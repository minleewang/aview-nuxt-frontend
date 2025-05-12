import { defineStore } from 'pinia'
import { ref } from 'vue'

interface PricePlan {
  id: number
  name: string
  price: string
  originalPrice?: string
  period: string
  features: string[]
}

export const usePriceStore = defineStore('price', () => {
  const pricePlans = ref<PricePlan[]>([])

  const fetchPricePlans = () => {
    pricePlans.value = [
      {
        id: 1,
        name: '하루 요금제',
        price: '4,000',
        period: '1일',
        features: ['기본 면접 질문 제공', 'AI 모의 면접 1일 무제한', '채용 정보 제공'],
      },
      {
        id: 2,
        name: '일주일 요금제',
        price: '20,000',
        originalPrice: '28,000',
        period: '1주',
        features: ['기본 면접 질문 제공', 'AI 모의 면접 1주 무제한', '채용 정보 제공'],
      },
      {
        id: 3,
        name: '한달 요금제',
        price: '60,000',
        originalPrice: '80,000',
        period: '1달',
        features: ['기본 면접 질문 제공', 'AI 모의 면접 1달 무제한', '채용 정보 제공'],
      },
    ]
  }

  return {
    pricePlans,
    fetchPricePlans,
  }
})
