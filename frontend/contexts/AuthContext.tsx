import React, { createContext, useState, ReactNode, useContext, useEffect, FC } from 'react';
import { User } from "firebase/auth"
import { auth } from "../firebase/firebase"

type AuthUser = User | null;
type AuthData = { user?: AuthUser }

const AuthUserContext = createContext<AuthData | undefined>(undefined)

type FCProps = { children?: ReactNode }

export const AuthProvider: FC<FCProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => (auth.onAuthStateChanged(
    setUser
  )), [])

  return (<AuthUserContext.Provider value={{ user }}>{children}</AuthUserContext.Provider>);
}

export const useAuth = () => {
  const context = useContext(AuthUserContext)
  if (!context) throw new Error("AuthUserContext has no value")
  return context
}
