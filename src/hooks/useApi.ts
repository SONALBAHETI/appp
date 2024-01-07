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
  const { auth, setAccessToken } = useAuth(); // Destructure auth and setAccessToken from useAuth
  const [loading, setLoading] = useState<boolean>(false);

  const request = async (config?: any) => {
    try {
      setLoading(true);
      console.log("Sending request to:", options.url); // Log the URL
      console.log("With access token:", auth?.accessToken); // Log the
      
      const response = await fetcher({
        ...options,
        config,
        useCredentials: withAuth === true,
        useRefreshAuth: withAuth === true,
        setAccessToken: withAuth === true ? setAccessToken : undefined,
      });
  
      return response;
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("API request error:", error); // Log the error
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [request, loading];
};