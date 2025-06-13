import { apiRoot } from './BuildClient';
import { useCartStore } from '../../store/cartStore';

export const addProductToCart = async (
  productId: string,
  variantId: number,
  quantity = 1
) => {
  const { cartId, version } = useCartStore.getState();

  if (!cartId) {
    console.warn('[addToCart] Нет ID корзины');
    return;
  }

  try {
    const res = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addLineItem',
              productId,
              variantId,
              quantity,
            },
          ],
        },
      })
      .execute();

    useCartStore.getState().setCartId(res.body.id, res.body.version);
    console.log('[addToCart] Товар успешно добавлен');
  } catch (err) {
    console.error('[addToCart] Ошибка при добавлении товара', err);
  }
};
