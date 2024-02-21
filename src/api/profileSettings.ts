import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { useFetch, usePost } from "@/lib/react-query";
import { IGetSuggestionsResponse } from "@/interfaces/onboarding";
import { ISubmitProfileSettingFormResponse } from "@/interfaces/profle";
import { TProfileSettingForm } from "@/validation/settingsValidations";

const useFetchOptions = (searchTerm: string) => ({
    staleTime: 1000 * 30, // 30 seconds
    refetchOnWindowFocus: false,
    enabled: !!searchTerm,
});

/**
 * Generates the query key for Board Specialties based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for practice area suggestions.
 */

export const getBoardSpecialtiesQueryKey = (searchTerm: string) =>
    createQueryKey(apiRoutes.profile.getBoardSpecialties(searchTerm));


/**
* Generates the query key for Commonly Treated based on the search term.
*
* @param searchTerm - The search term.
* @returns The query key for practice area suggestions.
*/
export const getCommonlyTreatedQueryKey = (searchTerm: string) =>
    createQueryKey(apiRoutes.profile.getCommonlyDiagnoses(searchTerm));


/**
* Generates the query key for useProfileSettingSFormMutation.
* @returns The query key.
*/
export const getSubmitProfileSettingSFormMutationQueryKey = () =>
    createQueryKey(apiRoutes.profile.submitProfileSettingForm);


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
 * Custom hook for getting suggestions for Commonly Treated
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 * 
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const useCommonlyTreatedQuery = (searchTerm: string) =>
    useFetch<IGetSuggestionsResponse>(
        getCommonlyTreatedQueryKey(searchTerm),
        useFetchOptions(searchTerm)
    );


/**
 * Custom hook for submitting the Profile settings form.
 *
 * This hook is used to submit the Profile settings form and returns the query result.
 *
 * @returns The query result for the Profile settings form mutation.
 */
export const useProfileSettingSFormMutationQueryKey = () =>
    usePost<TProfileSettingForm, ISubmitProfileSettingFormResponse>({
        queryKey: getSubmitProfileSettingSFormMutationQueryKey(),
    });
