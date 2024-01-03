import { useContext, createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = AuthContext.Provider;

export const useDataContext = () => {
  return useContext(AuthContext);
};
