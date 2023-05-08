import React from 'react';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

import Logo from '../../assets/helen-keller-logo-navbar.png';

import './styles.css';

interface CustomLinkParam {
  to: string;
  children: any;
}

function CustomLink({ to, children }: CustomLinkParam) {
  return (
    <LinkContainer to={to}>
      <Nav.Link className="border-end border-light px-3 navigation-link">
        {children}
      </Nav.Link>
    </LinkContainer>
  );
}

export default function NavigationBar() {
  return (
    <Navbar bg="white" expand="lg" className="navigation-bar shadow mb-5">
      <Container>
        <LinkContainer to="/service">
          <Image className="d-block" height={50} src={Logo} />
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/tutores">Tutores</CustomLink>
            <CustomLink to="/dogs">Cães</CustomLink>
          </Nav>
          <CustomLink to="/minha-conta">
            <PersonCircle className="mb-1 me-2" />
            Minha conta
          </CustomLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
