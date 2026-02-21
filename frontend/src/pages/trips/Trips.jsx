import { useState } from "react"
import PageContainer from "../../components/ui/PageContainer"
import Table from "../../components/ui/Table"
import Modal from "../../components/ui/Modal"
import ConfirmDialog from "../../components/ui/ConfirmDialog"
import TripForm from "./TripForm"

export default function Trips() {
  // Mock linked data
  const [vehicles] = useState([
    { id: 1, plate: "GJ01AB1234", model: "Tata Ace" },
    { id: 2, plate: "GJ05CD5678", model: "Ashok Leyland" },
  ])

  const [drivers] = useState([
    { id: 1, name: "Ravi Patel" },
    { id: 2, name: "Amit Shah" },
  ])

  const [trips, setTrips] = useState([
    {
      id: 1,
      origin: "Ahmedabad",
      destination: "Surat",
      vehicleId: 1,
      driverId: 1,
      status: "Scheduled",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTrip, setEditingTrip] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const columns = [
    { key: "origin", label: "Origin" },
    { key: "destination", label: "Destination" },
    { key: "vehicle", label: "Vehicle" },
    { key: "driver", label: "Driver" },
    { key: "status", label: "Status" },
  ]

  const enrichedTrips = trips.map((trip) => ({
    ...trip,
    vehicle: vehicles.find(v => v.id == trip.vehicleId)?.plate,
    driver: drivers.find(d => d.id == trip.driverId)?.name,
  }))

  const handleSave = (data) => {
    if (editingTrip) {
      setTrips(
        trips.map(t =>
          t.id === editingTrip.id ? { ...t, ...data } : t
        )
      )
    } else {
      setTrips([
        ...trips,
        { id: Date.now(), ...data },
      ])
    }

    setIsModalOpen(false)
    setEditingTrip(null)
  }

  const handleDelete = () => {
    setTrips(trips.filter(t => t.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  return (
    <PageContainer
      title="Trips"
      actionButton={
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Trip
        </button>
      }
    >

      <Table
        columns={columns}
        data={enrichedTrips}
        renderActions={(row) => (
          <div className="space-x-2">
            <button
              onClick={() => {
                setEditingTrip(row)
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
          setEditingTrip(null)
        }}
        title={editingTrip ? "Edit Trip" : "Create Trip"}
      >
        <TripForm
          initialData={editingTrip}
          vehicles={vehicles}
          drivers={drivers}
          onSubmit={handleSave}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Trip"
        description="Are you sure you want to delete this trip?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

    </PageContainer>
  )
}