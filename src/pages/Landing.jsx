import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components";
import { useSelector } from "react-redux";
import {
  ChevronRight,
  Globe,
  Map,
  Camera,
  Star,
  Users,
  MessageCircle,
} from "lucide-react";

export default function Landing() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (authStatus) {
      navigate("/home");
    } else {
      navigate("/signup");
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: <Globe className="w-12 h-12 text-emerald-500" />,
      title: "Explore Destinations",
      description:
        "Discover amazing places through the eyes of fellow travelers.",
    },
    {
      icon: <Camera className="w-12 h-12 text-emerald-500" />,
      title: "Share Memories",
      description:
        "Post your favorite travel photos and stories with the community.",
    },
    {
      icon: <Map className="w-12 h-12 text-emerald-500" />,
      title: "Find Hidden Gems",
      description:
        "Learn about lesser-known spots from experienced adventurers.",
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-emerald-500" />,
      title: "Connect with Travelers",
      description:
        "Engage with a community that shares your passion for exploration.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Paris, France",
      quote:
        "This platform helped me discover amazing hidden cafés in Paris that I would have never found in guidebooks!",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "James Wilson",
      location: "Bali, Indonesia",
      quote:
        "I've been using this site to document my year-long backpacking trip. The community feedback has been incredible!",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Mia Chen",
      location: "Tokyo, Japan",
      quote:
        "The travel tips I found here made my Tokyo trip so much more authentic and enjoyable.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Travel landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-50"></div>
        </div>

        <Container>
          <div className="relative z-10 text-white max-w-2xl">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Share Your Journey, Inspire Others
            </motion.h1>

            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join a community of passionate travelers sharing authentic
              experiences from around the world.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                onClick={handleGetStarted}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {authStatus ? "Go to Home" : "Get Started"}
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.button>

              <Link to="/all-posts">
                <motion.button
                  className="bg-white/30 hover:bg-white/40 text-white border border-white/40 px-8 py-3 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Stories
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Why Share Your Travels
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform gives you everything you need to document and share
              your travel experiences
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={fadeIn}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <Container>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our community in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-emerald-200 z-0"></div>

            {/* Steps */}
            {[
              {
                number: "01",
                title: "Create an account",
                description:
                  "Sign up and set up your traveler profile in seconds",
                delay: 0,
              },
              {
                number: "02",
                title: "Share your experiences",
                description: "Upload photos and write about your adventures",
                delay: 0.2,
              },
              {
                number: "03",
                title: "Connect with others",
                description: "Discover new places through others' experiences",
                delay: 0.4,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: step.delay }}
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600 font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <Container>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              What Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our community members around the world
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/signup">
              <motion.button
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Our Community
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
