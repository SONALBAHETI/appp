export interface ISignInWithEmailPasswordResponse {
  accessToken: IToken;
  userId: string;
  isOnboarded: boolean;
}

export interface ISignUpWithEmailPasswordResponse {
  accessToken: IToken;
  userId: string;
}

export interface ILoginWithGoogleResponse {
  accessToken: IToken;
  userId: string;
  isOnboarded: boolean;
}

export interface ILogoutResponse {}

export interface IVerifyEmailResponse {}

export interface ISendResetPasswordEmailResponse { }

export interface IResetPasswordResponse {}
