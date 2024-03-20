import { apiRoutes } from "./routes";
import {
  IGetUnreadNotificationsCountResponse,
  INotification,
} from "@/interfaces/notification";

import { useFetch } from "@/lib/react-query";
import { useLoadMore } from "@/lib/react-query/useLoadMore";
import { createQueryKey } from "@/lib/react-query/utils";
import { QueryClient } from "@tanstack/react-query";

export const getNotificationsQueryKey = () =>
  createQueryKey(apiRoutes.notifications.base, { limit: 15 });
export const getUnreadNotificationsCountQueryKey = () =>
  createQueryKey(apiRoutes.notifications.unreadCount);

/**
 * Custom hook for getting notifications.
 * @returns The query result.
 */
export const useNotificationsQuery = () =>
  useLoadMore<INotification>(getNotificationsQueryKey(), {
    staleTime: 5 * 1000, // 5 seconds
  });

/**
 * Custom hook for getting unread notifications count.
 * @returns The query result.
 */
export const useUnreadNotificationsCountQuery = () =>
  useFetch<IGetUnreadNotificationsCountResponse>(
    getUnreadNotificationsCountQueryKey(),
    {
      refetchInterval: 60 * 1000, // every 60 seconds check for unread notifications
    }
  );

/**
 * Invalidates the notifications count query for refetch.
 */
export const invalidateNotificationsCountQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: getUnreadNotificationsCountQueryKey(),
  });
};
