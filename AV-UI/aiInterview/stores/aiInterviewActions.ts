import * as axiosUtility from "../../utility/axiosInstance";
import axios, { AxiosResponse } from "axios";
import { useAiInterviewStore } from "./aiInterviewStore";

export const aiInterviewActions = {
  async requestCreateInterviewToDjango(payload: {
    userToken: string;
    jobCategory: number;        // 직무
    experienceLevel: number;    // 경력
    projectExperience: number;  // 프로젝트 경험 여부
    academicBackground: number; // 전공 여부
    interviewTechStack: number[]; // 기술
    //interviewId: number;

  }): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/create", payload
      );
      return res.data;
    } catch (err) {
      console.error("requestCreateInterviewToDjango() -> error:", err);
      throw err;
    }
  },

  async requestListInterviewToDjango(
    userToken: string,
    page: number = 1,
    perPage: number = 10
  ): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/list",
        { userToken, page, perPage }
      );
      return res.data;
    } catch (err) {
      console.error("requestListInterviewToDjango() → error:", err);
      throw err;
    }
  },

  async requestRemoveInterviewToDjango(payload: {
    userToken: string,
    interviewId: number
  }): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/remove",
        {
          payload
        }
      );
      return res.data;
    } catch (error) {
      console.error("requestRemoveInterviewToDjango() → error:", error);
      throw error;
    }
  },

  async requestCreateAnswerToDjango(payload: {
    userToken: string;
    interviewId: number;
    questionId: number;
    answerText: string;
  }): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();
  
    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/user-answer",  // ✅ 이걸로 고쳐야 정상 작동
        payload
      );
  
      return res.data;
    } catch (err) {
      console.error("답변 저장 중 오류:", err);
      throw err;
    }
  },

  async requestFollowUpQuestionToDjango(payload: {
    userToken: string;
    interviewId: number;
    questionId: number;
    answerText: string;
    jobCategory: number;
    experienceLevel: number;
    academicBackground: number;

  }): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();
  
    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/followup", // 백엔드 Django가 저장하고 FastAPI 호출
        payload
      );
      return res.data;
    } catch (error) {
      console.error("requestFollowUpQuestionToDjango() → error:", error);
      throw error;
    }
  },  
  
  async requestGetScoreResultListToDjango(payload: {
    accountId: string;
  }): Promise<string> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();
    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/get-interview-result",
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