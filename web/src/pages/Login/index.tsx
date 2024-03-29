import React, { useState, useEffect } from 'react';
import { Button, Form, Image, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

import { login } from '~/redux/slicers/auth';
import Api from '~/services/api';

import Logo from '~/assets/helen-keller-logo.png';

import './styles.css';

function Login() {
  const cookies = new Cookies();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (cookies.get('remember-me')) {
      setUsername(cookies.get('username'));
      setRememberMe(true);
    }
  }, []);
  const dispatch = useDispatch();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Api.post('user/login', { username, password });
      dispatch(login(response.data));
      cookies.set('remember-me', rememberMe);
      cookies.set('token', response.data.token);
      if (rememberMe) {
        cookies.set('username', username);
      } else {
        cookies.remove('username');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      cookies.remove('remember-me');
      cookies.remove('username');
    }
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-md-center vertical-center">
          <Col md={4}>
            <Form
              className="shadow p-3 rounded bg-light"
              onSubmit={(e) => {
                submitForm(e);
              }}
            >
              <Image className="d-block mx-auto mb-4" src={Logo} />
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nome de usuário</Form.Label>
                <Form.Control
                  placeholder="Nome de usuário"
                  name="username"
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lembrar-me">
                <Form.Check
                  type="checkbox"
                  label="Lembrar-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </Form.Group>

              <Button variant="primary" className="w-100 mb-3" type="submit">
                Acessar
              </Button>

              <Button variant="link" className="">
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
