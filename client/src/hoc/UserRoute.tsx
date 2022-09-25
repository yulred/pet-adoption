import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const UserRoute = ({ children }: { children: JSX.Element }) => {
  const { isActiveSession } = useAuthContext();

  if (!isActiveSession) return <Navigate to="/" replace />
  else return children;
}