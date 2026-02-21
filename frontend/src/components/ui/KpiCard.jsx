export default function KpiCard({ title, value, subtitle, color = "blue" }) {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-sm text-slate-500 mb-2">
        {title}
      </p>

      <h3 className={`text-3xl font-bold ${colors[color]}`}>
        {value}
      </h3>

      {subtitle && (
        <p className="text-xs text-slate-400 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  )
}