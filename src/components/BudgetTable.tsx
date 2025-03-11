export default function BudgetTable({
  budgetItems,
  handleEdit,
  handleDelete,
}: {
  budgetItems: any[]
  handleEdit: (item: any) => void
  handleDelete: (id: string) => void
}) {
  console.log('Rendering Budget Table Data:', budgetItems) // Debugging Log

  return (
    <div className="mt-8 overflow-hidden rounded-lg bg-white shadow-lg">
      <table className="w-full border-collapse text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 font-semibold text-gray-700">Item</th>
            <th className="p-4 font-semibold text-gray-700">Category Type</th>
            <th className="p-4 text-right font-semibold text-gray-700">
              Amount
            </th>
            <th className="p-4 text-right font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {budgetItems.length > 0 ? (
            budgetItems.map((item) => (
              <tr
                key={item.id}
                className="border-t transition-all duration-300 hover:bg-gray-100"
              >
                <td className="p-4">{item.name}</td>
                <td className="p-4">
                  {item.budget_categories?.type || 'Uncategorized'}
                </td>
                <td className="p-4 text-right font-semibold text-green-600">
                  ${item.amount.toFixed(2)}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleEdit(item)}
                    className="mr-2 text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No budget items available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
