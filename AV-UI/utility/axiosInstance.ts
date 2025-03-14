// 서버에 요청을 보내는 도메인
import axios, { type AxiosInstance } from "axios";
import { useRuntimeConfig } from "nuxt/app";
export let djangoAxiosInstance: AxiosInstance | null = null;
export let fastapiAxiosInst: AxiosInstance | null = null;

export function createAxiosInstances() {
  const config = useRuntimeConfig();

  const mainApiUrl: string = config.public.MAIN_API_URL as string;
  const aiBaseUrl: string = config.public.AI_BASE_URL as string;

  console.log("MAIN_API_URL:", mainApiUrl); // 👉 mainApiUrl 값 확인
  console.log("AI_BASE_URL:", aiBaseUrl);

  if (!djangoAxiosInstance) {
    djangoAxiosInstance = axios.create({
      baseURL: mainApiUrl,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  console.log(
    "🔹 Django Axios Base URL:",
    djangoAxiosInstance.defaults.baseURL
  );

  if (!fastapiAxiosInst) {
    fastapiAxiosInst = axios.create({
      baseURL: aiBaseUrl,
      timeout: 10000,
    });
  }

  return { djangoAxiosInstance, fastapiAxiosInst };
}
