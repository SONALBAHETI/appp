import { useGenericMutation } from "./useGenericMutation";
import { api } from "../api";
import { TOptimisticUpdater } from "./types";

type TQueryKey = [string, object | undefined];

interface IUseDelete {
  queryKey: TQueryKey;
  dependentQueryKeys?: TQueryKey[];
  optimisticUpdater?: TOptimisticUpdater<undefined, any>;
}

export const useDelete = <S>({
  queryKey,
  dependentQueryKeys,
  optimisticUpdater,
}: IUseDelete) => {
  const url = queryKey[0];
  return useGenericMutation<undefined, S>({
    mutationKey: queryKey,
    mutationFn: () => api.delete<S>(url).then((res) => res.data),
    dependentQueryKeys,
    optimisticUpdater,
  });
};
