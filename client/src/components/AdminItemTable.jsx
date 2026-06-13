export default function AdminItemTable({ items, onEdit, onDelete }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 overflow-auto">
      <h2 className="text-lg font-semibold mb-3">Menu Items</h2>

      <table className="w-full text-sm">
        <thead className="text-zinc-400">
          <tr>
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Category</th>
            <th className="text-left py-2">Price</th>
            <th className="text-left py-2">Status</th>
            <th className="text-right py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i._id} className="border-t border-zinc-800">
              <td className="py-2">{i.name}</td>
              <td className="py-2">{i.category}</td>
              <td className="py-2">Rs. {i.price}</td>
              <td className="py-2">{i.available ? "Available" : "Hidden"}</td>
              <td className="py-2 text-right">
                <button
                  onClick={() => onEdit(i)}
                  className="px-3 py-1 rounded bg-zinc-800 border border-zinc-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(i._id)}
                  className="px-3 py-1 rounded bg-red-600 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td className="py-3 text-zinc-400" colSpan="5">
                No items yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
