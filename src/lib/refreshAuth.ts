import { fetcher } from "@/lib/request";

export const refreshTokens = async () => {
  try {
    return await fetcher({
      url: "/api/v1/auth/refresh-tokens",
      method: "POST",
      useCredentials: true,
      useRefreshAuth: false, // for preventing possible recursive loop, only attempt to refresh one time
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
