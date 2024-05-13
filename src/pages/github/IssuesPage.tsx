// IssuesPage.jsx
import {
  ActionIcon,
  Anchor,
  Container,
  Group,
  Paper,
  PaperProps,
  Stack,
  Text,
} from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import { PageHeader } from '../../components';
import IssuesTable from '../../components/IssuesTable/IssuesTable'; // Confirm correct import path
import useAxiosSecure from '../../hooks/auth/useAxiosSecure';
import useIssues from '../../hooks/github/useIssues'; // Import the new hook

const PATH_DASHBOARD = '/panel/dashboard';

const items = [
  { title: 'Dashboard', href: PATH_DASHBOARD },
  { title: 'Developer Performance', href: '#' },
  { title: 'Issue Tracker', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
};

function IssuesPage() {
  const axiosSecure = useAxiosSecure();
  const { data: issuesData, loading: issuesLoading, error: issuesError } = useIssues(axiosSecure); // Using the newly implemented hook

  return (
    <>
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title="Issue Tracker" breadcrumbItems={items} />
          <Paper {...PAPER_PROPS}>
            <Group justify="space-between" mb="md">
              <Text fz="lg" fw={600}>
                Open Issues
              </Text>
              <ActionIcon>
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Group>
            <IssuesTable data={issuesData} error={issuesError} loading={issuesLoading} />
          </Paper>
        </Stack>
      </Container>
    </>
  );
}

export default IssuesPage;
