// CommitsPage.jsx
import { Container, Paper, PaperProps, Stack, Text, Title } from '@mantine/core';
import { CommitsTable } from '../../components'; // Confirm the correct import path
import useAxiosSecure from '../../hooks/auth/useAxiosSecure';
import useCommits from '../../hooks/github/useCommits'; // Import the newly created hook

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
};

function CommitsPage() {
  const axiosSecure = useAxiosSecure();
  const {
    data: commitsData,
    loading: commitsLoading,
    error: commitsError,
  } = useCommits(axiosSecure); // Now using the newly implemented hook

  return (
    <Container fluid>
      <Stack gap="lg">
        <Title order={2}>Commits</Title>
        <Paper {...PAPER_PROPS}>
          <Text size="lg" fw={500} mb="md">
            List of Commits
          </Text>
          <CommitsTable data={commitsData} loading={commitsLoading} error={commitsError} />
        </Paper>
      </Stack>
    </Container>
  );
}

export default CommitsPage;
