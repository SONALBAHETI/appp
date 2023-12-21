import { fetcher } from "@/lib/request";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";

interface IUseApiOptions {
  url: string;
  method?: string;
  config?: any;
  withAuth?: boolean;
}

interface IRequestParams {
  config?: any;
  args?: { [key: string]: any };
}

/**
 * Generates a request function that can be used to make API requests.
 *
 * @param {Object} options - An object containing options for the function.
 * @param {string} [options.url] - The URL of the API endpoint.
 * @param {string} [options.method] - The HTTP method to use. Default is "GET".
 * @param {Object} [options.config] - An object containing additional configuration options. Use this to set options like headers on the request.
 * @param {boolean} [options.withAuth] - Whether to use authentication or not. Default is true.
 * @return {Array} An array containing two elements:
 *   - A function that makes the API request.
 *   - A boolean indicating whether the function is currently loading.
 */
export const useApi = ({
  withAuth = true,
  ...options
}: IUseApiOptions): [
  (props?: IRequestParams) => Promise<{
    response: Response;
    result: any;
  }>,
  boolean
] => {
  const { setAccessToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const request = async (props?: IRequestParams) => {
    const { config, args } = props || {};
    if (args) {
      Object.keys(args).forEach((key) => {
        options.url = options.url.replace(`:${key}`, args[key]);
      });
    }
    try {
      setLoading(true);
      return await fetcher({
        ...options,
        config,
        useCredentials: withAuth === true,
        useRefreshAuth: withAuth === true,
        setAccessToken: withAuth === true ? setAccessToken : undefined,
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [request, loading];
};
