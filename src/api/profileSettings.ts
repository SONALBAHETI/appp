import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { useFetch, usePost } from "@/lib/react-query";
import { IGetSuggestionsResponse } from "@/interfaces/onboarding";
import {
  IAddCertificateResponse,
  IAddDegreeResponse,
  IGetUserProfileResponse,
  ISubmitEducationFormResponse,
  ISubmitExpertiseFormResponse,
  ISubmitIdentityInfoFormResponse,
} from "@/interfaces/settings";
import { IdentityInfoFormSchema } from "@/validation/settingsValidations/identityInfo.validation";
import { DegreeFormSchema } from "@/components/settings/profile/PersonalDetails/Education/Degrees/validation";
import { CertificateFormSchema } from "@/components/settings/profile/PersonalDetails/Education/Certificates/validation";
import { EducationFormSchema } from "@/validation/settingsValidations/education.validation";
import { ExpertiseFormSchema } from "@/validation/settingsValidations/expertise.validation";

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
 * Generates the query key for personal interest suggestions based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for practice area suggestions.
 */
export const getUniversitySuggestionsQueryKey = (searchTerm: string) =>
  createQueryKey(
    apiRoutes.settings.profile.getUniversitySuggestions(searchTerm)
  );

/**
 * Generates the query key for residency program suggestions based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for practice area suggestions.
 */
export const getResidencyProgramSuggestionsQueryKey = (searchTerm: string) =>
  createQueryKey(
    apiRoutes.settings.profile.getResidencyProgramSuggestions(searchTerm)
  );

/**
 * Generates the query key for fellowship program suggestions based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for practice area suggestions.
 */
export const getFellowshipProgramSuggestionsQueryKey = (searchTerm: string) =>
  createQueryKey(
    apiRoutes.settings.profile.getFellowshipProgramSuggestions(searchTerm)
  );

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
 * Generates the query key for Degrees based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for degrees suggestions.
 */
export const getDegreeSuggestionsQueryKey = (searchTerm: string) =>
  createQueryKey(apiRoutes.settings.profile.getDegreeSuggestions(searchTerm));

/**
 * Generates the query key for useIdentityInfoFormMutation.
 * @returns The query key.
 */
export const getSubmitIdentityInfoFormMutationQueryKey = () =>
  createQueryKey(apiRoutes.settings.profile.submitIdentityInfoForm);

/**
 * Generates the query key for useEducationFormMutation.
 * @returns The query key.
 */
export const getSubmitEducationFormMutationQueryKey = () =>
  createQueryKey(apiRoutes.settings.profile.submitEducationForm);

/**
 * Generates the query key for useExpertiseFormMutation.
 * @returns The query key.
 */
export const getSubmitExpertiseFormMutationQueryKey = () =>
  createQueryKey(apiRoutes.settings.profile.submitExpertiseForm);

/**
 * Generates the query key for useAddDegreeMutation.
 * @returns The query key.
 */
export const getAddDegreeMutationQueryKey = () =>
  createQueryKey(apiRoutes.settings.profile.degrees);

/**
 * Generates the query key for useAddCertificateMutation.
 * @returns The query key.
 */
export const getAddCertificateMutationQueryKey = () =>
  createQueryKey(apiRoutes.settings.profile.certificates);

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
 * Custom hook for getting suggestions for Degrees
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const useDegreeSuggestionsQuery = (searchTerm: string) =>
  useFetch<IGetSuggestionsResponse>(
    getDegreeSuggestionsQueryKey(searchTerm),
    useFetchOptions(searchTerm)
  );

/**
 * Custom hook for getting suggestions for University
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const useUniversitySuggestionsQuery = (searchTerm: string) =>
  useFetch<IGetSuggestionsResponse>(
    getUniversitySuggestionsQueryKey(searchTerm),
    useFetchOptions(searchTerm)
  );

/**
 * Custom hook for getting suggestions for Residency Programs
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const useResidencyProgramSuggestionsQuery = (searchTerm: string) =>
  useFetch<IGetSuggestionsResponse>(
    getResidencyProgramSuggestionsQueryKey(searchTerm),
    useFetchOptions(searchTerm)
  );

/**
 * Custom hook for getting suggestions for Fellowship Program
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const useFellowshipProgramSuggestionsQuery = (searchTerm: string) =>
  useFetch<IGetSuggestionsResponse>(
    getFellowshipProgramSuggestionsQueryKey(searchTerm),
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
  useFetch<IGetUserProfileResponse>(getUserProfileQueryKey(), {
    staleTime: Infinity,
  });

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
 * Custom hook for submitting the Identity form.
 *
 * This hook is used to submit the Identity form and returns the query result.
 *
 * @returns The query result for the Identity form mutation.
 */
export const useIdentityInfoFormMutation = () =>
  usePost<IdentityInfoFormSchema, ISubmitIdentityInfoFormResponse>({
    queryKey: getSubmitIdentityInfoFormMutationQueryKey(),
    dependentQueryKeys: [getUserProfileQueryKey()],
  });

/**
 * Custom hook for submitting the Education form.
 *
 * This hook is used to submit the Education form and returns the query result.
 *
 * @returns The query result for the Education form mutation.
 */
export const useEducationFormMutation = () =>
  usePost<
    Omit<EducationFormSchema, "degrees" | "certificates">,
    ISubmitEducationFormResponse
  >({
    queryKey: getSubmitEducationFormMutationQueryKey(),
    dependentQueryKeys: [getUserProfileQueryKey()],
  });

/**
 * Custom hook for submitting the Expertise form.
 *
 * This hook is used to submit the Expertise form and returns the query result.
 *
 * @returns The query result for the Expertise form mutation.
 */
export const useExpertiseFormMutation = () =>
  usePost<ExpertiseFormSchema, ISubmitExpertiseFormResponse>({
    queryKey: getSubmitExpertiseFormMutationQueryKey(),
    dependentQueryKeys: [getUserProfileQueryKey()],
  });

/**
 * Custom hook for adding a new degree.
 *
 * This hook is used to add a new degree and returns the query result.
 *
 * @returns The query result.
 */
export const useAddDegreeMutation = () =>
  usePost<DegreeFormSchema, IAddDegreeResponse>({
    queryKey: getAddDegreeMutationQueryKey(),
    dependentQueryKeys: [getUserProfileQueryKey()],
  });

/**
 * Custom hook for adding a new certificate.
 *
 * This hook is used to add a new certificate and returns the query result.
 *
 * @returns The query result.
 */
export const useAddCertificateMutation = () =>
  usePost<CertificateFormSchema, IAddCertificateResponse>({
    queryKey: getAddCertificateMutationQueryKey(),
    dependentQueryKeys: [getUserProfileQueryKey()],
  });
