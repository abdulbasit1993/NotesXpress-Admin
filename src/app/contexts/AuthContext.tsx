"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/ajaxCall";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserAuth = async () => {
    const token = localStorage.getItem("access-token");
    if (token) {
      try {
        const response = await api.get("/auth/profile");
        if (response?.data?.success === true) {
          const user = response?.data?.data;
          setUser(user);
        }
      } catch (error) {
        console.error("Error checking user authentication: ", error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access-token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
