import { api } from "./api";

export const getLogin = async (code: string) => {
  const response = await api.get(`/login?code=${code}`);
  return response;
};
