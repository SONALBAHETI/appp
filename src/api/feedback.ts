import { IReportUserRequest, IReportUserResponse } from "@/interfaces/feedback";
import { apiRoutes } from "./routes";
import { usePost } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";

/**
 * Mutation hook to report a user for misbehaviour
 * @param userId - The ID of the user to be reported
 */
export const useReportUserMutation = (userId: string) =>
  usePost<IReportUserRequest, IReportUserResponse>({
    queryKey: createQueryKey(apiRoutes.feedback.reportUser(userId)),
  });
