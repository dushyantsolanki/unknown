import "./App.css";
import Root from "./Root";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthProvider } from "./context/useDataContext/useDataContext";
import { useState, useEffect } from "react";
import { AccountProvider } from "./context/useGetAccount/useGetAccount";

function App() {
  const [userData, setUserData] = useState(null);
  const [isAccount, setIsAccount] = useState(false);

  const getUser = () => {
    const account = localStorage.getItem("users");
    if (account) {
      setIsAccount(true);
      setUserData(JSON.parse(account));
    } else {
      console.log("Hello", account);
      setIsAccount(false);
    }
  };
  useEffect(() => {
    getUser();
  }, [isAccount]);

  return (
    <>
      <AccountProvider value={{ isAccount, setIsAccount }}>
        <AuthProvider value={{ userData, setUserData }}>
          <Root />
        </AuthProvider>
      </AccountProvider>
    </>
  );
}

export default App;
