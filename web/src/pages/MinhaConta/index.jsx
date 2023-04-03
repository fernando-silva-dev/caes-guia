import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import './styles.css';
import api from '../../services/api';

export default function MinhaConta() {
  const [usuario, setUsuario] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await api.get('user/self');
      setUsuario(response.data);
    } catch (error) {
      // TODO tratamento de erro
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const submitForm = async (params) => {
    setIsFetching(true);
    try {
      const response = await api.patch(`user/${usuario.id}`, params);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const schema = Yup.object().shape({
    oldPassword: Yup.string().required('Campo obrigatório'),
    newPassword: Yup.string()
      .min(8, 'Senha deve ter ao menos 8 caracteres')
      .required('Campo obrigatório'),
    passwordConfimation: Yup.string()
      .min(8, 'Senha deve ter ao menos 8 caracteres')
      .required('Campo obrigatório'),
  });

  return (
    <div className="minha-conta-page">
      <Container>
        <h1 className="d-inline-block mb-3">Minha Conta</h1>
        <Row>
          <Col md={6} className="divider">
            <Form>
              <fieldset>
                <h4 className="d-inline-block">Dados pessoais</h4>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="fw-bold">Nome</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="nome"
                    defaultValue={usuario.name}
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="fw-bold">Nome de usuário</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="email"
                    defaultValue={usuario.username}
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="celular">
                  <Form.Label className="fw-bold">Celular</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="celular"
                    defaultValue={usuario.phone}
                    readOnly
                    plaintext
                  />
                </Form.Group>

                <h4 className="d-inline-block">Endereço</h4>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="cep">
                    <Form.Label className="fw-bold">CEP</Form.Label>
                    <Form.Control
                      placeholder="-"
                      name="cep"
                      defaultValue={usuario.cep}
                      readOnly
                      plaintext
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="uf">
                    <Form.Label className="fw-bold">Estado</Form.Label>
                    <Form.Select
                      name="uf"
                      placeholder="-"
                      defaultValue={usuario.state}
                      readOnly
                      plaintext
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
                  <Form.Group as={Col} controlId="cidade">
                    <Form.Label className="fw-bold">Cidade</Form.Label>
                    <Form.Control
                      name="cidade"
                      defaultValue={usuario.city}
                      placeholder="-"
                      readOnly
                      plaintext
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="bairro">
                    <Form.Label className="fw-bold">Bairro</Form.Label>
                    <Form.Control
                      name="bairro"
                      defaultValue={usuario.district}
                      placeholder="-"
                      readOnly
                      plaintext
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="rua">
                  <Form.Label className="fw-bold">Rua</Form.Label>
                  <Form.Control
                    name="rua"
                    defaultValue={usuario.street}
                    placeholder="-"
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group controlId="complemento">
                  <Form.Label className="fw-bold">Complemento</Form.Label>
                  <Form.Control
                    name="complemento"
                    defaultValue={usuario.complement}
                    placeholder="-"
                    readOnly
                    plaintext
                  />
                </Form.Group>
              </fieldset>
            </Form>
          </Col>
          <Col md={6}>
            <Formik
              enableReinitialize
              validationSchema={schema}
              onSubmit={(params) => {
                console.log(params);
                submitForm(params);
              }}
              initialValues={{
                oldPassword: '',
                newPassword: '',
                passwordConfimation: '',
              }}
              validate={(values) => {
                const errors = {};

                if (values.newPassword !== values.passwordConfimation) {
                  errors.passwordConfimation =
                    'A nova senha e a confirmação devem ser iguais';
                }

                return errors;
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => {
                return (
                  <Form noValidate onSubmit={handleSubmit}>
                    <h4 className="d-inline-block">Alterar Senha</h4>
                    <fieldset disabled={isFetching}>
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="fw-bold">Senha Atual</Form.Label>
                        <Form.Control
                          type="password"
                          name="oldPassword"
                          value={values.oldPassword}
                          onChange={handleChange}
                          isValid={touched.oldPassword && !errors.oldPassword}
                          isInvalid={touched.oldPassword && errors.oldPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.oldPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="newPassword">
                        <Form.Label className="fw-bold">Nova Senha</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={values.newPassword}
                          onChange={handleChange}
                          isValid={touched.newPassword && !errors.newPassword}
                          isInvalid={touched.newPassword && errors.newPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.newPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="passwordConfimation"
                      >
                        <Form.Label className="fw-bold">
                          Confirmação da Nova Senha
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="passwordConfimation"
                          value={values.passwordConfimation}
                          onChange={handleChange}
                          isValid={
                            touched.passwordConfimation &&
                            !errors.passwordConfimation
                          }
                          isInvalid={
                            touched.passwordConfimation &&
                            errors.passwordConfimation
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.passwordConfimation}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Button variant="primary" className="me-3" type="submit">
                        Alterar Senha
                      </Button>
                    </fieldset>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
