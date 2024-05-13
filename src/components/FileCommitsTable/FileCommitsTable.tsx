'use client';

import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableProps, DataTableSortStatus } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';
import { ErrorAlert } from '../../components';
import { FileCommitData, RFileCommitRank } from '../../types'; // Assuming FileCommitData is the type you have defined for commit data

const PAGE_SIZES = [5, 10, 20];

type FileCommitsTableProps = {
  data: RFileCommitRank[];
  error?: React.ReactNode;
  loading?: boolean;
};

const FileCommitsTable = ({ data, loading, error }: FileCommitsTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<RFileCommitRank[]>([]);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'fileName',
    direction: 'asc',
  });
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const columns: DataTableProps<RFileCommitRank>['columns'] = [
    {
      accessor: 'fileName',
      render: (item: RFileCommitRank) => <span>{item.fileName}</span>,
      sortable: true,
      filter: (
        <TextInput
          label="File Name"
          placeholder="Search file names..."
          leftSection={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      ),
      filtering: query !== '',
    },
    {
      accessor: 'commitCount',
      render: (item: FileCommitData) => <span>{item.commitCount}</span>,
      sortable: true,
    },
    // {
    //   accessor: 'contributors',
    //   render: (item: FileCommitData) => <Text>{item.contributors.join(', ')}</Text>,
    // },
    // {
    //   accessor: 'mostRecentCommit',
    //   render: (item: FileCommitData) => <Text>{item.mostRecentCommit}</Text>,
    //   sortable: true,
    // },
  ];

  useEffect(() => {
    setPage(1);
  }, [pageSize, debouncedQuery]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    let filteredData = sortBy(data, [sortStatus.columnAccessor]);
    if (sortStatus.direction === 'desc') {
      filteredData = filteredData.reverse();
    }

    if (debouncedQuery) {
      filteredData = filteredData.filter(({ fileName }) =>
        fileName.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
      );
    }

    setRecords(filteredData.slice(from, to));
  }, [sortStatus, data, page, pageSize, debouncedQuery]);

  console.log(data, error, loading);

  return error ? (
    <ErrorAlert title="Error loading file commits" message={error.toString()} />
  ) : (
    <DataTable
      minHeight={200}
      verticalSpacing="sm"
      striped={true}
      columns={columns}
      records={records}
      totalRecords={debouncedQuery ? records.length : data.length}
      recordsPerPage={pageSize}
      page={page}
      onPageChange={setPage}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      fetching={loading}
    />
  );
};

export default FileCommitsTable;
