import { useState } from "react"
import PageContainer from "../../components/ui/PageContainer"
import Table from "../../components/ui/Table"
import Modal from "../../components/ui/Modal"
import ConfirmDialog from "../../components/ui/ConfirmDialog"
import ExpenseForm from "./ExpenseForm"

export default function Expenses() {
  const [trips] = useState([
    { id: 1, origin: "Ahmedabad", destination: "Surat" },
  ])

  const [vehicles] = useState([
    { id: 1, plate: "GJ01AB1234" },
  ])

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      type: "Fuel",
      amount: 5000,
      referenceId: "trip-1",
      note: "Highway fuel refill",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const columns = [
    { key: "type", label: "Type" },
    { key: "amount", label: "Amount (₹)" },
    { key: "linked", label: "Linked To" },
    { key: "note", label: "Note" },
  ]

  const enrichedExpenses = expenses.map((e) => {
    let linked = ""

    if (e.referenceId?.startsWith("trip")) {
      const id = Number(e.referenceId.split("-")[1])
      const trip = trips.find(t => t.id === id)
      linked = trip ? `Trip: ${trip.origin} → ${trip.destination}` : ""
    }

    if (e.referenceId?.startsWith("vehicle")) {
      const id = Number(e.referenceId.split("-")[1])
      const vehicle = vehicles.find(v => v.id === id)
      linked = vehicle ? `Vehicle: ${vehicle.plate}` : ""
    }

    return { ...e, linked }
  })

  const handleSave = (data) => {
    if (editingExpense) {
      setExpenses(
        expenses.map(e =>
          e.id === editingExpense.id ? { ...e, ...data } : e
        )
      )
    } else {
      setExpenses([
        ...expenses,
        { id: Date.now(), ...data },
      ])
    }

    setIsModalOpen(false)
    setEditingExpense(null)
  }

  const handleDelete = () => {
    setExpenses(expenses.filter(e => e.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  return (
    <PageContainer
      title="Expenses"
      actionButton={
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Expense
        </button>
      }
    >

      <Table
        columns={columns}
        data={enrichedExpenses}
        renderActions={(row) => (
          <div className="space-x-2">
            <button
              onClick={() => {
                setEditingExpense(row)
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
          setEditingExpense(null)
        }}
        title={editingExpense ? "Edit Expense" : "Add Expense"}
      >
        <ExpenseForm
          initialData={editingExpense}
          trips={trips}
          vehicles={vehicles}
          onSubmit={handleSave}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Expense"
        description="Are you sure you want to delete this expense?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

    </PageContainer>
  )
}