import { apiRoutes } from "./routes";
import { IGetNotificationsResponse } from "@/interfaces/notification";

import { useFetch } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";

export const getGetNotificationsQueryKey = () =>
  createQueryKey(apiRoutes.notifications.base);

/**
 * Custom hook for getting notifications.
 * @returns The query result.
 */
export const useNotificationsQuery = () =>
  useFetch<IGetNotificationsResponse>(getGetNotificationsQueryKey());
