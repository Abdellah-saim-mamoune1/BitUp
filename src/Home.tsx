import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./assets/Logo.jpg";
export function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    src={Logo} // 🔹 replace with your actual image path
    alt="Logo"
    className="w-10 h-10 cursor-pointer rounded-full shadow-md object-cover"
  />
  
</motion.div>


        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center font-medium">
          {["Home", "Workshops", "Contact Us"].map((item, i) => (
            <motion.li
              key={i}
              className="hover:text-[#a517a5] transition cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              {item}
            </motion.li>
          ))}
          <motion.li whileHover={{ scale: 1.1 }}>
            <button className="bg-[#a517a5] text-white px-4 py-2 rounded-lg hover:bg-[#8c0e90] transition">
              Register
            </button>
          </motion.li>
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-[#a517a5] p-2 rounded-lg text-white hover:bg-[#8c0e90] transition"
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
                <a
                  key={i}
                  href="#"
                  className="hover:text-[#a517a5] transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => setMenuOpen(false)}
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
        className="relative w-full h-[75vh] bg-cover bg-center flex items-center justify-center mt-16"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=80)",
        }}
      >
     <div className="absolute inset-0 bg-gradient-to-t from-[#1a002b]/95 via-[#3b0066]/90 to-[#a517a5]/80"></div>



        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-snug drop-shadow-lg">
            Develop Your Skills in 8 Days
          </h1>
          <motion.button
            className="bg-white text-[#a517a5] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            See The Workshops
          </motion.button>
        </motion.div>
      </section>

      {/* Workshops Section */}
      <section className="py-20 px-4 md:px-12 bg-purple-100 text-center">
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-[#a517a5] mb-4"
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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Web Development",
              desc: "Learn HTML, CSS, JavaScript, and modern frameworks like React.",
            },
            {
              title: "Data Science",
              desc: "Dive into Python, data analysis, and machine learning techniques.",
            },
            {
              title: "UI/UX Design",
              desc: "Master design tools and create beautiful, user-friendly interfaces.",
            },
          ].map((workshop, i) => (
            <motion.div
              key={i}
              className="bg-[#b955bd] shadow-lg rounded-xl p-6 hover:scale-[1.05] hover:shadow-2xl transition-transform"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {workshop.title}
              </h3>
              <p className="text-white leading-relaxed">{workshop.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-white text-center py-6 text-sm md:text-base"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        © {new Date().getFullYear()} OurWebsite. All rights reserved.
      </motion.footer>
    </div>
  );
}
