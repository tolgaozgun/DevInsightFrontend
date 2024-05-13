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
import { PageHeader } from '../components';
import CommonFileChangesTable from '../components/CommonFileChangesTable/CommonFileChangesTable';
import useAxiosSecure from '../hooks/auth/useAxiosSecure';
import useMostCommonlyChangedFile from '../hooks/github/useMostCommonlyChangedFile'; // Updated import

const PATH_DASHBOARD = '/panel/dashboard';

const items = [
  { title: 'Dashboard', href: PATH_DASHBOARD },
  { title: 'Commit Analysis', href: '#' },
  { title: 'Common File Changes', href: '#' },
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

function CommonFileChangesPage() {
  const axiosSecure = useAxiosSecure();
  const {
    data: filesData, // Updated variable name
    loading: filesLoading, // Updated variable name
    error: filesError, // Updated variable name
  } = useMostCommonlyChangedFile(axiosSecure); // Updated hook usage

  return (
    <>
      <>
        <title>Common File Changes</title>
      </>
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title="Common File Changes" breadcrumbItems={items} />
          <Paper {...PAPER_PROPS}>
            <Group justify="space-between" mb="md">
              <Text fz="lg" fw={600}>
                Common File Changes
              </Text>
              <ActionIcon>
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Group>
            {/* Updated component to pass new data and state props */}
            <CommonFileChangesTable data={filesData} error={filesError} loading={filesLoading} />
          </Paper>
        </Stack>
      </Container>
    </>
  );
}

export default CommonFileChangesPage;
