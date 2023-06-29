import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalError = ({ showError, setShowError, error }) => {

    const toggle = () => setShowError(!showError);

    return (
        <>
            {error && <Modal isOpen={error}>
                <ModalHeader>{error.message}</ModalHeader>
                <ModalBody>
                    <p>{error.response.status}</p>
                    <p>{error.response.data}</p>
                </ModalBody>
            </Modal>
            }
        </>
    )
}

export default ModalError