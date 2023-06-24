import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Alert } from 'reactstrap';

const ModalForm = ({ title, show, setShow, setSubmit, response, setResponse, children }) => {

    const toggle = () => {
        setShow(false);
    };
    const handleSubmit = () => {
        setSubmit((previus) => !previus);
        setTimeout(() => {
            setResponse(null)
        }, 7000)
    }

    return (
        <div>
            <Modal
                isOpen={show}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    {response && response.status !== 200 && <Alert color="danger">{response.data.message}</Alert>}
                    {response && response.status === 200 && <Alert color="success">{response.data.msg}</Alert>}
                    <Button color="primary" onClick={handleSubmit}>
                        Registro
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalForm