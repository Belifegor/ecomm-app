import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import SwiperModal from './SwiperModal';
import HeartOutline from '../assets/icons/heart-outline.svg?react';
import HeartFilled from '../assets/icons/heart-filled.svg?react';
import { addProductToCart } from '../services/sdk/addToCart';
import Button from './button.tsx';

export type Product = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  price: string;
  originalPrice?: string;
  liked?: boolean;
  inCart?: boolean;
};

export function ProductCard({
  id,
  name,
  description,
  imageUrl = '/images/placeholder.png',
  images = [],
  price,
  originalPrice,
  liked = false,
  inCart = false,
}: Product) {
  const [isLiked, setIsLiked] = useState(liked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInCart, setIsInCart] = useState(inCart);
  return (
    <div
      key={id}
      className="relative bg-[#F6F6F6] rounded-xl px-4 flex flex-col
      text-center shadow hover:shadow-lg transition m-0.5"
    >
      {/* Иконка лайка */}
      <div className="w-full pt-4 flex justify-end">
        <button onClick={() => setIsLiked(!isLiked)} className="p-1 -mr-1">
          {isLiked ? (
            <HeartFilled className="w-6 h-6 text-red-500 transition" />
          ) : (
            <HeartOutline className="w-6 h-6 text-gray-400 hover:text-red-500 transition" />
          )}
        </button>
      </div>

      {/* Картинка */}
      <div
        className="w-full h-40 mb-4 flex items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-contain p-4 cursor-pointer"
        />
      </div>

      {/* Название и описание */}
      <Link to={`/products/${id}`} className="no-underline">
        <div className="flex flex-col items-center w-full min-h-[120px]">
          <h3 className="text-lg font-medium text-gray-800 mb-2 leading-snug line-clamp-2">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* Цена и старая цена */}
          <div className="mt-auto">
            {originalPrice && originalPrice !== 'undefined' && (
              <span className="text-sm line-through text-gray-400 mr-2">
                ${originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-black">${price}</span>
          </div>
        </div>
      </Link>
      <Button
        type="button"
        disabled={isInCart}
        text={isInCart ? 'In cart' : 'Add to cart'}
        className={`mt-4 w-full max-w-[200px] min-w-[100px] mb-6 mx-auto px-8 py-3 rounded-lg transition font-medium ${
          isInCart
            ? 'bg-white text-black'
            : 'bg-black text-white hover:bg-[#9a2ee8]'
        }`}
        onClick={() => {
          setIsInCart(!isInCart);
          addProductToCart(id, 1).catch((err) => {
            console.log(err);
          });
        }}
      />
      {/* Модалка со слайдером */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <SwiperModal images={images} currentImage={imageUrl} />
        </Modal>
      )}
    </div>
  );
}
