import React, { useEffect, useState } from 'react';

import { Button, Container } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomTable, { CustomTableColumn } from '~/components/CustomTable';
import api from '~/services/api';

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
  {
    key: 'attachments',
    title: 'Anexos',
    type: 'file_preview',
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
        <Button
          className="float-start"
          onClick={() => {
            navigate(`/dog/${dogId}/event/new`);
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
          navigate(`/dog/${dogId}/event/${eventId}`);
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
