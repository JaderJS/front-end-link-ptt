import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalError = ({ showError, setShowError, error }) => {

    const toggle = () => setShowError(!showError);

    return (
        <>
            {error && <Modal isOpen={showError} toggle={toggle}>
                <ModalHeader toggle={toggle}>{error.title}</ModalHeader>
                <ModalBody>{error.body}</ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            }
        </>
    )
}

export default ModalError