import * as axiosUtility from "../../utility/axiosInstance";
import { AxiosResponse } from "axios";
import { useAiInterviewStore } from "./aiInterviewStore";

export const aiInterviewActions = {
  async requestCreateInterviewToDjango(
    sessionId: number
  ): Promise<AxiosResponse> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/create",
        { sessionId }
      );
      return res.data;
    } catch (err) {
      console.error("requestCreateInterviewToDjango() -> error:", err);
      throw err;
    }
  },

  async requestListInterviewToDjango(
    interviewText: string
  ): Promise<AxiosResponse> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/list",
        { interviewText }
      );
      return res.data;
    } catch (err) {
      console.error("requestListInterviewToDjango() -> error:", err);
      throw err;
    }
  },

  async requestSaveInterviewResultToDjango(payload: {
    scoreResultList: [];
    accountId: string;
  }): Promise<string> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();
    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview_result/save-interview-result",
        payload
      );
      return res.data;
    } catch (error) {
      console.log("requestSaveInterviewResultToDjango() 중 문제 발생:", error);
      throw error;
    }
  },

  async requestGetScoreResultListToDjango(payload: {
    accountId: string;
  }): Promise<string> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();
    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview_result/get-interview-result",
        payload
      );
      return res.data.interviewResultList;
    } catch (error) {
      console.log("requestGetScoreResultListToDjango() 중 문제 발생:", error);
      throw error;
    }
  },

  // ✅ FastAPI 관련 함수들은 그대로 유지해도 문제 없음
  async requestInferNextQuestionToFastAPI(payload: {
    answer: string;
    nextIntent: string;
  }): Promise<string> {
    const { fastapiAxiosInst } = axiosUtility.createAxiosInstances();
    const { answer, nextIntent } = payload;
    try {
      const command = 7;
      const response = await fastapiAxiosInst.post("/request-ai-command", {
        command,
        data: [answer, nextIntent],
      });
      return response.data;
    } catch (error) {
      console.log("requestInferToFastAPI() 중 문제 발생:", error);
      throw error;
    }
  },

  async requestInferScoreResultToFastAPI(payload: {
    interviewResult: any[];
  }): Promise<string> {
    const { fastapiAxiosInst } = axiosUtility.createAxiosInstances();
    const interviewResult = payload.interviewResult;
    try {
      const command = 8;
      const response = await fastapiAxiosInst.post("/request-ai-command", {
        command,
        data: interviewResult,
      });
      return response.data;
    } catch (error) {
      console.log("requestInferScoreResultToFastAPI() 중 문제 발생:", error);
      throw error;
    }
  },

  async requestInferedResultToFastAPI(): Promise<string> {
    const { fastapiAxiosInst } = axiosUtility.createAxiosInstances();
    try {
      let response: AxiosResponse<any>;
      const maxAttempts = 500;
      const delay = 10000;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        response = await fastapiAxiosInst.get("/polyglot-result");
        if (response.data?.nextQuestion || response.data?.resultList) {
          return response.data;
        }
        console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      throw new Error("결과를 가져오는 데 실패했습니다.");
    } catch (error) {
      console.log("requestInferedResultToFastAPI() 중 문제 발생:", error);
      throw error;
    }
  },
};