import { createContext, useContext } from "react";

export const AuthContext = createContext({
  token: null,
  userLogin: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
