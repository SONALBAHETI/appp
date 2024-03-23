import { useDelete, useFetch, usePatch, usePost } from "@/lib/react-query";
import { IQuickReply } from "@/interfaces/quickReply";
import { createQueryKey, isEqualQueryKeys } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { QuickReplySchema } from "@/validation/settingsValidations/quickReply.validation";
import {
  IGetNotificationSettingsResponse,
  INotificationMode,
  INotificationType,
} from "@/interfaces/notificationSettings";

const getQuickRepliesQueryKey = () =>
  createQueryKey(apiRoutes.settings.account.quickReplies);
const getSingleQueryReplyQueryKey = (id: string) =>
  createQueryKey(apiRoutes.settings.account.quickReply(id));
const getNotificationsQueryKey = () =>
  createQueryKey(apiRoutes.settings.account.notifications);
const getVerifyGoogleCalendarSyncQueryKey = () =>
  createQueryKey(apiRoutes.settings.account.verifyGoogleCalendarSync);

/**
 * Custom hook for getting quick replies.
 * @returns The query result.
 */
export const useQuickRepliesQuery = () =>
  useFetch<{ quickReplies: IQuickReply[] }>(getQuickRepliesQueryKey(), {
    staleTime: Infinity,
  });

/**
 * Custom hook to fetch a single quick reply.
 * @param id - The ID of the quick reply to fetch.
 * @returns The query result.
 */
export const useSingleQuickReplyQuery = (id: string) =>
  useFetch<{ quickReply: IQuickReply }>(getSingleQueryReplyQueryKey(id), {
    staleTime: Infinity,
    enabled: !!id,
  });

/**
 * Mutation hook for creating a quick reply.
 * @returns The mutation result.
 */
export const useCreateQuickReplyMutation = () =>
  usePost<QuickReplySchema, { quickReply: IQuickReply }>({
    queryKey: getQuickRepliesQueryKey(),
    dependentQueryKeys: [getQuickRepliesQueryKey()],
    optimisticUpdater: (queryKey, oldQueryData, mutatedData) => {
      if (isEqualQueryKeys(queryKey, getQuickRepliesQueryKey())) {
        return {
          ...oldQueryData,
          quickReplies: [
            ...oldQueryData.quickReplies,
            { id: "temp", ...mutatedData },
          ],
        } as { quickReplies: IQuickReply[] };
      }
    },
  });

/**
 * Mutation hook for updating a quick reply.
 * @param id - The ID of the quick reply to update.
 * @returns The mutation result.
 */
export const useUpdateQuickReplyMutation = (id: string) =>
  usePatch<QuickReplySchema, { quickReply: IQuickReply }>({
    queryKey: getSingleQueryReplyQueryKey(id),
    dependentQueryKeys: [getQuickRepliesQueryKey()],
    optimisticUpdater: (queryKey, oldQueryData, mutatedData) => {
      if (isEqualQueryKeys(queryKey, getQuickRepliesQueryKey())) {
        return {
          ...oldQueryData,
          quickReplies: oldQueryData.quickReplies.map(
            (quickReply: IQuickReply) =>
              quickReply.id === id
                ? { ...quickReply, ...mutatedData }
                : quickReply
          ),
        } as { quickReplies: IQuickReply[] };
      }
    },
  });

/**
 * Mutation hook for deleting a quick reply.
 * @param id - The ID of the quick reply to delete.
 * @returns The mutation result.
 */
export const useDeleteQuickReplyMutation = (id: string) =>
  useDelete<{ success: boolean }>({
    queryKey: getSingleQueryReplyQueryKey(id),
    dependentQueryKeys: [getQuickRepliesQueryKey()],
    optimisticUpdater: (queryKey, oldQueryData) => {
      if (isEqualQueryKeys(queryKey, getQuickRepliesQueryKey())) {
        return {
          ...oldQueryData,
          quickReplies: oldQueryData.quickReplies.filter(
            (quickReply: IQuickReply) => quickReply.id !== id
          ),
        } as { quickReplies: IQuickReply[] };
      }
    },
  });

/**
 * Custom hook for getting all notification settings
 * @returns The query result.
 */
export const useNotificationSettingsQuery = () =>
  useFetch<IGetNotificationSettingsResponse>(getNotificationsQueryKey(), {
    staleTime: Infinity,
  });

/**
 * Mutation hook to update notification settings
 * @returns The mutation result.
 */
export const useUpdateNotificationSettingsMutation = () =>
  usePatch<
    {
      mode: INotificationMode;
      notification: INotificationType;
      enabled: boolean;
    },
    IGetNotificationSettingsResponse
  >({
    queryKey: getNotificationsQueryKey(),
    dependentQueryKeys: [getNotificationsQueryKey()],
    optimisticUpdater: (queryKey, oldQueryData, mutatedData) => {
      if (isEqualQueryKeys(queryKey, getNotificationsQueryKey())) {
        return {
          ...oldQueryData,
          [mutatedData.mode]: {
            ...oldQueryData[mutatedData.mode],
            [mutatedData.notification]: mutatedData.enabled,
          },
        } as IGetNotificationSettingsResponse;
      }
    },
  });

/**
 * Mutation hook to deactivate a user's account
 * @returns The mutation result.
 */
export const useDeactivateAccountMutation = () =>
  useDelete<{ success: boolean }>({
    queryKey: createQueryKey(apiRoutes.settings.account.deactivateAccount),
  });

/**
 * Mutation hook to schedule account deletion
 * @returns The mutation result.
 */
export const useScheduleAccountDeletionMutation = () =>
  useDelete<{ success: boolean }>({
    queryKey: createQueryKey(apiRoutes.settings.account.deleteAccount),
  });

/**
 * Mutation hook to authorize google calendar sync
 * @returns The mutation result.
 */
export const useAuthorizeGoogleCalendarSyncMutation = () =>
  usePost<{ code: string }, { success: boolean }>({
    queryKey: createQueryKey(
      apiRoutes.settings.account.authorizeGoogleCalendarSync
    ),
    dependentQueryKeys: [getVerifyGoogleCalendarSyncQueryKey()],
  });

/**
 * Query hook to verify google calendar sync
 * @returns The query result.
 */
export const useVerifyGoogleCalendarSyncQuery = () =>
  useFetch<{ authorized: boolean }>(getVerifyGoogleCalendarSyncQueryKey(), {
    staleTime: Infinity,
  });

/**
 * Mutation hook to remove google calendar sync
 * @returns The mutation result.
 */
export const useRemoveGoogleCalendarSyncMutation = () =>
  useDelete<{ success: boolean }>({
    queryKey: createQueryKey(apiRoutes.settings.account.googleCalendarSync),
    dependentQueryKeys: [getVerifyGoogleCalendarSyncQueryKey()],
  });
