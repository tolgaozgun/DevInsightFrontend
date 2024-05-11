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
import DeveloperCommitVolumeTable from '../components/DeveloperCommitVolumeTable/DeveloperCommitVolumeTable';
import useFetchData from '../hooks/useFetchData';

const PATH_DASHBOARD = '/panel/dashboard';

const items = [
  { title: 'Dashboard', href: PATH_DASHBOARD },
  { title: 'Commit Analysis', href: '#' },
  { title: 'Developer Commit Volume', href: '#' },
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

function DeveloperCommitVolumePage() {
  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useFetchData('/mocks/DeveloperCommitVolume.json');

  return (
    <>
      <>
        <title>File Commit Ranking</title>
        <meta
          name="description"
          content="Explore our versatile dashboard website template featuring a stunning array of themes and meticulously crafted components. Elevate your web project with seamless integration, customizable themes, and a rich variety of components for a dynamic user experience. Effortlessly bring your data to life with our intuitive dashboard template, designed to streamline development and captivate users. Discover endless possibilities in design and functionality today!"
        />
      </>
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title="Developer Commit Volume" breadcrumbItems={items} />
          <Paper {...PAPER_PROPS}>
            <Group justify="space-between" mb="md">
              <Text fz="lg" fw={600}>
                Developer Commit Volume
              </Text>
              <ActionIcon>
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Group>
            <DeveloperCommitVolumeTable
              data={ordersData}
              error={ordersError}
              loading={ordersLoading}
            />
          </Paper>
        </Stack>
      </Container>
    </>
  );
}

export default DeveloperCommitVolumePage;
