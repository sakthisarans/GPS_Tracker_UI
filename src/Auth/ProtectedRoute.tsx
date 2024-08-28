import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = () => {
  const { isauth }:any = useAuth();
  if (!isauth) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};