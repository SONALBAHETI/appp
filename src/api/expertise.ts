import { IGetExpertiseSuggestionsResponse } from './../interfaces/expertise';
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";
import { useFetch } from "@/lib/react-query";

export const getExpertiseSuggestionsQueryKey = (searchTerm: string) =>
    createQueryKey(
        apiRoutes.onboarding.getPrimaryInterestSuggestions(searchTerm)
    );

/**
 * Custom hook for getting suggestions for Expertise suggestion
 * always use this hook with a debounced search term to
 * avoid hitting the server too many times
 * 
 * @param searchTerm - The search term.
 * @returns The query result.
 */
export const useExpertiseSuggestionsQuery = (searchTerm: string) =>
    useFetch<IGetExpertiseSuggestionsResponse>(
        getExpertiseSuggestionsQueryKey(searchTerm),
        {
            staleTime: 1000 * 30, // 10 seconds
            refetchOnWindowFocus: false,
            enabled: !!searchTerm,
        }
    );
