import { IGetUserMatchResponse } from "@/interfaces/userMatch";
import { useFetch } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";

// get query key for useUserMatchQuery
export const getUserMatchQueryKey = (id: string) =>
  createQueryKey(apiRoutes.userMatch.getUserMatch(id));

// custom hook for querying user match
export const useUserMatchQuery = (id: string) => {
  return useFetch<IGetUserMatchResponse>(getUserMatchQueryKey(id), {
    staleTime: Infinity,
  });
};
