export {}

declare global {
  interface IToken {
    token: string,
    expires: Date,
  }
  interface IUser {
    id: string;
    name: string;
    email: string;
    accessToken?: string;
  }
}