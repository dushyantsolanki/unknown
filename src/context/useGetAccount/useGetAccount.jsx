import { useContext, createContext } from "react";

export const getAccountContext = createContext({});

export const AccountProvider = getAccountContext.Provider;

export const useGetAccountContext = () => {
  return useContext(getAccountContext);
};
