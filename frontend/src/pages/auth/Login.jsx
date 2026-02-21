import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser, registerUser } from "../../api/authApi"

export default function Login() {
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "manager",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        const data = await loginUser({
          email: form.email,
          password: form.password,
        })

        localStorage.setItem("fleet_token", data.access_token)
        localStorage.setItem("fleet_role", data.role)

        navigate("/dashboard")
      } else {
        await registerUser(form)
        setIsLogin(true)
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-lg"
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              >
                <option value="manager">Fleet Manager</option>
                <option value="dispatcher">Dispatcher</option>
                <option value="safety">Safety Officer</option>
                <option value="finance">Financial Analyst</option>
              </select>
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading
              ? "Processing..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 ml-1 font-medium"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  )
}