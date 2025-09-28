"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/app/services/ajaxCall";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payloadObj = {
        email,
        password,
      };

      const response: any = await api.post("/auth/login", payloadObj);

      if (response?.data?.success === true) {
        const token = response?.data?.token;
        const user = response?.data?.user;
        const message = response?.data?.message;
        localStorage.setItem("access-token", token);
        login(user);

        setIsLoading(false);

        toast.success(message, {
          autoClose: 4000,
        });

        router.push("/home");
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error logging in: ", error);
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage ? errorMessage : "Error logging in", {
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">Sign In To Your Account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing In...
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-400">Don't Have An Account? </p>
        <Link
          href="/signup"
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
