import { NavLink } from "react-router-dom"

const linkClass =
  "block px-4 py-2 rounded-lg transition hover:bg-slate-200"

const activeClass = "bg-blue-500 text-white"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        FleetFlow
      </h2>

      <nav className="space-y-2">
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