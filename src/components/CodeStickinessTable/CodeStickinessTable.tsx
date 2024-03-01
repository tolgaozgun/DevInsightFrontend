'use client';

import { CodeStickinessData } from '@/types'; // Adjust the import path as needed
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

const PAGE_SIZES = [5, 10, 20];

type CodeStickinessTableProps = {
  data: CodeStickinessData[];
  loading?: boolean;
  error?: React.ReactNode;
};

const CodeStickinessTable = ({ data, loading, error }: CodeStickinessTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<CodeStickinessData[]>([]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [data, page, pageSize]);

  console.log('da');
  console.log('Data is', data);

  const columns = [
    {
      accessor: 'developerName',
      header: 'Developer',
      sortable: true,
    },
    {
      accessor: 'stickinessPercentage',
      header: 'Stickiness (%)',
      sortable: true,
      render: (item: CodeStickinessData) => <span>{item.stickinessPercentage}%</span>,
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
      // You might need to add additional props for sorting or error handling based on your DataTable component's capabilities
    />
  );
};

export default CodeStickinessTable;
