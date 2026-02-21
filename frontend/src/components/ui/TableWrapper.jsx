export default function TableWrapper({ children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-slate-600">
          {children}
        </table>
      </div>
    </div>
  )
}