import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CodeStickinessPage from './pages/CodeStickinessPage';
import CommonFileChangesPage from './pages/CommonFileChangesPage';
import DashboardPage from './pages/DashboardPage';
import DeveloperCommitVolumePage from './pages/DeveloperCommitVolumePage';
import EffectiveDeveloperPage from './pages/EffectiveDeveloperPage';
import ErrorPage from './pages/ErrorPage';
import FileCommitsPage from './pages/FileCommitsPage';
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
            element: <LoginPage />,
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
            path: '/panel/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/panel/commit-analysis/file-ranking',
            element: <FileCommitsPage />,
          },
          {
            path: '/panel/commit-analysis/dev-volume',
            element: <DeveloperCommitVolumePage />,
          },
          {
            path: '/panel/commit-analysis/common-changes',
            element: <CommonFileChangesPage />,
          },
          {
            path: '/panel/developer-performance/effective',
            element: <EffectiveDeveloperPage />,
          },
          {
            path: '/panel/developer-performance/stickiness',
            element: <CodeStickinessPage />,
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
