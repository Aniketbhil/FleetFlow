import PageContainer from "../../components/ui/PageContainer"
import KpiCard from "../../components/ui/KpiCard"

export default function Dashboard() {

  // 🔹 Mock Data (Replace later with API)
  const stats = {
    activeFleet: 18,
    maintenanceAlerts: 4,
    utilizationRate: "76%",
    pendingCargo: 9,
  }

  return (
    <PageContainer title="Command Center">

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <KpiCard
          title="Active Fleet"
          value={stats.activeFleet}
          subtitle="Vehicles currently on trip"
          color="green"
        />

        <KpiCard
          title="Maintenance Alerts"
          value={stats.maintenanceAlerts}
          subtitle="Vehicles in shop"
          color="yellow"
        />

        <KpiCard
          title="Utilization Rate"
          value={stats.utilizationRate}
          subtitle="Fleet assigned vs idle"
          color="blue"
        />

        <KpiCard
          title="Pending Cargo"
          value={stats.pendingCargo}
          subtitle="Waiting for assignment"
          color="red"
        />

      </div>

      {/* Future Section Placeholder */}
      <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-700">
          Fleet Overview
        </h3>

        <p className="text-slate-500">
          Charts and analytics will appear here.
        </p>
      </div>

    </PageContainer>
  )
}