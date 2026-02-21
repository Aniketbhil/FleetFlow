export default function StatusPill({ status }) {
  const styles = {
    Available: "bg-green-100 text-green-700",
    "On Trip": "bg-blue-100 text-blue-700",
    "In Shop": "bg-yellow-100 text-yellow-700",
    Suspended: "bg-red-100 text-red-700",
    Draft: "bg-slate-100 text-slate-600",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  }

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status] || "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  )
}