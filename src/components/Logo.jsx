import React from "react";
import { Globe, Compass } from "lucide-react";
import { motion } from "framer-motion";

function Logo({ width = "100px", className = "" }) {
  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      style={{ width }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <Globe className="text-emerald-600 w-8 h-8" strokeWidth={1.5} />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Compass className="text-emerald-500 w-5 h-5" strokeWidth={1.5} />
        </motion.div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xl leading-tight text-gray-800">
          Tri<span className="text-emerald-600">View</span>
        </span>
      </div>
    </motion.div>
  );
}

export default Logo;
