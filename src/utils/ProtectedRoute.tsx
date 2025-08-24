import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "@/store"; // adjust to your store path
import type { ReactElement } from "react";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  if (!token || !user) {
    // Not logged in → redirect
    return <Navigate to="/login" replace />;
  }

  // Logged in → render child component
  return children;
};

export default ProtectedRoute;
