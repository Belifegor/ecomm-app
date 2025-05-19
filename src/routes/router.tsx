import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
//import { registerAction } from './registrationAction';
// import { getProducts } from '../services/sdk/getProducts';
import { protectedLoader } from './protectedLoader';
// import { loginAction } from './loginAction';
import Login from '../pages/LoginPage.tsx';
import Registration from '../pages/RegistrationPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    // loader: getProducts,
    children: [
      // {
      //   index: true,
      //   path: '/main',
      //   element: <Main />,
      // },
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
        element: <h1>Hi</h1>,
        loader: protectedLoader,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
