import { useEffect } from "react"

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-lg",
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-xl shadow-lg w-full ${width} p-6 z-10`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}