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
  interface IUser {
    id: string;
    name: string;
    email: string;
    accessToken?: string;
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
}
