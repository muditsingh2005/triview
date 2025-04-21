import React from "react";
import { motion } from "framer-motion";

function Button({
  children,
  type = "button",
  bgColor = "bg-emerald-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <motion.button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium ${bgColor} ${textColor} ${className} transition-colors hover:shadow-md`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
