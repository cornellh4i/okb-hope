import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  toggleAuth: () => void;
}

// create a new context
export const AuthContext = createContext<AuthContextType>({ isAuthenticated: false, toggleAuth: () => {} });

interface AuthProviderProps {
  children: ReactNode;
}

// create a provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("AuthUserContext has no value")
  return context
}