import { useEffect } from 'react';
import { getAnToken } from './services/sdk/getAnonymousToken.ts';

import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { authStore } from './store/store.ts';

export default function App() {
  useEffect(() => {
    if (!authStore.getState().customer) {
      getAnToken();
    }
  }, []);
  return <RouterProvider router={router} />;
}
