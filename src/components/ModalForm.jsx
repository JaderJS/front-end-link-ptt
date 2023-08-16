import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Alert } from "reactstrap";

const ModalForm = ({ title, show, setShow, setSubmit, children }) => {
  const toggle = () => {
    setShow(false);
  };
  const handleSubmit = () => {
    setSubmit((previus) => !previus);
  };

  return (
    <div>
      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Registro
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export {ModalForm};
