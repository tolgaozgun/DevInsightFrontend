import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'mantine-datatable/styles.layer.css';
import { Router } from './Router';
import ChatBot from './components/Chatbot';
import { RepositoryProvider } from './contexts/RepositoryContext';
import { UserProvider } from './contexts/UserContext';
import './i18n';
import { theme } from './theme';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MantineProvider theme={theme} withCssVariables={false}>
          <RepositoryProvider>
            <Router />
            <ChatBot />
          </RepositoryProvider>
        </MantineProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
