import { AuthResponse } from "@/types";
import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export type AuthContextType = {
  auth: AuthResponse | null;
  setAuth: (user: AuthResponse | null) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [auth, setAuthData] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookieValue = cookies.auth;
    if (cookieValue) {
      setAuthData(cookieValue);
    } else {
      setAuthData(null);
    }
    setLoading(false);
  }, [cookies.auth]);

  const setAuth = (authData: AuthResponse | null) => {
    setAuthData(authData);
    if (authData) {
      setCookie("auth", authData);
    } else {
      removeCookie("auth", { path: "/" });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
