// FilesPage.jsx
import { Container, Paper, PaperProps, Stack, Text, Title } from '@mantine/core';
import { FilesTable } from '../../components'; // Confirm the correct import path
import useAxiosSecure from '../../hooks/auth/useAxiosSecure';
import useFiles from '../../hooks/github/useFiles'; // Import the newly created hook

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
};

function FilesPage() {
  const axiosSecure = useAxiosSecure();
  const { data: filesData, loading: filesLoading, error: filesError } = useFiles(axiosSecure); // Now using the newly implemented hook

  return (
    <Container fluid>
      <Stack gap="lg">
        <Title order={2}>Files</Title>
        <Paper {...PAPER_PROPS}>
          <Text size="lg" fw={500} mb="md">
            List of Files
          </Text>
          <FilesTable data={filesData} loading={filesLoading} error={filesError} />
        </Paper>
      </Stack>
    </Container>
  );
}

export default FilesPage;
