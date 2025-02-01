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
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={AppRouter} />
    </div>
  );
};

export default App;
