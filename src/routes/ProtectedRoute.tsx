import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) return null;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
