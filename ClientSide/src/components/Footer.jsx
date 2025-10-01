import React, { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Mail, Home, Folder, Diamond, Plus, Sun, Moon } from "lucide-react";

function Footer({ setActiveTab }) {
  const [mode, setMode] = useState("light");

  // Toggle theme mode
  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    document.documentElement.classList.toggle("dark", newMode === "dark"); // Apply Tailwind dark mode
  };

  const socialIcons = [
    { href: "https://www.linkedin.com/in/aniketpandey180", icon: <Linkedin size={20} /> },
    { href: "https://github.com/theinvincible180", icon: <Github size={20} /> },
    { href: "https://www.instagram.com/_invincible180/", icon: <Instagram size={20} /> },
    { href: "mailto:pandeyaniket701@gmail.com", icon: <Mail size={20} /> },
  ];

  const ActiveTabHandler = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Desktop Footer */}
      <footer className="hidden sm:flex fixed bottom-0 left-0 w-full py-3 px-8 backdrop-blur-lg bg-white/40 dark:bg-black/30 text-gray-800 dark:text-gray-200 shadow-inner flex-col md:flex-row items-center justify-between border-t border-gray-300/30 dark:border-gray-700/40 opacity-100">
  {/* Left Section */}
  <p className="text-sm md:text-base font-medium text-center md:text-left">
    Crafted with ❤️ by{" "}
    <span className="font-semibold text-blue-600 dark:text-blue-400">
      Aniket Pandey
    </span>
  </p>

  {/* Right Section - Social Icons */}
  <div className="flex items-center gap-4 mt-4 md:mt-0">
    {socialIcons.map((icon, i) => (
      <motion.a
        key={i}
        href={icon.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Social link"
        className="w-9 h-9 rounded-full flex items-center justify-center 
                   text-gray-600 dark:text-gray-300 
                   hover:bg-gray-200 dark:hover:bg-gray-700/60 
                   hover:text-blue-500 
                   transition-all duration-300"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        {icon.icon}
      </motion.a>
    ))}
  </div>
</footer>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-t z-50 flex justify-around items-center py-2">
        <div onClick={() => ActiveTabHandler("home")} className="flex flex-col items-center cursor-pointer">
          <Home size={22} /> <span className="text-xs">Home</span>
        </div>
        <div onClick={() => ActiveTabHandler("files")} className="flex flex-col items-center cursor-pointer">
          <Folder size={22} /> <span className="text-xs">My Files</span>
        </div>
        <motion.div
          onClick={() => ActiveTabHandler("upload")}
          className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={28} />
        </motion.div>
        <div onClick={() => ActiveTabHandler("plans")} className="flex flex-col items-center cursor-pointer">
          <Diamond size={22} /> <span className="text-xs">Plans</span>
        </div>
        <button onClick={toggleMode} className="flex flex-col items-center">
          {mode === "light" ? <Sun size={22} /> : <Moon size={22} />}
          <span className="text-xs">Mode</span>
        </button>
      </div>
    </>
  );
}

export default Footer;
