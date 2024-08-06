import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/loginSignup/LoginPage";
import AboutUs from "./pages/AboutUs/AboutUs";
import axios from "axios";

const authenticate =  async () => {
  console.log(process.env.REACT_APP_BASE_URL)
  const token = localStorage.getItem("Token")
  const validateToken = async (): Promise<boolean> => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/user/validateToken`, {
      headers: {
        "Authorization": token
      }
    })
    return (res && res.status === 200);

  }
  if (!token) {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("Token");
    return <Navigate to="/login" />;
  } else {
    if (await validateToken()) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return <Outlet />;
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("Token");
      return <Navigate to="/login" />;
    }
  }
}
const Routes = () => {
  const routesForPublic = [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/aboutus",
      element: <AboutUs />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: authenticate(),
      children: [
        {
          path: "/home",
          element: <div>User Home Page</div>,
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