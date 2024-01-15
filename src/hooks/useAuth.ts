import { useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";

// The hook is responsible for managing authentication-related functionality.

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { getItem, setItem, removeItem } = useLocalStorage();

  useEffect(() => {
    const initialAuthData = getItem("auth");
    if (initialAuthData) {
      setAuth(JSON.parse(initialAuthData));
    }
  }, []);

  const saveAuth = (authData: IAuth) => {
    setAuth(authData);
    setItem("auth", JSON.stringify(authData));
  };

  const setAccessToken = (token: IToken) => {
    const authData = { ...auth, accessToken: token };
    setAuth(authData);
    setItem("auth", JSON.stringify(authData));
    
  };

  const removeAuth = () => {
    setAuth({ userId: null, accessToken: null });
    removeItem("auth");
  };

  return { auth, saveAuth, setAccessToken, removeAuth };
};
