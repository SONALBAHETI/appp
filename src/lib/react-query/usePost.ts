import { useGenericMutation } from "./useGenericMutation";
import { api } from "../api";
import { TOptimisticUpdater } from "./types";

type TQueryKey = [string, object | undefined];

interface IUsePost<T> {
  queryKey: TQueryKey;
  dependentQueryKeys?: TQueryKey[];
  optimisticUpdater?: TOptimisticUpdater<T, any>;
}

export const usePost = <T, S>({
  queryKey,
  dependentQueryKeys,
  optimisticUpdater,
}: IUsePost<T>) => {
  const url = queryKey[0];
  return useGenericMutation<T, S>({
    mutationKey: queryKey,
    mutationFn: (data: T) => api.post<S>(url, data).then((res) => res.data),
    dependentQueryKeys,
    optimisticUpdater,
  });
};
