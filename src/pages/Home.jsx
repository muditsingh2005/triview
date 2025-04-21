import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/appwriteconfig";
import { Container, PostCard } from "../components";
import { motion } from "framer-motion";
import { Search, Map, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animations
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

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-16 md:mt-24 text-center">
        <Container>
          <div className="max-w-2xl mx-auto">
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Join our community of travelers
            </motion.h1>
            <motion.p
              className="text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Sign up or log in to explore authentic travel stories and share
              your own adventures
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                to="/login"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center mr-4"
              >
                Login to continue
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 mt-16 md:mt-24">
      <Container>
        {/* Hero section */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover Travel Stories
          </h1>
          <p className="text-gray-600 mb-8">
            Explore authentic experiences shared by our community of passionate
            travelers
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="Search stories by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Posts grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredPosts.map((post) => (
            <motion.div key={post.$id} variants={item} className="h-full">
              <PostCard {...post} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state for search */}
        {filteredPosts.length === 0 && searchTerm && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No stories found
            </h3>
            <p className="text-gray-600">
              We couldn't find any stories matching "{searchTerm}". Try a
              different search term.
            </p>
          </motion.div>
        )}
      </Container>
    </div>
  );
}

export default Home;
