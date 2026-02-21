import PageContainer from "../../components/ui/PageContainer"
import { useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function Analytics() {

  // 🔹 Mock Financial Data
  const cargo = [
    { id: 1, revenue: 25000 },
    { id: 2, revenue: 18000 },
  ]

  const expenses = [
    { id: 1, amount: 5000, type: "Fuel" },
    { id: 2, amount: 2000, type: "Toll" },
    { id: 3, amount: 3000, type: "Repair" },
  ]

  const vehicles = [
    { id: 1, status: "Active" },
    { id: 2, status: "Maintenance" },
  ]

  // 🔹 Calculations
  const totalRevenue = useMemo(
    () => cargo.reduce((sum, c) => sum + c.revenue, 0),
    []
  )

  const totalExpense = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    []
  )

  const netProfit = totalRevenue - totalExpense

  const fleetUtilization = Math.round(
    (vehicles.filter(v => v.status === "Active").length / vehicles.length) * 100
  )

  // 🔹 Expense Breakdown for Pie
  const expenseData = expenses.reduce((acc, curr) => {
    const existing = acc.find(e => e.name === curr.type)
    if (existing) {
      existing.value += curr.amount
    } else {
      acc.push({ name: curr.type, value: curr.amount })
    }
    return acc
  }, [])

  const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b"]

  const summaryData = [
    { name: "Revenue", value: totalRevenue },
    { name: "Expenses", value: totalExpense },
  ]

  return (
    <PageContainer title="Analytics Overview">

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-slate-500">Total Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">
            ₹ {totalRevenue}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-slate-500">Total Expense</p>
          <h2 className="text-2xl font-bold text-red-600">
            ₹ {totalExpense}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-slate-500">Net Profit</p>
          <h2 className={`text-2xl font-bold ${
            netProfit >= 0 ? "text-green-600" : "text-red-600"
          }`}>
            ₹ {netProfit}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-slate-500">Fleet Utilization</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {fleetUtilization}%
          </h2>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Revenue vs Expense */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4">
            Revenue vs Expense
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4">
            Expense Breakdown
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </PageContainer>
  )
}