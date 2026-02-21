import { useState } from "react"
import PageContainer from "../../components/ui/PageContainer"
import Button from "../../components/ui/Button"
import Modal from "../../components/ui/Modal"
import ConfirmDialog from "../../components/ui/ConfirmDialog"

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  return (
    <PageContainer title="Dashboard">

      <div className="flex gap-4">
        <Button onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>

        <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
          Open Confirm
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sample Modal"
      >
        <p className="text-slate-600">
          This is reusable modal content.
        </p>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          alert("Confirmed!")
          setIsConfirmOpen(false)
        }}
        message="Do you want to delete this vehicle?"
      />

    </PageContainer>
  )
}