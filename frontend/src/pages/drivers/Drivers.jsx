import { useState } from "react"
import PageContainer from "../../components/ui/PageContainer"
import Table from "../../components/ui/Table"
import Modal from "../../components/ui/Modal"
import ConfirmDialog from "../../components/ui/ConfirmDialog"
import DriverForm from "./DriverForm"

export default function Drivers() {
  const [drivers, setDrivers] = useState([
    { id: 1, name: "Ravi Patel", license: "DL12345", phone: "9876543210", status: "Available" },
    { id: 2, name: "Amit Shah", license: "DL98765", phone: "9123456780", status: "On Trip" },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDriver, setEditingDriver] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const columns = [
    { key: "name", label: "Name" },
    { key: "license", label: "License" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
  ]

  const handleSave = (data) => {
    if (editingDriver) {
      setDrivers(
        drivers.map((d) =>
          d.id === editingDriver.id ? { ...d, ...data } : d
        )
      )
    } else {
      setDrivers([
        ...drivers,
        { id: Date.now(), ...data },
      ])
    }

    setIsModalOpen(false)
    setEditingDriver(null)
  }

  const handleDelete = () => {
    setDrivers(
      drivers.filter((d) => d.id !== deleteTarget.id)
    )
    setDeleteTarget(null)
  }

  return (
    <PageContainer
      title="Drivers"
      actionButton={
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Driver
        </button>
      }
    >

      <Table
        columns={columns}
        data={drivers}
        renderActions={(row) => (
          <div className="space-x-2">
            <button
              onClick={() => {
                setEditingDriver(row)
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
          setEditingDriver(null)
        }}
        title={editingDriver ? "Edit Driver" : "Add Driver"}
      >
        <DriverForm
          initialData={editingDriver}
          onSubmit={handleSave}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Driver"
        description="Are you sure you want to delete this driver?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

    </PageContainer>
  )
}