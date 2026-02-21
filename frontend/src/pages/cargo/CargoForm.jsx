import { useState, useEffect } from "react"

export default function CargoForm({
  initialData,
  trips,
  onSubmit,
}) {
  const [form, setForm] = useState({
    client: "",
    weight: "",
    tripId: "",
    revenue: "",
    status: "Pending",
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
          Client Name
        </label>
        <input
          name="client"
          value={form.client}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Weight (kg)
        </label>
        <input
          type="number"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Assign Trip
        </label>
        <select
          name="tripId"
          value={form.tripId}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Trip</option>
          {trips.map((t) => (
            <option key={t.id} value={t.id}>
              {t.origin} → {t.destination}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Revenue (₹)
        </label>
        <input
          type="number"
          name="revenue"
          value={form.revenue}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option>Pending</option>
          <option>In Transit</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Save Cargo
      </button>
    </form>
  )
}