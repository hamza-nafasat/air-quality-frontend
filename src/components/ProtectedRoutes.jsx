/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect} replace />;
  return children;
};

export default ProtectedRoute;
