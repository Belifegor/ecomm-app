import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { registerAction } from './registrationAction';
import { getProducts } from '../services/sdk/getProducts';
import { protectedLoader } from './protectedLoader';
import { loginAction } from './loginAction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: getProducts,
    children: [
      {
        index: true,
        path: '/main',
        element: <Main />,
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: '/profile',
        element: <Profile />,
        loader: protectedLoader,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
