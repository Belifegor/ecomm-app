import { Customer } from '@commercetools/platform-sdk';
import { create } from 'zustand';

type AuthStore = {
  customer: Customer | null;
  login: (customer: Customer) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const authStore = create<AuthStore>((set, get) => ({
  customer: null,
  login: (customer) => set({ customer }),
  logout: () => set({ customer: null }),
  isAuthenticated: () => get().customer !== null,
}));
