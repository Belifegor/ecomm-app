import { useState } from 'react';
import HeartOutline from '../assets/icons/heart-outline.svg?react';
import HeartFilled from '../assets/icons/heart-filled.svg?react';

export type Product = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price: string;
  originalPrice?: string;
  liked?: boolean;
};

export function ProductCard({
  id,
  name,
  description,
  imageUrl = '/images/placeholder.svg',
  price,
  originalPrice,
  liked = false,
}: Product) {
  const [isLiked, setIsLiked] = useState(liked);

  return (
    <div
      key={id}
      className="relative bg-[#F6F6F6] rounded-xl px-4 flex flex-col items-center text-center shadow hover:shadow-lg transition h-full"
    >
      {/* Иконка лайка */}
      <div className="w-full mb-4 mt-4 flex justify-end">
        <button onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? (
            <HeartFilled className="w-6 h-6 text-red-500 transition" />
          ) : (
            <HeartOutline className="w-6 h-6 text-gray-400 hover:text-red-500 transition" />
          )}
        </button>
      </div>

      {/* Картинка */}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-contain mb-4"
      />

      {/* Название и описание */}
      <div className="flex flex-col flex-grow justify-between">
        <h3 className="text-lg font-medium text-gray-800 mb-2 leading-snug whitespace-pre-line">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 mb-2 whitespace-pre-line">
            {description}
          </p>
        )}

        {/* Цена и старая цена */}
        <div className="mb-3">
          {originalPrice && originalPrice !== 'undefined' && (
            <span className="text-sm line-through text-gray-400 mr-2">
              ${originalPrice}
            </span>
          )}
          <span className="text-lg font-bold text-black">${price}</span>
        </div>
      </div>

      {/* Кнопка покупки */}
      <button className="mt-auto bg-black text-white w-full max-w-[200px] min-w-[100px] mb-6 px-8 py-3 rounded-lg hover:bg-[#9a2ee8] hover:text-white transition">
        <span className="whitespace-nowrap">Buy now</span>
      </button>
    </div>
  );
}
