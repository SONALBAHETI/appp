export interface ISignInWithEmailPasswordResponse {
  accessToken: IToken;
  userId: string;
}

export interface ILoginWithGoogleResponse {
  accessToken: IToken;
  user: any;
}

export interface ILogoutResponse {}
