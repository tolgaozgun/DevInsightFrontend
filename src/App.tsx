import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './Router';
import { UserProvider } from './contexts/UserContext';
import './i18n';
import { theme } from './theme';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MantineProvider theme={theme} withCssVariables={false}>
          <Router />
        </MantineProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
