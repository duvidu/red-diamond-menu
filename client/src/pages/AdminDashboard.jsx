import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import AdminItemForm from "../components/AdminItemForm";
import AdminItemTable from "../components/AdminItemTable";

export default function AdminDashboard() {
  const nav = useNavigate();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  async function load() {
    const [catsRes, itemsRes] = await Promise.all([
      api.get("/api/categories"),
      api.get("/api/menu")
    ]);
    setCategories(catsRes.data);
    setItems(itemsRes.data);
  }

  useEffect(() => {
    (async () => {
      try {
        await api.get("/api/auth/me");
        await load();
      } catch {
        nav("/admin");
      }
    })();
  }, []);

  async function logout() {
    await api.post("/api/auth/logout");
    nav("/admin");
  }

  async function onDelete(id) {
    if (!confirm("Delete this item?")) return;
    await api.delete(`/api/menu/${id}`);
    await load();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <AdminItemForm
            categories={categories}
            selected={selected}
            onSaved={async () => {
              setSelected(null);
              await load();
            }}
            onCancel={() => setSelected(null)}
          />
          <AdminItemTable
            items={items}
            onEdit={(item) => setSelected(item)}
            onDelete={(id) => onDelete(id)}
          />
        </div>
      </div>
    </div>
  );
}
