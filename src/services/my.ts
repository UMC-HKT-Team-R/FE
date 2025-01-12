import { api } from "./api";

export interface MypageResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: number;
    nickname: string;
    email: string;
    categories: number;
  };
}

export const getMypageData = async (): Promise<MypageResponse> => {
  const response = await api.get<MypageResponse>("/mypage");
  return response.data;
};

export const getMonthlySnackData = async () => {
  return await api.get("/api/calendar/count");
};
