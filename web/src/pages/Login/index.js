import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Logo from "../../assets/helen-keller-logo.png";

import "./styles.css"

function Login() {
  return (
    <div className="login-page">
        <Container>
            <Row className="justify-content-md-center vertical-center">
                <Col md={4}>
                    <Form className='shadow p-3 rounded bg-white'>
                        <Image className='d-block mx-auto mb-4' src={Logo}></Image>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Nome de usuário ou endereço de e-mail</Form.Label>
                            <Form.Control type="email" placeholder="E-mail" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="senha">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Senha" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lembrar-me">
                            <Form.Check type="checkbox" label="Lembrar-me" />
                        </Form.Group>

                        <Button variant="primary" className='w-100 mb-3' type="submit">
                            Acessar
                        </Button>

                        <Button variant="link" className=''>
                            Recuperar conta
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default Login;
