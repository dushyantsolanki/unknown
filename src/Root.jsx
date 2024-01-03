import React, { useEffect } from "react";
import {
  Signup,
  Login,
  PassRecover,
  Dashboard,
  Profile,
  ErrorPage,
} from "./pages";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./layout/authLayout/AuthLayout";
import DashboardLayout from "./layout/dashboardLayout/DashboardLayout";
import { useDataContext } from "./context/useDataContext/useDataContext";
import { useGetAccountContext } from "./context/useGetAccount/useGetAccount";
import NewPassword from "./pages/passwordRecovery/NewPassword";

function Root() {
  const { userData } = useDataContext();
  const { isAccount } = useGetAccountContext();
  console.log(userData, isAccount);

  // here i ddefine the path all pages
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAccount ? (
        <Navigate to="/dashboard" />
      ) : (
        <Navigate to="/auth" />
      ),
    },

    {
      path: "/auth",
      element:
        isAccount || userData ? <Navigate to="/dashboard" /> : <AuthLayout />,
      children: [
        { path: "", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "passwordRecovery", element: <PassRecover /> },
        { path: "newpassword", element: <NewPassword /> },
      ],
    },

    {
      path: "/dashboard",
      element:
        isAccount || userData ? <DashboardLayout /> : <Navigate to="/auth" />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "chart", element: <Profile /> },
      ],
    },
    { path: "*", element: <ErrorPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default Root;
