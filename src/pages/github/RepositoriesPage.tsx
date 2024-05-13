// RepositoriesPage.jsx
import { Container, Paper, PaperProps, Stack, Text, Title } from '@mantine/core';
import { RepositoriesTable } from '../../components'; // Ensure the correct import path
import useAxiosSecure from '../../hooks/auth/useAxiosSecure';
import useRepositories from '../../hooks/github/useRepositories';

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
};

function RepositoriesPage() {
  const axiosSecure = useAxiosSecure();
  const {
    data: repositoriesData,
    loading: repositoriesLoading,
    error: repositoriesError,
  } = useRepositories(axiosSecure); // Now using the newly implemented hook

  return (
    <Container fluid>
      <Stack gap="lg">
        <Title order={2}>Repositories</Title>
        <Paper {...PAPER_PROPS}>
          <Text size="lg" fw={500} mb="md">
            List of Repositories
          </Text>
          <RepositoriesTable
            data={repositoriesData}
            loading={repositoriesLoading}
            error={repositoriesError}
          />
        </Paper>
      </Stack>
    </Container>
  );
}

export default RepositoriesPage;
