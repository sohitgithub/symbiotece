import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("adminAuth");

  if (!isAuth) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
