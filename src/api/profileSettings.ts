import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { useFetch, usePost } from "@/lib/react-query";
import { IGetSuggestionsResponse } from "@/interfaces/onboarding";
import {
  IGetUserProfileResponse,
  ISubmitIdentityInfoFormResponse,
} from "@/interfaces/settings";
import { IdentityInfoFormSchema } from "@/validation/settingsValidations/identityInfo.validation";

const useFetchOptions = (searchTerm: string) => ({
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  enabled: !!searchTerm,
});

/**
 * Generates the query key for Board Specialties suggestions based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for practice area suggestions.
 */
export const getBoardSpecialtiesQueryKey = (searchTerm: string) =>
  createQueryKey(apiRoutes.settings.profile.getBoardSpecialties(searchTerm));

/**
 * Generates the query key for personal interest suggestions based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for practice area suggestions.
 */
export const getPersonalInterestSuggestionsQueryKey = (searchTerm: string) =>
  createQueryKey(apiRoutes.settings.profile.getPersonalInterests(searchTerm));

/**
 * Generates the query key for religious affiliation suggestions based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for practice area suggestions.
 */
export const getReligiousAffiliationsSuggestionsQueryKey = (
  searchTerm: string
) =>
  createQueryKey(
    apiRoutes.settings.profile.getReligiousAffiliations(searchTerm)
  );

/**
 * Generates the query key for Commonly Treated Diagnoses based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for commonly treated diagnoses suggestions.
 */
export const getCommonlyTreatedDiagnosesQueryKey = (searchTerm: string) =>
  createQueryKey(
    apiRoutes.settings.profile.getCommonlyTreatedDiagnoses(searchTerm)
  );

/**
 * Generates the query key for useProfileSettingSFormMutation.
 * @returns The query key.
 */
export const getSubmitIdentityInfoFormMutationQueryKey = () =>
  createQueryKey(apiRoutes.settings.profile.submitIdentityInfoForm);

/**
 * Generates the query key for useUserProfileQuery.
 * @returns The query key.
 */
export const getUserProfileQueryKey = () =>
  createQueryKey(apiRoutes.settings.profile.getUserProfile);

/**
 * Custom hook for getting suggestions for Board Specialties suggestion
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const useBoardSpecialtiesQuery = (searchTerm: string) =>
  useFetch<IGetSuggestionsResponse>(
    getBoardSpecialtiesQueryKey(searchTerm),
    useFetchOptions(searchTerm)
  );

/**
 * Custom hook for getting suggestions for Personal Interests
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const usePersonalInterestSuggestionsQuery = (searchTerm: string) =>
  useFetch<IGetSuggestionsResponse>(
    getPersonalInterestSuggestionsQueryKey(searchTerm),
    useFetchOptions(searchTerm)
  );

/**
 * Custom hook for getting suggestions for Religious Affiliations
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const useReligiousAffiliationsSuggestionsQuery = (searchTerm: string) =>
  useFetch<IGetSuggestionsResponse>(
    getReligiousAffiliationsSuggestionsQueryKey(searchTerm),
    useFetchOptions(searchTerm)
  );

/**
 * Custom hook for getting suggestions for Personal Interests
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @returns The query result.
 */
export const useUserProfileQuery = () =>
  useFetch<IGetUserProfileResponse>(getUserProfileQueryKey());

/**
 * Custom hook for getting suggestions for Commonly Treated
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const useCommonlyTreatedDiagnosesQuery = (searchTerm: string) =>
  useFetch<IGetSuggestionsResponse>(
    getCommonlyTreatedDiagnosesQueryKey(searchTerm),
    useFetchOptions(searchTerm)
  );

/**
 * Custom hook for submitting the Profile settings form.
 *
 * This hook is used to submit the Profile settings form and returns the query result.
 *
 * @returns The query result for the Profile settings form mutation.
 */
export const useIdentityInfoFormMutation = () =>
  usePost<IdentityInfoFormSchema, ISubmitIdentityInfoFormResponse>({
    queryKey: getSubmitIdentityInfoFormMutationQueryKey(),
  });
