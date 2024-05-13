// CommitsPage.jsx
import { Commit } from '@/types';
import { Button, Container, Paper, PaperProps, Stack, Text, Title } from '@mantine/core';
import { CommitsTable } from '../../components'; // Confirm the correct import path
import useAxiosSecure from '../../hooks/auth/useAxiosSecure';
import useCommits from '../../hooks/github/useCommits'; // Import the newly created hook
import useScrapeCommits from '../../hooks/github/useScrapeCommits';

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
  const {
    data: scrapedData,
    loading: scrapedLoading,
    error: scrapedError,
    scrapeCommits,
  } = useScrapeCommits(axiosSecure); // Using the refactored hook

  const handleScrapeCommits = () => {
    scrapeCommits();
  };

  const commits: Commit[] = [...scrapedData, ...commitsData];

  return (
    <Container fluid>
      <Stack gap="lg">
        <Title order={2}>Commits</Title>
        <Button onClick={handleScrapeCommits} loading={scrapedLoading}>
          Scrape New Commits
        </Button>
        <Paper {...PAPER_PROPS}>
          <Text size="lg" fw={500} mb="md">
            List of Commits
          </Text>
          <CommitsTable data={commits} loading={commitsLoading} error={commitsError} />
        </Paper>
      </Stack>
    </Container>
  );
}

export default CommitsPage;
