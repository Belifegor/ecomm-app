import { Customer } from '@commercetools/platform-sdk';
import { create } from 'zustand';
import { getAnToken } from '../services/sdk/getAnonymousToken.ts';

type AuthStore = {
  customer: Customer | null;
  logout: () => void;
  userOptions: { userName: string; password: string } | null;
  isAuthenticated: () => boolean;
  login: (customer: Customer) => void;
  updateCustomer: (newCustomer: Partial<Customer>) => void;
  updateUserOptions: (userOptions: {
    userName: string;
    password: string;
  }) => void;
};

const storedCustomer = localStorage.getItem('customer');
const storedToken = localStorage.getItem('token');

const initialCustomer = storedCustomer ? JSON.parse(storedCustomer) : null;
const initialToken = storedToken || null;
const initialUserOption = null;

export const authStore = create<AuthStore>((set, get) => ({
  customer: initialCustomer,
  token: initialToken,
  userOptions: initialUserOption,

  login: (customer: Customer) => {
    localStorage.setItem('customer', JSON.stringify(customer)); // сохраняю в хранилище
    set({ customer });
  },
  logout: () => {
    localStorage.removeItem('customer'); //очищаю
    localStorage.removeItem('userOptions');
    localStorage.removeItem('ct_token');
    localStorage.removeItem('ct_anonymous_id');

    set({ customer: null, userOptions: null });
    getAnToken();
  },
  isAuthenticated: () => get().customer !== null,
  updateCustomer: (newCustomer: Partial<Customer>) => {
    const currentCustomer = get().customer;
    // const currentUserOptions = get().userOptions;
    if (currentCustomer /* && currentUserOptions*/) {
      const updatedCustomer: Customer = {
        ...currentCustomer,
        ...newCustomer,
        // version: currentCustomer.version + 1,
      };
      console.log(updatedCustomer);
      localStorage.setItem('customer', JSON.stringify(updatedCustomer));
      set({ customer: updatedCustomer /*, userOptions: newUserOptions*/ });
    }
    console.log(authStore.getState().userOptions);
  },
  updateUserOptions: (options: { userName: string; password: string }) => {
    set({ userOptions: options });
  },
}));
