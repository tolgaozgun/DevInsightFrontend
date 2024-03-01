'use client';

import { DeveloperCommitVolume } from '@/types'; // Assuming DeveloperCommitVolume is the type you have defined
import { Text } from '@mantine/core';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableProps } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

const PAGE_SIZES = [5, 10, 20];

type DeveloperCommitVolumeTableProps = {
  data: DeveloperCommitVolume[];
  loading?: boolean;
  error?: React.ReactNode;
};

const DeveloperCommitVolumeTable = ({ data, loading, error }: DeveloperCommitVolumeTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<DeveloperCommitVolume[]>([]);

  const columns: DataTableProps<DeveloperCommitVolume>['columns'] = [
    {
      accessor: 'developerName',
      render: (item: DeveloperCommitVolume) => <span>{item.developerName}</span>,
      sortable: true,
    },
    {
      accessor: 'totalCommits',
      render: (item: DeveloperCommitVolume) => <span>{item.totalCommits}</span>,
      sortable: true,
    },
    {
      accessor: 'mostFrequentFiles',
      render: (item: DeveloperCommitVolume) => <Text>{item.mostFrequentFiles.join(', ')}</Text>,
    },
  ];

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    let sortedData = sortBy(data, ['totalCommits']).reverse(); // Sort by totalCommits descending
    setRecords(sortedData.slice(from, to));
  }, [data, page, pageSize]);

  // Error handling and loading states can be implemented as needed
  return (
    <DataTable
      minHeight={200}
      verticalSpacing="sm"
      striped={true}
      columns={columns}
      records={records}
      totalRecords={data.length}
      recordsPerPage={pageSize}
      page={page}
      onPageChange={setPage}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      fetching={loading}
    />
  );
};

export default DeveloperCommitVolumeTable;
