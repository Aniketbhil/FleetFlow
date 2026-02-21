import { useState, useEffect } from "react"

export default function DriverForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    license: "",
    phone: "",
    status: "Available",
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
          Driver Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          License Number
        </label>
        <input
          name="license"
          value={form.license}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Phone
        </label>
        <input
          name="phone"
          value={form.phone}
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
          <option>Available</option>
          <option>On Trip</option>
          <option>Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Save Driver
      </button>
    </form>
  )
}