import {
  IGetCurrentVerificationStepResponse,
  IGetOrgSearchUrlResponse,
  ISearchOrganizationsResponse,
  ISubmitStudentVerificationDataResponse,
} from "@/interfaces/verification";
import { useFetch, usePost } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { QueryClient } from "@tanstack/react-query";
import { StudentVerificationFormSchema } from "@/validation/studentVerificationForm.validation";

// get query key for getCurrentStep
export const getCurrentVerificationStepQueryKey = () =>
  createQueryKey(apiRoutes.studentVerification.getCurrentStep);

// get query key for getOrgSearchUrl
export const getOrgSearchUrlQueryKey = () =>
  createQueryKey(apiRoutes.studentVerification.getOrgSearchUrl);

// get query key for getOrganizations
export const getOrganizationsQueryKey = (
  orgSearchUrl?: string,
  searchTerm?: string
) =>
  createQueryKey(
    apiRoutes.studentVerification.getOrganizations(orgSearchUrl, searchTerm)
  );

// get mutation key for submitStudentVerificationData
export const getSubmitStudentVerificationDataMutationKey = () =>
  createQueryKey(apiRoutes.studentVerification.submitData);

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
export const useSubmitStudentVerificationDataMutation = () =>
  usePost<StudentVerificationFormSchema, ISubmitStudentVerificationDataResponse>({
    queryKey: getSubmitStudentVerificationDataMutationKey(),
    dependentQueryKeys: [getCurrentVerificationStepQueryKey()],
  });
