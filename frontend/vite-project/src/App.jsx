import React from "react";
import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./Pages/Home";
import Signup from "./components/auth/Signup";
import Jobs from "./Pages/Jobs";
import BrowseJob from "./Pages/BrowseJob";
import Profile from "./Pages/Profile";
import JobDetails from "./components/Jobs/JobDetails";
import Company from "./Pages/Company";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browsejob",
    element: <BrowseJob />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/job/:id",
    element: <JobDetails />,
  },

  //Admin Routes
  {
    path: "/admin/companies",
    element: <Company />,
  },
  {
    path: "/admin/companies/create",
    element: <CompanyCreate />,
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
  {
    path: "/admin/jobs/create",
    element: <PostJob />,
  },
  {
    path: "/admin/jobs/applicants/:id",
    element: <Applicants />,
  },
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={AppRouter} />
    </div>
  );
};

export default App;
