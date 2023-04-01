import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Logo from "../../assets/helen-keller-logo-navbar.png";

import "./styles.css";

function CustomLink(params) {
  return (
    <LinkContainer to={params.to}>
      <Nav.Link className="border-end border-light px-3 navigation-link">
        {params.children}
      </Nav.Link>
    </LinkContainer>
  );
}

export default function NavigationBar(props) {
  return (
    <Navbar bg="white" expand="lg" className="navigation-bar shadow mb-5">
      <Container>
        <LinkContainer to="/service">
          <Image className="d-block" height={50} src={Logo}></Image>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/caes-guia">Cães-guia</CustomLink> */}
            <CustomLink to="/tutores">Tutores</CustomLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
