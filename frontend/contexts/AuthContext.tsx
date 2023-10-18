import { createContext, useState, ReactNode, useContext, useEffect, FC } from 'react';
import { auth, signInWithGoogle, logout, fetchRole } from "../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "../firebase/firebase";

// type AuthUser = User | null;
// type AuthData = { user?: AuthUser }

// const AuthUserContext = createContext<AuthData | undefined>(undefined)


type AuthContextType = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  role: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);


// type FCProps = { children?: ReactNode }

// export const AuthProvider: FC<FCProps> = ({ children }) => {
//   const [user, setUser] = useState<AuthUser>(null);

//   useEffect(() => (auth.onAuthStateChanged(
//     setUser
//   )), []);

//   return (<AuthUserContext.Provider value={{ user }}>{children}</AuthUserContext.Provider>);
// }

export function AuthProvider({ children }) {
  const [user, setCurrentUser] = useState<User | null>(null);
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
    user,
    login,
    logout: logOut,
    role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



export const useAuth = () => {
  const context = useContext(AuthContext)
  //   const context = useContext(AuthUserContext);
  // if (!context) throw new Error("AuthUserContext has no value")
  if (!context) throw new Error("AuthContext has no value")
  return context
}
