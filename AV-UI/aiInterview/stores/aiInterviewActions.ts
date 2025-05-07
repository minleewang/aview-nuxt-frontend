import * as axiosUtility from "../../utility/axiosInstance";
import axios, { AxiosResponse } from "axios";
import { useAiInterviewStore } from "./aiInterviewStore";

export const aiInterviewActions = {
  //첫 질문
  async requestCreateInterviewToDjango(payload: {
    userToken: string;
    jobCategory: number; // 직무
    experienceLevel: number; // 경력
    projectExperience: number; // 프로젝트 경험 여부
    academicBackground: number; // 전공 여부
    interviewTechStack: number[]; // 기술
    interviewId: number;
  }): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/create",
        payload
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
    userToken: string;
    interviewId: number;
  }): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/remove",
        {
          payload,
        }
      );
      return res.data;
    } catch (error) {
      console.error("requestRemoveInterviewToDjango() → error:", error);
      throw error;
    }
  },
  //응답 생성
  async requestCreateAnswerToDjango(payload: {
    userToken: string;
    interviewId: number;
    questionId: number;
    answerText: string;
  }): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/user-answer", // ✅ 이걸로 고쳐야 정상 작동
        payload
      );

      return res.data;
    } catch (err) {
      console.error("답변 저장 중 오류:", err);
      throw err;
    }
  },
  //첫 질문에 대한 심화질문
  async requestFollowUpQuestionToDjango(payload: {
    jobCategory: number;
    experienceLevel: number;
    academicBackground: number;
    userToken: string;
    interviewId: number;
    questionId: number;
    answerText: string;
  }): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      console.log(payload);
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

  // 두번째 질문
  async requestProjectCreateInterviewToDjango(payload: {
    userToken: string;
    jobCategory: number; // 직무
    experienceLevel: number; // 경력
    projectExperience: number; // 프로젝트 경험 여부
    academicBackground: number; // 전공 여부
    interviewTechStack: number[]; // 기술
    interviewId: number;
    questionId: number;
  }): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/project-create",
        payload
      );
      console.log(res.data.question);
      return res.data;
    } catch (err) {
      console.error("requestProjectCreateInterviewToDjango() -> error:", err);
      throw err;
    }
  },

  // 두번째 심화질문
  async requestProjectFollowUpQuestionToDjango(payload: {
    jobCategory: number;
    projectExperience: number;
    experienceLevel: number;
    interviewTechStack: number[]; // 기술
    userToken: string;
    interviewId: number;
    questionId: number;
    answerText: string;
  }): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      console.log(payload);
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview/project-followup", // 백엔드 Django가 저장하고 FastAPI 호출
        payload
      );
      return res.data;
    } catch (error) {
      console.error("requestFollowUpQuestionToDjango() → error:", error);
      throw error;
    }
  },

  async requestGetScoreResultListToDjango(payload: {
    userToken: string;
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
  //인터뷰 결과 저장
  async requestSaveInterviewResultToDjango(payload: {
    userToken: string;
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
  //면접 종료
  async requestEndInterviewToDjango(payload: {
    userToken: string;
    questionId: number;
    answerText: string;
    jobCategory: number; // 직무
    experienceLevel: number; // 경력
    projectExperience: number; // 프로젝트 경험 여부
    academicBackground: number; // 전공 여부
    interviewTechStack: number[]; // 기술
    interviewId: number;
  }): Promise<string> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();
    try {
      const res: AxiosResponse = await djangoAxiosInstance.post(
        "/interview_result/end-interview",
        payload
      );
      return res.data;
    } catch (error) {
      console.log("requestSaveInterviewResultToDjango() 중 문제 발생:", error);
      throw error;
    }
  },

  // ✅ FastAPI 관련 함수들은 그대로 유지해도 문제 없음
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
