export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {categories.map((c) => (
        <button
          key={c._id}
          onClick={() => onChange(c.name)}
          className={`px-6 py-2 rounded-full border transition-all duration-300 ${
            active === c.name
              ? "bg-yellow-400 text-black border-yellow-400 shadow-lg"
              : "bg-transparent text-white border-zinc-700 hover:border-yellow-400 hover:text-yellow-400"
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
