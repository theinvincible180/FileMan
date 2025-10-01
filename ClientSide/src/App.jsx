import { useMemo } from "react";
import "./App.css";
import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import DownloadPage from "./components/DownloadPage.jsx";
import PurchasePage from "./components/PurchasePage.jsx";
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/Protected.jsx";

function App() {
  const authUser = useSelector((state) => state.auth.user);
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: (
            // <ProtectedRoute>
              <UserDashboard />
            // </ProtectedRoute>
          ),
          children: [
            { path: "home", element: <Home /> },
            { path: "plans", element: <PurchasePage /> },
          ],
        },
        {
          path: "/login",
          element: authUser ? <Navigate to="/home" replace /> : <LoginPage />,
        },
        {
          path: "/signup",
          element: authUser ? <Navigate to="/home" replace /> : <SignupPage />,
        },
        {
          path: "/f/:shortCode",
          element: <DownloadPage />,
        },
      ]),
    [authUser] // only rebuild router if authUser changes
  );

  return <RouterProvider router={router} />;
}

export default App;

