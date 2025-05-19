import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import ProfilePage from '../pages/ProfilePage.tsx';
//import { registerAction } from './registrationAction';
// import { getProducts } from '../services/sdk/getProducts';
import { protectedLoader } from './protectedLoader';
// import { loginAction } from './loginAction';
import Login from '../pages/LoginPage.tsx';
import Registration from '../pages/RegistrationPage.tsx';
import { MainPage } from '../pages/MainPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <Login />,
    // action: loginAction,
  },
  {
    path: '/register',
    element: <Registration />,
    // action: registerAction,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    loader: protectedLoader,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
