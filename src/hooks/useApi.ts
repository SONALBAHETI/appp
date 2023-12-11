import { fetcher } from "@/lib/request";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";

interface UseApiOptions {
  url: string;
  method?: string;
  config?: any;
  withAuth?: boolean;
}

export const useApi = ({
  withAuth = true,
  ...options
}: UseApiOptions): [
  (config?: any) => Promise<{
    response: Response;
    result: any;
  }>,
  boolean
] => {
  const { setAccessToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const request = async (config?: any) => {
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
