import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '',
            element: <MainPage />,
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
