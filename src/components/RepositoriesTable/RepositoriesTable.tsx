import { Repository } from '@/types';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

type RepositoriesTableProps = {
  data: Repository[];
  loading?: boolean;
  error?: React.ReactNode;
};

const PAGE_SIZES = [5, 10, 20];

const RepositoriesTable = ({ data, loading, error }: RepositoriesTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<Repository[]>([]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [data, page, pageSize]);

  const columns = [
    { accessor: 'name', header: 'Repository Name', sortable: true },
    { accessor: 'owner', header: 'Owner', sortable: true },
    {
      accessor: 'url',
      header: 'URL',
      render: (item: Repository) => (
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      ),
      sortable: false,
    },
    { accessor: 'issues.length', header: 'Issues Count', sortable: true },
    { accessor: 'pullRequests.length', header: 'Pull Requests Count', sortable: true },
    { accessor: 'commits.length', header: 'Commits Count', sortable: true },
    { accessor: 'contributors.length', header: 'Contributors Count', sortable: true },
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
      // Add additional props as needed for error handling or other features
    />
  );
};

export default RepositoriesTable;
