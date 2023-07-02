import React, { useEffect, useState } from 'react';

import { Button, Col, Container, Row } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomTable, { CustomTableColumn } from '../../components/CustomTable';
import api from '../../services/api';

const COLUMNS: CustomTableColumn[] = [
  {
    key: 'date',
    title: 'Data',
    type: 'date',
  },
  {
    key: 'description',
    title: 'Descrição',
    type: 'string',
  },
];

export default function EventList() {
  const navigate = useNavigate();

  const params = useParams();
  const { dogId } = params;

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [tableData, setTableData] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      setIsFetching(true);
      const response = await api.get(`event/dog/${dogId}`, {
        params: { page, size },
      });
      const { data, totalRecords } = response.data;

      setTableData(data);
      setTotal(totalRecords);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page, size]);

  return (
    <Container>
      <div>
        <h4 className="d-inline-block">Eventos</h4>
        <Button
          className="float-end"
          onClick={() => {
            navigate(`/dogs/${dogId}/events/new`);
          }}
        >
          <Plus />
          Adicionar
        </Button>
      </div>
      <CustomTable
        columns={COLUMNS}
        data={tableData}
        onRowClick={(eventId) => {
          navigate(`/dogs/${dogId}/events/${eventId}`);
        }}
        pageSize={size}
        pageNumber={page}
        onPageChange={(value) => setPage(value)}
        onSizeChange={(value) => setSize(value)}
        total={total}
        isFetching={isFetching}
      />
    </Container>
  );
}
