import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "./assets/Logo.jpg";
import BgImage from "./assets/BgHomeImage.jpg";

// Icons
import { Code, Palette, PenTool, MonitorSmartphone, Layers, Github } from "lucide-react";

export function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const workshopsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-purple-50 text-purple-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed w-full top-0 z-50">
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-10 h-10 cursor-pointer rounded-full shadow-md object-cover"
          />
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-black font-medium">
          <motion.li
            className="hover:text-[#a517a5] transition cursor-pointer font-semibold"
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/")}
          >
            Home
          </motion.li>

          <motion.li
            className="hover:text-[#a517a5] transition cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => workshopsRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            Workshops
          </motion.li>

          <motion.li
            className="hover:text-[#a517a5] transition cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Us
          </motion.li>

          <motion.li whileHover={{ scale: 1.1 }}>
            <button className="bg-[#a517a5] text-white px-4 py-2 rounded-lg hover:bg-[#8c0e90] transition">
              Register
            </button>
          </motion.li>
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden rounded-lg text-black hover:bg-[#8c0e90] transition"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-4 font-medium text-gray-800 md:hidden"
            >
              {["Home", "Workshops", "Contact Us"].map((item, i) => (
                <button
                  key={i}
                  className="hover:text-[#a517a5] transition"
                  onClick={() => {
                    setMenuOpen(false);
                    if (item === "Workshops") {
                      workshopsRef.current?.scrollIntoView({ behavior: "smooth" });
                    } else if (item === "Contact Us") {
                      contactRef.current?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      navigate("/");
                    }
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
                className="bg-[#a517a5] text-white px-4 py-2 rounded-lg hover:bg-[#8c0e90] transition"
              >
                Register
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        className="relative w-full h-[80vh] flex items-center justify-center mt-16 overflow-hidden"
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          className="relative z-10 text-center text-white px-6 sm:px-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-snug drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
            Develop Your Skills in 8 Days
          </h1>
          <motion.button
            className="text-white bg-[#a517a5] px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              workshopsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            See The Workshops
          </motion.button>
        </motion.div>
      </section>

      {/* Workshops Section */}
      <section
        ref={workshopsRef}
        className="py-20 px-4 md:px-12 bg-purple-100 text-center"
      >
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-black mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Workshops
        </motion.h2>
        <motion.p
          className="text-gray-700 font-medium mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Discover the skills you'll learn
        </motion.p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto  sm:px-8 md:px-0">
  {[
    { title: "HTML", desc: "Build the structure of web pages.", icon: <Code size={48} /> },
    { title: "CSS", desc: "Style and layout your websites beautifully.", icon: <Layers size={48} /> },
    { title: "JavaScript", desc: "Make your pages dynamic and interactive.", icon: <MonitorSmartphone size={48} /> },
    { title: "UI/UX Design", desc: "Design seamless and engaging experiences.", icon: <PenTool size={48} /> },
    { title: "Graphic Design", desc: "Craft powerful visuals and identities.", icon: <Palette size={48} /> },
    { title: "Tools (GitHub)", desc: "Collaborate and manage versions easily.", icon: <Github size={48} /> },
  ].map((workshop, i) => (
    <motion.div
      key={i}
      className="bg-gradient-to-br from-[#a041a3] to-[#8a2e8c] shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.15, duration: 0.6 }}
    >
      <div className="flex flex-col items-center mb-4 text-white">
        <div className="mb-3">{workshop.icon}</div>
        <h3 className="text-xl sm:text-2xl font-semibold">{workshop.title}</h3>
      </div>
      <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xs">
        {workshop.desc}
      </p>
    </motion.div>
  ))}
</div>

      </section>

      {/* Registration Section */}
      <section className="pt-2 pb-10 text-black px-6 text-center bg-purple-100">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready To Get Started?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl font-semibold mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Join our Bootcamp and learn how to turn your skills into real-world projects.
        </motion.p>
        <motion.button
          className="text-white bg-[#a517a5] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/register")}
        >
          REGISTER NOW!
        </motion.button>
      </section>

      {/* Footer (Contact Section) */}
      <motion.footer
        ref={contactRef}
        className="bg-purple-100 text-black text-center py-10 px-6 border-t border-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-lg font-semibold mb-6">
          <a href="mailto:example@email.com" className="hover:text-purple-400 transition">
            Email
          </a>
          <a href="https://instagram.com" target="_blank" className="hover:text-purple-400 transition">
            Instagram
          </a>
          <a href="https://discord.com" target="_blank" className="hover:text-purple-400 transition">
            Discord
          </a>
        </div>
      </motion.footer>
    </div>
  );
}
