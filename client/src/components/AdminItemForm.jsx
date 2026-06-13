import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function AdminItemForm({ categories, selected, onSaved, onCancel }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMsg("");
    if (selected) {
      setName(selected.name);
      setPrice(String(selected.price));
      setCategory(selected.category);
      setDescription(selected.description || "");
      setAvailable(!!selected.available);
      setImage(null);
    } else {
      setName("");
      setPrice("");
      setCategory(categories?.[0]?.name || "");
      setDescription("");
      setAvailable(true);
      setImage(null);
    }
  }, [selected, categories]);

  async function submit(e) {
    e.preventDefault();
    setMsg("");

    if (!name || !price || !category) {
      setMsg("Name, price and category are required.");
      return;
    }

    const fd = new FormData();
    fd.append("name", name);
    fd.append("price", price);
    fd.append("category", category);
    fd.append("description", description);
    fd.append("available", String(available));
    if (image) fd.append("image", image);

    if (selected?._id) {
      await api.put(`/api/menu/${selected._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMsg("Updated ✅");
    } else {
      await api.post(`/api/menu`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMsg("Created ✅");
    }

    onSaved?.();
  }

  return (
    <form
      onSubmit={submit}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
    >
      <h2 className="text-lg font-semibold mb-3">
        {selected ? "Edit Item" : "Add New Item"}
      </h2>

      <div className="grid grid-cols-1 gap-3">
        <input
          className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
          placeholder="Food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
          placeholder="Price (Rs)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <input
            id="available"
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          <label htmlFor="available" className="text-sm text-zinc-300">
            Available
          </label>
        </div>

        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />

        {msg && <div className="text-sm text-zinc-200">{msg}</div>}

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-white text-black font-semibold">
            {selected ? "Update" : "Create"}
          </button>

          {selected && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
