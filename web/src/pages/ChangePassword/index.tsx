import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import './styles.css';

interface UpdatePasswordForm {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

export default function ChangePassword() {
  const [isFetching, setIsFetching] = useState(false);

  const submitForm = async (formData: UpdatePasswordForm) => {
    setIsFetching(true);
    try {
      await api.patch('user', formData);
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
    passwordConfirmation: Yup.string()
      .min(8, 'Senha deve ter ao menos 8 caracteres')
      .required('Campo obrigatório'),
  });

  return (
    <div className="change-password-page">
      <Container>
        <h1 className="d-inline-block mb-2">Alterar Senha</h1>
        <Row>
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
                passwordConfirmation: '',
              }}
              validate={(values) => {
                const errors = {} as UpdatePasswordForm;
                if (values.newPassword !== values.passwordConfirmation) {
                  errors.passwordConfirmation = 'A nova senha e a confirmação devem ser iguais';
                }

                return errors;
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <h4 className="d-inline-block">Alterar Senha</h4>
                  <fieldset disabled={isFetching}>
                    <Form.Group className="mb-2" controlId="password">
                      <Form.Label className="fw-bold">Senha Atual</Form.Label>
                      <Form.Control
                        type="password"
                        name="oldPassword"
                        value={values.oldPassword}
                        onChange={handleChange}
                        isValid={touched.oldPassword && !errors.oldPassword}
                        isInvalid={
                          touched.oldPassword !== undefined
                          && errors.oldPassword !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.oldPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="newPassword">
                      <Form.Label className="fw-bold">Nova Senha</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={values.newPassword}
                        onChange={handleChange}
                        isValid={touched.newPassword && !errors.newPassword}
                        isInvalid={
                          touched.newPassword !== undefined
                          && errors.newPassword !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.newPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-2"
                      controlId="passwordConfirmation"
                    >
                      <Form.Label className="fw-bold">
                        Confirmação da Nova Senha
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="passwordConfirmation"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        isValid={
                          touched.passwordConfirmation
                          && !errors.passwordConfirmation
                        }
                        isInvalid={
                          touched.passwordConfirmation !== undefined
                          && errors.passwordConfirmation !== undefined
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.passwordConfirmation}
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
