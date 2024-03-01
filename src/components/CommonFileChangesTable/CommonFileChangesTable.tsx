'use client';

import { CommonFileChangesData } from '@/types'; // Assuming the type is defined elsewhere
import { Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

const PAGE_SIZES = [5, 10, 20];

type CommonFileChangesTableProps = {
  data: CommonFileChangesData[];
  loading?: boolean;
  error?: React.ReactNode;
};

const CommonFileChangesTable = ({ data, loading, error }: CommonFileChangesTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<CommonFileChangesData[]>([]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [data, page, pageSize]);

  const columns = [
    {
      accessor: 'fileGroup',
      render: (item: CommonFileChangesData) => {
        return <Text>{item.fileGroup.join(', ')}</Text>;
      },
    },
    {
      accessor: 'coCommitCount',
      render: (item: CommonFileChangesData) => <span>{item.coCommitCount}</span>,
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
      // error handling or custom components can be added here as needed
    />
  );
};

export default CommonFileChangesTable;
