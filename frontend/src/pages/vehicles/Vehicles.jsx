import { useState } from "react"
import PageContainer from "../../components/ui/PageContainer"
import Table from "../../components/ui/Table"
import Modal from "../../components/ui/Modal"
import ConfirmDialog from "../../components/ui/ConfirmDialog"
import VehicleForm from "./VehicleForm"

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: "GJ01AB1234", model: "Tata Ace", status: "Active" },
    { id: 2, plate: "GJ05CD5678", model: "Ashok Leyland", status: "Maintenance" },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const columns = [
    { key: "plate", label: "Plate" },
    { key: "model", label: "Model" },
    { key: "status", label: "Status" },
  ]

  const handleSave = (data) => {
    if (editingVehicle) {
      setVehicles(
        vehicles.map((v) =>
          v.id === editingVehicle.id ? { ...v, ...data } : v
        )
      )
    } else {
      setVehicles([
        ...vehicles,
        { id: Date.now(), ...data },
      ])
    }

    setIsModalOpen(false)
    setEditingVehicle(null)
  }

  const handleDelete = () => {
    setVehicles(
      vehicles.filter((v) => v.id !== deleteTarget.id)
    )
    setDeleteTarget(null)
  }

  return (
    <PageContainer
      title="Vehicles"
      actionButton={
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Vehicle
        </button>
      }
    >

      <Table
        columns={columns}
        data={vehicles}
        renderActions={(row) => (
          <div className="space-x-2">
            <button
              onClick={() => {
                setEditingVehicle(row)
                setIsModalOpen(true)
              }}
              className="text-blue-600"
            >
              Edit
            </button>

            <button
              onClick={() => setDeleteTarget(row)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        )}
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingVehicle(null)
        }}
        title={editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
      >
        <VehicleForm
          initialData={editingVehicle}
          onSubmit={handleSave}
        />
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Vehicle"
        description="Are you sure you want to delete this vehicle?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

    </PageContainer>
  )
}