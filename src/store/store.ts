import { Customer } from '@commercetools/platform-sdk';
import { create } from 'zustand';

type AuthStore = {
  customer: Customer | null;
  login: (customer: Customer) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

const storedCustomer = localStorage.getItem('customer');
const initialCustomer = storedCustomer ? JSON.parse(storedCustomer) : null;

export const authStore = create<AuthStore>((set, get) => ({
  customer: initialCustomer,

  login: (customer) => {
    localStorage.setItem('customer', JSON.stringify(customer)); // сохраняю в хранилище
    set({ customer });
  },
  logout: () => {
    localStorage.removeItem('customer'); //очищаю
    set({ customer: null });
  },
  isAuthenticated: () => get().customer !== null,
}));
