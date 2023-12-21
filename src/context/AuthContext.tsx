"use client";

import { createContext } from "react";
import React, { useState, ReactNode } from "react";

interface IAuthContext {
  auth: IAuth;
  setAuth: (auth: IAuth) => void;
}

export const AuthContext = createContext<IAuthContext>({
  auth: { userId: null, accessToken: null },
  setAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth>({ userId: null, accessToken: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
