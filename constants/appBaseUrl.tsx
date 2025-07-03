import { ACCESS_TOKEN_KEY, BASE_URL, REFRESH_TOKEN_KEY } from "@/constants/index";
import { logout, refreshTokens } from "@/utils/api/auth";
import { getTokenFromStorage, setTokenInStorage } from "@/utils/api/auth/tokens/tokenStorage";
import axios, { AxiosRequestConfig } from "axios";
import { router } from "expo-router";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Bearer token to requests
api.interceptors.request.use(
  async (config: AxiosRequestConfig) => { 
    try {
      const token = await getTokenFromStorage(ACCESS_TOKEN_KEY);
      console.log('token', token);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`; // Correct template literal syntax
      }
      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);  // Propagate the error
    }
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (
      error.response?.status === 401 &&
      error.response?.data?.expired &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const data = await refreshTokens();
        if (!data.accessToken) throw new Error("No access token after refresh");

        setTokenInStorage(ACCESS_TOKEN_KEY, data.accessToken)
        setTokenInStorage(REFRESH_TOKEN_KEY, data.refreshToken)

        // Fix: Remove 'Bearer ' prefix if your backend expects raw token
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
      } catch (refreshError: any) {
        if (refreshError.response?.status === 401) {
          await logout();
          router.replace("/(auth)/login");
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);


export default api;
