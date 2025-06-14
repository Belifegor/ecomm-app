import { useCartStore } from '../store/cartStore.ts';
import { Cart } from '@commercetools/platform-sdk';

export function checkAndSetQuantity(resp: Cart) {
  if (typeof resp.totalLineItemQuantity === 'number') {
    useCartStore.getState().setQuantity(resp.totalLineItemQuantity);
    console.log(resp.totalLineItemQuantity);
  }
}
