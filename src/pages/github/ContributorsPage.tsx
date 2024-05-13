// ContributorsPage.jsx
import { Container, Paper, PaperProps, Stack, Text, Title } from '@mantine/core';
import { ContributorsTable } from '../../components'; // Confirm the correct import path
import useAxiosSecure from '../../hooks/auth/useAxiosSecure';
import useContributors from '../../hooks/github/useContributors'; // Import the newly created hook

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
};

function ContributorsPage() {
  const axiosSecure = useAxiosSecure();
  const {
    data: contributorsData,
    loading: contributorsLoading,
    error: contributorsError,
  } = useContributors(axiosSecure); // Now using the newly implemented hook

  return (
    <Container fluid>
      <Stack gap="lg">
        <Title order={2}>Contributors</Title>
        <Paper {...PAPER_PROPS}>
          <Text size="lg" fw={500} mb="md">
            List of Contributors
          </Text>
          <ContributorsTable
            data={contributorsData}
            loading={contributorsLoading}
            error={contributorsError}
          />
        </Paper>
      </Stack>
    </Container>
  );
}

export default ContributorsPage;
