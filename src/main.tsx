import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages";
import NotFoundPage from "./pages/NotFoundPage";
import { UserDataProvider } from "./context";
import { Toaster } from "./components/ui/toaster";
import ProjectsPage from "./pages/ProjectsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <UserDataProvider>
      <RouterProvider router={router} />
    </UserDataProvider>
  </React.StrictMode>
);
