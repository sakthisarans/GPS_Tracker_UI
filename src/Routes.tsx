import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/loginSignup/LoginPage";
import AboutUs from "./pages/AboutUs/AboutUs";
// import axios from "axios";
import NotFound from "./pages/error/NotFound";
import HomePage from "./pages/Home/HomePage";
import { ProtectedRoute } from "./Auth/ProtectedRoute";

// const authenticate = () => {
//   let token = localStorage.getItem("Token")
//   const validateToken = (): Promise<boolean> | boolean => {
//     return axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/user/validateToken`, {
//       headers: {
//         Authorization: token,
//       },
//     }).then((res) => {
//       return res && res.status === 200;
//     }).catch((err) => {
//       return false;
//     });
//   }
//   if (token==null) {
//     delete axios.defaults.headers.common["Authorization"];
//     localStorage.removeItem("Token");
//     return <Navigate to="/login" />;
//   } else {
//     if (validateToken()) {
//       axios.defaults.headers.common["Authorization"] = token;
//       return <Outlet />;
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//       console.log("clear")
//       localStorage.clear();
//       return <Navigate to="/login" />;
//     }
//   }
// }
const Routes = () => {
  const routesForPublic = [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <p>sign up</p>,
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