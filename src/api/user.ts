import { useFetch } from "@/lib/react-query";
import { apiRoutes } from "./routes";
import { createQueryKey } from "@/lib/react-query/utils";
import { IGetAchievementsResponse } from "@/interfaces/user";

/**
 * A custom hook to fetch achievements of a user.
 */
export const useAchievementsQuery = () =>
  useFetch<IGetAchievementsResponse>(
    createQueryKey(apiRoutes.user.achievements),
    {
      staleTime: 1000 * 60, // 1 min
    }
  );
