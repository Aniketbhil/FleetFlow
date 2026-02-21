import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-slate-700">
        Command Center
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          {user?.role}
        </span>

        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  )
}