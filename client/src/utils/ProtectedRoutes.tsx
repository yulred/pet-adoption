import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const UserRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoading, currentUser } = useAuthContext();

  if (!isLoading && !Object.keys(currentUser).length) return <Navigate to="/" replace />
  return children;
}

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoading, currentUser } = useAuthContext();

  if (!isLoading && currentUser.role !== "Admin") return <Navigate to="/" replace />
  return children;
}