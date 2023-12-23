import type { TQueryKey } from "./types";

export const createQueryKey = (url: string, params?: object) =>
  [url, params] as TQueryKey;

export const isEqualQueryKeys = (queryKeyA: TQueryKey, queryKeyB: TQueryKey) =>
  JSON.stringify(queryKeyA) === JSON.stringify(queryKeyB);
