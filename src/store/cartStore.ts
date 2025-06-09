import { create } from 'zustand';

interface CartState {
  cartId: string | null;
  version: number;
  setCartId: (id: string, version: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartId: null,
  version: 0,
  setCartId: (id, version) => set({ cartId: id, version }),
}));
