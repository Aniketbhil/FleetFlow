export default function PageContainer({ title, children }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-700">
        {title}
      </h2>
      {children}
    </div>
  )
}