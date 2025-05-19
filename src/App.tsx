// import LoginPage from './pages/LoginPage.tsx';
// import RegistrationPage from './pages/RegistrationPage.tsx';
import { useEffect, useRef } from 'react';
import { getAnToken } from './services/CommerceTools/getAnonymousToken.ts';

import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

export default function App() {
  const hasToken = useRef(false);
  useEffect(() => {
    if (!hasToken.current) {
      hasToken.current = !hasToken.current;
      getAnToken();
    }
  }, []);
  return <RouterProvider router={router} />;
}
