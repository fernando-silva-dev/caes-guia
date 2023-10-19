import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Plus, Trash } from 'react-bootstrap-icons';
import { Brood } from '~/models/Brood';
import EventList from '~/pages/EventList';
import api from '~/services/api';

import './styles.css';

function BroodForm() {
  const params = useParams();

  const { broodId } = params;

  const [isFetching, setIsFetching] = useState(false);
  const [editable, setEditable] = useState(!broodId);
  const [brood, setBrood] = useState<Brood>({
    description: '',
    motherName: '',
    fatherName: '',
    birthDate: new Date().toISOString().split('T')[0],
    dogs: [{
      name: '',
      sex: '',
      color: '',
    }],
  });
  const navigate = useNavigate();

  const fetchBrood = async () => {
    try {
      setIsFetching(true);
      const response = await api.get(`brood/${broodId}`);
      const broodSerialized: Brood = response.data;
      [broodSerialized.birthDate] = broodSerialized.birthDate.split('T');
      setBrood(broodSerialized);
    } catch (error) {
      toast.error('Erro ao buscar ninhada');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const updateBrood = async (formData: Brood) => {
    try {
      setIsFetching(true);
      const data = {
        ...formData,
        birthDate: new Date(formData.birthDate).toISOString(),
      };
      await api.put(`brood/${broodId}`, data);
      toast.success('Ninhada atualizada');
      setEditable(false);
    } catch (error) {
      toast.error('Erro ao atualizar ninhada');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const createBrood = async (formData: Brood) => {
    try {
      setIsFetching(true);
      const data = {
        ...formData,
        birthDate: new Date(formData.birthDate).toISOString(),
      };
      await api.post('brood', data);
      toast.success('Ninhada cadastrada');
      navigate('/broods');
    } catch (error) {
      toast.error('Erro ao cadastras ninhada');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const deleteBrood = async (id: string) => {
    try {
      setIsFetching(true);
      await api.delete(`brood/${id}`);
      toast.success('Ninhada removida');
      navigate('/dog');
    } catch (error) {
      toast.error('Erro ao remover ninhada');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (broodId) {
      fetchBrood();
    }
  }, []);

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Muito curto')
      .max(50, 'Muito comprido')
      .required('Campo obrigatório'),
    motherName: Yup.string().max(50, 'Máximo de 50 caracteres'),
    fatherName: Yup.string().max(50, 'Máximo de 50 caracteres'),
    birthDate: Yup.date().required('Campo obrigatório'),
    dogs: Yup.array().min(1).required('Campo obrigatório').of(Yup.object().shape({
      name: Yup.string()
        .min(2, 'Muito curto')
        .max(50, 'Muito comprido')
        .required('Campo obrigatório'),
      sex: Yup.string().oneOf(['M', 'F'], 'Selecione o sexo').required('Campo obrigatório'),
      color: Yup.string().max(50, 'Máximo de 50 caracteres').required('Campo obrigatório'),
    })),
  });

  return (
    <div className="dog-form-page">
      <Container>
        <Row>
          <Col>
            {isFetching ? (
              <Spinner animation="border" className="me-2" />
            ) : null}
            <h1 className="d-inline-block">Ninhada</h1>
          </Col>
          <Col
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
            }}
          >
            {!editable && broodId ? (
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
                    deleteBrood(broodId);
                  }}
                >
                  Remover
                </Button>
                <Button
                  variant="secondary"
                  className="me-3 mb-2"
                  type="button"
                  onClick={() => {
                    navigate('/brood');
                  }}
                >
                  Voltar
                </Button>
              </>
            ) : null}
          </Col>
        </Row>

        <Formik
          enableReinitialize
          validationSchema={schema}
          onSubmit={(newValues) => {
            if (broodId) updateBrood(newValues);
            else createBrood(newValues);
          }}
          initialValues={brood}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit} className="mb-5">
              <fieldset disabled={isFetching}>
                <Row>
                  <Col md={6} className="divider">
                    <Form.Group className="mb-2" controlId="name">
                      <Form.Label className="fw-bold">Nome</Form.Label>
                      <Form.Control
                        name="name"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.description}
                        isValid={touched.description && !errors.description}
                        isInvalid={
                          touched.description !== undefined
                          && errors.description !== undefined
                        }
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="birthDate">
                      <Form.Label className="fw-bold">
                        Data de Nascimento
                      </Form.Label>
                      <Form.Control
                        name="birthDate"
                        type="date"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.birthDate}
                        onChange={handleChange}
                        isValid={touched.birthDate && !errors.birthDate}
                        isInvalid={
                          touched.birthDate !== undefined
                          && errors.birthDate !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.birthDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-2" controlId="motherName">
                      <Form.Label className="fw-bold">Nome da mãe</Form.Label>
                      <Form.Control
                        name="motherName"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.motherName}
                        isValid={touched.motherName && !errors.motherName}
                        isInvalid={
                          touched.motherName !== undefined
                          && errors.motherName !== undefined
                        }
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.motherName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="fatherName">
                      <Form.Label className="fw-bold">Nome do Pai</Form.Label>
                      <Form.Control
                        name="fatherName"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.fatherName}
                        onChange={handleChange}
                        isValid={touched.fatherName && !errors.fatherName}
                        isInvalid={
                          touched.fatherName !== undefined
                          && errors.fatherName !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fatherName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="divider">
                    <h2 className="d-inline-block">Filhotes</h2>
                  </Col>
                </Row>
                <FieldArray name="dogs">
                  {({ remove, push }) => (
                    <>
                      { values.dogs?.map((_, index) => (
                        <Row key={`dog${index}`}>
                          <Col>
                            <Form.Group className="mb-2" controlId={`dogs.${index}.name`}>
                              <Form.Label className="fw-bold">Nome</Form.Label>
                              <Form.Control
                                name={`dogs.${index}.name`}
                                readOnly={!editable}
                                plaintext={!editable}
                                value={values.dogs[index].name}
                                isValid={
                                touched.dogs?.at(index)?.name
                                && !(errors.dogs?.at(index) as any)?.name
                              }
                                isInvalid={
                                touched.dogs?.at(index)?.name !== undefined
                                && (errors.dogs?.at(index) as any)?.name !== undefined
                              }
                                onChange={handleChange}
                              />
                              <Form.Control.Feedback type="invalid">
                                {(errors.dogs?.at(index) as any)?.name}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>

                          <Col>
                            <Form.Group className="mb-2" controlId={`dogs.${index}.sex`}>
                              <Form.Label className="fw-bold">Sexo</Form.Label>
                              <Form.Select
                                name={`dogs.${index}.sex`}
                                disabled={!editable}
                                value={values.dogs[index].sex}
                                onChange={handleChange}
                                isValid={
                                touched.dogs?.at(index)?.sex
                                && !(errors.dogs?.at(index) as any)?.sex
                              }
                                isInvalid={
                                touched.dogs?.at(index)?.sex !== undefined
                                && (errors.dogs?.at(index) as any)?.sex !== undefined
                              }
                              >
                                <option value="">Selecione</option>
                                <option value="M">Macho</option>
                                <option value="F">Fêmea</option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {(errors.dogs?.at(index) as any)?.sex}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>

                          <Col>
                            <Form.Group className="mb-2" controlId={`dogs.${index}.color`}>
                              <Form.Label className="fw-bold">Cor</Form.Label>
                              <Form.Control
                                name={`dogs.${index}.color`}
                                readOnly={!editable}
                                plaintext={!editable}
                                value={values.dogs?.at(index)?.color}
                                isValid={
                                touched.dogs?.at(index)?.color
                                && !(errors.dogs?.at(index) as any)?.color
                              }
                                isInvalid={
                                touched.dogs?.at(index)?.color !== undefined
                                && (errors.dogs?.at(index) as any)?.color !== undefined
                              }
                                onChange={handleChange}
                              />
                              <Form.Control.Feedback type="invalid">
                                {(errors.dogs?.at(index) as any)?.color}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col xs={1} lg={1} md={1} sm={2}>
                            <Form.Label className="fw-bold">&nbsp;</Form.Label>
                            <Button
                              variant="danger"
                              className="w-100"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              <Trash />
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Row>
                        <Col xs={1} lg={1} md={1} sm={2} className="ms-auto">
                          <Button
                            variant="success"
                            type="button"
                            className="w-100 "
                            onClick={() => push({ name: '', sex: '', color: '' })}
                          >
                            <Plus />
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                </FieldArray>
              </fieldset>
              <Row className="mt-3">
                <Col>
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
                          if (broodId) {
                            setEditable(false);
                          } else {
                            navigate('/brood');
                          }
                        }}
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : null}
                </Col>
              </Row>
            </Form>
          )}
        </Formik>

        {broodId && !editable ? (
          <Row>
            <EventList />
          </Row>
        ) : null}
      </Container>
    </div>
  );
}

export default BroodForm;
