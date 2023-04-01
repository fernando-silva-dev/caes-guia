import React from "react";
import { Container, Row } from "react-bootstrap";

import NavigationBar from "../../components/NavigationBar";

import "./styles.css";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <NavigationBar />
      <Container>
        <Row></Row>
      </Container>
    </div>
  );
}

export default Dashboard;
