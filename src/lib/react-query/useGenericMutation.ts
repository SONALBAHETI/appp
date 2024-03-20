import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import type { TGenericMutation, TQueryKey } from "./types";

/**
 * Custom hook for performing a generic mutation.
 * @param mutationFn The mutation function that sends the data to the API.
 * @param dependentQueryKeys Optional query keys for dependent queries to be invalidated.
 * @param optimisticUpdater Optional function to update the dependent queries data optimistically.
 * @returns The mutation context for the mutation operation.
 */
export const useGenericMutation = <T, S>({
  mutationKey,
  mutationFn,
  dependentQueryKeys,
  optimisticUpdater,
}: TGenericMutation<T, S>) => {
  const queryClient = useQueryClient();
  type PreviousDataByTQueryKey = {
    queryKey: TQueryKey;
    data: any;
  };

  return useMutation<S | AxiosResponse<S, any>, AxiosError, T>({
    mutationKey,
    mutationFn,
    onMutate: async (data: T) => {
      const previousDataByQueryKeys = <PreviousDataByTQueryKey[]>[];

      // Cancel all dependent queries and optimistically update them
      dependentQueryKeys?.forEach(async (queryKey) => {
        // Cancel the query
        await queryClient.cancelQueries({ queryKey });

        // Save previous data for each query key
        previousDataByQueryKeys.push({
          queryKey,
          data: queryClient.getQueryData(queryKey),
        });

        // Set the optimistic update for each query key
        queryClient.setQueryData(queryKey, (oldQueryData: any) => {
          // Optimistically update the query data if the optimistic updater is provided
          return optimisticUpdater
            ? optimisticUpdater(queryKey, oldQueryData, data)
            : oldQueryData;
        });
      });

      // This will be passed to the onError and onSettled callbacks as context
      return previousDataByQueryKeys;
    },
    onError: (_err, _variables, context: any) => {
      context?.forEach((previousDataByQueryKey: PreviousDataByTQueryKey) => {
        // If there was an error, revert back to the previous data for each query key
        queryClient.setQueryData(
          previousDataByQueryKey.queryKey,
          previousDataByQueryKey.data
        );
      });
    },
    onSettled: (_data, _error, _variables, context: any) => {
      // Loop through each previous data by query key in the context
      context?.forEach((previousDataByQueryKey: PreviousDataByTQueryKey) => {
        // Invalidate the query to refetch the data after the mutation has settled
        queryClient.invalidateQueries({
          queryKey: previousDataByQueryKey.queryKey,
        });
      });
    },
  });
};
