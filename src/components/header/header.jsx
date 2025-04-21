import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      slug: "/home",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  // Animation variants
  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  return (
    <header
      className={`py-4 w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isLandingPage ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-6">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) =>
              item.active ? (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === item.slug
                        ? "bg-emerald-100 text-emerald-700"
                        : isScrolled || !isLandingPage
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ) : null
            )}
            {authStatus && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogoutBtn />
              </motion.div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${
                isScrolled || !isLandingPage ? "text-gray-700" : "text-white"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
          initial="closed"
          animate={mobileMenuOpen ? "open" : "closed"}
          variants={menuVariants}
        >
          <motion.div className="flex flex-col space-y-1 py-4">
            {navItems.map((item) =>
              item.active ? (
                <motion.button
                  key={item.name}
                  onClick={() => {
                    navigate(item.slug);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-left text-sm font-medium ${
                    location.pathname === item.slug
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  variants={itemVariants}
                >
                  {item.name}
                </motion.button>
              ) : null
            )}
            {authStatus && (
              <motion.div variants={itemVariants}>
                <LogoutBtn className="w-full px-4 py-3 rounded-lg text-left text-sm font-medium text-gray-700 hover:bg-gray-100" />
              </motion.div>
            )}
          </motion.div>
        </motion.nav>
      </Container>
    </header>
  );
}

export default Header;
