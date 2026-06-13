import { useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import CategoryTabs from "../components/CategoryTabs";
import FoodCard from "../components/FoodCard";
import redImage from "../assets/red.jpg";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeCat, setActiveCat] = useState("");

  useEffect(() => {
    (async () => {
      const [catsRes, itemsRes] = await Promise.all([
        api.get("/api/categories"),
        api.get("/api/menu")
      ]);
      setCategories(catsRes.data);
      setItems(itemsRes.data);

      const first = catsRes.data?.[0]?.name || "";
      setActiveCat(first);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!activeCat) return items.filter((i) => i.available);
    return items.filter(
      (i) => i.available && i.category === activeCat
    );
  }, [items, activeCat]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="text-center py-10">
   <img
    src={redImage}
    alt="Red Diamond"
    className="w-40 mx-auto mb-4"
  />

  <h1 className="text-5xl font-bold text-white tracking-widest">
    RED DIAMOND
  </h1>

  <p className="text-red-500 tracking-[8px] mt-2">
    RESTAURANT
  </p>

  <div className="w-32 h-[2px] bg-red-600 mx-auto mt-5"></div>
</div>

        {/* CATEGORY TABS */}
        <CategoryTabs
          categories={categories}
          active={activeCat}
          onChange={setActiveCat}
        />

        {/* FOOD GRID */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
