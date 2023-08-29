import { Button, Modal } from 'react-bootstrap';
import React from 'react';

export interface DeleteDialogParams {
  show: boolean;
  handleConfirm: () => void
  handleCancel: () => void
}

export default function DeleteDialog({
  show,
  handleConfirm = () => {},
  handleCancel = () => {},
}: DeleteDialogParams) {
  return (
    <Modal
      show={show}
      onHide={handleCancel}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Deseja remover esse registro?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Remover
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
