import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import useAxiosSecure from './hooks/auth/useAxiosSecure';
import useGetUser from './hooks/auth/useGetUser';
import { useToken } from './hooks/auth/useToken';
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
import CommitsPage from './pages/github/CommitsPage';
import ContributorsPage from './pages/github/ContributorsPage';
import FilesPage from './pages/github/FilesPage';
import IssuesPage from './pages/github/IssuesPage';
import PullRequestsPage from './pages/github/PullRequestsPage';
import RepositoriesPage from './pages/github/RepositoriesPage';
import NotFoundPage from './pages/NotFoundPage';

const PrivateOutlet = () => {
  const axiosSecure = useAxiosSecure();
  const { accessToken, refreshToken } = useToken();
  const { data: data, isLoading: isLoading, isError: isError } = useGetUser(axiosSecure);

  console.log('PrivateOutlet', data, isLoading, isError);
  console.log('PrivateOutlet', accessToken, refreshToken, !isError, data);

  if (!accessToken || !refreshToken || isError || (!isLoading && !data)) {
    console.log('PrivateOutlet', 'redirecting to login');
    return (
      <Navigate
        to="/login"
        state={{
          reason: 'no-user',
        }}
      />
    );
  }
  return <Outlet />;
};
const NonUserOutlet = () => {
  const axiosSecure = useAxiosSecure();
  const { accessToken, refreshToken } = useToken();
  const { data: data, isLoading: isLoading, isError: isError } = useGetUser(axiosSecure);

  console.log('NonUserOutlet', data, isLoading, isError);
  console.log('NonUserOutlet', accessToken, refreshToken, !isError, data?.data?.id);

  if (accessToken && refreshToken && !isError && data?.data?.id) {
    console.log('NonUserOutlet', 'redirecting to dashboard');
    return (
      <Navigate
        to="/panel/dashboard"
        state={{
          reason: 'user-logged-in',
        }}
      />
    );
  }
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          {
            element: <NonUserOutlet />,
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
            ],
          },
          {
            element: <PrivateOutlet />,
            children: [
              {
                path: '',
                element: <DashboardPage />,
              },
              {
                path: '/panel',
                element: <DashboardPage />,
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
                path: '/panel/github-data/repositories',
                element: <RepositoriesPage />,
              },
              {
                path: '/panel/github-data/issues',
                element: <IssuesPage />,
              },
              {
                path: '/panel/github-data/pull-requests',
                element: <PullRequestsPage />,
              },
              {
                path: '/panel/github-data/commits',
                element: <CommitsPage />,
              },
              {
                path: '/panel/github-data/files',
                element: <FilesPage />,
              },
              {
                path: '/panel/github-data/contributors',
                element: <ContributorsPage />,
              },
            ],
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
