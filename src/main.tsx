import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages";
import NotFoundPage from "./pages/NotFoundPage";
import { UserDataProvider } from "./context";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/",
    element: <h1>Projects</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserDataProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserDataProvider>
  </React.StrictMode>
);
