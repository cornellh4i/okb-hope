import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { auth, logout, fetchRole, logInWithGoogle } from "../firebase/firebase";
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
          console.log(router.pathname)
          if (user.userType == "psychiatrist") {
            if (router.pathname == "/psych_dashboard" || router.pathname == `/psychiatrist/[psychiatrist_id]/psych_dashboard`)
              router.push(`/psychiatrist/${user.uid}/psych_dashboard`);
            else if (router.pathname == "/messages" || router.pathname == `/psychiatrist/[psychiatrist_id]/messages`)
              router.push(`/psychiatrist/${user.uid}/messages`);
            else if (router.pathname == "/edit_psych" || router.pathname == `/psychiatrist/[psychiatrist_id]/edit_psych`)
              router.push(`/psychiatrist/${user.uid}/edit_psych`);
            else {
              router.push(`/psychiatrist/${user.uid}/psych_dashboard`);
            }
          }
          else if (user.userType == "patient") {
            if (router.pathname == "/dashboard" || router.pathname == `/patient/[patient_id]/dashboard`)
              router.push(`/patient/${user.uid}/dashboard`);
            else if (router.pathname == "/discover" || router.pathname == `/patient/[patient_id]/discover`)
              router.push(`/patient/${user.uid}/discover`);
            else if (router.pathname == "/messages" || router.pathname == `/patient/[patient_id]/messages`)
              router.push(`/patient/${user.uid}/messages`);
            else if (router.pathname == "/edit_profile" || router.pathname == `/patient/[patient_id]/edit_profile`)
              router.push(`/patient/${user.uid}/edit_profile`);
            else if (router.pathname == "/report_history" || router.pathname == `/patient/[patient_id]/report_history`)
              router.push(`/patient/${user.uid}/report_history`);
            else
              router.push(`/patient/${user.uid}/dashboard`);
          }
          else if (user.userType == "admin") {
            if (router.pathname == "/database" || router.pathname == `/admin/[admin_id]/database`)
              router.push(`/admin/${user.uid}/database`);
            else if (router.pathname == "/data-analytics" || router.pathname == `/admin/[admin_id]/data-analytics`)
              router.push(`/admin/${user.uid}/data-analytics`);
          }
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
          setRole(null); // Reset role state
          const userRole = await fetchRole(user.uid);
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
    await logInWithGoogle();
  }

  async function logOut() {
    router.push('/');
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
