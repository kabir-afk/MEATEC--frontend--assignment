import { useContext, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) return children;
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
