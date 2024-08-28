import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/loginSignup/LoginPage";
import AboutUs from "./pages/AboutUs/AboutUs";
// import axios from "axios";
import NotFound from "./pages/error/NotFound";
import HomePage from "./pages/Home/HomePage";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import SignupPage from "./pages/loginSignup/SignupPage";

const Routes = () => {
  const routesForPublic = [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/aboutus",
      element: <AboutUs />,
    },
    {
      path:"*",
      element: <NotFound/>
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      // element: authenticate(),
      element: <ProtectedRoute />,
      children: [
        {
          index: true,
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <div>logout Profile</div>,
        },
      ],
    },
  ];
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);
  return <RouterProvider router={router} />;
}

export default Routes;