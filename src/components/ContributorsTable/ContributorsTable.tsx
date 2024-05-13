'use client';

import { Contributor } from '@/types';
import { Anchor, Image } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

type ContributorsTableProps = {
  data: Contributor[];
  loading?: boolean;
  error?: React.ReactNode;
};

const PAGE_SIZES = [5, 10, 20];

const ContributorsTable = ({ data, loading, error }: ContributorsTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<Contributor[]>([]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [data, page, pageSize]);

  const columns = [
    { accessor: 'name', header: 'Name', sortable: true },
    { accessor: 'email', header: 'Email', sortable: true },
    {
      accessor: 'avatarUrl',
      header: 'Avatar',
      render: (item: Contributor) => (
        <Image src={item.avatarUrl} alt={item.name} width={40} height={40} radius="sm" />
      ),
    },
    {
      accessor: 'url',
      header: 'Profile',
      render: (item: Contributor) => (
        <Anchor href={item.url} target="_blank">
          Visit
        </Anchor>
      ),
    },
    {
      accessor: 'repository.name',
      header: 'Repository',
      render: (item: Contributor) => item.repository.name,
    },
    { accessor: 'pullRequestReviewers.length', header: 'Reviewed PRs', sortable: true },
  ];

  return (
    <DataTable
      columns={columns}
      records={records}
      totalRecords={data.length}
      recordsPerPage={pageSize}
      page={page}
      onPageChange={setPage}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      fetching={loading}
      // Additional props for error handling or features as needed
    />
  );
};

export default ContributorsTable;
