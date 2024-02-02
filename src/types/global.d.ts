export {};

declare global {
  interface IToken {
    token: string;
    expires: Date;
  }
  interface IAuth {
    userId: string | null;
    accessToken: IToken | null;
  }
  interface IToggleOption {
    label: string;
    value: string;
  }
  interface IFetcherOptions {
    url: string;
    method?: string;
    config?: any;
    baseUrl?: string;
    useCredentials?: boolean;
    useRefreshAuth?: boolean;
    setAccessToken?: (token: IToken) => void;
  }
  interface PaginationResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    page: number;
    totalPages: number;
    offset: number | null;
    prevPage: number | null;
    nextPage: number | null;
    pagingCounter: number;
    meta: object;
  }
}
