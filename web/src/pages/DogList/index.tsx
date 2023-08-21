import React, { useState, useEffect } from 'react';
import { Col, Button, Container, Row } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import CustomTable, { CustomTableColumn } from '~/components/CustomTable';
import { Dog } from '~/models/Dog';

import './styles.css';

const COLUMNS: CustomTableColumn[] = [
  {
    key: 'name',
    title: 'Nome',
    type: 'string',
  },
  {
    key: 'color',
    title: 'Cor',
    type: 'string',
  },
  {
    key: 'status',
    title: 'Status',
    type: 'string',
  },
];

function DogList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [tableData, setTableData] = useState<Dog[]>([]);

  const fetchDogs = async () => {
    try {
      setIsFetching(true);
      const response = await api.get('dog', { params: { page, size } });
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
    fetchDogs();
  }, [page, size]);

  return (
    <div className="dashboard-page">
      <Container>
        <div>
          <h1 className="d-inline-block">Cães</h1>
          <Button
            className="float-end"
            onClick={() => {
              navigate('/dogs/new');
            }}
          >
            <Plus />
            Adicionar
          </Button>
        </div>
        <Row>
          <Col>
            <CustomTable
              columns={COLUMNS}
              data={tableData}
              onRowClick={(id) => {
                navigate(`/dogs/${id}`);
              }}
              pageSize={size}
              pageNumber={page}
              onPageChange={(value) => setPage(value)}
              onSizeChange={(value) => setSize(value)}
              total={total}
              isFetching={isFetching}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DogList;
