import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

  const updateTutor = async (params) => {
    try {
      setIsFetching(true);
      const data = {
        ...params,
        cpf: tutor.cpf.replace(/\D/g, ''),
      };
      const response = await api.put(`user/${id}`, params);
      setTutor(response.data);
      setEditable(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const createTutor = async (params) => {
    try {
      setIsFetching(true);
      const data = {
        ...params,
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

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Muito curto!')
      .max(50, 'Muito comprido!')
      .required('Campo obrigatório'),
    username: Yup.string()
      .email('Email Inválido')
      .required('Campo obrigatório'),
    password: Yup.string()
      .min(8, 'Senha deve ter ao menos 8 caracteres')
      .required('Campo obrigatório'),
    phone: Yup.string().min(10, 'Inválido').required('Campo obrigatório'),
    cpf: Yup.string().length(11, 'Inválido').required('Campo obrigatório'),
    cep: Yup.string().length(8, 'Inválido').required('Campo obrigatório'),
    state: Yup.string()
      .min(2, 'Selecione um estado')
      .required('Campo obrigatório'),
    city: Yup.string()
      .min(2, 'Campo obrigatório')
      .required('Campo obrigatório'),
    district: Yup.string()
      .min(2, 'Campo obrigatório')
      .required('Campo obrigatório'),
    street: Yup.string()
      .min(2, 'Campo obrigatório')
      .required('Campo obrigatório'),
    number: Yup.string()
      .min(2, 'Campo obrigatório')
      .required('Campo obrigatório'),
    complement: Yup.string()
      .min(2, 'Campo obrigatório')
      .required('Campo obrigatório'),
  });

  return (
    <div className="tutor-form-page">
      <Container>
        {isFetching ? <Spinner animation="border" className="me-2" /> : null}
        <h1 className="d-inline-block">Tutor</h1>
        <Formik
          enableReinitialize
          validationSchema={schema}
          onSubmit={(params) => {
            if (id) updateTutor(params);
            else createTutor(params);
          }}
          initialValues={tutor}
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
            console.log(errors);
            return (
              <Form noValidate onSubmit={handleSubmit}>
                <fieldset disabled={isFetching}>
                  <Row>
                    <Col md={6} className="divider">
                      <h4 className="d-inline-block">Dados pessoais</h4>

                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="fw-bold">Nome</Form.Label>
                        <Form.Control
                          name="name"
                          readOnly={!editable}
                          plaintext={!editable}
                          value={values.name}
                          isValid={touched.name && !errors.name}
                          isInvalid={touched.name && errors.name}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="username">
                        <Form.Label className="fw-bold">E-mail</Form.Label>
                        <Form.Control
                          name="username"
                          readOnly={!editable}
                          plaintext={!editable}
                          value={values.username}
                          isValid={touched.username && !errors.username}
                          isInvalid={touched.username && errors.username}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>
                      {editable ? (
                        <Form.Group className="mb-3" controlId="password">
                          <Form.Label className="fw-bold">Senha</Form.Label>
                          <Form.Control
                            name="password"
                            type="password"
                            readOnly={!editable}
                            plaintext={!editable}
                            value={values.password}
                            isValid={touched.password && !errors.password}
                            isInvalid={touched.password && errors.password}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                      ) : null}
                      <Form.Group className="mb-3" controlId="phone">
                        <Form.Label className="fw-bold">Celular</Form.Label>
                        <Form.Control
                          name="phone"
                          readOnly={!editable}
                          plaintext={!editable}
                          value={values.phone}
                          onChange={handleChange}
                          isValid={touched.phone && !errors.phone}
                          isInvalid={touched.phone && errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-5" controlId="cpf">
                        <Form.Label className="fw-bold">CPF</Form.Label>
                        <Form.Control
                          name="cpf"
                          readOnly={!editable}
                          plaintext={!editable}
                          value={values.cpf}
                          onChange={handleChange}
                          isValid={touched.cpf && !errors.cpf}
                          isInvalid={touched.cpf && errors.cpf}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cpf}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <h4 className="d-inline-block">Endereço</h4>
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="cep">
                          <Form.Label className="fw-bold">CEP</Form.Label>
                          <Form.Control
                            name="cep"
                            readOnly={!editable}
                            plaintext={!editable}
                            value={values.cep}
                            onChange={handleChange}
                            isValid={touched.cep && !errors.cep}
                            isInvalid={touched.cep && errors.cep}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.cep}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="state">
                          <Form.Label className="fw-bold">Estado</Form.Label>
                          <Form.Select
                            name="state"
                            disabled={!editable}
                            value={values.state}
                            onChange={handleChange}
                            isValid={touched.state && !errors.state}
                            isInvalid={touched.state && errors.state}
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
                          <Form.Control.Feedback type="invalid">
                            {errors.state}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="city">
                          <Form.Label className="fw-bold">Cidade</Form.Label>
                          <Form.Control
                            name="city"
                            readOnly={!editable}
                            plaintext={!editable}
                            value={values.city}
                            onChange={handleChange}
                            isValid={touched.city && !errors.city}
                            isInvalid={touched.city && errors.city}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.city}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="district">
                          <Form.Label className="fw-bold">Bairro</Form.Label>
                          <Form.Control
                            name="district"
                            readOnly={!editable}
                            plaintext={!editable}
                            value={values.district}
                            onChange={handleChange}
                            isValid={touched.district && !errors.district}
                            isInvalid={touched.district && errors.district}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.district}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Form.Group className="mb-3" controlId="street">
                        <Form.Label className="fw-bold">Rua</Form.Label>
                        <Form.Control
                          name="street"
                          readOnly={!editable}
                          plaintext={!editable}
                          value={values.street}
                          onChange={handleChange}
                          isValid={touched.street && !errors.street}
                          isInvalid={touched.street && errors.street}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.street}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="number">
                        <Form.Label className="fw-bold">Número</Form.Label>
                        <Form.Control
                          name="number"
                          readOnly={!editable}
                          plaintext={!editable}
                          value={values.number}
                          onChange={handleChange}
                          isValid={touched.number && !errors.number}
                          isInvalid={touched.number && errors.number}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.number}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-5" controlId="complement">
                        <Form.Label className="fw-bold">Complemento</Form.Label>
                        <Form.Control
                          name="complement"
                          readOnly={!editable}
                          plaintext={!editable}
                          value={values.complement}
                          onChange={handleChange}
                          isValid={touched.complement && !errors.complement}
                          isInvalid={touched.complement && errors.complement}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.complement}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
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
                            type="submit"
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
                </fieldset>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </div>
  );
}

export default TutorForm;
