import React from "react";
import appwriteService from "../appwrite/appwriteconfig";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

function PostCard({ $id, title, featuredimage, userId, $createdAt }) {
  // Format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Create truncated title if too long
  const truncateTitle = (text, maxLength = 60) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/post/${$id}`} className="block h-full">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
          <div className="relative overflow-hidden">
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>

            <img
              src={appwriteService.getFilePreview(featuredimage)}
              alt={title}
              className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 hover:text-emerald-600 transition-colors">
              {truncateTitle(title)}
            </h2>

            <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate($createdAt)}</span>
              </div>

              <motion.div
                className="text-emerald-600 flex items-center font-medium"
                whileHover={{ x: 3 }}
              >
                Read more <ArrowRight className="w-4 h-4 ml-1" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default PostCard;
