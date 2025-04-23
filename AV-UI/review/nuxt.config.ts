import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  router: {
    options: {
      strict: true,
    },
  },
  runtimeConfig: {
    public: {
      apiBase: '/av_db', // ✔️ 이제 기본 API 경로는 /av_db
    },
  },
  nitro: {
    devProxy: {
      '/av_db': {
        target: 'http://localhost:8000', // ✔️ Django 서버가 열려 있는 주소
        changeOrigin: true,
      },
    },
  },
});
