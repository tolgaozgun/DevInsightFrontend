'use client';

import { EffectiveDeveloperData } from '@/types'; // Assuming the type is defined elsewhere
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

const PAGE_SIZES = [5, 10, 20];

type EffectiveDeveloperTableProps = {
  data: EffectiveDeveloperData[];
  loading?: boolean;
  error?: React.ReactNode;
};

const EffectiveDeveloperTable = ({ data, loading, error }: EffectiveDeveloperTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<EffectiveDeveloperData[]>([]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [data, page, pageSize]);

  const columns = [
    {
      accessor: 'developerName',
      header: 'Developer',
      sortable: true,
    },
    {
      accessor: 'commitCount',
      header: 'Commits',
      sortable: true,
    },
    {
      accessor: 'closedIssueCount',
      header: 'Closed Issues',
      sortable: true,
    },
    {
      accessor: 'fixedBugsCount',
      header: 'Fixed Bugs',
      sortable: true,
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
      // Additional props like sorting and error handling can be implemented as needed
    />
  );
};

export default EffectiveDeveloperTable;
