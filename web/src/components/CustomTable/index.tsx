import React from 'react';
import Table from 'react-bootstrap/Table';
import Loader from '../Loader';

import Pagination, { PaginationParams } from './Pagination';

import './styles.css';

export interface CustomTableColumn {
  key: string;
  title: string;
  type: string;
}

export interface CustomTableProps extends PaginationParams {
  columns: CustomTableColumn[];
  data: any[];
  onRowClick: (id: string | number) => void;
  isFetching: boolean;
}

export default function CustomTable({
  columns = [],
  data = [],
  onRowClick,
  isFetching,
  pageNumber,
  pageSize,
  onPageChange,
  onSizeChange,
  total,
}: CustomTableProps) {
  const columnIndexKey = (key: string | number) => `th-${key}`;
  const rowIndexKey = (key: string | number) => `tr-${key}`;
  const cellIndexKey = (id: string | number, key: string | number) => `tr-${id}-${key}`;

  return (
    <>
      <Table hover className="custom-table">
        <thead>
          <tr>
            {columns.map(({ key, title }) => (
              <th key={columnIndexKey(key)}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isFetching ? (
            data.map((row) => (
              <tr
                key={rowIndexKey(row.id)}
                onClick={onRowClick ? () => onRowClick(row.id) : undefined}
              >
                {columns.map(({ key }) => (
                  <td key={cellIndexKey(row.id, key)}>{row[key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <Loader />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination
        pageNumber={pageNumber}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onSizeChange={onSizeChange}
        total={total}
      />
    </>
  );
}
