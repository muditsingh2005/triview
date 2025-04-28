import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/appwriteconfig";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { User, BookOpen, Calendar } from "lucide-react";
import { Query } from "appwrite";

function MyProfile() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      setLoading(true);
      appwriteService
        .getPosts([Query.equal("userId", userData.$id)])
        .then((posts) => {
          if (posts) {
            setPosts(posts.documents);
          }
          setLoading(false);
        });
    }
  }, [userData]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Format join date
  const formatJoinDate = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="w-full py-8 mt-16 md:mt-24 text-center">
        <Container>
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 mt-16 md:mt-24">
      <Container>
        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-12 h-12 text-emerald-600" />
            </div>

            {/* User Info */}
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {userData.name}
              </h1>
              <p className="text-gray-500 mb-4">{userData.email}</p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <div className="flex items-center text-gray-700">
                  <BookOpen className="w-5 h-5 mr-2 text-emerald-500" />
                  <span className="font-medium">{posts.length}</span>
                  <span className="ml-1 text-gray-500">posts</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-2 text-emerald-500" />
                  <span className="text-gray-500">
                    Joined {formatJoinDate(userData.$createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Posts</h2>
          {posts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {posts.map((post) => (
                <motion.div key={post.$id} variants={item} className="h-full">
                  <PostCard {...post} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12 bg-white rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600">
                Start sharing your adventures with the community
              </p>
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default MyProfile;
