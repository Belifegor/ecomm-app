import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCartById } from '../services/sdk/getCartById';
import { useCartStore } from '../store/cartStore';
import { LineItem } from '@commercetools/platform-sdk';
import { removeItemFromCart } from '../services/sdk/removeItemFromCart';
import { updateCartItemQuantity } from '../services/sdk/changeQuantity';

export function CartPage() {
  const cartId = useCartStore((state) => state.cartId);
  const [items, setItems] = useState<LineItem[]>([]);

  useEffect(() => {
    if (!cartId) return;
    getCartById(cartId)
      .then((res) => setItems(res.body.lineItems))
      .catch(console.error);
  }, [cartId]);

  const updateQuantity = async (itemId: string, quantity: number) => {
    await updateCartItemQuantity(itemId, quantity);
    const updatedCart = await getCartById(cartId!);
    setItems(updatedCart.body.lineItems);
  };

  const handleRemove = async (itemId: string) => {
    if (!cartId) return;
    await removeItemFromCart(itemId);
    const updatedCart = await getCartById(cartId);
    setItems(updatedCart.body.lineItems);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.totalPrice.centAmount,
    0
  );

  const tax = 5000;
  const shipping = 2900;

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/catalog"
          className="inline-block bg-[#211C24] border text-white px-6 py-3 rounded-lg font-medium hover:bg-[#9a2ee8] hover:text-black transition"
        >
          Browse Catalog
        </Link>
      </div>
    );
  } else {
    return (
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 px-6 py-10 items-start">
        {/* Левая колонка */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
          {items.length === 0 && (
            <p className="text-gray-500 text-xl">Cart is empty</p>
          )}
          <ul className="space-y-6">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-6 border-b pb-4"
              >
                <img
                  src={item.variant.images?.[0]?.url}
                  alt={item.name.en}
                  className="w-32 h-32 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name['en-US']}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 text-lg disabled:opacity-50"
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-lg"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-semibold">
                      ${(item.price.value.centAmount / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-gray-500 hover:text-red-600 hover:bg-gray-500 text-3xl
                font-bold rounded-full shadow-md w-10 h-10
                flex items-center justify-center transition-colors duration-200"
                >
                  <span className="translate-y-[-2px]">×</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Правая колонка */}
        <div className="w-full md:w-96 border p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="mb-4">
            <label className="block text-sm mb-1">
              Discount code / Promo code
            </label>
            <input
              type="text"
              placeholder="Code"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="text-sm space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span>${(tax / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated shipping & Handling</span>
              <span>${(shipping / 100).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between text-lg font-semibold border-t pt-3 mb-6">
            <span>Total</span>
            <span>${((subtotal + tax + shipping) / 100).toFixed(2)}</span>
          </div>

          <button className="w-full bg-black text-white py-2 rounded hover:opacity-90">
            Checkout
          </button>
        </div>
      </div>
    );
  }
}
export default CartPage;
