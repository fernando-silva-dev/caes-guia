import React from 'react';
import { Container, Row } from 'react-bootstrap';

import './styles.css';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <Container>
        <Row>
          <h1>Bem vinde ao Sistema de Gestão de Cães da Escola de Cães-Guias Helen Keller</h1>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
