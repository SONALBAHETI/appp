import { useFetch, usePost } from "@/lib/react-query";
import { apiRoutes } from "./routes";
import { createQueryKey, isEqualQueryKeys } from "@/lib/react-query/utils";
import {
  IGetAchievementsResponse,
  IGetRightsResponse,
  IGetVisibilityResponse,
} from "@/interfaces/user";

const getVisibilityQueryKey = () => createQueryKey(apiRoutes.user.visibility);

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

/**
 * A custom hook to fetch visibility of a user.
 * @returns The query result of IGetVisibilityResponse.
 */
export const useVisibilityQuery = () =>
  useFetch<IGetVisibilityResponse>(getVisibilityQueryKey(), {
    staleTime: 1000 * 60, // 1 min
  });

/**
 * A custom hook to fetch rights of a user.
 * @returns The query result of type {@link IGetRightsResponse}.
 */
export const useRightsQuery = () =>
  useFetch<IGetRightsResponse>(createQueryKey(apiRoutes.user.rights), {
    staleTime: Infinity,
  });

/**
 * A custom hook to mutate the visibility of a user.
 * @returns The mutation result of IGetVisibilityResponse.
 */
export const useVisibilityMutation = () =>
  usePost<{ online: boolean }, IGetVisibilityResponse>({
    queryKey: getVisibilityQueryKey(),
    dependentQueryKeys: [getVisibilityQueryKey()],
    optimisticUpdater: (queryKey, oldQueryData, mutatedData) => {
      if (isEqualQueryKeys(queryKey, getVisibilityQueryKey())) {
        return {
          ...oldQueryData,
          online: mutatedData.online,
        } as IGetVisibilityResponse;
      }
    },
  });
