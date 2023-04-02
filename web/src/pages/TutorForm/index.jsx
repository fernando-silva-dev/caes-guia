import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

function TutorForm() {
  const params = useParams();
  const { id } = params;
  //   console.log(id);
  const [isFetching, setIsFetching] = useState(false);
  const [editable, setEditable] = useState(!id);
  const [tutor, setTutor] = useState({ role: 'Tutor', cpf: '' });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event;
    setTutor((prev) => ({ ...prev, [name]: value }));
  };

  const fetchTutor = async () => {
    try {
      setIsFetching(true);
      const response = await api.get(`user/${id}`);
      setTutor(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const updateTutor = async () => {
    try {
      setIsFetching(true);
      const data = {
        ...tutor,
        cpf: tutor.cpf.replace(/\D/g, ''),
      };
      const response = await api.put(`user/${id}`, data);
      setTutor(response.data);
      setEditable(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const createTutor = async () => {
    try {
      setIsFetching(true);
      const data = {
        ...tutor,
        cpf: tutor.cpf.replace(/\D/g, ''),
      };
      const response = await api.post(`user`, data);
      navigate('/tutores');
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const deleteTutor = async () => {
    try {
      setIsFetching(true);
      const response = await api.delete(`user/${id}`, tutor);
      navigate('/tutores');
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTutor();
    }
  }, []);

  return (
    <div className="tutor-form-page">
      <Container>
        {isFetching ? <Spinner animation="border" className="me-2" /> : null}
        <h1 className="d-inline-block">Tutor</h1>
        <Row>
          <Col md={6} className="divider">
            <Form className="">
              <fieldset disabled={isFetching}>
                <h4 className="d-inline-block">Dados pessoais</h4>

                <Form.Group className="mb-3" controlId="nome">
                  <Form.Label className="fw-bold">Nome</Form.Label>
                  <Form.Control
                    name="name"
                    readOnly={!editable}
                    plaintext={!editable}
                    defaultValue={tutor.name}
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="fw-bold">E-mail</Form.Label>
                  <Form.Control
                    name="username"
                    readOnly={!editable}
                    plaintext={!editable}
                    defaultValue={tutor.username}
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
                {editable ? (
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="fw-bold">Senha</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      readOnly={!editable}
                      plaintext={!editable}
                      onChange={(e) => onChangeHandler(e.target)}
                    />
                  </Form.Group>
                ) : null}
                <Form.Group className="mb-3" controlId="celular">
                  <Form.Label className="fw-bold">Celular</Form.Label>
                  <Form.Control
                    name="phone"
                    readOnly={!editable}
                    plaintext={!editable}
                    defaultValue={tutor.phone}
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="cpf">
                  <Form.Label className="fw-bold">CPF</Form.Label>
                  <Form.Control
                    name="cpf"
                    readOnly={!editable}
                    plaintext={!editable}
                    defaultValue={tutor.cpf}
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
              </fieldset>
            </Form>
          </Col>
          <Col md={6}>
            <Form>
              <fieldset disabled={isFetching}>
                <h4 className="d-inline-block">Endereço</h4>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="cep">
                    <Form.Label className="fw-bold">CEP</Form.Label>
                    <Form.Control
                      name="cep"
                      readOnly={!editable}
                      plaintext={!editable}
                      defaultValue={tutor.cep}
                      onChange={(e) => onChangeHandler(e.target)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="uf">
                    <Form.Label className="fw-bold">Estado</Form.Label>
                    <Form.Select
                      name="state"
                      readOnly={!editable}
                      plaintext={!editable}
                      defaultValue={tutor.state}
                      onChange={(e) => onChangeHandler(e.target)}
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

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="city">
                    <Form.Label className="fw-bold">Cidade</Form.Label>
                    <Form.Control
                      name="city"
                      readOnly={!editable}
                      plaintext={!editable}
                      defaultValue={tutor.city}
                      onChange={(e) => onChangeHandler(e.target)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="district">
                    <Form.Label className="fw-bold">Bairro</Form.Label>
                    <Form.Control
                      name="district"
                      readOnly={!editable}
                      plaintext={!editable}
                      defaultValue={tutor.district}
                      onChange={(e) => onChangeHandler(e.target)}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="street">
                  <Form.Label className="fw-bold">Rua</Form.Label>
                  <Form.Control
                    name="street"
                    readOnly={!editable}
                    plaintext={!editable}
                    defaultValue={tutor.street}
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="number">
                  <Form.Label className="fw-bold">Número</Form.Label>
                  <Form.Control
                    name="number"
                    readOnly={!editable}
                    plaintext={!editable}
                    defaultValue={tutor.number}
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="complement">
                  <Form.Label className="fw-bold">Complemento</Form.Label>
                  <Form.Control
                    name="complement"
                    readOnly={!editable}
                    plaintext={!editable}
                    defaultValue={tutor.complement}
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
              </fieldset>
            </Form>
          </Col>
          <Col>
            {!editable && id ? (
              <>
                <Button
                  variant="warning"
                  className="me-3 mb-3"
                  type="button"
                  onClick={() => {
                    setEditable(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  className="me-3 mb-3"
                  type="button"
                  onClick={() => {
                    deleteTutor();
                  }}
                >
                  Remover
                </Button>
                <Button
                  variant="secondary"
                  className="me-3 mb-3"
                  type="button"
                  onClick={() => {
                    navigate('/tutores');
                  }}
                >
                  Voltar
                </Button>
              </>
            ) : null}
            {editable ? (
              <>
                <Button
                  variant="primary"
                  className="me-3 mb-3"
                  type="button"
                  onClick={() => {
                    if (id) updateTutor();
                    else createTutor();
                  }}
                >
                  Salvar
                </Button>
                <Button
                  variant="secondary"
                  className="me-3 mb-3"
                  type="button"
                  onClick={() => {
                    setEditable(false);
                  }}
                >
                  Cancelar
                </Button>
              </>
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TutorForm;
