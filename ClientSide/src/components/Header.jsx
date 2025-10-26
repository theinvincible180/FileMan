import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

function Header({setActiveTab}) {
  const [mode, setModeState] = useState("light");
  const [theme, setThemeState] = useState("pink");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "pink";
    const savedMode = localStorage.getItem("mode") || "light";
    setThemeState(savedTheme);
    setModeState(savedMode);
    document.body.setAttribute("data-theme", savedTheme);
    if (savedMode === "dark") {
    document.documentElement.classList.add("dark");
  }
  }, []);

  const setTheme = (newTheme) => {
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
  };

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    document.body.setAttribute("data-mode", newMode);
    localStorage.setItem("mode", newMode);
    setModeState(newMode);

    if (newMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const colorMap = {
    pink: "bg-pink-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  return (
  <header className="hidden sm:flex fixed top-0 left-0 w-full px-6 py-3 bg-white dark:bg-gray-800 shadow-md z-50 items-center justify-between text-black dark:text-white">
    
    {/* Left Side: Logo */}
    <div className="flex items-center space-x-2">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
        <span
          className={`text-xl sm:text-2xl font-bold text-[var(--primary-text)] ${
            mode === "dark" ? "dark:text-white" : "light:text-black"
          }`}
        >
          FileMan
        </span>
      </Link>
    </div>

    {/* Right Side */}
    <div className="flex items-center space-x-3 sm:space-x-5">
      {/* Theme Toggle */}
      <button
        onClick={toggleMode}
        className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-purple-500 dark:hover:bg-white transition"
        title="Toggle theme"
      >
        {mode === "light" ? "🌞" : "🌙"}
      </button>

      {/* Theme Colors */}
      {/* <div className="hidden sm:flex space-x-2">
        {Object.keys(colorMap).map((c) => (
          <button
            key={c}
            onClick={() => setTheme(c)}
            className={`w-6 h-6 rounded-full ${colorMap[c]} border-2 transition ${
              theme === c
                ? "border-black dark:border-white scale-110"
                : "border-transparent"
            }`}
          />
        ))}
      </div> */}

      {/* Auth Buttons */}
      {!user ? (
        <>
        <Link
        to="/signup"
        className={`px-3 sm:px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-sm sm:text-base hover:bg-blue-500 hover:text-white transition ${
          mode === "dark" ? "dark:text-white" : "light:text-black"
        }`}
      >
        Sign Up
      </Link>
      <Link
        to="/login"
        className={`px-3 sm:px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-sm sm:text-base hover:bg-purple-500 hover:text-white transition ${
          mode === "dark" ? "dark:text-white" : "light:text-black"
        }`}
      >
        Log In
      </Link>
        </>
      ) :(
        <div
        onClick={() => setActiveTab("profile")}
        className="flex items-center gap-2 pl-2 pr-4 py-1 rounded-full cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-purple-500 hover:text-white transition text-black dark:text-white"
      >
        <img
          src={user?.profilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full border border-gray-300 object-cover"
        />
        <span className="font-medium">{user.fullName}</span>
      </div>
      )}
    </div>
  </header>
);

}

export default Header;
