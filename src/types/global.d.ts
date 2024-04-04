import { Permission, Role } from "@/constants/user";

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SERVER_BASE_URL: string;
      NEXT_PUBLIC_FRONTEND_BASE_URL: string;
      NEXT_PUBLIC_SOCKET_SERVER_URL: string;
      NEXT_PUBLIC_SENDBIRD_APP_ID: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      NEXT_PUBLIC_STRIPE_STUDENT_MONTHLY_SUBSCRIPTION_PRICE_ID: string;
      NEXT_PUBLIC_STRIPE_STUDENT_ANNUAL_SUBSCRIPTION_PRICE_ID: string;
      NEXT_PUBLIC_STRIPE_CLINICIAN_MONTHLY_SUBSCRIPTION_PRICE_ID: string;
      NEXT_PUBLIC_STRIPE_CLINICIAN_ANNUAL_SUBSCRIPTION_PRICE_ID: string;
    }
  }
  interface IToken {
    token: string;
    expires: Date;
  }
  interface IAuth {
    userId: string | null;
    accessToken: IToken | null;
  }
  interface INavLink {
    label: string;
    link: string;
    permissions?: Permission[];
    roles?: Role[];
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
