import { useDelete, useFetch, usePost } from "@/lib/react-query";
import { apiRoutes } from "./routes";
import { createQueryKey, isEqualQueryKeys } from "@/lib/react-query/utils";
import {
  IGetAchievementsResponse,
  IGetRightsResponse,
  IGetVisibilityResponse,
} from "@/interfaces/user";
import {
  ICreateFavoriteUserRequest,
  ICreateFavoriteUserResponse,
  IFavoriteUser,
  IGetFavoriteUsersResponse,
  IGetSingleFavoriteUserResponse,
  IRemoveFavoriteUserResponse,
} from "@/interfaces/favoriteUser";

const getVisibilityQueryKey = () => createQueryKey(apiRoutes.user.visibility);
const getSingleFavoriteUserQueryKey = (id: string) =>
  createQueryKey(apiRoutes.user.favoriteUser(id));
const getFavoriteUsersQueryKey = () =>
  createQueryKey(apiRoutes.user.favoriteUsers);

/** Fetch single favorite user */
export const useSingleFavoriteUserQuery = (id: string) =>
  useFetch<IGetSingleFavoriteUserResponse>(getSingleFavoriteUserQueryKey(id), {
    staleTime: Infinity,
    enabled: !!id,
  });

/** Fetch favorite users */
export const useFavoriteUsersQuery = () =>
  useFetch<IGetFavoriteUsersResponse>(getFavoriteUsersQueryKey(), {
    staleTime: Infinity,
  });

/** Create a favorite user */
export const useCreateFavoriteUserMutation = (favoriteUserId?: string) => {
  const dependentQueryKeys = [getFavoriteUsersQueryKey()];
  if (favoriteUserId) {
    dependentQueryKeys.push(getSingleFavoriteUserQueryKey(favoriteUserId));
  }
  return usePost<ICreateFavoriteUserRequest, ICreateFavoriteUserResponse>({
    queryKey: getFavoriteUsersQueryKey(),
    dependentQueryKeys,
  });
};

/** Remove a user from favorites */
export const useRemoveFavoriteUserMutation = (favoriteUserId: string) =>
  useDelete<IRemoveFavoriteUserResponse>({
    queryKey: getSingleFavoriteUserQueryKey(favoriteUserId),
    dependentQueryKeys: [
      getFavoriteUsersQueryKey(),
      getSingleFavoriteUserQueryKey(favoriteUserId),
    ],
    optimisticUpdater: (queryKey, oldQueryData) => {
      if (isEqualQueryKeys(queryKey, getFavoriteUsersQueryKey())) {
        if (!oldQueryData) return oldQueryData;
        return {
          ...oldQueryData,
          favoriteUsers: oldQueryData.favoriteUsers.filter(
            (favUser: IFavoriteUser) => favUser.user !== favoriteUserId
          ),
        } as IGetFavoriteUsersResponse;
      } else if (
        isEqualQueryKeys(queryKey, getSingleFavoriteUserQueryKey(favoriteUserId))
      ) {
        return { favoriteUser: null } as IGetSingleFavoriteUserResponse;
      }
    },
  });

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
