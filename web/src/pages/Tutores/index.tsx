import React, { useState, useEffect } from 'react';
import { Col, Button, Container, Row } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import CustomTable, { CustomTableColumn } from '../../components/CustomTable';
import Pagination from '../../components/CustomTable/Pagination';
import './styles.css';
import { Tutor } from '../../models/Tutor';

const COLUMNS: CustomTableColumn[] = [
  {
    key: 'name',
    title: 'Nome',
    type: 'string',
  },
  {
    key: 'username',
    title: 'E-mail',
    type: 'string',
  },
  {
    key: 'phone',
    title: 'Celular',
    type: 'string',
  },
];

function Tutores() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [tableData, setTableData] = useState<Tutor[]>([]);

  const fetchTutores = async () => {
    try {
      setIsFetching(true);
      const response = await api.get('user', { params: { page, size } });
      const { data, totalRecords } = response.data;
      setTableData(data);
      setTotal(totalRecords);
    } catch (error) {
      // TODO: handle error
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTutores();
  }, [page, size]);

  return (
    <div className="dashboard-page">
      <Container>
        <div>
          <h1 className="d-inline-block">Tutores</h1>
          <Button
            className="float-end"
            onClick={() => {
              navigate('/tutores/novo');
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
                navigate(`/tutores/${id}`);
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

export default Tutores;
