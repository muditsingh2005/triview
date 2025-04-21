import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/appwriteconfig";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Edit,
  Trash2,
  MessageCircle,
  Heart,
  Share2,
} from "lucide-react";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    setLoading(true);
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate reading time (rough estimate)
  const calculateReadingTime = (content) => {
    // Remove HTML tags for word count
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    const wordsPerMinute = 200;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime > 0 ? readingTime : 1; // At least 1 minute
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return post ? (
    <motion.div
      className="py-8 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero image with title overlay */}
      <div className="relative w-full h-[50vh] mb-8">
        <div className="absolute inset-0">
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <Container>
          <div className="relative h-full flex flex-col justify-end pb-12">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              className="flex flex-wrap items-center text-white/80 gap-4 text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(post.$createdAt)}
              </div>

              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {calculateReadingTime(post.content)} min read
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <motion.div
            className="w-full md:w-2/3 lg:w-3/4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <article className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-emerald-600">
              {parse(post.content)}
            </article>

            {/* Actions bar */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.button
                    className="flex items-center gap-1 text-gray-500 hover:text-emerald-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className="w-5 h-5" />
                    <span>Like</span>
                  </motion.button>

                  <motion.button
                    className="flex items-center gap-1 text-gray-500 hover:text-emerald-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Comment</span>
                  </motion.button>

                  <motion.button
                    className="flex items-center gap-1 text-gray-500 hover:text-emerald-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </motion.button>
                </div>

                {isAuthor && (
                  <div className="flex items-center gap-2">
                    <Link to={`/edit-post/${post.$id}`}>
                      <Button
                        bgColor="bg-emerald-500 hover:bg-emerald-600"
                        className="flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      bgColor="bg-red-500 hover:bg-red-600"
                      onClick={deletePost}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Comments section (UI only) */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Comments</h3>

              <div className="mb-6">
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  placeholder="Leave a comment..."
                  rows={4}
                ></textarea>
                <motion.button
                  className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Post Comment
                </motion.button>
              </div>

              {/* Placeholder comments */}
              <div className="space-y-6">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex gap-4 pb-6 border-b border-gray-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">Anonymous User</h4>
                        <span className="text-sm text-gray-500">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-gray-600">
                        This is a placeholder comment. The comment functionality
                        is not implemented yet.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="w-full md:w-1/3 lg:w-1/4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
              <p className="text-gray-500 text-sm">
                Explore more travel stories like this one.
              </p>

              <div className="mt-6 space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-sm line-clamp-2">
                        Placeholder Related Post Title
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {["Travel", "Adventure", "Photography", "Nature"].map(
                    (tag) => (
                      <div
                        key={tag}
                        className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
                      >
                        {tag}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  ) : null;
}
