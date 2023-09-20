import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Trash } from 'react-bootstrap-icons';
import api from '~/services/api';
import { Event } from '~/models/Event';
import DownloadButton from '~/components/DownloadButton';
import DeleteDialog from '~/components/DeleteDialog';

// function readFileAsync(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (typeof reader.result === 'string') {
//         resolve(reader.result);
//       } else reject(Error('wrong type'));
//     };
//     reader.onerror = (err) => {
//       reject(err);
//     };
//     reader.readAsDataURL(file);
//   });
// }

function EventForm() {
  // get page path params
  const params = useParams();
  const { dogId, eventId } = params;

  // create state vars
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [editable, setEditable] = useState(!eventId);
  const [files, setFiles] = useState<File[]>([]);
  const [event, setEvent] = useState<Event>({
    description: '',
    date: new Date().toISOString().split('T')[0],
    dogId,
    attachmentFiles: [],
  });

  // instantiate navigation controller
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

  const uploadFile = async (file: File): Promise<string> => {
    const response = await api.postForm('attachment', { file });
    return response.data.id;
  };

  const updateEvent = async (formData: Event) => {
    try {
      setIsFetching(true);
      const data = {
        ...formData,
        date: new Date(formData.date).toISOString(),
        dogId,
      };
      if (formData.attachmentFiles) {
        // data.base64File = await readFileAsync(formData.attachmentFiles[0]);
        delete data.attachmentFiles;
      }
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
      await Promise.all(files.map((file) => uploadFile(files[0])));
      setIsFetching(true);
      const data = {
        ...formData,
        date: new Date(formData.date).toISOString(),
        dogId,
      };

      if (formData.attachmentFiles) {
        // data.base64File = await readFileAsync(formData.attachmentFiles[0]);
        delete data.attachmentFiles;
      }
      await api.post('event', data);
      toast.success('Evento cadastrado');
      navigate(`/dog/${dogId}`);
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
      navigate(`/dog/${dogId}`);
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
    attachmentFiles: Yup.array().of(Yup.mixed<File>()),
  });

  return (
    <div className="event-form-page">
      <DeleteDialog
        show={showDeleteDialog}
        handleConfirm={() => (eventId ? deleteEvent(eventId) : null)}
        handleCancel={() => setShowDeleteDialog(false)}
      />
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
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <fieldset disabled={isFetching}>
                <Row>
                  <Col md={6} className="divider mb-4">
                    <Form.Group className="mb-2" controlId="description">
                      <Form.Label className="fw-bold">Descrição</Form.Label>
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
                          touched.date !== undefined
                          && errors.date !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.date}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {editable ? (
                      <FieldArray name="attachmentFiles">
                        {({ remove, push }) => (
                          <Form.Group className="mb-2" controlId="attachmentFiles">
                            <Form.Label className="fw-bold">Anexo</Form.Label>
                            <Form.Control
                              name="attachmentFiles"
                              type="file"
                              readOnly={!editable}
                              plaintext={!editable}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                const value = e.target?.files?.length
                                  ? e.target.files[0]
                                  : undefined;
                                setFiles((prevState) => {
                                  if (value !== undefined) {
                                    return [...prevState, value];
                                  }
                                  return prevState;
                                });
                                push(value);
                              }}
                              isValid={
                                  touched.attachmentFiles && !errors.attachmentFiles
                                }
                              isInvalid={
                                  touched.attachmentFiles !== undefined
                                  && errors.attachmentFiles !== undefined
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.attachmentFiles}
                            </Form.Control.Feedback>

                            { files?.map((file, index) => (
                              <div key={`attachmentFiles.${index}`}>
                                <p className="d-inline-block">{file.name}</p>
                                <Button
                                  variant="danger"
                                  type="button"
                                  className="m-2"
                                  onClick={() => setFiles((prevState) => prevState.filter((_, i) => i !== index))}
                                >
                                  <Trash />
                                </Button>
                              </div>
                            ))}
                          </Form.Group>
                        )}
                      </FieldArray>
                    ) : null}
                    {!editable && eventId ? (
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-bold">Anexo</Form.Label>
                        {event.base64File ? (
                          <DownloadButton data={event.base64File} />
                        ) : (
                          <Form.Control
                            type="text"
                            readOnly
                            plaintext
                            placeholder="-"
                          />
                        )}
                      </Form.Group>
                    ) : null}
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
                            setShowDeleteDialog(false);
                          }}
                        >
                          Remover
                        </Button>
                        <Button
                          variant="secondary"
                          className="me-3 mb-2"
                          type="button"
                          onClick={() => {
                            navigate(`/dog/${dogId}`);
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
                              navigate(`/dog/${dogId}`);
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
