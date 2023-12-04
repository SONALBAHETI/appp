type fetcherOptions = {
  options?: any;
  baseUrl?: string;
  useCredentials?: boolean;
};

export const fetcher = async (
  url: string,
  method = "GET",
  {
    options = {},
    baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL,
    useCredentials = true,
  }: fetcherOptions = {}
) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: useCredentials ? "include" : "omit",
      ...options,
    });
    const data = await response.json();
    return { response, result: data };
  } catch (error) {
    // TODO: Log error in logging system
    console.error(error);
    throw error;
  }
};
