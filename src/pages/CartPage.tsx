import { useEffect, useState } from 'react';
import { getCartById } from '../services/sdk/getCartById';
import { useCartStore } from '../store/cartStore';
import { LineItem } from '@commercetools/platform-sdk';

export function CartPage() {
  const cartId = useCartStore((state) => state.cartId);
  const [items, setItems] = useState<LineItem[]>([]);

  useEffect(() => {
    if (cartId) {
      getCartById(cartId)
        .then((res) => setItems(res.body.lineItems))
        .catch(console.error);
    }
  }, [cartId]);

  if (!cartId) return <p>No cart found</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-4 border-b pb-2">
            <img
              src={item.variant.images?.[0]?.url}
              alt={item.name.en}
              className="w-24 h-24"
            />
            <p>{item.name.en}</p>
            <p>Quantity: {item.quantity}</p>
            <p>
              Price per item: {(item.price.value.centAmount / 100).toFixed(2)}{' '}
              {item.price.value.currencyCode}
            </p>
            <p>
              Total: {(item.totalPrice.centAmount / 100).toFixed(2)}{' '}
              {item.totalPrice.currencyCode}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CartPage;
