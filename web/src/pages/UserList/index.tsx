import React, { useState, useEffect } from 'react';
import { Col, Button, Container, Row } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import CustomTable, { CustomTableColumn } from '~/components/CustomTable';
import { User } from '~/models/User';

import './styles.css';

// definição das colunas da tabela
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

function UserList() {
  const navigate = useNavigate();
  // controles de paginação
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [tableData, setTableData] = useState<User[]>([]);

  // função de busca para usuários
  const fetchUsers = async () => {
    try {
      setIsFetching(true);
      const response = await api.get('user', { params: { page, size } });
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
    fetchUsers();
  }, [page, size]);

  return (
    <div className="user-list-page">
      <Container>
        <div>
          <h1 className="d-inline-block">Tutores</h1>
          <Button
            className="float-end"
            onClick={() => {
              navigate('/user/new');
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
                navigate(`/user/${id}`);
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

export default UserList;
