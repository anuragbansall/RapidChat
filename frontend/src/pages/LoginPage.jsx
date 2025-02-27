import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquareText } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.trim().length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    login(formData);
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="text-2xl font-semibold my-2">Welcome Back</h2>
          <p className="text-zinc-400">Login to your account to continue</p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="w-2/3 max-w-120 space-y-6 mt-10"
        >
          <label className="input flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              className="grow"
              placeholder="Email"
              value={formData.email}
              required
            />
          </label>
          <label className="input flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              className="grow"
              placeholder="Password"
              value={formData.password}
              required
            />
          </label>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Login account..." : "Login"}
          </button>
        </form>

        <p className="mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="hidden lg:flex flex-col items-center justify-center bg-[#541683]">
        <img
          src="https://images.unsplash.com/photo-1531525727990-67532cd332c6?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-3/4 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl">Share your thoughts with the world</h2>
        <p className="text-zinc-400 text-center mt-2 max-w-sm">
          Login to your account to start sharing your thoughts with the world.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
