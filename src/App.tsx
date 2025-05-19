import LoginPage from './pages/LoginPage.tsx';
import RegistrationPage from './pages/RegistrationPage.tsx';
import { useEffect, useRef } from 'react';
import { getAnToken } from './services/CommerceTools/getAnonymousToken.ts';

export default function App() {
  const hasToken = useRef(false);
  useEffect(() => {
    if (!hasToken.current) {
      hasToken.current = !hasToken.current;
      getAnToken();
    }
  }, []);
  return (
    <div className="h-1/1 w-1/1 flex items-center justify-center">
      {/*<h1 className="text-4xl font-bold text-blue-600">*/}
      {/*  TailwindCSS v4 работает!*/}
      {/*</h1>*/}
      <LoginPage />
      <RegistrationPage />
    </div>
  );
}
