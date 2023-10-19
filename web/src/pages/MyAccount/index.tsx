import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { User } from '~/models/User';
import './styles.css';

export default function MyAccount() {
  const [user, setUser] = useState<User>({
    role: 'Tutor',
    name: '',
    username: '',
    password: '',
    phone: '',
    cpf: '',
    cep: '',
    state: '',
    city: '',
    district: '',
    street: '',
    number: '',
    complement: '',
  });
  const [isFetching, setIsFetching] = useState(false);

  const fetchUser = async () => {
    try {
      setIsFetching(true);
      const response = await api.get('user/self');
      setUser(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="my-account-page">
      <Container>
        {isFetching ? <Spinner animation="border" className="me-2" /> : null}
        <h1 className="d-inline-block mb-4">Minha Conta</h1>
        <Form>
          <Row>
            <Col md={6}>
              <fieldset>
                <h4 className="d-inline-block mb-3">Dados pessoais</h4>
                <Form.Group className="mb-2" controlId="name">
                  <Form.Label className="fw-bold">Nome</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="name"
                    defaultValue={user.name}
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="username">
                  <Form.Label className="fw-bold">Nome de usuário</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="username"
                    defaultValue={user.username}
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="phone">
                  <Form.Label className="fw-bold">Celular</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="phone"
                    defaultValue={user.phone}
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="cpf">
                  <Form.Label className="fw-bold">CPF</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="cpf"
                    defaultValue={user.cpf}
                    readOnly
                    plaintext
                  />
                </Form.Group>
              </fieldset>
            </Col>

            <Col md={6}>
              <fieldset>
                <h4 className="d-inline-block mb-3">Endereço</h4>
                <Row className="mb-2">
                  <Form.Group as={Col} controlId="cep">
                    <Form.Label className="fw-bold">CEP</Form.Label>
                    <Form.Control
                      placeholder="-"
                      name="cep"
                      defaultValue={user.cep}
                      readOnly
                      plaintext
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="state">
                    <Form.Label className="fw-bold">Estado</Form.Label>
                    <Form.Select
                      name="state"
                      placeholder="-"
                      defaultValue={user.state}
                      disabled
                    >
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col} controlId="city">
                    <Form.Label className="fw-bold">Cidade</Form.Label>
                    <Form.Control
                      name="city"
                      defaultValue={user.city}
                      placeholder="-"
                      readOnly
                      plaintext
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="bairro">
                    <Form.Label className="fw-bold">Bairro</Form.Label>
                    <Form.Control
                      name="district"
                      defaultValue={user.district}
                      placeholder="-"
                      readOnly
                      plaintext
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-2" controlId="street">
                  <Form.Label className="fw-bold">Rua</Form.Label>
                  <Form.Control
                    name="street"
                    defaultValue={user.street}
                    placeholder="-"
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="number">
                  <Form.Label className="fw-bold">Número</Form.Label>
                  <Form.Control
                    name="number"
                    defaultValue={user.number}
                    placeholder="-"
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="complement">
                  <Form.Label className="fw-bold">Complemento</Form.Label>
                  <Form.Control
                    name="complement"
                    defaultValue={user.complement}
                    placeholder="-"
                    readOnly
                    plaintext
                  />
                </Form.Group>
              </fieldset>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
