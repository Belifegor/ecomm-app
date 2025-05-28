import { useEffect } from 'react';
import { getAnToken } from './services/sdk/getAnonymousToken.ts';
import { /*RouterProvider*/ Outlet } from 'react-router-dom';
import { authStore } from './store/store.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  useEffect(() => {
    if (!authStore.getState().customer) {
      getAnToken();
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
