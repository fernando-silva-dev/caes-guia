import React from 'react';

import { Button, Form } from 'react-bootstrap';
import { CaretRightFill, CaretLeftFill } from 'react-bootstrap-icons';

export interface PaginationParams {
  pageSize: number;
  onSizeChange: (size: number) => void;
  pageNumber: number;
  onPageChange: (page: number) => void;
  total: number;
}

export default function Pagination({
  pageSize = 10,
  onSizeChange,
  pageNumber = 0,
  onPageChange,
  total = 10,
}: PaginationParams) {
  const startPageAux = pageSize * pageNumber + 1;
  const endPageAux = pageSize * (pageNumber + 1);
  const endPage = endPageAux > total ? total : endPageAux;
  const startPage = startPageAux > total ? total : startPageAux;
  const currentShowingDescription = `${startPage}-${endPage} de ${total}`;

  const totalPages = Math.ceil(total / pageSize);
  const hasNextPage = pageNumber < totalPages - 1;
  const hasPreviousPage = pageNumber > 0;

  const nextPage = () => onPageChange(pageNumber + 1);
  const previousPage = () => onPageChange(pageNumber - 1);

  return (
    <div>
      <p className="d-inline-block mx-1 my-2">Itens por página:</p>
      <Form.Select
        value={pageSize}
        size="sm"
        onChange={(e) => {
          onSizeChange(parseInt(e.target.value, 10));
          onPageChange(0);
        }}
        className="d-inline-block w-auto mx-1"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Form.Select>
      <Button
        variant="link"
        className="float-end"
        disabled={!hasNextPage}
        onClick={() => nextPage()}
      >
        Próximo
        <CaretRightFill />
      </Button>
      <p className="d-inline-block my-2 mx-1 float-end">
        {currentShowingDescription}
      </p>
      <Button
        variant="link"
        disabled={!hasPreviousPage}
        className="float-end"
        onClick={() => previousPage()}
      >
        <CaretLeftFill />
        Anterior
      </Button>
    </div>
  );
}
