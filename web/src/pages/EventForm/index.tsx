import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { Event } from '../../models/Event';

function EventForm() {
  const params = useParams();

  const { dogId, eventId } = params;

  const [isFetching, setIsFetching] = useState(false);
  const [editable, setEditable] = useState(!eventId);
  const [event, setEvent] = useState<Event>({
    description: '',
    date: '',
    dogId,
  });
  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      setIsFetching(true);
      const response = await api.get<Event>(`event/${eventId}`);
      const ev = response.data;
      [ev.date] = ev.date.split('T');
      setEvent(ev);
    } catch (error) {
      toast.error('Erro ao buscar evento');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const updateEvent = async (formData: Event) => {
    try {
      setIsFetching(true);
      const data = {
        ...formData,
        date: new Date(formData.date).toISOString(),
        dogId,
      };
      await api.put(`event/${eventId}`, data);
      toast.success('Evento atualizado');
      setEditable(false);
    } catch (error) {
      toast.error('Erro ao atualizar evento');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const createEvent = async (formData: Event) => {
    try {
      setIsFetching(true);
      const data = {
        ...formData,
        date: new Date(formData.date).toISOString(),
        dogId,
      };
      await api.post('event', data);
      toast.success('Evento cadastrado');
      navigate(`/dogs/${dogId}`);
    } catch (error) {
      toast.error('Erro ao cadastar evento');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      setIsFetching(true);
      await api.delete(`event/${id}`);
      toast.success('Evento removido');
      navigate(`/dogs/${dogId}`);
    } catch (error) {
      toast.error('Erro ao remove cão');
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, []);

  const schema = Yup.object().shape({
    description: Yup.string()
      .min(2, 'Muito curto')
      .max(50, 'Muito comprido')
      .required('Campo obrigatório'),
    date: Yup.date().required('Campo obrigatório'),
  });

  return (
    <div className="dog-form-page">
      <Container>
        {isFetching ? <Spinner animation="border" className="me-2" /> : null}
        <h1 className="d-inline-block">Evento</h1>
        <Formik
          enableReinitialize
          validationSchema={schema}
          onSubmit={(newValues) => {
            if (eventId) updateEvent(newValues);
            else createEvent(newValues);
          }}
          initialValues={event}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <fieldset disabled={isFetching}>
                <Row>
                  <Col md={6} className="divider">
                    <Form.Group className="mb-2" controlId="description">
                      <Form.Label className="fw-bold">Descrição</Form.Label>
                      <Form.Control
                        name="description"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.description}
                        isValid={touched.description && !errors.description}
                        isInvalid={
                          touched.description !== undefined &&
                          errors.description !== undefined
                        }
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="date">
                      <Form.Label className="fw-bold">Data</Form.Label>
                      <Form.Control
                        name="date"
                        type="date"
                        readOnly={!editable}
                        plaintext={!editable}
                        value={values.date}
                        onChange={handleChange}
                        isValid={touched.date && !errors.date}
                        isInvalid={
                          touched.date !== undefined &&
                          errors.date !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.date}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {!editable && eventId ? (
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
                            deleteEvent(eventId);
                          }}
                        >
                          Remover
                        </Button>
                        <Button
                          variant="secondary"
                          className="me-3 mb-2"
                          type="button"
                          onClick={() => {
                            navigate(`/dogs/${dogId}`);
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
                            if (eventId) {
                              setEditable(false);
                            } else {
                              navigate(`/dogs/${dogId}`);
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

export default EventForm;
