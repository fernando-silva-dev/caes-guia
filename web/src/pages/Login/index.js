import React, { useState } from "react";
import { Button, Form, Image, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { login } from "../../redux/slicers/auth";

import Api from "../../services/api";
import Logo from "../../assets/helen-keller-logo.png";

import "./styles.css";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    const { name, value } = event;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitForm = async () => {
    try {
      Api.post("authentication/login", credentials).then((response) => {
        dispatch(login(response.data));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-md-center vertical-center">
          <Col md={4}>
            <Form className="shadow p-3 rounded bg-white">
              <Image className="d-block mx-auto mb-4" src={Logo}></Image>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nome de usuário</Form.Label>
                <Form.Control
                  name="username"
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lembrar-me">
                <Form.Check type="checkbox" label="Lembrar-me" />
              </Form.Group>

              <Button
                variant="primary"
                className="w-100 mb-3"
                type="button"
                onClick={submitForm}
              >
                Acessar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
