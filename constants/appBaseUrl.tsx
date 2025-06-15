import { ACCESS_TOKEN_KEY, BASE_URL } from "@/constants/index";
import { logout, refreshTokens } from "@/utils/api/auth";
import { getTokenFromStorage } from "@/utils/api/auth/tokens/tokenStorage";
import axios from "axios";
import { router } from "expo-router";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach access token to headers
api.interceptors.request.use(
  async (config) => {
    const accessToken = await getTokenFromStorage(ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await refreshTokens();
        // Update original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken.replace(
          "Bearer ",
          ""
        )}`;
        return api(originalRequest);
      } catch (refreshError: any) {
        // Logout if refresh token returns 401
        if (refreshError.response?.status === 401) {
          await logout();
          router.replace("/(auth)/login");
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
