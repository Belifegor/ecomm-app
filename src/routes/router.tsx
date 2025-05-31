import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import ProfilePage from '../pages/ProfilePage.tsx';
import { protectedLoader } from './protectedLoader';
import { RequireNoAuth } from './RequireNoAuth.tsx';
import Login from '../pages/LoginPage.tsx';
import Registration from '../pages/RegistrationPage.tsx';
import App from '../App.tsx';
import { MainPage } from '../pages/MainPage.tsx';
import { ROUTES } from '../utils/paths.ts';
import { CatalogPage } from '../pages/CatalogPage.tsx';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        // path: 'main',
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTES.CATALOG,
        element: <CatalogPage />, //добавил Каталог
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <RequireNoAuth>
            <Login />
          </RequireNoAuth>
        ),
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <RequireNoAuth>
            <Registration />
          </RequireNoAuth>
        ),
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
        loader: protectedLoader,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
