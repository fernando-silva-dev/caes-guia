import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Spinner, Tabs, Tab } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Plus, Trash } from 'react-bootstrap-icons';
import { Brood, BroodDog } from '~/models/Brood';
import BroodEventList from '~/pages/BroodEventList';
import api from '~/services/api';

import './styles.css';
import { Dog } from '~/models/Dog';

function BroodForm() {
  const params = useParams();

  const { broodId } = params;

  const [isFetching, setIsFetching] = useState(false);
  const [editable, setEditable] = useState(!broodId);
  const [brood, setBrood] = useState<Brood>({
    description: '',
    motherId: '',
    birthDate: new Date().toISOString().split('T')[0],
    fatherId: '',
    children: [{
      name: '',
      sex: '',
      coat: '',
    }],
  });
  const [maleDogs, setMaleDogs] = useState<Dog[]>([]);
  const [femaleDogs, setFemaleDogs] = useState<Dog[]>([]);
  const navigate = useNavigate();

  const fetchBrood = async () => {
    try {
      setIsFetching(true);
      const response = await api.get(`brood/${broodId}`);
      const broodSerialized: Brood = response.data;

      broodSerialized.motherId = broodSerialized?.mother?.id;
      broodSerialized.fatherId = broodSerialized?.father?.id;

      setBrood(broodSerialized);
    } catch (error) {
      toast.error('Erro ao buscar ninhada');
      // console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const updateBrood = async (formData: Brood) => {
    try {
      setIsFetching(true);
      const data = {
        ...formData,
      };

      data.children = data.children.map((dog: BroodDog) => ({
        ...dog,
        birthDate: new Date(data.birthDate ?? '').toISOString(),
        status: 'Filhote',
      }));

      await api.put(`brood/${broodId}`, data);
      toast.success('Ninhada atualizada');
      setEditable(false);
    } catch (error) {
      toast.error('Erro ao atualizar ninhada');
      // console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const createBrood = async (formData: Brood) => {
    try {
      setIsFetching(true);
      const data = {
        ...formData,
      };

      data.children = data.children.map((dog: BroodDog) => ({
        ...dog,
        birthDate: new Date(data.birthDate ?? '').toISOString(),
        status: 'Filhote',
      }));
      await api.post('brood', data);
      toast.success('Ninhada cadastrada');
      navigate('/brood');
    } catch (error) {
      toast.error('Erro ao cadastras ninhada');
      // console.error(error);
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
      // console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchMaleDogs = async () => {
    try {
      setIsFetching(true);
      const response = await api.get('dog/males');
      setMaleDogs(response.data.data);
    } catch (error) {
      toast.error('Erro ao buscar o cães machos');
      // console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchFemaleDogs = async () => {
    try {
      setIsFetching(true);
      const response = await api.get('dog/females');
      setFemaleDogs(response.data.data);
    } catch (error) {
      toast.error('Erro ao buscar o cães fêmeas');
      // console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (broodId) {
      fetchBrood();
    }
    fetchMaleDogs();
    fetchFemaleDogs();
  }, []);

  const schema = Yup.object().shape({
    description: Yup.string()
      .min(2, 'Muito curto')
      .max(50, 'Muito comprido')
      .required('Campo obrigatório'),
    motherId: Yup.string().required('Campo obrigatório'),
    fatherId: Yup.string().required('Campo obrigatório'),
    birthDate: Yup.date().required('Campo obrigatório'),
    children: Yup.array().min(1).required('Campo obrigatório').of(Yup.object().shape({
      name: Yup.string()
        .min(2, 'Muito curto')
        .max(50, 'Muito comprido')
        .required('Campo obrigatório'),
      sex: Yup.string().oneOf(['Male', 'Female'], 'Selecione o sexo').required('Campo obrigatório'),
      coat: Yup.string().required('Campo obrigatório'),
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
                    <Form.Group className="mb-2" controlId="description">
                      <Form.Label className="fw-bold">Nome</Form.Label>
                      <Form.Control
                        name="description"
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
                    <Form.Group className="mb-2" controlId="motherId">
                      <Form.Label className="fw-bold">Mãe da ninhada</Form.Label>
                      <Form.Select
                        name="motherId"
                        disabled={!editable}
                        value={values.motherId}
                        defaultValue={values.motherId}
                        onChange={handleChange}
                        isValid={touched.motherId && !errors.motherId}
                        isInvalid={
                          touched.motherId !== undefined
                          && errors.motherId !== undefined
                        }
                      >
                        <option value="">Selecione</option>
                        {femaleDogs.map(({ id: motherId, name }) => (
                          <option key={motherId} value={motherId}>
                            {name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.motherId}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="fatherId">
                      <Form.Label className="fw-bold">Pai da ninhada</Form.Label>
                      <Form.Select
                        name="fatherId"
                        disabled={!editable}
                        value={values.fatherId}
                        defaultValue={values.fatherId}
                        onChange={handleChange}
                        isValid={touched.fatherId && !errors.fatherId}
                        isInvalid={
                          touched.fatherId !== undefined
                          && errors.fatherId !== undefined
                        }
                      >
                        <option value="">Selecione</option>
                        {maleDogs.map(({ id: fatherId, name }) => (
                          <option key={fatherId} value={fatherId}>
                            {name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.fatherId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="divider">
                    <h3 className="d-inline-block mt-3">Filhotes</h3>
                  </Col>
                </Row>
                <FieldArray name="children">
                  {({ remove, push }) => (
                    <>
                      {values.children?.map((_, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Row key={`children${index}`}>
                          <Col>
                            <Form.Group className="mb-2" controlId={`children.${index}.name`}>
                              <Form.Label className="fw-bold">Nome</Form.Label>
                              <Form.Control
                                name={`children.${index}.name`}
                                readOnly={!editable}
                                plaintext={!editable}
                                value={values.children[index].name}
                                isValid={
                                  touched.children?.at(index)?.name
                                  && !(errors.children?.at(index) as any)?.name
                                }
                                isInvalid={
                                  touched.children?.at(index)?.name !== undefined
                                  && (errors.children?.at(index) as any)?.name !== undefined
                                }
                                onChange={handleChange}
                              />
                              <Form.Control.Feedback type="invalid">
                                {(errors.children?.at(index) as any)?.name}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>

                          <Col>
                            <Form.Group className="mb-2" controlId={`children.${index}.sex`}>
                              <Form.Label className="fw-bold">Sexo</Form.Label>
                              <Form.Select
                                name={`children.${index}.sex`}
                                disabled={!editable}
                                value={values.children[index].sex}
                                onChange={handleChange}
                                isValid={
                                  touched.children?.at(index)?.sex
                                  && !(errors.children?.at(index) as any)?.sex
                                }
                                isInvalid={
                                  touched.children?.at(index)?.sex !== undefined
                                  && (errors.children?.at(index) as any)?.sex !== undefined
                                }
                              >
                                <option value="">Selecione</option>
                                <option value="Male">Macho</option>
                                <option value="Female">Fêmea</option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {(errors.children?.at(index) as any)?.sex}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>

                          <Col>
                            <Form.Group className="mb-2" controlId={`children.${index}.coat`}>
                              <Form.Label className="fw-bold">Pelagem</Form.Label>
                              <Form.Select
                                name={`children.${index}.coat`}
                                disabled={!editable}
                                value={values.children?.at(index)?.coat}
                                isValid={
                                  touched.children?.at(index)?.coat
                                  && !(errors.children?.at(index) as any)?.coat
                                }
                                isInvalid={
                                  touched.children?.at(index)?.coat !== undefined
                                  && (errors.children?.at(index) as any)?.coat !== undefined
                                }
                                onChange={handleChange}
                              >
                                <option value="">Selecione</option>
                                <option value="Preta">Preta</option>
                                <option value="Amarela">Amarela</option>
                                <option value="Marrom">Marrom</option>
                                <option value="Branca">Branca</option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {(errors.children?.at(index) as any)?.coat}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col xs={1} lg={1} md={1} sm={2}>
                            <Form.Label className="fw-bold">&nbsp;</Form.Label>

                            {editable
                              ? (
                                <Button
                                  variant="danger"
                                  className="w-100"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  <Trash />
                                </Button>
                              ) : null}
                          </Col>
                        </Row>
                      ))}
                      {editable
                        ? (
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
                        ) : null}
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
          <Tabs
            defaultActiveKey="events"
            id="brood-tabs"
            className="mb-3"
          >
            <Tab eventKey="events" title="Eventos da Ninhada">
              <Row>
                <BroodEventList brood={brood} />
              </Row>
            </Tab>
          </Tabs>
        ) : null}
      </Container>
    </div>
  );
}

export default BroodForm;
