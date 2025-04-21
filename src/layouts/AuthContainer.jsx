import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function AuthContainer({ children }) {
  // Check if user is already authenticated
  const authStatus = useSelector((state) => state.auth.status);

  // If user is already logged in, redirect to home
  if (authStatus) {
    return <Navigate to="/" />;
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
