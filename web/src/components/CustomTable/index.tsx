import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

import Loader from '~/components/Loader';
import DownloadButton from '~/components/DownloadButton';

import Pagination, { PaginationParams } from './Pagination';
import './styles.css';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Paperclip } from 'react-bootstrap-icons';
import AttachmentPreview from '~/components/AttachmentPreview';
import { Attachment } from '~/models/Event';

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

const renderTooltip = (text: string) => function (props: any) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );
};

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

  const [filePreview, setFilePreview] = useState<Attachment | undefined>(undefined);

  const getRowValue = (row: object, key: string): string => {
    const path = key.split('.');

    let res: Object | string = row;
    for (let i = 0; i < path.length; i++) {
      // @ts-ignore
      res = res[path[i]] as any;
    }
    return res as string;
  };

  const parseValue = (
    value: string,
    type: string,
  ): JSX.Element | string | null => {
    switch (type) {
      case 'date':
        return new Date(value).toLocaleDateString('pt-BR');
      case 'download':
        return value ? <DownloadButton data={value} /> : null;

      case 'file_preview':
        // eslint-disable-next-line no-case-declarations
        const files = value as unknown as Attachment[];

        return (
          <>
            {files.map((file) => (
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip(file.name)}
              >
                <Button
                  variant="light"
                  type="button"
                  className="ms-2 "
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilePreview(file);
                  }}
                >
                  <Paperclip />
                </Button>
              </OverlayTrigger>
            ))}
          </>
        );
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
          {!isFetching && data.length > 0 ? (
            data.map((row) => (
              <tr
                key={rowIndexKey(row.id)}
                onClick={onRowClick ? () => onRowClick(row.id) : undefined}
              >
                {columns.map(({ key, type }) => (
                  <td key={cellIndexKey(row.id, key)}>
                    {parseValue(getRowValue(row, key), type)}
                  </td>
                ))}
              </tr>
            ))
          ) : null }

          {!isFetching && data.length === 0 ? (
            <td className="text-center p-4 border-bottom" colSpan={columns.length}>
              Sem registros
            </td>
          ) : null}

          {isFetching ? (
            <tr>
              <td colSpan={columns.length}>
                <Loader />
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>
      <Pagination
        pageNumber={pageNumber}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onSizeChange={onSizeChange}
        total={total}
      />

      {filePreview && filePreview.id
        ? (
          <AttachmentPreview
            attachmentUUID={filePreview.id}
            filename={filePreview.name}
            onClose={() => setFilePreview(undefined)}
          />
        ) : null}
    </>
  );
}
