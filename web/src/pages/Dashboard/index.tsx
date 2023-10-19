import React from 'react';
import { Container, Row } from 'react-bootstrap';

import './styles.css';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <Container>
        <Row>
          <h1 className="w-100 text-center">Bem vinde!</h1>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
