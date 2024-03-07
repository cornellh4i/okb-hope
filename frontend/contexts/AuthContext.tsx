import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { auth, signInWithGoogle, logout, fetchRole } from "../firebase/firebase";
import { onAuthStateChanged, User as FirebaseAuthUser } from "firebase/auth";
import router from 'next/router';

interface User extends FirebaseAuthUser {
  userType: string;
}

type AuthContextType = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  role: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user is available and navigate to dashboard if so
        if (user) {
          if (user.userType == "psychiatrist")
            router.push(`/${user.userType}/${user.uid}/psych_dashboard`);
          else if (user.userType == "patient")
            router.push(`/${user.userType}/${user.uid}/dashboard`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check if user is available before fetching data
    if (user) {
      fetchData();
    }
  }, [user, router]);

  useEffect(() => {
    const signInAndFetchRole = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          console.log(user.uid)
          setRole(null); // Reset role state
          const userRole = await fetchRole(user.uid);
          console.log(userRole);
          setCurrentUser({ ...(user as User), userType: userRole });
          setRole(userRole); // Update role state after fetchRole
        } else {
          setRole(null);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error during sign-in:', error);
        // Handle sign-in error
      }
    };

    const unsubscribe = onAuthStateChanged(auth, signInAndFetchRole);

    return unsubscribe;
  }, []);

  async function login() {
    await signInWithGoogle();
  }

  async function logOut() {
    await logout();
  }

  const value: AuthContextType = {
    user,
    login,
    logout: logOut,
    role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext has no value");
  return context;
};
