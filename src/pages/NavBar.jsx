import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const links = [
    { name: "Home", href: "/" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  const handleAuthClick = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-b border-yellow-500/40 shadow-[0_0_20px_rgba(255,215,0,0.4)] px-5 py-3 flex justify-between items-center">
      {/* Brand / Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-3xl sm:text-4xl font-extrabold text-yellow-400 tracking-wide cursor-pointer drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] hover:scale-105 transition-transform duration-300"
      >
        WARSKY<span className="text-red-500"> FF</span>
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 text-lg font-semibold">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-yellow-400 hover:text-red-500 transition duration-300 relative group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={handleAuthClick}
            className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-5 py-2 rounded-xl font-bold shadow-[0_0_15px_rgba(255,215,0,0.7)] hover:shadow-[0_0_25px_rgba(255,0,0,0.9)] transition"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-yellow-400 text-3xl focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute left-0 top-full w-full bg-[#0a0a0a]/95 backdrop-blur-md border-t border-yellow-400/30 md:hidden flex flex-col items-center gap-4 py-6 transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-5 invisible"
        }`}
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-yellow-400 hover:text-red-500 font-semibold text-lg transition duration-300"
          >
            {link.name}
          </a>
        ))}
        <button
          onClick={() => {
            handleAuthClick();
            setIsOpen(false);
          }}
          className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-6 py-2 rounded-xl font-bold shadow-[0_0_15px_rgba(255,215,0,0.7)] hover:shadow-[0_0_25px_rgba(255,0,0,0.9)] transition"
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
