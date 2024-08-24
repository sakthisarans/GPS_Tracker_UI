import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = () => {
  const { isauth }:any = useAuth();
  console.log(isauth)
  if (!isauth) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};