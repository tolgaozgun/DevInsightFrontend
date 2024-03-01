import { Badge, Button, MantineColor } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { ReactNode } from 'react';
import ErrorAlert from '../ErrorAlert';

type Status = 'In Progress' | 'Cancelled' | 'Completed' | 'Pending' | string;

const StatusBadge = ({ status }: { status: Status }) => {
  let color: MantineColor = '';

  switch (status) {
    case 'In Progress':
      color = 'blue';
      break;
    case 'Cancelled':
      color = 'red';
      break;
    case 'Completed':
      color = 'green';
      break;
    case 'Pending':
      color = 'orange';
      break;
    default:
      color = 'gray';
  }

  return (
    <Badge color={color} variant="filled" radius="sm">
      {status}
    </Badge>
  );
};

type ProjectItem = {
  id: string;
  name: string;
  start_date: string;
  state: Status;
  link: string;
};

type ProjectsTableProps = {
  data?: ProjectItem[];
  error: ReactNode;
  loading: boolean;
};
const ProjectsTable = ({ data, error, loading }: ProjectsTableProps) => {
  console.log(data, error, loading);
  return error ? (
    <ErrorAlert title="Error loading projects" message={error.toString()} />
  ) : (
    <DataTable
      verticalSpacing="sm"
      highlightOnHover
      columns={[
        { accessor: 'name' },
        { accessor: 'start_date' },
        {
          accessor: 'state',
          render: ({ state }) => <StatusBadge status={state} />,
        },
        {
          accessor: 'link',
          render: ({ link }) => (
            <Button
              onClick={() => {
                window.open(link, '_blank');
              }}
              leftSection={<IconBrandGithub />}
            >
              Github
            </Button>
          ),
        },
      ]}
      records={data}
      fetching={loading}
    />
  );
};

export default ProjectsTable;
