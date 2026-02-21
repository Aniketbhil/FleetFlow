import { createContext, useContext, useState, useEffect } from "react"
import { loginApi, getMeApi } from "../api/authApi"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("access_token")

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const data = await getMeApi()
        setUser(data)
      } catch (err) {
        localStorage.removeItem("access_token")
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  const login = async (email, password) => {
    const data = await loginApi({ email, password })

    // assuming backend returns: { access_token: "...", token_type: "bearer" }
    localStorage.setItem("access_token", data.access_token)

    const userData = await getMeApi()
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)