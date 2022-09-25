import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuthContext();

  if (currentUser.role !== "Admin") return <Navigate to="/" replace />
  else return children;
}