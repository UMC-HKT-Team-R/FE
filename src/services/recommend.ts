import { api } from "./api";

export const getRecommend = async () => {
  return await api.get(`/api/recommend`);
};
