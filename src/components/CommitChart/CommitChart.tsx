// chart/RevenueChart.tsx
'use client';

import {
  ActionIcon,
  Group,
  Paper,
  PaperProps,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import Chart from 'react-apexcharts';
import { Surface } from '../../components';
import useAxiosSecure from '../../hooks/auth/useAxiosSecure';
import useMultipleCommits from '../../hooks/github/useMultipleCommits'; // Update the path to your hook

type RevenueChartProps = PaperProps;

const CommitChart = ({ ...others }: RevenueChartProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const axiosSecure = useAxiosSecure();
  const { data: commitsData, loading, error } = useMultipleCommits(axiosSecure);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading commits</Text>;
  }

  const series = commitsData.map((repoCommits) => ({
    name: repoCommits.repository.name,
    data: repoCommits.commits.map((commit) => ({
      x: new Date(commit.commitTime).toISOString(),
      y: commit.changedFiles.length, // Assuming you want to chart the number of changed files
    })),
  }));

  const options: any = {
    chart: {
      height: 350,
      type: 'area',
      fontFamily: 'Open Sans, sans-serif',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
    colors: [theme.colors[theme.primaryColor][5], theme.colors[theme.primaryColor][2]],
    legend: {
      labels: {
        colors: [colorScheme === 'dark' ? theme.white : theme.black],
      },
    },
  };

  return (
    <Surface component={Paper} {...others}>
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600}>
          Total commit
        </Text>
        <ActionIcon variant="subtle">
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Group>
      {/*@ts-ignore*/}
      <Chart options={options} series={series} type="area" height={350} width={'100%'} />
    </Surface>
  );
};

export default CommitChart;
