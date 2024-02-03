import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalWithAction = ({
  mostrar,
  accion,
  cerrarModal,
  titulo,
  descripcion,
}) => {
  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{descripcion}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModal}>
          Cerrar
        </Button>
        {accion ? (
          <Button variant="primary" onClick={accion}>
            Guardar Cambios
          </Button>
        ) : (
          ""
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWithAction;
