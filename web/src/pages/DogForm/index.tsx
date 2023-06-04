import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Dog } from '../../models/Dog';
import api from '../../services/api';
import './styles.css';
import { Tutor } from '../../models/Tutor';
import EventList from '../EventList';

function DogForm() {
  const params = useParams();

  const { dogId } = params;

  const [isFetching, setIsFetching] = useState(false);
  const [editable, setEditable] = useState(!dogId);
  const [dog, setDog] = useState<Dog>({
    name: '',
    motherName: '',
    fatherName: '',
    birthDate: '',
    color: '',
    // Começar como indefinido
    status: '',
    responsibles: [],
    responsiblesIds: [],
    responsibleId: '',
  });
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const navigate = useNavigate();

  const fetchDog = async () => {
    try {
      setIsFetching(true);
      const response = await api.get(`dog/${dogId}`);
      const doggo: Dog = response.data;
      [doggo.birthDate] = doggo.birthDate.split('T');
      if (doggo.responsibles && doggo.responsibles.length) {
        // TODO caso deva haver mais que um tutor temos que habilitar multi seleção
        doggo.responsibleId = doggo.responsibles[0].id;
      }
      setDog(doggo);
    } catch (error) {
      toast.error('Erro ao buscar o cães');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchTutores = async () => {
    try {
      setIsFetching(true);
      const response = await api.get('user');
      setTutores(response.data.data);
    } catch (error) {
      toast.error('Erro ao buscar o cães');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const updateDog = async (formData: Dog) => {
    try {
      setIsFetching(true);
      const data = {
        ...formData,
        responsiblesIds: [formData.responsibleId],
        birthDate: new Date(formData.birthDate).toISOString(),
      };
      await api.put(`dog/${dogId}`, data);
      toast.success('Cão atualizado');
      setEditable(false);
    } catch (error) {
      toast.error('Erro ao atualizar cão');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const createDog = async (formData: Dog) => {
    try {
      setIsFetching(true);
      const data = {
        ...formData,
        responsiblesIds: [formData.responsibleId],
        birthDate: new Date(formData.birthDate).toISOString(),
      };
      await api.post('dog', data);
      toast.success('Cão cadastrado');
      navigate('/dogs');
    } catch (error) {
      toast.error('Erro ao cadastar cão');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const deleteDog = async (id: string) => {
    try {
      setIsFetching(true);
      await api.delete(`dog/${id}`);
      toast.success('Cão removido');
      navigate('/dogs');
    } catch (error) {
      toast.error('Erro ao remove cão');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (dogId) {
      fetchDog();
    }
    fetchTutores();
  }, []);

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Muito curto')
      .max(50, 'Muito comprido')
      .required('Campo obrigatório'),
    motherName: Yup.string().max(50, 'Máximo de 50 caracteres'),
    fatherName: Yup.string().max(50, 'Máximo de 50 caracteres'),
    birthDate: Yup.date().required('Campo obrigatório'),
    color: Yup.string()
      .max(25, 'Máximo de 25 caracteres')
      .required('Campo obrigatório'),
    status: Yup.string().required('Campo obrigatório'),
    responsibleId: Yup.string()
      .min(1, 'Campo obrigatório')
      .required('Campo obrigatório'),
  });

  return (
    <div className="dog-form-page">
      <Container>
        <Row>
          <Col>
            {isFetching ? (
              <Spinner animation="border" className="me-2" />
            ) : null}
            <h1 className="d-inline-block">Cão</h1>
          </Col>
          <Col
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
            }}
          >
            {!editable && dogId ? (
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
                    deleteDog(dogId);
                  }}
                >
                  Remover
                </Button>
                <Button
                  variant="secondary"
                  className="me-3 mb-2"
                  type="button"
                  onClick={() => {
                    navigate('/dogs');
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
            if (dogId) updateDog(newValues);
            else createDog(newValues);
          }}
          initialValues={dog}
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
                        value={values.name}
                        isValid={touched.name && !errors.name}
                        isInvalid={
                          touched.name !== undefined &&
                          errors.name !== undefined
                        }
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="motherName">
                      <Form.Label className="fw-bold">Nome da mãe</Form.Label>
                      <Form.Control
                        name="motherName"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.motherName}
                        isValid={touched.motherName && !errors.motherName}
                        isInvalid={
                          touched.motherName !== undefined &&
                          errors.motherName !== undefined
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
                          touched.fatherName !== undefined &&
                          errors.fatherName !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fatherName}
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
                          touched.birthDate !== undefined &&
                          errors.birthDate !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.birthDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="divider">
                    <Form.Group className="mb-2" controlId="status">
                      <Form.Label className="fw-bold">Status</Form.Label>
                      <Form.Select
                        name="status"
                        disabled={!editable}
                        value={values.status}
                        onChange={handleChange}
                        isValid={touched.status && !errors.status}
                        isInvalid={
                          touched.status !== undefined &&
                          errors.status !== undefined
                        }
                      >
                        <option value="">Selecione</option>
                        <option value="Treinando">Treinando</option>
                        <option value="Trabalhando">Trabalhando</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.status}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="color">
                      <Form.Label className="fw-bold">Cor</Form.Label>
                      <Form.Control
                        name="color"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.color}
                        onChange={handleChange}
                        isValid={touched.color && !errors.color}
                        isInvalid={
                          touched.color !== undefined &&
                          errors.color !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.color}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-5" controlId="responsibleId">
                      <Form.Label className="fw-bold">
                        Tutor Responsável
                      </Form.Label>
                      <Form.Select
                        name="responsibleId"
                        disabled={!editable}
                        value={values.responsibleId}
                        defaultValue={values.responsibleId}
                        onChange={handleChange}
                        isValid={touched.responsibleId && !errors.responsibleId}
                        isInvalid={
                          touched.responsibleId !== undefined &&
                          errors.responsibleId !== undefined
                        }
                      >
                        <option value="">Selecione</option>
                        {tutores.map(({ id: tutorId, name }) => (
                          <option key={tutorId} value={tutorId}>
                            {name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.status}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
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
                          if (dogId) {
                            setEditable(false);
                          } else {
                            navigate('/dogs');
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

        {dogId && !editable ? (
          <Row>
            <EventList />
          </Row>
        ) : null}
      </Container>
    </div>
  );
}

export default DogForm;
