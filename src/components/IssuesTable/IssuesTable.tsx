'use client';

import { Issue } from '@/types'; // Update this import as needed
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

const PAGE_SIZES = [5, 10, 20];

type IssuesTableProps = {
  data: Issue[];
  loading?: boolean;
  error?: React.ReactNode;
};

const IssuesTable = ({ data, loading, error }: IssuesTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<Issue[]>([]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [data, page, pageSize]);

  const columns = [
    {
      accessor: 'issueId',
      header: 'ID',
      sortable: true,
    },
    {
      accessor: 'title',
      header: 'Title',
      sortable: true,
    },
    {
      accessor: 'isClosed',
      header: 'Status',
      render: (item: Issue) => (item.isClosed ? 'Closed' : 'Open'),
      sortable: true,
    },
    {
      accessor: 'createdAt',
      header: 'Created At',
      render: (item: Issue) => new Date(item.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      accessor: 'closedAt',
      header: 'Closed At',
      render: (item: Issue) =>
        item.closedAt ? new Date(item.closedAt).toLocaleDateString() : 'N/A',
      sortable: true,
    },
    {
      accessor: 'severityRating',
      header: 'Severity',
      sortable: true,
    },
    {
      accessor: 'repository.name',
      header: 'Repository',
      render: (item: Issue) => item.repository.name,
      sortable: true,
    },
    // Additional fields can be added as needed
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
      // Include any additional props for sorting or error handling as needed
    />
  );
};

export default IssuesTable;
