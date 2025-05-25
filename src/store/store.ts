import { Customer } from '@commercetools/platform-sdk';
import { create } from 'zustand';
import { getAnToken } from '../services/sdk/getAnonymousToken.ts';

type AuthStore = {
  customer: Customer | null;
  login: (customer: Customer) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

const storedCustomer = localStorage.getItem('customer');
const storedToken = localStorage.getItem('token');

const initialCustomer = storedCustomer ? JSON.parse(storedCustomer) : null;
const initialToken = storedToken || null;

export const authStore = create<AuthStore>((set, get) => ({
  customer: initialCustomer,
  token: initialToken,

  login: (customer) => {
    localStorage.setItem('customer', JSON.stringify(customer)); // сохраняю в хранилище
    set({ customer });
  },
  logout: () => {
    localStorage.removeItem('customer'); //очищаю
    set({ customer: null });
    getAnToken();
  },
  isAuthenticated: () => get().customer !== null,
}));
