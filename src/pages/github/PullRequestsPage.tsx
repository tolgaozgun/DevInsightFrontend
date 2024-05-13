// PullRequestsPage.jsx
import { Button, Container, Paper, PaperProps, Stack, Text, Title } from '@mantine/core';
import PullRequestsTable from '../../components/PullRequestsTable/PullRequestsTable'; // Confirm the import path is correct
import useAxiosSecure from '../../hooks/auth/useAxiosSecure';
import usePullRequests from '../../hooks/github/usePullRequests'; // Import the newly created hook
import useScrapePullRequests from '../../hooks/github/useScrapePullRequests';

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
};

function PullRequestsPage() {
  const axiosSecure = useAxiosSecure();
  const {
    data: pullRequestsData,
    loading: pullRequestsLoading,
    error: pullRequestsError,
  } = usePullRequests(axiosSecure); // Now using the newly implemented hook
  const {
    data: scrapedData,
    loading: scrapedLoading,
    error: scrapedError,
    scrapePullRequests,
  } = useScrapePullRequests(axiosSecure); // Using the refactored hook

  const handleScrapePullRequests = () => {
    scrapePullRequests();
  };

  return (
    <Container fluid>
      <Stack gap="lg">
        <Title order={2}>Pull Requests</Title>
        <Button onClick={handleScrapePullRequests} loading={scrapedLoading}>
          Scrape New Pull Requests
        </Button>
        <Paper {...PAPER_PROPS}>
          <Text size="lg" fw={500} mb="md">
            List of Pull Requests
          </Text>
          <PullRequestsTable
            data={pullRequestsData}
            loading={pullRequestsLoading}
            error={pullRequestsError}
          />
        </Paper>
      </Stack>
    </Container>
  );
}

export default PullRequestsPage;
