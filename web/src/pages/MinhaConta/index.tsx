import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import './styles.css';
import api from '../../services/api';
import { Tutor } from '../../models/Tutor';

interface UpdatePasswordForm {
  oldPassword: string;
  newPassword: string;
  passwordConfimation: string;
}

export default function MinhaConta() {
  const [usuario, setUsuario] = useState<Tutor>({
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
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const response = await api.get('user/self');
      setUsuario(response.data);
      navigate('/minha-conta');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const submitForm = async (formData: UpdatePasswordForm) => {
    setIsFetching(true);
    try {
      await api.patch(`user/${usuario.id}`, formData);
      toast.success('Senha atualizada com sucesso');
    } catch (error) {
      toast.error(error.response.data.message);
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
                    name="name"
                    defaultValue={usuario.name}
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="fw-bold">Nome de usuário</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="username"
                    defaultValue={usuario.username}
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="phone">
                  <Form.Label className="fw-bold">Celular</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="phone"
                    defaultValue={usuario.phone}
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="cpf">
                  <Form.Label className="fw-bold">CPF</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="cpf"
                    defaultValue={usuario.cpf}
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

                  <Form.Group as={Col} controlId="state">
                    <Form.Label className="fw-bold">Estado</Form.Label>
                    <Form.Select
                      name="state"
                      placeholder="-"
                      defaultValue={usuario.state}
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

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="city">
                    <Form.Label className="fw-bold">Cidade</Form.Label>
                    <Form.Control
                      name="city"
                      defaultValue={usuario.city}
                      placeholder="-"
                      readOnly
                      plaintext
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="bairro">
                    <Form.Label className="fw-bold">Bairro</Form.Label>
                    <Form.Control
                      name="district"
                      defaultValue={usuario.district}
                      placeholder="-"
                      readOnly
                      plaintext
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="street">
                  <Form.Label className="fw-bold">Rua</Form.Label>
                  <Form.Control
                    name="street"
                    defaultValue={usuario.street}
                    placeholder="-"
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group controlId="number">
                  <Form.Label className="fw-bold">Complemento</Form.Label>
                  <Form.Control
                    name="number"
                    defaultValue={usuario.number}
                    placeholder="-"
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group controlId="complement">
                  <Form.Label className="fw-bold">Complemento</Form.Label>
                  <Form.Control
                    name="complement"
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
                submitForm(params);
              }}
              initialValues={{
                oldPassword: '',
                newPassword: '',
                passwordConfimation: '',
              }}
              validate={(values) => {
                const errors = {} as UpdatePasswordForm;

                if (values.newPassword !== values.passwordConfimation) {
                  errors.passwordConfimation = 'A nova senha e a confirmação devem ser iguais';
                }

                return errors;
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
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
                        isInvalid={
                          touched.oldPassword !== undefined &&
                          errors.oldPassword !== undefined
                        }
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
                        isInvalid={
                          touched.newPassword !== undefined &&
                          errors.newPassword !== undefined
                        }
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
                          touched.passwordConfimation !== undefined &&
                          errors.passwordConfimation !== undefined
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
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
