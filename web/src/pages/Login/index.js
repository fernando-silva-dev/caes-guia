import React, { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Api from '../../services/api';
import { useState } from 'react';
import Cookies from 'universal-cookie';

import Logo from "../../assets/helen-keller-logo.png";

import "./styles.css"

function Login() {
    const cookies = new Cookies();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (cookies.get("remember-me")) {
            setUsername(cookies.get("username"));
            setRememberMe(true);
        }
    }, []);

    const submitForm = () => {
        console.log(username);
        Api.post('user/login', { username, password })
            .then((response) => {
                if (rememberMe) {
                    cookies.set("username", username);
                    cookies.set("remember-me", true);
                }
                cookies.set("token", response.data.token);
            })
            .catch(function (error) {
                console.log(error);
            }).finally(_ => {
                if (!rememberMe) {
                    cookies.remove("username");
                    cookies.set("remember-me", false);
                }
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
                                <Form.Label>Nome de usuário</Form.Label>
                                <Form.Control placeholder="Nome de usuário" name="username" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" placeholder="Senha" name="password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="lembrar-me">
                                <Form.Check type="checkbox" label="Lembrar-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.value)} />
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
