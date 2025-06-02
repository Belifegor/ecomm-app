import { Customer } from '@commercetools/platform-sdk';
import { create } from 'zustand';
import { getAnToken } from '../services/sdk/getAnonymousToken.ts';
// import { LoginData } from '../pages/LoginPage.tsx';

type AuthStore = {
  customer: Customer | null;
  login: (
    customer: Customer,
    userOptions: { userName: string; password: string }
  ) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  userOptions: { userName: string; password: string } | null;
  updateCustomer: (newCustomer: Partial<Customer>) => void;
};

const storedCustomer = localStorage.getItem('customer');
const storedToken = localStorage.getItem('token');
const storedUserOptions = localStorage.getItem('userOptions');

const initialCustomer = storedCustomer ? JSON.parse(storedCustomer) : null;
const initialToken = storedToken || null;
const initialUserOption = storedUserOptions
  ? JSON.parse(storedUserOptions)
  : null;

export const authStore = create<AuthStore>((set, get) => ({
  customer: initialCustomer,
  token: initialToken,
  userOptions: initialUserOption,

  login: (
    customer: Customer,
    userOptions: { userName: string; password: string }
  ) => {
    localStorage.setItem('customer', JSON.stringify(customer)); // сохраняю в хранилище
    localStorage.setItem('userOptions', JSON.stringify(userOptions));
    set({ customer, userOptions });
  },
  logout: () => {
    localStorage.removeItem('customer'); //очищаю
    localStorage.removeItem('userOptions');
    set({ customer: null, userOptions: null });
    getAnToken();
  },
  isAuthenticated: () => get().customer !== null,
  updateCustomer: (newCustomer: Partial<Customer>) => {
    const currentCustomer = get().customer;
    const currentUserOptions = get().userOptions;
    if (currentCustomer && currentUserOptions) {
      const updatedCustomer: Customer = {
        ...currentCustomer,
        ...newCustomer,
        version: currentCustomer.version + 1,
      };
      console.log(currentCustomer.version);
      const newUserOptions = {
        userName: newCustomer.email ?? currentUserOptions.userName,
        password: currentUserOptions.password,
      };
      localStorage.setItem('customer', JSON.stringify(updatedCustomer));
      localStorage.setItem('userOptions', JSON.stringify(newUserOptions));
      set({ customer: updatedCustomer, userOptions: newUserOptions });
    }
  },
}));
