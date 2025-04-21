import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { Container } from "../index";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

function Footer() {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand section */}
          <motion.div
            className="md:col-span-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="mb-6">
              <Logo width="120px" />
            </div>
            <p className="text-gray-400 mb-6">
              Share your travel experiences with the world and discover amazing
              destinations through authentic stories.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            className="md:col-span-2"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <FooterLink to="/home">Home</FooterLink>
              <FooterLink to="/all-posts">Browse Stories</FooterLink>
              <FooterLink to="/add-post">Share Your Story</FooterLink>
              <FooterLink to="/">About Us</FooterLink>
            </ul>
          </motion.div>

          <motion.div
            className="md:col-span-2"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Help Center</FooterLink>
              <FooterLink to="/">Safety Center</FooterLink>
              <FooterLink to="/">Community Guidelines</FooterLink>
              <FooterLink to="/">Contact Us</FooterLink>
            </ul>
          </motion.div>

          <motion.div
            className="md:col-span-2"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Terms of Service</FooterLink>
              <FooterLink to="/">Privacy Policy</FooterLink>
              <FooterLink to="/">Cookie Policy</FooterLink>
              <FooterLink to="/">Content Policy</FooterLink>
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="md:col-span-2"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Travel Street, Adventure City
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-400">hello@travelshare.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            &copy; {new Date().getFullYear()} TravelShare. All rights reserved.
          </p>
        </motion.div>
      </Container>
    </footer>
  );
}

// Helper components
function SocialIcon({ icon }) {
  return (
    <motion.a
      href="#"
      className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-400 hover:text-emerald-400 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

export default Footer;
