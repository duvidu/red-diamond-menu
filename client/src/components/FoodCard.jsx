export default function FoodCard({ item }) {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-md border border-yellow-500/20 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300">

      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="w-full h-56 bg-zinc-800 flex items-center justify-center text-zinc-500">
          No Image
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-semibold text-white">
            {item.name}
          </h3>

          <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold shadow-md">
            Rs. {item.price}
          </span>
        </div>

        {item.description && (
          <p className="text-zinc-400 mt-4">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
