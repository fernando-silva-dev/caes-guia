import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Tutor } from '~/models/Tutor';
import api from '~/services/api';

import './styles.css';

function UserForm() {
  const params = useParams();

  const { id } = params;

  const [isFetching, setIsFetching] = useState(false);
  const [editable, setEditable] = useState(!id);
  const [tutor, setUser] = useState<Tutor>({
    role: 'Tutor',
    name: '',
    username: '',
    password: '',
    phone: '',
    cpf: '',
    cep: '',
    state: 'SC',
    city: '',
    district: '',
    street: '',
    number: '',
    complement: '',
  });
  const navigate = useNavigate();

  const fetchTutor = async () => {
    try {
      setIsFetching(true);
      const response = await api.get(`user/${id}`);
      setUser(response.data);
    } catch (error) {
      toast.error('Erro ao buscar o tutor');
    } finally {
      setIsFetching(false);
    }
  };

  const updateTutor = async (formData: Tutor) => {
    try {
      setIsFetching(true);
      const data = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ''),
      };
      const response = await api.put(`user/${id}`, data);
      toast.success('Tutor atualizado');
      setUser(response.data);
      setEditable(false);
    } catch (error) {
      toast.error('Erro ao atualizar tutor');
    } finally {
      setIsFetching(false);
    }
  };

  const createTutor = async (formData: Tutor) => {
    try {
      setIsFetching(true);
      const data = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ''),
      };
      await api.post('user', data);
      toast.success('Tutor cadastrado com succeso');
      navigate('/tutores');
    } catch (error) {
      toast.error('Erro ao cadastrar tutor');
    } finally {
      setIsFetching(false);
    }
  };

  const deleteTutor = async (tutorId: string) => {
    try {
      setIsFetching(true);
      await api.delete(`user/${tutorId}`);
      toast.success('Tutor removido');
      navigate('/tutores');
    } catch (error) {
      toast.error('Erro ao deletar tutor');
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
      .min(2, 'Nome deve ter ao menos 2 caracteres')
      .max(50, 'Nome deve ter ao menos 50 caracteres')
      .required('Campo obrigatório'),
    username: Yup.string()
      .email('Email Inválido')
      .required('Campo obrigatório'),
    password: Yup.string()
      .min(8, 'Senha deve ter ao menos 8 caracteres')
      .required('Campo obrigatório'),
    phone: Yup.string()
      .min(8, 'Telefone deve ter ao menos 8 caracteres')
      .min(11, 'Telefone deve ter no máximo 11 caracteres')
      .required('Campo obrigatório'),
    cpf: Yup.string()
      .length(11, 'CPF deve ter 11 caracteres')
      .required('Campo obrigatório'),
    cep: Yup.string()
      .length(8, 'CEP deve deve ter 8 caracteres')
      .required('Campo obrigatório'),
    state: Yup.string()
      .min(2, 'Selecione um estado')
      .required('Campo obrigatório'),
    city: Yup.string()
      .min(2, 'Cidade deve ter ao menos 2 caracteres')
      .required('Campo obrigatório'),
    district: Yup.string()
      .min(2, 'Bairro deve ter ao menos 2 caracteres')
      .required('Campo obrigatório'),
    street: Yup.string()
      .min(2, 'Rua deve ter ao menos 2 caracteres')
      .required('Campo obrigatório'),
    number: Yup.string()
      .min(2, 'Número deve ter ao menos 2 caracteres')
      .required('Campo obrigatório'),
    complement: Yup.string(),
  });

  return (
    <div className="tutor-form-page">
      <Container>
        {isFetching ? <Spinner animation="border" className="me-2" /> : null}
        <h1 className="d-inline-block">Tutor</h1>
        <Formik
          enableReinitialize
          validationSchema={schema}
          onSubmit={(params2) => {
            if (id) updateTutor(params2);
            else createTutor(params2);
          }}
          initialValues={tutor}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <fieldset disabled={isFetching}>
                <Row>
                  <Col md={6} className="divider">
                    <h4 className="d-inline-block">Dados pessoais</h4>

                    <Form.Group className="mb-2" controlId="name">
                      <Form.Label className="fw-bold">Nome</Form.Label>
                      <Form.Control
                        name="name"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.name}
                        isValid={touched.name && !errors.name}
                        isInvalid={
                          touched.name !== undefined
                          && errors.name !== undefined
                        }
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="username">
                      <Form.Label className="fw-bold">E-mail</Form.Label>
                      <Form.Control
                        name="username"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.username}
                        isValid={touched.username && !errors.username}
                        isInvalid={
                          touched.username !== undefined
                          && errors.username !== undefined
                        }
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {editable ? (
                      <Form.Group className="mb-2" controlId="password">
                        <Form.Label className="fw-bold">Senha</Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          readOnly={!editable}
                          plaintext={!editable}
                          value={values.password}
                          isValid={touched.password && !errors.password}
                          isInvalid={
                            touched.password !== undefined
                            && errors.password !== undefined
                          }
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    ) : null}
                    <Form.Group className="mb-2" controlId="phone">
                      <Form.Label className="fw-bold">Celular</Form.Label>
                      <Form.Control
                        name="phone"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.phone}
                        onChange={handleChange}
                        isValid={touched.phone && !errors.phone}
                        isInvalid={
                          touched.phone !== undefined
                          && errors.phone !== undefined
                        }
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
                        isInvalid={
                          touched.cpf !== undefined && errors.cpf !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cpf}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <h4 className="d-inline-block">Endereço</h4>
                    <Row className="mb-2">
                      <Form.Group as={Col} controlId="cep">
                        <Form.Label className="fw-bold">CEP</Form.Label>
                        <Form.Control
                          name="cep"
                          readOnly={!editable}
                          plaintext={!editable}
                          value={values.cep}
                          onChange={handleChange}
                          isValid={touched.cep && !errors.cep}
                          isInvalid={
                            touched.cep !== undefined
                            && errors.cep !== undefined
                          }
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
                          isInvalid={
                            touched.state !== undefined
                            && errors.state !== undefined
                          }
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

                    <Row className="mb-2">
                      <Form.Group as={Col} controlId="city">
                        <Form.Label className="fw-bold">Cidade</Form.Label>
                        <Form.Control
                          name="city"
                          readOnly={!editable}
                          plaintext={!editable}
                          value={values.city}
                          onChange={handleChange}
                          isValid={touched.city && !errors.city}
                          isInvalid={
                            touched.city !== undefined
                            && errors.city !== undefined
                          }
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
                          isInvalid={
                            touched.district !== undefined
                            && errors.district !== undefined
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.district}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-2" controlId="street">
                      <Form.Label className="fw-bold">Rua</Form.Label>
                      <Form.Control
                        name="street"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.street}
                        onChange={handleChange}
                        isValid={touched.street && !errors.street}
                        isInvalid={
                          touched.street !== undefined
                          && errors.street !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.street}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="number">
                      <Form.Label className="fw-bold">Número</Form.Label>
                      <Form.Control
                        name="number"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.number}
                        onChange={handleChange}
                        isValid={touched.number && !errors.number}
                        isInvalid={
                          touched.number !== undefined
                          && errors.number !== undefined
                        }
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
                        isInvalid={
                          touched.complement !== undefined
                          && errors.complement !== undefined
                        }
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
                          className="me-3 mb-2"
                          type="button"
                          onClick={() => {
                            setEditable(true);
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          className="me-3 mb-2"
                          type="button"
                          onClick={() => {
                            deleteTutor(id);
                          }}
                        >
                          Remover
                        </Button>
                        <Button
                          variant="secondary"
                          className="me-3 mb-2"
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
                          className="me-3 mb-2"
                          type="submit"
                        >
                          Salvar
                        </Button>
                        <Button
                          variant="secondary"
                          className="me-3 mb-2"
                          type="button"
                          onClick={() => {
                            if (id) {
                              setEditable(false);
                            } else {
                              navigate('/tutores');
                            }
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
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default UserForm;
