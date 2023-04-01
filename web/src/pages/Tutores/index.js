import React, { useState } from "react";
import { Col, Button, Container, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import NavigationBar from "../../components/NavigationBar";
import CustomTable from "../../components/CustomTable";
import Pagination from "../../components/CustomTable/Pagination";
import "./styles.css";

const COLUMNS = [
  {
    key: "id",
    title: "#",
    type: "int",
  },
  {
    key: "nome",
    title: "Nome",
    type: "str",
  },
  {
    key: "email",
    title: "E-mail",
    type: "str",
  },
  {
    key: "celular",
    title: "Celular",
    type: "str",
  },
];

// TODO: hardcoded data
const DATA = [
  { id: 0, nome: "JOAO", email: "joao@email.com", celular: "47-9999-9999" },
];

function Tutores(params) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="dashboard-page">
      <NavigationBar />
      <Container>
        {/* <Row> */}
        {/* <h2>Tutores</h2> */}
        {/* <Col> */}
        <Button
          className="mb-3"
          onClick={() => {
            navigate("/tutores/novo");
          }}
        >
          Adicionar
        </Button>
        {/* </Col> */}
        {/* </Row> */}
        <Row>
          <Col>
            <CustomTable
              columns={COLUMNS}
              data={DATA}
              onRowClick={(id) => {
                navigate(`/tutores/${id}`);
              }}
            />
            <Pagination
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={(value) => setCurrentPage(value)}
              onSizeChange={(value) => setPageSize(value)}
              total={10}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Tutores;
