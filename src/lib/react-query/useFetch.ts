import { api } from "@/lib/api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QueryFunctionContext } from "@tanstack/react-query";
import type { TQueryKey } from "./types";

/**
 * Fetches data from the API using the provided query key.
 * @param queryKey The query key that specifies the URL and parameters.
 * @returns A promise that resolves to the fetched data.
 */
export const fetcher = async <T>({
  queryKey,
}: QueryFunctionContext<TQueryKey>): Promise<T> => {
  const [url, params] = queryKey;
  return api.get<T>(url, { params }).then((res) => res.data);
};

interface UseFetchOptions<T>
  extends Partial<UseQueryOptions<T, Error, T, TQueryKey>> {}

/**
 * Custom hook for fetching data from the API.
 * @param url The URL to fetch data from.
 * @param params Optional parameters for the API request.
 * @param config Optional configuration for the query.
 * @returns The query context for the fetched data.
 */
export const useFetch = <T>(
  queryKey: TQueryKey,
  config?: UseFetchOptions<T>
) => {
  const url = queryKey[0];
  const context = useQuery<T, Error, T, TQueryKey>({
    queryKey,
    queryFn: ({ queryKey, signal, meta }) =>
      fetcher({ queryKey, signal, meta }),
    enabled: !!url,
    ...config,
  });
  return context;
};
