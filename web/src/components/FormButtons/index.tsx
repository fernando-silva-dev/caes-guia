import React from 'react';
import { Button } from 'react-bootstrap';

interface Params {
  exists: boolean;
  editable: boolean;
  setEditable: (value: boolean) => void;
  onDelete: () => void;
  onReturn: () => void;
}

export default function FormButtons({
  exists,
  editable,
  setEditable,
  onDelete,
  onReturn,
}: Params) {
  if (!editable && exists) {
    return (
      <>
        <Button
          variant="warning"
          className="me-3 mb-3"
          type="button"
          onClick={() => setEditable(true)}
        >
          Editar
        </Button>
        <Button
          variant="danger"
          className="me-3 mb-3"
          type="button"
          onClick={() => onDelete()}
        >
          Remover
        </Button>
        <Button
          variant="secondary"
          className="me-3 mb-3"
          type="button"
          onClick={() => onReturn()}
        >
          Voltar
        </Button>
      </>
    );
  }

  if (editable) {
    return (
      <>
        <Button variant="primary" className="me-3 mb-3" type="submit">
          Salvar
        </Button>
        <Button
          variant="secondary"
          className="me-3 mb-3"
          type="button"
          onClick={() => {
            if (exists) {
              setEditable(false);
            } else {
              onReturn();
            }
          }}
        >
          Cancelar
        </Button>
      </>
    );
  }

  return null;
}
