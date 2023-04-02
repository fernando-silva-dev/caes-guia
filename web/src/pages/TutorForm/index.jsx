import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import './styles.css';

function TutorForm() {
  const { id } = useParams();
  const [isFetching, setIsFetching] = useState(!!id);
  const [tutor, setTutor] = useState({
    nome: '',
    email: '',
    celular: '',
    rua: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event;
    setTutor((prev) => ({ ...prev, [name]: value }));
  };

  const fetchTutor = async (id) => {
    setIsFetching(true);
    try {
      const response = await Api.get(`user/${id}`, tutor);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  // if (id) {
  //   fetchTutor(id);
  // }

  return (
    <div className="tutor-form-page">
      <Container>
        <Row>
          <Col md={6}>
            <Form className="">
              <fieldset disabled={isFetching}>
                {isFetching ? (
                  <Spinner animation="border" className="me-2" />
                ) : null}
                <h1 className="d-inline-block">Tutor</h1>

                <Form.Group className="mb-3" controlId="nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    placeholder="Nome"
                    name="nome"
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    placeholder="E-mail"
                    name="email"
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="celular">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    placeholder="Celular"
                    name="celular"
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="cep">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                      name="cep"
                      onChange={(e) => onChangeHandler(e.target)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="uf">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select name="uf">
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
                  <Form.Group as={Col} controlId="cidade">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                      name="cidade"
                      onChange={(e) => onChangeHandler(e.target)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="bairro">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                      name="bairro"
                      onChange={(e) => onChangeHandler(e.target)}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="rua">
                  <Form.Label>Rua</Form.Label>
                  <Form.Control
                    name="rua"
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="complemento">
                  <Form.Label>Complemento</Form.Label>
                  <Form.Control
                    name="complemento"
                    onChange={(e) => onChangeHandler(e.target)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="me-3"
                  type="button"
                  onClick={() => {}}
                >
                  Salvar
                </Button>
                {/* TODO: Não faz sentido remover no form de cadastro */}
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => {}}
                >
                  Remover
                </Button>
              </fieldset>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TutorForm;
