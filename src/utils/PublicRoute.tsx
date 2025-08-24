import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "@/store"; // adjust to your store path
import type { ReactElement } from "react";

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  if (token && user) {
    // Already logged in → redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
