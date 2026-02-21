const { login } = useAuth()

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    await login(email, password)
    navigate("/dashboard")
  } catch (err) {
    alert("Invalid credentials")
  }
}