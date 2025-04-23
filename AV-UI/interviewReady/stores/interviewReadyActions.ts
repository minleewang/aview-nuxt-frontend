import * as axiosUtility from "../../utility/axiosInstance";
import { AxiosResponse } from "axios";
import { useInterviewReadyStore } from "./interviewReadyStore";


export const interviewReadyAction = {
    async requestInterviewReadyIdToDjango(userToken: string): Promise<any> {
        const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();
        try {
            const res: AxiosResponse = await djangoAxiosInstance.post(
                "/", // backend에서 interviewReady에 대한 모델 호출
                { userToken }
            );
            return res.data.interviewReadyId;
        } catch (error) {
            console.error("requestInterviewReadyIdToDjango() axios 오류!", error);
        }
    },
}