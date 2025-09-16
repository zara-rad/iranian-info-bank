import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = "/api"; // ✅ proxy استفاده کن

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid email or password");
        return false;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Login successful");
      return true;
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed");
      return false;
    }
  };

  // ✅ Register (User + Business یکجا)
  const register = async (userData) => {
    console.log("📌 Sending register data:", userData);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: userData.fullName,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.confirmPassword,
          businessName: userData.businessName,
          phone: userData.phone,
          category: userData.category,
          subcategories: userData.subcategories,
          description: userData.description,
          descriptionGerman: userData.descriptionGerman,
          descriptionPersian: userData.descriptionPersian,
          city: userData.city || "",
          address: userData.address || "",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return false;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      toast.success("Registered successfully with business");
      return true;
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Registration failed");
      return false;
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, isAuthenticated: !!user }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
