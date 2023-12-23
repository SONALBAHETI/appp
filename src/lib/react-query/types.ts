import { AxiosResponse } from "axios";

export type TQueryKey = [string, object | undefined];
export type TOptimisticUpdater<T, S> = (
  queryKey: TQueryKey,
  oldQueryData: S,
  mutatedData: T
) => S;

export type TGenericMutation<T, S> = {
  mutationFn: (data: T) => Promise<S | AxiosResponse<S, any>>;
  mutationKey?: TQueryKey;
  dependentQueryKeys?: TQueryKey[];
  optimisticUpdater?: TOptimisticUpdater<T, any>;
};
