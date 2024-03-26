import { useDelete, useFetch, usePost } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { AppointmentSettingsFormSchema } from "@/validation/settingsValidations/appointment.validation";
import { IAvailability } from "@/interfaces/appointmentSettings";

const getVerifyGoogleCalendarSyncQueryKey = () =>
  createQueryKey(apiRoutes.settings.account.verifyGoogleCalendarSync);
const getAppointmentSettingsMutationQueryKey = () =>
  createQueryKey(apiRoutes.user.availability);

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

/**
 * Query hook to get appointment settings
 * @returns The query result.
 */
export const useAppointmentSettingsQuery = () =>
  useFetch<{ availability: IAvailability }>(
    getAppointmentSettingsMutationQueryKey(),
    {
      staleTime: Infinity,
    }
  );

/**
 * Mutation hook to save appointment settings
 * @returns The mutation result.
 */
export const useAppointmentSettingsMutation = () =>
  usePost<AppointmentSettingsFormSchema, { success: boolean }>({
    queryKey: getAppointmentSettingsMutationQueryKey(),
    dependentQueryKeys: [getAppointmentSettingsMutationQueryKey()],
  });
