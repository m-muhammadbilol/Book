import React from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Info from "./pages/Info";
import Page404 from "./pages/Page404";
import Login from "./pages/login";
import { Toaster } from "@/components/ui/sonner";
import Signup from "./pages/Signup";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/books/:id",
      element: <Info />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={routes} />
      <Toaster position="top-right" />
    </div>
  );
}
