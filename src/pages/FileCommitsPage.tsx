'use client';

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
import { FileCommitsTable, PageHeader } from '../components';
import useAxiosSecure from '../hooks/auth/useAxiosSecure';
import useFileCommitRanks from '../hooks/github/useFileCommitRanks';

const PATH_DASHBOARD = '/panel/dashboard';

const items = [
  { title: 'Dashboard', href: PATH_DASHBOARD },
  { title: 'Commit Analysis', href: '#' },
  { title: 'File Commit Ranking', href: '#' },
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

function FileCommitsPage() {
  const axiosSecure = useAxiosSecure();
  const {
    data: fileCommitData,
    loading: fileCommitLoading,
    error: fileCommitError,
  } = useFileCommitRanks(axiosSecure);

  return (
    <>
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title="File Commit Ranking" breadcrumbItems={items} />
          <Paper {...PAPER_PROPS}>
            <Group justify="space-between" mb="md">
              <Text fz="lg" fw={600}>
                File Commit Ranking
              </Text>
              <ActionIcon>
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Group>
            <FileCommitsTable
              data={fileCommitData}
              error={fileCommitError}
              loading={fileCommitLoading}
            />
          </Paper>
        </Stack>
      </Container>
    </>
  );
}

export default FileCommitsPage;
