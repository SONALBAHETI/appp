import {
  IGetCurrentVerificationStepResponse,
  IGetOrgSearchUrlResponse,
  ISearchOrganizationsResponse,
  ISubmitMentorVerificationDataResponse,
} from "@/interfaces/verification";
import { useFetch, usePost } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { LicenseSchema } from "@/components/settings/validation";

// get query key for getCurrentStep
export const getCurrentVerificationStepQueryKey = () =>
  createQueryKey(apiRoutes.mentorVerification.getCurrentStep);

// get query key for getOrgSearchUrl
export const getOrgSearchUrlQueryKey = () =>
  createQueryKey(apiRoutes.mentorVerification.getOrgSearchUrl);

// get query key for getOrganizations
export const getOrganizationsQueryKey = (
  orgSearchUrl?: string,
  searchTerm?: string
) =>
  createQueryKey(
    apiRoutes.mentorVerification.getOrganizations(orgSearchUrl, searchTerm)
  );

// get mutation key for submitMentorVerificationData
export const getSubmitMentorVerificationDataMutationKey = () =>
  createQueryKey(apiRoutes.mentorVerification.submitData);

export const useCurrentVerificationStepQuery = () =>
  useFetch<IGetCurrentVerificationStepResponse>(
    getCurrentVerificationStepQueryKey(),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

export const useOrgSearchUrlQuery = () =>
  useFetch<IGetOrgSearchUrlResponse>(getOrgSearchUrlQueryKey(), {
    staleTime: Infinity,
  });

export const useOrganizationsQuery = (
  orgSearchUrl?: string,
  searchTerm?: string
) =>
  useFetch<ISearchOrganizationsResponse>(
    getOrganizationsQueryKey(orgSearchUrl, searchTerm),
    {
      staleTime: Infinity,
      enabled: !!orgSearchUrl && !!searchTerm,
    }
  );

export const useSubmitMentorVerificationDataMutation = () =>
  usePost<LicenseSchema, ISubmitMentorVerificationDataResponse>({
    queryKey: getSubmitMentorVerificationDataMutationKey(),
  });
