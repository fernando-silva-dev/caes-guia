import React from 'react';
import Table from 'react-bootstrap/Table';

import './styles.css';

export default function CustomTable({ columns = [], data = [], onRowClick }) {
  const columnIndexKey = (key) => `th-${key}`;
  const rowIndexKey = (key) => `tr-${key}`;
  const cellIndexKey = (id, key) => `tr-${id}-${key}`;

  return (
    <Table hover className="custom-table">
      <thead>
        <tr>
          {columns.map(({ key, title }) => (
            <th key={columnIndexKey(key)}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={rowIndexKey(row.id)}
            onClick={onRowClick ? () => onRowClick(row.id) : undefined}
          >
            {columns.map(({ key }) => (
              <td key={cellIndexKey(data.id, key)}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
