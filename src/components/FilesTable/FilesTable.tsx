'use client';

import { File } from '@/types';
import { Button } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

type FilesTableProps = {
  data: File[];
  loading?: boolean;
  error?: React.ReactNode;
};

const PAGE_SIZES = [5, 10, 20];

const FilesTable = ({ data, loading, error }: FilesTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<File[]>([]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [data, page, pageSize]);

  const columns = [
    { accessor: 'name', header: 'File Name', sortable: true },
    { accessor: 'sha', header: 'SHA', sortable: true },
    { accessor: 'path', header: 'Path', sortable: true },
    {
      accessor: 'repository.name',
      header: 'Repository',
      render: (item: File) => item.repository.name,
    },
    { accessor: 'fileChanges.length', header: 'Changes Count', sortable: true },
    {
      accessor: 'fileChanges',
      header: 'View Changes',
      render: (item: File) => (
        <Button variant="outline" onClick={() => console.log('Viewing changes for', item.name)}>
          View
        </Button>
      ),
      sortable: false,
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
      // Additional props for error handling or features as needed
    />
  );
};

export default FilesTable;
