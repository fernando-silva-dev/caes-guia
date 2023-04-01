import React from 'react';
import Form from 'react-bootstrap/Form';
import { CaretRightFill, CaretLeftFill } from 'react-bootstrap-icons';

export default function Pagination({
  pageSize = 10,
  onSizeChange,
  currentPage = 1,
  onPageChange,
  total = 10,
}) {
  const startPage = pageSize * (currentPage - 1) + 1;
  const _endPage = pageSize * currentPage;
  const endPage = _endPage > total ? total : _endPage;
  const currentShowingDescription = `${startPage}-${endPage} de ${total}`;

  return (
    <div>
      <p className="d-inline-block mx-1">Itens por página:</p>
      <Form.Select
        value={pageSize}
        size="sm"
        onChange={(e) => onSizeChange(parseInt(e.target.value, 10))}
        className="d-inline-block w-auto mx-1"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Form.Select>
      <p className="d-inline-block mx-1">{currentShowingDescription}</p>
      <CaretLeftFill />
      <CaretRightFill />
      {/* TODO: implement page navigation */}
    </div>
  );
}
