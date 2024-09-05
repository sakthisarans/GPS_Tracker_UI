import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import LoadingComponent from "../components/Loading/LoadingComponent";

export const ProtectedRoute = () => {
  const { isauth }:any = useAuth();
  if(isauth===undefined){
    return <LoadingComponent />;
  }
  else if (isauth===false) {
    return <Navigate to="/login" />;
  }
  return <Outlet />
};