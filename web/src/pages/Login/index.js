import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Api from '../../services/api';
import { useState } from 'react';

import Logo from "../../assets/helen-keller-logo.png";

import "./styles.css"

function Login() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const { name, value } = event
        setCredentials((prev) => {
            return { ...prev, [name]: value }
        })
        console.log(credentials);
    }

    const submitForm = () => {
        Api.post('authentication/login', credentials)
            .then((response) => {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="login-page">
            <Container>
                <Row className="justify-content-md-center vertical-center">
                    <Col md={4}>
                        <Form className='shadow p-3 rounded bg-white' >
                            <Image className='d-block mx-auto mb-4' src={Logo}></Image>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Nome de usuário ou endereço de e-mail</Form.Label>
                                <Form.Control placeholder="E-mail" name="username" onChange={(e) => onChangeHandler(e.target)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" placeholder="Senha" name="password" onChange={(e) => onChangeHandler(e.target)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="lembrar-me">
                                <Form.Check type="checkbox" label="Lembrar-me" />
                            </Form.Group>

                            <Button variant="primary" className='w-100 mb-3' type="button" onClick={submitForm}>
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
