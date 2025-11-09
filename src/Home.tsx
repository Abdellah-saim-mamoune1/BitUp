import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "./assets/Logo.png";
import BgImage from "./assets/BgHomeImage.jpg";
import {
  Code,
  Palette,
  PenTool,
  MonitorSmartphone,
  Layers,
  Github,
  Database,
  Server,
  Terminal,
} from "lucide-react";

import { Code2,Instagram, Mail, MessageCircle } from "lucide-react";
import { Cpu } from "lucide-react";
export function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const workshopsRef = useRef<HTMLElement >(null);
  const contactRef = useRef<HTMLElement >(null);

  const scrollTo = (ref: React.RefObject<HTMLElement|null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen flex flex-col bg-purple-50 text-purple-900 scroll-smooth">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 bg-white shadow-sm sticky w-full top-0 z-50 border-b border-purple-100 backdrop-blur-md bg-opacity-90">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={Logo}
            alt="Bootcamp Logo"
            className="w-16 h-16 cursor-pointer"
            onClick={() => navigate("/")}
          />
         
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center text-gray-800 font-medium">
          {["Home", "Workshops", "Contact"].map((item, i) => (
            <motion.li
              key={i}
              className="hover:text-[#a517a5] transition cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                if (item === "Workshops") scrollTo(workshopsRef);
                else if (item === "Contact") scrollTo(contactRef);
                else navigate("/");
              }}
            >
              {item}
            </motion.li>
          ))}
          <motion.li whileHover={{ scale: 1.05 }}>
            <button
              onClick={() => navigate("/register")}
              className="bg-[#a517a5] text-white px-4 py-2 rounded-lg hover:bg-[#8c0e90] transition font-semibold"
            >
              Register
            </button>
          </motion.li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden rounded-lg text-gray-800 hover:text-[#a517a5] transition"
          aria-label="Toggle Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-15 left-0 w-full bg-white border-t border-gray-200 flex flex-col items-center gap-4 py-4 font-medium text-gray-800 md:hidden shadow-lg"
            >
              {["Home", "Workshops", "Contact"].map((item, i) => (
                <button
                  key={i}
                  className="hover:text-[#a517a5] transition text-lg"
                  onClick={() => {
                    setMenuOpen(false);
                    if (item === "Workshops") scrollTo(workshopsRef);
                    else if (item === "Contact") scrollTo(contactRef);
                    else navigate("/");
                  }}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/register");
                }}
                className="bg-[#a517a5] text-white px-6 py-2 rounded-lg hover:bg-[#8c0e90] transition font-semibold"
              >
                Register
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        className="flex items-center justify-center text-center h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" inset-0 bg-black/50" />
        <motion.div
          className="relative z-10 text-white px-6 sm:px-10 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6 drop-shadow-xl">
            Choose Your Path — Frontend or Backend
          </h1>
          <p className="text-sm sm:text-xl text-white/90 mb-8">
            Master full-stack development in our immersive 8-day bootcamp experience.
          </p>
          <motion.button
            onClick={() => scrollTo(workshopsRef)}
            className="bg-[#a517a5] hover:bg-[#8c0e90] text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            Explore Bootcamps
          </motion.button>
        </motion.div>
      </section>

      {/* Workshops Section */}
      <section
        ref={workshopsRef}
        className="py-24 px-6 md:px-12 bg-purple-100 text-center"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#3d1f66] mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Bootcamp Tracks
        </motion.h2>
        <p className="text-gray-700 mb-16 text-lg max-w-2xl mx-auto">
          Choose between our specialized Frontend or Backend bootcamps — each packed with practical workshops to make you industry-ready.
        </p>

        <div className="space-y-24">
          {/* Frontend Bootcamp */}
          <div>
            <h3 className="text-2xl flex gap-2 items-center justify-center md:text-3xl font-bold text-[#a517a5] mb-10">
              <Code2/> Frontend
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { title: "HTML", desc: "Structure web content efficiently.", icon: <Code size={42} /> },
                { title: "CSS", desc: "Design responsive and elegant layouts.", icon: <Layers size={42} /> },
                { title: "JavaScript", desc: "Bring interactivity and motion to life.", icon: <MonitorSmartphone size={42} /> },
                { title: "UI/UX", desc: "Craft user-friendly interfaces.", icon: <PenTool size={42} /> },
                { title: "Graphic Design", desc: "Visual storytelling through design.", icon: <Palette size={42} /> },
                { title: "GitHub", desc: "Version control and teamwork mastery.", icon: <Github size={42} /> },
              ].map((w, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-br from-[#a041a3] to-[#8a2e8c] text-white rounded-2xl shadow-lg p-6 sm:p-8 hover:scale-[1.04] transition"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-3">{w.icon}</div>
                    <h4 className="text-xl font-semibold mb-2">{w.title}</h4>
                    <p className="text-white/90 text-sm">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Backend Bootcamp */}
          <div>
            <h3 className="flex gap-2 items-center justify-center text-2xl md:text-3xl font-bold text-[#3d1f66] mb-10">
              <Cpu/> Backend
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { title: "Node.js", desc: "Create high-performance backend systems.", icon: <Server size={42} /> },
                { title: "Databases", desc: "Manage and query data effectively.", icon: <Database size={42} /> },
                { title: "APIs", desc: "Build scalable RESTful services.", icon: <Terminal size={42} /> },
                { title: "Authentication", desc: "Secure user data and sessions.", icon: <Code size={42} /> },
                { title: "Deployment", desc: "Launch your apps to production.", icon: <Github size={42} /> },
                { title: "Best Practices", desc: "Clean code & maintainable architecture.", icon: <Layers size={42} /> },
              ].map((w, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-br from-[#3d1f66] to-[#2a1548] text-white rounded-2xl shadow-lg p-6 sm:p-8 hover:scale-[1.04] transition"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-3">{w.icon}</div>
                    <h4 className="text-xl font-semibold mb-2">{w.title}</h4>
                    <p className="text-white/90 text-sm">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 text-center bg-gradient-to-br from-purple-200 to-purple-300">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#3d1f66] mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Start Your Coding Journey?
        </motion.h2>
        <p className="text-gray-700 mb-10 max-w-2xl mx-auto text-lg">
          Pick your bootcamp, develop real projects, and become a professional developer in just 8 days!
        </p>
        <motion.button
          className="bg-[#a517a5] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8c0e90] shadow-lg transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/register")}
        >
          Register Now
        </motion.button>
      </section>

      {/* Footer */}
      <footer
        ref={contactRef}
        className="bg-white text-black text-center py-12 px-6 border-t border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#3d1f66]">Contact Us</h2>
        <div className="flex flex-wrap justify-center gap-6 text-base md:text-lg font-medium">
          <a href="mailto:info@devbootcamp.com" className="flex gap-2 hover:text-[#a517a5] transition">
            <MessageCircle/> Discord
          </a>
          <a href="https://instagram.com" target="_blank" className="hover:text-[#a517a5] transition flex gap-2">
            <Instagram /> Instagram
          </a>
          <a href="https://discord.com" target="_blank" className="flex gap-2 hover:text-[#a517a5] transition">
            <Mail/> Email
          </a>
        </div>
        <p className="text-gray-500 mt-8 text-sm">© 2025 DevBootcamp. All rights reserved.</p>
      </footer>
    </div>
  );
}
