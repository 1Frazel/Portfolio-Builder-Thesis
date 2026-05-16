import { Navigate } from "react-router";
import { useAuth } from "./useAuth";
import type { JSX } from "react";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  return children;
};

export default RequireAuth;
