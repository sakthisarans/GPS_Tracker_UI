import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

const authenticate = () =>{
    const token = false;
    if (!token) {
      return <Navigate to="/login" />;
    }else{
    return <Outlet />;
    }
}
const Routes = () =>{
    const routesForPublic = [
        {
          path: "/login",
          element: <div>Service Page</div>,
        },
        {
          path: "/aboutus",
          element: <div>About Us</div>,
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