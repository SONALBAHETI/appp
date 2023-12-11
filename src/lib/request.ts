import { refreshTokens } from "@/lib/refreshAuth";

export class AuthenticationError extends Error {}

const request = async ({
  url,
  method = "GET",
  config = {},
  baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  useCredentials = true,
}: IFetcherOptions) => {
  console.log({
    method,
    headers: {
      "Content-Type": "application/json",
      ...(config.headers || {}),
    },
    credentials: useCredentials ? "include" : "omit",
    ...config,
  });
  return await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(config.headers || {}),
    },
    credentials: useCredentials ? "include" : "omit",
    ...config,
  });
};

export const fetcher = async ({
  useRefreshAuth = true,
  setAccessToken,
  ...options
}: IFetcherOptions) => {
  try {
    let response = await request(options);
    if (response.status === 401 && useRefreshAuth && setAccessToken) {
      // Unauthorized: refresh auth tokens
      const { response: refreshResponse, result } = await refreshTokens();
      if (refreshResponse.ok) {
        // Refresh successful
        const {
          tokens: {
            access: { token },
          },
        } = result;
        setAccessToken(token); // set new access token (should be used for future requests)
        // Retry original request
        response = await request(options);
      } else {
        // Refresh failed
        throw new AuthenticationError(
          "Failed to authenticate. Please sign in again."
        );
      }
    }
    const data = await response.json();
    return { response, result: data };
  } catch (error) {
    // TODO: Log error in logging system
    console.error(error);
    throw error;
  }
};
