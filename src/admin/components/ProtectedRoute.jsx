import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if token exists in LocalStorage
  const token = localStorage.getItem("token");

  // Agar token nahi hai, to Login page par bhej do
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  // Agar token hai, to Admin Page dikhao
  return children;
};

export default ProtectedRoute;