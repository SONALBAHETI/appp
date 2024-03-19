import {
  InfiniteData,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { TQueryKey } from "./types";
import { api } from "../api";
import { AxiosError } from "axios";

/**
 * Fetches data from the API using infinite pagination.
 * @param queryKey The query key that specifies the URL and parameters.
 * @param pageParam The page number to fetch.
 * @param signal The signal to cancel the request.
 * @returns A promise that resolves to the fetched data.
 * @template T - The type of the data returned by the query.
 */
export const infiniteFetcher = async <T>({
  queryKey,
  signal,
  pageParam,
}: QueryFunctionContext<TQueryKey, number>): Promise<T> => {
  const [url, params] = queryKey;
  return api
    .get<T>(url, { params: { ...params, page: pageParam }, signal })
    .then((res) => res.data)
    .catch((e: AxiosError) => {
      const data: any = e.response?.data;
      if (data?.message) {
        throw new AxiosError(data?.message, data?.code || e.code);
      } else {
        throw e;
      }
    });
};

/**
 * Interface for configuring an infinite query using the `useInfiniteQuery` hook.
 *
 * @template T - The type of the data returned by the query.
 */
interface UseInfiniteFetchOptions<T>
  extends Partial<
    UseInfiniteQueryOptions<T, Error, InfiniteData<T>, T, TQueryKey, number>
  > {}

/**
 * Custom hook for fetching data from the API using infinite pagination.
 * @param queryKey The query key that specifies the URL and parameters.
 * @param config Optional configuration for the query.
 * @returns The query context for the fetched data.
 */
export const useLoadMore = <T>(
  queryKey: TQueryKey,
  config?: UseInfiniteFetchOptions<PaginationResult<T>>
) => {
  const context = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam, direction, signal, queryKey, meta }) =>
      infiniteFetcher({ queryKey, pageParam, direction, signal, meta }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.prevPage,
    initialPageParam: 1,
    ...config,
  });

  return context;
};
