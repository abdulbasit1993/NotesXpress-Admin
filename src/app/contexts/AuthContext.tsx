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
    console.log("checkUserAuth called..................");
    // Check for existing token
    const token = localStorage.getItem("access-token");
    console.log("token (checkUserAuth): ", token);
    if (token) {
      // verify token and get user data
      // this would be an API call to get the user data
      // setUser({ id: "1", email: "user@example.com", name: "John Doe" });

      const response = await api.get("/auth/profile");

      console.log("response data from checkUserAuth: ", response);

      if (response?.data?.success === true) {
        const user = response?.data?.data;
        setUser(user);
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
