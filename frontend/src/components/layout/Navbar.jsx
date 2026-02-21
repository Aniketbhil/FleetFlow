export default function Navbar() {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-slate-700">
        Command Center
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500">
          Role: Manager
        </span>
        <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm">
          Logout
        </button>
      </div>
    </header>
  )
}