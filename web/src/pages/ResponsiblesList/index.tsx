// import React, { useEffect, useState } from 'react';
//
// import { Button, Container, Form, Col } from 'react-bootstrap';
// import { Plus } from 'react-bootstrap-icons';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Table from 'react-bootstrap/Table';
// import CustomTable, { CustomTableColumn } from '~/components/CustomTable';
// import api from '~/services/api';
// import Loader from '~/components/Loader';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
//
//
// interface Props {
//   id?: number
//   data: ResponsibleRelationship
// }
//
// function ResponsibleFormRow({id}: Props) {
//
//   const [isFetching, setIsFetching] = useState<boolean>(true);
//   const [editable, setEditable] = useState<boolean>(true);
//
//   const schema = Yup.object().shape({
//     startDate: Yup.date().required('Campo obrigatório'),
//     endDate: Yup.date().required('Campo obrigatório'),
//     status: Yup.string().required('Campo obrigatório'),
//     responsibleId: Yup.string()
//       .min(1, 'Campo obrigatório')
//       .required('Campo obrigatório'),
//   });
//
//   return (
//     <Formik
//       enableReinitialize
//       validationSchema={schema}
//       onSubmit={(newValues) => {
//         if (dogId) updateDog(newValues);
//         else createDog(newValues);
//       }}
//       initialValues={dog}
//     >
//       {({ handleSubmit, handleChange, values, touched, errors }) => (
//         <Form noValidate onSubmit={handleSubmit} className="mb-5">
//           <fieldset disabled={isFetching}>
//             <Col>
//               <Form.Group className="mb-5" controlId="responsibleId">
//                 <Form.Label className="fw-bold">
//                   Tutor Responsável
//                 </Form.Label>
//                 <Form.Select
//                   name="responsibleId"
//                   disabled={!editable}
//                   value={values.responsibleId}
//                   defaultValue={values.responsibleId}
//                   onChange={handleChange}
//                   isValid={touched.responsibleId && !errors.responsibleId}
//                   isInvalid={
//                     touched.responsibleId !== undefined
//                     && errors.responsibleId !== undefined
//                   }
//                 >
//                   <option value="">Selecione</option>
//                   {tutores.map(({ id: tutorId, name }) => (
//                     <option key={tutorId} value={tutorId}>
//                       {name}
//                     </option>
//                   ))}
//                 </Form.Select>
//                 <Form.Control.Feedback type="invalid">
//                   {errors.responsibleId}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//
//             <Col>
//             <Form.Group className="mb-2" controlId="status">
//               <Form.Label className="fw-bold">Status</Form.Label>
//               <Form.Select
//                 name="status"
//                 disabled={!editable}
//                 value={values.status}
//                 onChange={handleChange}
//                 isValid={touched.status && !errors.status}
//                 isInvalid={
//                   touched.status !== undefined
//                   && errors.status !== undefined
//                 }
//               >
//                 <option value="">Selecione</option>
//                 <option value="Efetuado">Efetuado</option>
//                 <option value="Pendente">Pendente</option>
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">
//                 {errors.status}
//               </Form.Control.Feedback>
//             </Form.Group>
//
//             </Col>
//           </fieldset>
//         </Form>)}
//       </Formik>)
// }
//
//
// export default function EventList() {
//   const navigate = useNavigate();
//
//   const params = useParams();
//   const { dogId } = params;
//
//   const [isFetching, setIsFetching] = useState<boolean>(true);
//   const [data, setData] = useState<Event[]>([]);
//
//   const fetchEvents = async () => {
//     try {
//       setIsFetching(true);
//       const response = await api.get(`event/dog/${dogId}`, {
//         params: { page, size },
//       });
//       const { data, totalRecords } = response.data;
//
//       setData(data);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       setIsFetching(false);
//     }
//   };
//
//   useEffect(() => {
//     fetchEvents();
//   }, [page, size]);
//
//   return (
//     <Container>
//       <div>
//         <Button
//           className="float-start"
//           onClick={() => {
//             navigate(`/dog/${dogId}/event/new`);
//           }}
//         >
//           <Plus />
//           Adicionar
//         </Button>
//       </div>
//       <Table hover className="custom-table">
//         <thead>
//           <tr>
//             <th>Cão</th>
//             <th>Status</th>
//             <th>Anexos</th>
//             <th>Observações</th>
//             <th>Data</th>
//             <th />
//           </tr>
//         </thead>
//         <tbody>
//           {!isFetching && data.length > 0 ? (
//             data.map((row, index) => (
//
//             ))
//           ) : null }
//
//           {!isFetching && data.length === 0 ? (
//             <td className="text-center p-4 border-bottom" colSpan={6}>
//               Sem registros
//             </td>
//           ) : null}
//
//           {isFetching ? (
//             <tr>
//               <td colSpan={6}>
//                 <Loader />
//               </td>
//             </tr>
//           ) : null}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }
