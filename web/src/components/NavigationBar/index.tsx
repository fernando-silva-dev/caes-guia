import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Image, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BoxArrowLeft, MoonStarsFill, PersonCircle, Sun } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import Toggle from 'react-toggle';

import Logo from '~/assets/helen-keller-logo-navbar.png';
import { authSelector, logout, State } from '~/redux/slicers/auth';

import './styles.css';

interface CustomLinkParam {
  to: string;
  children: any;
  className?: string;
}

function CustomLink({ to, children, className = '' }: CustomLinkParam) {
  return (
    <LinkContainer to={to} className={className}>
      <Nav.Link className="px-3 navigation-link">
        {children}
      </Nav.Link>
    </LinkContainer>
  );
}

export default function NavigationBar() {
  const [darkMode, setDarkMode] = useState(true);
  const auth: State = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = document.querySelector('html')?.getAttribute('data-bs-theme');
    setDarkMode(theme !== 'dark');
  });

  const onDarkModeToggle = () => {
    document.querySelector('html')?.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    setDarkMode(!darkMode);
  };

  return (
    <Navbar expand="lg" className="navigation-bar shadow mb-5">
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/service">
            <Image className="d-block" height={50} src={Logo} />
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-contents me-auto">
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/user">Usuários</CustomLink>
            <CustomLink to="/brood">Ninhadas</CustomLink>
            <LinkContainer to="/dog">
              <Nav.Link className="px-3 navigation-link me-auto">
                Cães
              </Nav.Link>
            </LinkContainer>
            <div className="">
              <Toggle
                className="mt-1"
                defaultChecked={darkMode}
                icons={{
                  checked: <Sun width="10" height="10" />,
                  unchecked: <MoonStarsFill width="10" height="10" />,
                }}
                onChange={onDarkModeToggle}
              />
            </div>

            <NavDropdown
              id="basic-nav-dropdown"
              className="px-3"
              title={(
                <div className="d-inline-block">
                  <PersonCircle className="mb-1 me-2" />
                  {auth.user?.name}
                </div>
              )}
            >
              <LinkContainer to="/my-account">
                <NavDropdown.Item>Minha Conta</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/change-password">
                <NavDropdown.Item>Alterar Senha</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item
                className="text-danger"
                onClick={() => dispatch(logout())}
              >
                <BoxArrowLeft className="me-1 mb-1" />
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}
