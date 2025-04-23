<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-h4 font-weight-bold mb-5">이용 요금 안내</h1>
      </v-col>

      <v-col cols="12" md="4" v-for="plan in pricePlans" :key="plan.id">
        <v-card class="pa-4" outlined>
          <v-card-title class="font-weight-bold text-h5">{{ plan.name }}</v-card-title>
          <v-card-subtitle class="text-h6 text--primary">
            {{ plan.price }}원 / {{ plan.period }}
          </v-card-subtitle>
          <v-card-text>
            <ul>
              <li v-for="(feature, index) in plan.features" :key="index">{{ feature }}</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="subscribe(plan.id)">구독하기</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { usePriceStore } from '@/price/stores/userPriceStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = usePriceStore()
const { pricePlans } = storeToRefs(store)

onMounted(() => {
  store.fetchPricePlans()
})

const subscribe = (planId) => {
  alert(`${planId}번 요금제를 선택하셨습니다.`)
}
</script>

<style scoped>
ul {
  padding-left: 20px;
}
li {
  margin-bottom: 5px;
}
</style>
