import { IDocUploadResponse } from "@/interfaces/verification";
import { usePost } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { getCurrentVerificationStepQueryKey as getCurrentStudentVerificationStepQueryKey } from "./studentVerification";
import { getCurrentVerificationStepQueryKey } from "./mentorVerification";

// get mutation key for docUpload
export const getDocUploadMutationKey = () =>
  createQueryKey(apiRoutes.sheerIDVerification.docUpload);

/**
 * Returns a mutation hook for uploading verification document.
 */
export const useDocUploadMutation = () =>
  usePost<FormData, IDocUploadResponse>({
    queryKey: getDocUploadMutationKey(),
    dependentQueryKeys: [
      getCurrentVerificationStepQueryKey(),
      getCurrentStudentVerificationStepQueryKey(),
    ],
  });
