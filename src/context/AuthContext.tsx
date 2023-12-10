import { createContext } from "react";

interface IAuthContext {
  auth: IAuth;
  setAuth: (auth: IAuth) => void;
}

export const AuthContext = createContext<IAuthContext>({
  auth: { userId: null, accessToken: null },
  setAuth: () => {},
});
