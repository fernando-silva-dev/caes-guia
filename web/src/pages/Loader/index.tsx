import React from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';
import Loading from '~/components/Loader';

import Logo from '~/assets/helen-keller-logo.png';

import './styles.css';

export default function Loader() {
  return (
    <div className="login-page bg-white">
      <Container>
        <Row className="justify-content-md-center vertical-center">
          <Col md={4}>
            <div className="shadow p-3 rounded">
              <Image className="d-block mx-auto mb-4" src={Logo} />
              <Loading />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
