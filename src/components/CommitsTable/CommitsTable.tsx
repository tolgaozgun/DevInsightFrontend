'use client';

import { Commit } from '@/types';
import { Anchor } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

type CommitsTableProps = {
  data: Commit[];
  loading?: boolean;
  error?: React.ReactNode;
};

const PAGE_SIZES = [5, 10, 20];

const CommitsTable = ({ data, loading, error }: CommitsTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<Commit[]>([]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [data, page, pageSize]);

  const columns = [
    { accessor: 'hash', header: 'Commit Hash', sortable: true },
    {
      accessor: 'url',
      header: 'URL',
      render: (item: Commit) => (
        <Anchor href={item.url} target="_blank">
          View Commit
        </Anchor>
      ),
    },
    {
      accessor: 'commitTime',
      header: 'Commit Time',
      render: (item: Commit) => new Date(item.commitTime).toLocaleDateString(),
      sortable: true,
    },
    {
      accessor: 'contributor.name',
      header: 'Contributor',
      render: (item: Commit) => item.contributor.name,
    },
    {
      accessor: 'repository.name',
      header: 'Repository',
      render: (item: Commit) => item.repository.name,
    },
    { accessor: 'pullRequests.length', header: 'Pull Requests', sortable: true },
    { accessor: 'changedFiles.length', header: 'Files Changed', sortable: true },
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

export default CommitsTable;
