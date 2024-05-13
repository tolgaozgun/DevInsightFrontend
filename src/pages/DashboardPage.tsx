'use client';

import { Button, Container, Grid, Group, Paper, PaperProps, Stack, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { PageHeader, ProjectsTable, StatsGrid } from '../components';
import CommitChart from '../components/CommitChart/CommitChart';
import useAxiosSecure from '../hooks/auth/useAxiosSecure';
import useRepositories from '../hooks/github/useRepositories';
import useFetchData from '../hooks/useFetchData';

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
};

const DashboardPage = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: statsData,
    error: statsError,
    loading: statsLoading,
  } = useFetchData('/mocks/StatsGrid.json');

  const {
    data: repositoriesData,
    error: repositoriesError,
    loading: repositoriesLoading,
  } = useRepositories(axiosSecure);

  return (
    <>
      <>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Explore our versatile dashboard website template featuring a stunning array of themes and meticulously crafted components. Elevate your web project with seamless integration, customizable themes, and a rich variety of components for a dynamic user experience. Effortlessly bring your data to life with our intuitive dashboard template, designed to streamline development and captivate users. Discover endless possibilities in design and functionality today!"
        />
      </>
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title="Dashboard" withActions={true} />
          <StatsGrid
            data={statsData.data}
            error={statsError}
            loading={statsLoading}
            paperProps={PAPER_PROPS}
          />
          <Grid>
            {/* <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
              <MapChart {...PAPER_PROPS} />
            </Grid.Col> */}
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <CommitChart />
            </Grid.Col>
            {/* <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <SalesChart {...PAPER_PROPS} />
            </Grid.Col> */}
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Paper {...PAPER_PROPS}>
                <Group justify="space-between" mb="md">
                  <Text size="lg" fw={600}>
                    Repositories
                  </Text>
                  <Button variant="subtle" rightSection={<IconChevronRight size={16} />}>
                    View all
                  </Button>
                </Group>
                <ProjectsTable
                  data={repositoriesData.slice(0, 6)}
                  error={repositoriesError}
                  loading={repositoriesLoading}
                />
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default DashboardPage;
