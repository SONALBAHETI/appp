import { IGetSuggestionsResponse } from "@/interfaces/onboarding";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { useFetch } from "@/lib/react-query";

const useFetchOptions = (searchTerm: string) => ({
  staleTime: 1000 * 30, // 30 seconds
  refetchOnWindowFocus: false,
  enabled: !!searchTerm,
});

/**
 * Generates the query key for primary interest suggestions based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for primary interest suggestions.
 */
export const getPrimaryInterestSuggestionsQueryKey = (searchTerm: string) =>
  createQueryKey(
    apiRoutes.onboarding.getPrimaryInterestSuggestions(searchTerm)
  );

/**
 * Generates the query key for expertise area suggestions based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for expertise area suggestions.
 */
export const getExpertiseAreaSuggestionsQueryKey = (searchTerm: string) =>
  createQueryKey(apiRoutes.onboarding.getExpertiseAreaSuggestions(searchTerm));

/**
 * Generates the query key for practice area suggestions based on the search term.
 *
 * @param searchTerm - The search term.
 * @returns The query key for practice area suggestions.
 */
export const getPracticeAreaSuggestionsQueryKey = (searchTerm: string) =>
  createQueryKey(apiRoutes.onboarding.getPracticeAreaSuggestions(searchTerm));

/**
 * Custom hook for getting suggestions for primary interests.
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const usePrimaryInterestSuggestionsQuery = (searchTerm: string) =>
  useFetch<IGetSuggestionsResponse>(
    getPrimaryInterestSuggestionsQueryKey(searchTerm),
    useFetchOptions(searchTerm)
  );

/**
 * Custom hook for getting suggestions for expertise areas.
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const useExpertiseAreaSuggestionsQuery = (searchTerm: string) =>
  useFetch<IGetSuggestionsResponse>(
    getExpertiseAreaSuggestionsQueryKey(searchTerm),
    useFetchOptions(searchTerm)
  );

/**
 * Custom hook for getting suggestions for practice areas.
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 *
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const usePracticeAreaSuggestionsQuery = (searchTerm: string) =>
  useFetch<IGetSuggestionsResponse>(
    getPracticeAreaSuggestionsQueryKey(searchTerm),
    useFetchOptions(searchTerm)
  );
