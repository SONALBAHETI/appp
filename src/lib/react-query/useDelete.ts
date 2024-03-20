import { useGenericMutation } from "./useGenericMutation";
import { api } from "../api";
import { TOptimisticUpdater } from "./types";
import { AxiosError } from "axios";

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
    mutationFn: () =>
      api
        .delete<S>(url)
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
