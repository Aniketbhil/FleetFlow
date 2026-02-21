import { useState, useEffect } from "react"

export default function VehicleForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    plate: "",
    model: "",
    status: "Active",
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
          Plate Number
        </label>
        <input
          type="text"
          name="plate"
          value={form.plate}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Model
        </label>
        <input
          type="text"
          name="model"
          value={form.model}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
          <option>Active</option>
          <option>Maintenance</option>
          <option>Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Save Vehicle
      </button>
    </form>
  )
}