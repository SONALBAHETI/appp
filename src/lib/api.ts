import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${baseURL}/api/v1/auth/refresh-tokens`,
          null,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          // Retry the original request with the new access token
          return axios(originalRequest);
        }
      } catch (error) {
        // Handle error if API request fails
        console.log(error);
        throw error;
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, params?: object) =>
    axiosInstance.get<T>(url, {
      ...params,
      withCredentials: true,
    }),
  post: <T>(url: string, data?: any) =>
    axiosInstance.post<T>(url, data, {
      withCredentials: true,
    }),
  patch: <T>(url: string, data: any) =>
    axiosInstance.patch<T>(url, data, {
      withCredentials: true,
    }),
  delete: <T>(url: string) =>
    axiosInstance.delete<T>(url, {
      withCredentials: true,
    }),
};