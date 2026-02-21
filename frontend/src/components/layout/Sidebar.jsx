import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { ROLES } from "../../constants/roles"
import logo from "../../assets/logo.png"

const linkClass =
  "block px-4 py-2 rounded-lg transition hover:bg-slate-200"

const activeClass = "bg-blue-600 text-white"

export default function Sidebar() {
  const { user } = useAuth()

  const role = user?.role

  return (
    <aside className="w-64 bg-slate-50 border-r p-5 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <img src={logo} alt="Logo" className="h-16 object-contain" />
        <span className="text-2xl font-bold tracking-wide text-slate-800">
          FleetFlow
        </span>
      </div>

      <nav className="space-y-2 flex-1">

        <NavLink to="/" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          Dashboard
        </NavLink>

        {role === ROLES.MANAGER && (
          <NavLink to="/vehicles" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Vehicles
          </NavLink>
        )}

        {(role === ROLES.MANAGER || role === ROLES.SAFETY) && (
          <NavLink to="/drivers" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Drivers
          </NavLink>
        )}

        {role === ROLES.DISPATCHER && (
          <NavLink to="/trips" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Trips
          </NavLink>
        )}

        {role === ROLES.MANAGER && (
          <NavLink to="/maintenance" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Maintenance
          </NavLink>
        )}

        {role === ROLES.FINANCE && (
          <NavLink to="/expenses" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Expenses
          </NavLink>
        )}

        {(role === ROLES.MANAGER || role === ROLES.FINANCE) && (
          <NavLink to="/analytics" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Analytics
          </NavLink>
        )}

      </nav>
    </aside>
  )
}