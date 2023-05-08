import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, signInWithGoogle, logout, fetchRole } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";

type AuthContextType = {
  currentUser: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  role: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userRole = await fetchRole(user.uid);
        setRole(userRole);
      } else {
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);

  function login() {
    return signInWithGoogle();
  }

  function logOut() {
    return logout();
  }

  const value: AuthContextType = {
    currentUser,
    login,
    logout: logOut,
    role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("AuthUserContext has no value")
  return context
}
