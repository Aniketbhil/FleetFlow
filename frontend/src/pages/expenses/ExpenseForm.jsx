import { useState, useEffect } from "react"

export default function ExpenseForm({
  initialData,
  trips,
  vehicles,
  onSubmit,
}) {
  const [form, setForm] = useState({
    type: "Fuel",
    amount: "",
    referenceId: "",
    note: "",
  })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="block text-sm font-medium mb-1">
          Expense Type
        </label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option>Fuel</option>
          <option>Toll</option>
          <option>Driver Allowance</option>
          <option>Repair</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Amount (₹)
        </label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Link To
        </label>
        <select
          name="referenceId"
          value={form.referenceId}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Trip / Vehicle</option>

          {trips.map((t) => (
            <option key={`trip-${t.id}`} value={`trip-${t.id}`}>
              Trip: {t.origin} → {t.destination}
            </option>
          ))}

          {vehicles.map((v) => (
            <option key={`vehicle-${v.id}`} value={`vehicle-${v.id}`}>
              Vehicle: {v.plate}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Note
        </label>
        <input
          name="note"
          value={form.note}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Save Expense
      </button>
    </form>
  )
}