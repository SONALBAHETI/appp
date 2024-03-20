import { useGenericMutation } from "./useGenericMutation";
import { api } from "../api";
import { TOptimisticUpdater } from "./types";
import { AxiosError } from "axios";

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
    mutationFn: (data: T) =>
      api
        .post<S>(url, data)
        .then((res) => res.data)
        .catch((e: AxiosError) => {
          const data: any = e.response?.data;
          if (data?.message) {
            throw new AxiosError(data?.message, data?.code || e.code);
          } else {
            throw e;
          }
        }),
    dependentQueryKeys,
    optimisticUpdater,
  });
};
