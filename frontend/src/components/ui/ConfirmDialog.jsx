import Modal from "./Modal"
import Button from "./Button"

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure?",
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width="max-w-md">
      <p className="text-slate-600 mb-6">
        {message}
      </p>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  )
}