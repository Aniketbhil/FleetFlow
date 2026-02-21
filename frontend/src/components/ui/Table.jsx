export default function Table({ columns, data, renderActions }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-6 py-3 font-semibold"
              >
                {col.label}
              </th>
            ))}
            {renderActions && (
              <th className="px-6 py-3 text-right font-semibold">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-t hover:bg-slate-50"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4">
                  {row[col.key]}
                </td>
              ))}

              {renderActions && (
                <td className="px-6 py-4 text-right">
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}