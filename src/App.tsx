import LoginPage from './pages/LoginPage.tsx';
import RegistrationPage from './pages/RegistrationPage.tsx';

export default function App() {
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
