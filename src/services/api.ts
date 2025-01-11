import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("리프레시 토큰이 없습니다.");
        }

        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}refresh`,
          { refresh_token: refreshToken }
        );
        console.log("리프레시 토큰 요청 성공:");

        const newAccessToken = refreshResponse.data.result.accessToken;
        const newRefreshToken = refreshResponse.data.result.refreshToken;


        localStorage.setItem("accessToken", newAccessToken);
        localStorage.removeItem("refreshToken");
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("리프레시 토큰 갱신 실패:", refreshError);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/"; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
