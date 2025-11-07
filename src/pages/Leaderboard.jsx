import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import BaseURl from "../BaseURl";

const LoginUser = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${BaseURl}/login`, formData);

      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      setMessage("✅ Login successful! Redirecting...");
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "❌ Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-black text-white">
      <div className="bg-[#111]/90 backdrop-blur-md border border-[#FF4D00]/40 rounded-2xl shadow-[0_0_30px_rgba(255,77,0,0.4)] w-full max-w-md p-8 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] via-[#FFB800] to-[#00C2FF] drop-shadow-[0_0_20px_rgba(255,77,0,0.6)] mb-8">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-black border border-[#FF4D00]/40 text-white focus:ring-2 focus:ring-[#FFB800] outline-none placeholder-gray-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg bg-black border border-[#FF4D00]/40 text-white focus:ring-2 focus:ring-[#00C2FF] outline-none placeholder-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-[#FFB800] transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-center font-medium mt-2 ${
                message.includes("✅")
                  ? "text-[#00FF9C]"
                  : "text-[#FF4D00]"
              }`}
            >
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF4D00] via-[#FFB800] to-[#00C2FF] text-black font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(255,184,0,0.5)] hover:shadow-[0_0_25px_rgba(255,184,0,0.7)] transition-all"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-gray-400 text-sm">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] via-[#FFB800] to-[#00C2FF] hover:underline font-semibold"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginUser;
