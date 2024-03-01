import {
  IDocUploadResponse,
  IGetCurrentVerificationStepResponse,
  IGetOrgSearchUrlResponse,
  ISearchOrganizationsResponse,
  ISubmitMentorVerificationDataResponse,
} from "@/interfaces/verification";
import { useFetch, usePost } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { LicenseFormSchema } from "@/validation/settingsValidations/license.validation";
import { QueryClient } from "@tanstack/react-query";

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

// get mutation key for docUpload
export const getDocUploadMutationKey = () =>
  createQueryKey(apiRoutes.mentorVerification.docUpload);

/**
 * Executes a query to fetch the current verification step using useFetch hook.
 *
 * @returns the response containing the current verification step
 */
export const useCurrentVerificationStepQuery = () =>
  useFetch<IGetCurrentVerificationStepResponse>(
    getCurrentVerificationStepQueryKey(),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

/**
 * Invalidates the current verification step in the query client.
 * @param queryClient - The query client
 */
export const invalidateCurrentVerificationStepQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: getCurrentVerificationStepQueryKey(),
  });
};

/**
 * A hook for fetching the organization search URL.
 *
 * @returns The response containing the organization search URL.
 */
export const useOrgSearchUrlQuery = () =>
  useFetch<IGetOrgSearchUrlResponse>(getOrgSearchUrlQueryKey(), {
    staleTime: Infinity,
  });

/**
 * Custom hook to fetch organizations based on search URL and search term.
 *
 * @param {string} orgSearchUrl - the URL for searching organizations
 * @param {string} searchTerm - the term to search organizations
 * @returns the response containing the search organizations
 */
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

/**
 * Returns a mutation function for submitting mentor verification data.
 *
 * @returns A function for submitting mentor verification data
 */
export const useSubmitMentorVerificationDataMutation = () =>
  usePost<LicenseFormSchema, ISubmitMentorVerificationDataResponse>({
    queryKey: getSubmitMentorVerificationDataMutationKey(),
    dependentQueryKeys: [getCurrentVerificationStepQueryKey()],
  });

/**
 * Returns a mutation function for submitting mentor verification data.
 *
 * @returns A function for submitting mentor verification data
 */
export const useDocUploadMutation = () =>
  usePost<FormData, IDocUploadResponse>({
    queryKey: getDocUploadMutationKey(),
    dependentQueryKeys: [getCurrentVerificationStepQueryKey()],
  });
