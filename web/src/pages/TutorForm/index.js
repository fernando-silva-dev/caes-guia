import React, { useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

import "./styles.css";
import NavigationBar from "../../components/NavigationBar";

function TutorForm() {
  const { id } = useParams();
  const [isFetching, setIsFetching] = useState(!!id);
  const [tutor, setTutor] = useState({
    nome: "",
    email: "",
    celular: "",
    rua: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event;
    setTutor((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const fetchTutor = async (id) => {
    setIsFetching(true);
    try {
      // TODO: Buscar Tutor
      // const response = await Api.get(`authentication/tutor/${id}`, tutor);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: chamar no inicio da página
  // if (id) {
  //   fetchTutor(id);
  // }

  return (
    <div className="tutor-form-page">
      <NavigationBar />
      <Container>
        <Row>
          <Col md={6}>
            <Form className="">
              {isFetching ? (
                <Spinner animation="border" className="me-2" />
              ) : null}
              <h2 className="d-inline-block">Tutor</h2>
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  placeholder="Nome"
                  name="nome"
                  disabled={isFetching}
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  placeholder="E-mail"
                  name="email"
                  disabled={isFetching}
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="celular">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  placeholder="Celular"
                  name="celular"
                  disabled={isFetching}
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </Form.Group>

              <Form.Group
                className="w-50 d-inline-block mb-3 pe-2"
                controlId="cep"
              >
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  name="cep"
                  disabled={isFetching}
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </Form.Group>

              <Form.Group className="w-50 d-inline-block mb-3" controlId="uf">
                <Form.Label>Estado</Form.Label>
                <Form.Select disabled={isFetching} name="uf">
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

              <Form.Group
                className="w-50 d-inline-block mb-3 pe-2"
                controlId="cidade"
              >
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  name="cidade"
                  disabled={isFetching}
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </Form.Group>

              <Form.Group
                className="w-50 d-inline-block mb-3"
                controlId="bairro"
              >
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  name="bairro"
                  disabled={isFetching}
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="rua">
                <Form.Label>Rua</Form.Label>
                <Form.Control
                  name="rua"
                  disabled={isFetching}
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="complemento">
                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  name="complemento"
                  disabled={isFetching}
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="mb-3"
                type="button"
                disabled={isFetching}
                onClick={() => {}}
              >
                Salvar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TutorForm;
