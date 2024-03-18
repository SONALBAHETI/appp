import { useFetch } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { IGetAppointmentResponse } from "@/interfaces/appointment";

export const getAppointmentQueryKey = (id: string) =>
  createQueryKey(apiRoutes.appointment.getAppointment(id));

/**
 * Generates a custom hook for fetching appointment data based on the provided ID.
 *
 * @param {string} id - The ID of the appointment to fetch
 * @returns The fetched appointment data
 */
export const useAppointmentQuery = (id: string) =>
  useFetch<IGetAppointmentResponse>(getAppointmentQueryKey(id), {
    enabled: !!id,
    staleTime: 1000 * 30,
  });
