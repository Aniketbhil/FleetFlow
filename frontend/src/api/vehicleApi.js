import api from "./axios"

export const getVehicles = async () => {
  const res = await api.get("/vehicles/")
  return res.data
}

export const createVehicle = async (data) => {
  const res = await api.post("/vehicles/", data)
  return res.data
}

export const updateVehicleStatus = async (id, status) => {
  const res = await api.patch(`/vehicles/${id}/status?status=${status}`)
  return res.data
}