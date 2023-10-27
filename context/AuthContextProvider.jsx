"use client";

import React, { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState([]);
  const userLogin = (info) => {
    setToken(info.token);
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        userLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
