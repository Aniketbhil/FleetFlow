import { NavLink } from "react-router-dom"
import logo from "../../assets/logo.png" // change if svg

const linkClass =
  "block px-4 py-2 rounded-lg transition hover:bg-slate-200"

const activeClass = "bg-blue-600 text-white"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-8">
        <img
          src={logo}
          alt="FleetFlow Logo"
          className="h-14 w-auto object-contain"
        />
        <span className="text-2xl font-bold tracking-wide text-slate-800">
          FleetFlow
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        <NavLink to="/" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          Dashboard
        </NavLink>

        <NavLink to="/vehicles" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          Vehicles
        </NavLink>

        <NavLink to="/drivers" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          Drivers
        </NavLink>

        <NavLink to="/trips" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          Trips
        </NavLink>

        <NavLink to="/maintenance" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          Maintenance
        </NavLink>

        <NavLink to="/expenses" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          Expenses
        </NavLink>

        <NavLink to="/analytics" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          Analytics
        </NavLink>
      </nav>
    </aside>
  )
}