import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/Home.page";
import JobPage from "./pages/job/Job.page";
import RootLayout from "./layouts/Root.layout";
import SignInPage from "./pages/Sign-in.page";
import SignUpPage from "./pages/Sign-up.page";
import MainLayout from "./layouts/Main.layout";

const router = createBrowserRouter([
  {
    element: <RootLayout/>,
    children: [
      {
        element: <MainLayout/>,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/job/:id",
            element: <JobPage />
          }
        ]
      },
      {
        path: "/sign-in",
        element: <SignInPage />
      }, 
      {
        path: "/sign-up",
        element: <SignUpPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
