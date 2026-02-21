import { Routes, Route } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Login from "../pages/auth/Login"
import Dashboard from "../pages/dashboard/Dashboard"
import Vehicles from "../pages/vehicles/Vehicles"
import Drivers from "../pages/drivers/Drivers"
import Trips from "../pages/trips/Trips"
import Maintenance from "../pages/maintenance/Maintenance"
import Expenses from "../pages/expenses/Expenses"
import Analytics from "../pages/analytics/Analytics"
import ProtectedRoute from "../components/common/ProtectedRoute"
import { ROLES } from "../constants/roles"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route
          path="vehicles"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
              <Vehicles />
            </ProtectedRoute>
          }
        />

        <Route
          path="drivers"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MANAGER, ROLES.SAFETY]}>
              <Drivers />
            </ProtectedRoute>
          }
        />

        <Route
          path="trips"
          element={
            <ProtectedRoute allowedRoles={[ROLES.DISPATCHER]}>
              <Trips />
            </ProtectedRoute>
          }
        />

        <Route
          path="maintenance"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
              <Maintenance />
            </ProtectedRoute>
          }
        />

        <Route
          path="expenses"
          element={
            <ProtectedRoute allowedRoles={[ROLES.FINANCE]}>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="analytics"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MANAGER, ROLES.FINANCE]}>
              <Analytics />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}