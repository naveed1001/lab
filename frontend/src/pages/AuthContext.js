import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [role, setRole] = useState(
    () => JSON.parse(localStorage.getItem("role")) || "guest"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("role", JSON.stringify(role));
  }, [isAuthenticated, role]);

  const login = (role = "user") => {
    setIsAuthenticated(true);
    setRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole("guest"); 
  };

  const hasRole = (requiredRole) => {
    return role === requiredRole;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};
