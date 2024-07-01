import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/Home.page";
import JobPage from "./pages/job/Job.page";
import RootLayout from "./layouts/Root.layout";
import SignInPage from "./pages/sign-in/Sign-in.page";
import SignUpPage from "./pages/sign-up/Sign-up.page";
import MainLayout from "./layouts/Main.layout";
import AdminMainLayout from "./layouts/Admin.layout";
import AdminJobPostsPage from "./pages/admin/jobPosts/Admin-job-posts.page";
import JobCreatePage from "./pages/admin/createJob/Job-create.page";
import { ClerkProvider } from "@clerk/clerk-react";
import AdminJobPage from "./pages/admin/job/Admin-job.page";
import AdminJobApplicationPage from "./pages/admin/jobApplication/Admin-job-application.page";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [ 
      {
        path: "/",
        element: <MainLayout />, 
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/job/:id",
            element: <JobPage />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminMainLayout />,
        children: [
          {
            path: "jobs",
            element: <AdminJobPostsPage />,
          },
          {
            path: "job/create",
            element: <JobCreatePage />,
          },
          {
            path: "job/:id",
            element: <AdminJobPage />,
          },
          {
            path: "job/:id/application/:applicationId",
            element: <AdminJobApplicationPage />
          }
        ],
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
