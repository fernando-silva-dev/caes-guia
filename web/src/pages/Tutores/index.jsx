import React, { useState, useEffect } from 'react';
import { Col, Button, Container, Row } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import CustomTable from '../../components/CustomTable';
import Pagination from '../../components/CustomTable/Pagination';
import './styles.css';

const COLUMNS = [
  {
    key: 'name',
    title: 'Nome',
    type: 'str',
  },
  {
    key: 'username',
    title: 'E-mail',
    type: 'str',
  },
  {
    key: 'phone',
    title: 'Celular',
    type: 'str',
  },
];

function Tutores() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  let [isFetching, setIsFetching] = useState(true);
  let [tableData, setTableData] = useState([]);

  const fetchTutores = async () => {
    try {
      setIsFetching(true);
      const response = await api.get('user', { params: { page, size } });
      const { data, totalRecords } = response.data;
      setTableData(data);
      setTotal(totalRecords);
    } catch (error) {
      console.log(error);
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
            />
            <Pagination
              pageSize={size}
              currentPage={page}
              onPageChange={(value) => setPage(value)}
              onSizeChange={(value) => setSize(value)}
              total={total}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Tutores;
