type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  liked?: boolean;
};

export function ProductCard({ name, price, image, liked }: Product) {
  return (
    <div className="relative bg-white rounded-xl border p-4 flex flex-col items-center text-center shadow hover:shadow-lg transition">
      {/* иконка лайка */}
      <button className="absolute top-3 right-3">
        {liked ? (
          <span className="text-red-500 text-xl">❤️</span>
        ) : (
          <span className="text-gray-400 text-xl">🤍</span>
        )}
      </button>
      {/* изображение товара */}
      <img src={image} alt={name} className="w-full h-40 object-contain mb-4" />
      {/* название товара */}
      <h3 className="text-sm font-medium text-gray-800 mb-2 leading-snug">
        {name}
      </h3>
      {/* цена товара */}
      <p className="text-lg font-bold mb-3">${price.toFixed(2)}</p>
      {/* кнопка */}
      <button className="bg-gray-800 text-white w-3xs py-2 rounded hover:bg-blue-600 transition">
        Buy now
      </button>
    </div>
  );
}
