import { useGenericMutation } from "./useGenericMutation";
import { api } from "../api";
import { TOptimisticUpdater } from "./types";

type TQueryKey = [string, object | undefined];

interface IUsePatch<T> {
  queryKey: TQueryKey;
  dependentQueryKeys?: TQueryKey[];
  optimisticUpdater?: TOptimisticUpdater<T, any>;
}

export const usePatch = <T, S>({
  queryKey,
  dependentQueryKeys,
  optimisticUpdater,
}: IUsePatch<T>) => {
  const url = queryKey[0];
  return useGenericMutation<T, S>({
    mutationKey: queryKey,
    mutationFn: (data: T) => api.patch<S>(url, data).then((res) => res.data),
    dependentQueryKeys,
    optimisticUpdater,
  });
};
