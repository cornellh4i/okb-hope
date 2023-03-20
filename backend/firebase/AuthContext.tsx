import React, { createContext, useState } from 'react';

// create a new context
export const AuthContext = createContext();

// create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // function to toggle authentication status
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};