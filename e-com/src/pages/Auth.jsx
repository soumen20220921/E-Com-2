// src/components/Auth.jsx
import React, { useState } from "react";
import { Eye, EyeOff, UserPlus, LogIn } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthSuccess from "./SuccessMessage";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "error" });
      return;
    }

    try {
      setLoading(true);
      const url = isLogin ? "http://localhost:8000/api/user/login" : "http://localhost:8000/api/user/register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const { data } = await axios.post(url, payload);

      setMessage({ text: data.message, type: data.success ? "success" : "error" });

      if (isLogin && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("userId", data.user._id);
        
        setUserName(data.user.name);
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/account");
          window.location.reload();
        }, 2000); 
      }
    } catch (err) {
      setMessage({ text: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loginSuccess ? (
        <AuthSuccess name={userName} />
      ) : (
        <div className="min-h-screen bg-gray-50 font-inter flex items-center justify-center py-8 sm:py-12 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6 sm:p-8 space-y-8 animate-fadeIn">
            <div>
              <div className="flex justify-center mb-4">
                {isLogin ? (
                  <LogIn className="h-12 w-12 text-blue-600" />
                ) : (
                  <UserPlus className="h-12 w-12 text-blue-600" />
                )}
              </div>
              <h2 className="mt-2 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
                {isLogin ? "Log In" : "Create your account"}
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </p>
            </div>

            {message && (
              <div
                className={`text-sm p-2 rounded ${
                  message.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {!isLogin && (
                  <div className="animate-fadeIn">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div className="animate-fadeIn">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="animate-fadeIn">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="animate-fadeIn">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md"
                >
                  {loading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;