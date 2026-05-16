import { Navigate } from "react-router";
import { useAuth } from "./useAuth";
import type { JSX } from "react";
import LoadingPage from "../components/LoadingPage";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingPage />;
  if (!user) return <Navigate to="/" replace />;

  return children;
};

export default RequireAuth;
