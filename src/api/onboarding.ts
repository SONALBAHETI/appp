import { IGetPrimaryInterestSuggestionsResponse } from "@/interfaces/onboarding";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { useFetch } from "@/lib/react-query";

export const getPrimaryInterestSuggestionsQueryKey = (searchTerm: string) =>
  createQueryKey(
    apiRoutes.onboarding.getPrimaryInterestSuggestions(searchTerm)
  );

/**
 * Custom hook for getting suggestions for primary interests.
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 * 
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const usePrimaryInterestSuggestionsQuery = (searchTerm: string) =>
  useFetch<IGetPrimaryInterestSuggestionsResponse>(
    getPrimaryInterestSuggestionsQueryKey(searchTerm),
    {
      staleTime: 1000 * 30, // 10 seconds
      refetchOnWindowFocus: false,
      enabled: !!searchTerm,
    }
  );
