import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquareText } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Username is required");
      return false;
    }
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
    signUp(formData);
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
          <h2 className="text-2xl font-semibold my-2">Create Account</h2>
          <p className="text-zinc-400">Get started with your free account</p>
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
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="fullName"
              onChange={handleInputChange}
              className="grow"
              placeholder="Username"
              value={formData.fullName}
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
            disabled={isSigningUp}
          >
            {isSigningUp ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>

      <div className="hidden lg:flex flex-col items-center justify-center bg-[#101010]">
        <img
          src="https://images.unsplash.com/photo-1611262588019-db6cc2032da3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-3/4 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl text-[wheat]">Join our community</h2>
        <p className="text-zinc-400 text-center mt-2 max-w-sm">
          Let's create an account and start sharing your thoughts with the world
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
