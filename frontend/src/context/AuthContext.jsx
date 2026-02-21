import { createContext, useState, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("fleet_token")
  )

  const [role, setRole] = useState(
    localStorage.getItem("fleet_role")
  )

  const login = (token, role) => {
    localStorage.setItem("fleet_token", token)
    localStorage.setItem("fleet_role", role)
    setToken(token)
    setRole(role)
  }

  const logout = () => {
    localStorage.removeItem("fleet_token")
    localStorage.removeItem("fleet_role")
    setToken(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}