import { defineStore } from 'pinia'
import { reviewActions } from './reviewActions'
import { reviewState } from './reviewState'

export const useReviewStore = defineStore('review', {
  state: () => reviewState(), // ✅ () 호출 필수!
  actions: reviewActions
})