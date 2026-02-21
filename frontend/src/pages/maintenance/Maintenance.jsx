import { useState } from "react"
import PageContainer from "../../components/ui/PageContainer"
import Table from "../../components/ui/Table"
import Modal from "../../components/ui/Modal"
import ConfirmDialog from "../../components/ui/ConfirmDialog"
import MaintenanceForm from "./MaintenanceForm"

export default function Maintenance() {
  const [vehicles] = useState([
    { id: 1, plate: "GJ01AB1234", model: "Tata Ace" },
    { id: 2, plate: "GJ05CD5678", model: "Ashok Leyland" },
  ])

  const [records, setRecords] = useState([
    {
      id: 1,
      vehicleId: 2,
      issue: "Engine Oil Leak",
      cost: 4500,
      status: "Pending",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const columns = [
    { key: "vehicle", label: "Vehicle" },
    { key: "issue", label: "Issue" },
    { key: "cost", label: "Cost (₹)" },
    { key: "status", label: "Status" },
  ]

  const enrichedRecords = records.map((r) => ({
    ...r,
    vehicle: vehicles.find(v => v.id == r.vehicleId)?.plate,
  }))

  const handleSave = (data) => {
    if (editingRecord) {
      setRecords(
        records.map(r =>
          r.id === editingRecord.id ? { ...r, ...data } : r
        )
      )
    } else {
      setRecords([
        ...records,
        { id: Date.now(), ...data },
      ])
    }

    setIsModalOpen(false)
    setEditingRecord(null)
  }

  const handleDelete = () => {
    setRecords(records.filter(r => r.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  return (
    <PageContainer
      title="Maintenance"
      actionButton={
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Record
        </button>
      }
    >

      <Table
        columns={columns}
        data={enrichedRecords}
        renderActions={(row) => (
          <div className="space-x-2">
            <button
              onClick={() => {
                setEditingRecord(row)
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
          setEditingRecord(null)
        }}
        title={editingRecord ? "Edit Record" : "Add Maintenance"}
      >
        <MaintenanceForm
          initialData={editingRecord}
          vehicles={vehicles}
          onSubmit={handleSave}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Record"
        description="Are you sure you want to delete this maintenance record?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

    </PageContainer>
  )
}