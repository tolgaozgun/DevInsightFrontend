'use client';

import { PullRequest } from '@/types';
import { Anchor } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

type PullRequestsTableProps = {
  data: PullRequest[];
  loading?: boolean;
  error?: React.ReactNode;
};

const PAGE_SIZES = [5, 10, 20];

const PullRequestsTable = ({ data, loading, error }: PullRequestsTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<PullRequest[]>([]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [data, page, pageSize]);

  const columns = [
    { accessor: 'title', header: 'Title', sortable: true },
    {
      accessor: 'url',
      header: 'URL',
      render: (item: PullRequest) => (
        <Anchor href={item.url} target="_blank">
          Link
        </Anchor>
      ),
    },
    {
      accessor: 'createdAt',
      header: 'Created At',
      render: (item: PullRequest) => new Date(item.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      accessor: 'mergedAt',
      header: 'Merged At',
      render: (item: PullRequest) =>
        item.mergedAt ? new Date(item.mergedAt).toLocaleDateString() : 'N/A',
      sortable: true,
    },
    { accessor: 'numberOfComments', header: 'Comments', sortable: true },
    {
      accessor: 'reviewed',
      header: 'Reviewed',
      render: (item: PullRequest) => (item.reviewed ? 'Yes' : 'No'),
      sortable: true,
    },
    { accessor: 'size', header: 'Size (KB)', sortable: true },
    { accessor: 'additions', header: 'Additions', sortable: true },
    { accessor: 'deletions', header: 'Deletions', sortable: true },
    {
      accessor: 'repository.name',
      header: 'Repository',
      render: (item: PullRequest) => item.repository.name,
    },
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
      // Include any additional props for error handling or other features
    />
  );
};

export default PullRequestsTable;
