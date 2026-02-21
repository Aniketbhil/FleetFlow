import { useState } from "react"
import PageContainer from "../../components/ui/PageContainer"
import Table from "../../components/ui/Table"
import Modal from "../../components/ui/Modal"
import ConfirmDialog from "../../components/ui/ConfirmDialog"
import CargoForm from "./CargoForm"

export default function Cargo() {
  const [trips] = useState([
    { id: 1, origin: "Ahmedabad", destination: "Surat" },
    { id: 2, origin: "Vadodara", destination: "Rajkot" },
  ])

  const [cargo, setCargo] = useState([
    {
      id: 1,
      client: "Reliance Logistics",
      weight: 1200,
      tripId: 1,
      revenue: 25000,
      status: "Pending",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCargo, setEditingCargo] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const columns = [
    { key: "client", label: "Client" },
    { key: "weight", label: "Weight (kg)" },
    { key: "trip", label: "Trip" },
    { key: "revenue", label: "Revenue (₹)" },
    { key: "status", label: "Status" },
  ]

  const enrichedCargo = cargo.map((c) => ({
    ...c,
    trip: trips.find(t => t.id == c.tripId)
      ? `${trips.find(t => t.id == c.tripId).origin} → ${trips.find(t => t.id == c.tripId).destination}`
      : "",
  }))

  const handleSave = (data) => {
    if (editingCargo) {
      setCargo(
        cargo.map(c =>
          c.id === editingCargo.id ? { ...c, ...data } : c
        )
      )
    } else {
      setCargo([
        ...cargo,
        { id: Date.now(), ...data },
      ])
    }

    setIsModalOpen(false)
    setEditingCargo(null)
  }

  const handleDelete = () => {
    setCargo(cargo.filter(c => c.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  return (
    <PageContainer
      title="Cargo / Shipments"
      actionButton={
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Cargo
        </button>
      }
    >

      <Table
        columns={columns}
        data={enrichedCargo}
        renderActions={(row) => (
          <div className="space-x-2">
            <button
              onClick={() => {
                setEditingCargo(row)
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCargo(null)
        }}
        title={editingCargo ? "Edit Cargo" : "Add Cargo"}
      >
        <CargoForm
          initialData={editingCargo}
          trips={trips}
          onSubmit={handleSave}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Cargo"
        description="Are you sure you want to delete this shipment?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

    </PageContainer>
  )
}