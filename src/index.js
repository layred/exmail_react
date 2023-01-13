import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from './components/dashboard/Dashboard';
import SignIn from "./components/auth/SignIn";
import ErrorPage from './components/basics/ErrorPage';
import NotFound from './components/basics/NotFound';
import Admin from './components/admin/Admin'
import Freights from './components/freights/Freights';
import Shipments from './components/shipments/Shipments';
import Sendings from './components/sendings/Sendings';
import Wrapper from "./components/Wrapper";
import Logout from "./components/auth/Logout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "freights",
        element: <Freights />,
      },
      {
        path: "shipments",
        element: <Shipments />,
      },
      {
        path: "sendings",
        element: <Sendings />,
      },
      {
        path: "dashboard",
        element: <Dashboard />
      }
    ]
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <ErrorPage />
  },
  {
    path: "/logout",
    element: <Logout />,
    errorElement: <ErrorPage />
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);