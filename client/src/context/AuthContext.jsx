import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from local storage");
      }
    }
    setLoading(false);
  }, []);
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  if (loading) return <div>Loading...</div>;
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};
