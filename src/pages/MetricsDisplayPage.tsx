import { Card, Container, Group, LoadingOverlay, Text, Title } from '@mantine/core';
import useAxiosSecure from '../hooks/auth/useAxiosSecure';
import { useAverageCommentsPerPullRequest } from '../hooks/github/useAverageCommentsPerPullRequest'; // Assuming the hooks are exported from a file named 'hooks'
import { useAverageMergeTime } from '../hooks/github/useAverageMergeTime';
import { useAveragePullRequestSize } from '../hooks/github/useAveragePullRequestSize';
import { useReviewCoverage } from '../hooks/github/useReviewCoverage';

const MetricsDisplayPage = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: averageMergeTime,
    loading: loadingMergeTime,
    error: errorMergeTime,
  } = useAverageMergeTime(axiosSecure);
  const {
    data: averageComments,
    loading: loadingComments,
    error: errorComments,
  } = useAverageCommentsPerPullRequest(axiosSecure);
  const {
    data: averageSize,
    loading: loadingSize,
    error: errorSize,
  } = useAveragePullRequestSize(axiosSecure);
  const {
    data: reviewCoverage,
    loading: loadingCoverage,
    error: errorCoverage,
  } = useReviewCoverage(axiosSecure);

  const isLoading = loadingMergeTime || loadingComments || loadingSize || loadingCoverage;
  const anyError = errorMergeTime || errorComments || errorSize || errorCoverage;

  return (
    <Container size="sm" p="md">
      <Title ta="center">Repository Metrics</Title>
      <LoadingOverlay visible={isLoading} />
      {anyError && <Text color="red">Failed to load data. Please try again later.</Text>}

      <Group gap="md" grow>
        <Card shadow="sm" padding="lg">
          <Text size="md" fw={500}>
            Average Merge Time (hours):
          </Text>
          <Text>{averageMergeTime ? averageMergeTime.toFixed(2) : 'N/A'}</Text>
        </Card>

        <Card shadow="sm" padding="lg">
          <Text size="md" fw={500}>
            Average Comments Per Pull Request:
          </Text>
          <Text>{averageComments ? averageComments.toFixed(2) : 'N/A'}</Text>
        </Card>

        <Card shadow="sm" padding="lg">
          <Text size="md" fw={500}>
            Average Pull Request Size:
          </Text>
          <Text>{averageSize ? averageSize.toFixed(2) : 'N/A'}</Text>
        </Card>

        <Card shadow="sm" padding="lg">
          <Text size="md" fw={500}>
            Review Coverage (%):
          </Text>
          <Text>{reviewCoverage ? reviewCoverage.toFixed(2) + '%' : 'N/A'}</Text>
        </Card>
      </Group>
    </Container>
  );
};

export default MetricsDisplayPage;
