import { apiRoutes } from "@/api/routes";
import { fetcher } from "@/lib/request";

export const refreshTokens = async () => {
  try {
    return await fetcher({
      url: apiRoutes.auth.refreshTokens,
      method: "POST",
      useCredentials: true,
      useRefreshAuth: false, // for preventing possible recursive loop, only attempt to refresh one time
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
