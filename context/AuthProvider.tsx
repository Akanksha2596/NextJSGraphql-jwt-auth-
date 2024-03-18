
import React, { createContext, useContext, useState } from "react"

export const AuthContext = createContext({})
const Provider = AuthContext.Provider

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authInfo, setAuthInfo] = useState({})

  const isAuthenticated = authInfo

  return (
    <Provider value={{ authInfo, isAuthenticated, setAuthInfo }}>
      {children}
    </Provider>
  )
}

export let useAuthContext = () => useContext(AuthContext)
