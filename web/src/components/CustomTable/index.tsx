import React from 'react';
import Table from 'react-bootstrap/Table';
import { Download } from 'react-bootstrap-icons';

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

function DownloadColumn({ data }: { data: string }) {
  const onClick = (e: any) => {
    e.stopPropagation();
    const downloadLink = document.createElement('a');
    // eslint-disable-next-line react/destructuring-assignment
    const [metadata] = data.split(';');
    const [, extension] = metadata.split('/');

    downloadLink.href = data;
    downloadLink.download = `attachment.${extension}`;
    downloadLink.click();
  };
  return data ? <Download onClick={onClick} className="button-column" /> : null;
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

  const parseValue = (value: string, type: string): JSX.Element | string => {
    switch (type) {
      case 'date':
        return new Date(value).toLocaleDateString('pt-BR');
      case 'download':
        return <DownloadColumn data={value} />;
      case 'string':
      default:
        return value;
    }
  };

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
          {!isFetching ? (
            data.map((row) => (
              <tr
                key={rowIndexKey(row.id)}
                onClick={onRowClick ? () => onRowClick(row.id) : undefined}
              >
                {columns.map(({ key, type }) => (
                  <td key={cellIndexKey(row.id, key)}>
                    {parseValue(row[key], type)}
                  </td>
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
