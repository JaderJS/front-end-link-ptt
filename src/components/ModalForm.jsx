import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ModalForm = ({ title, show, setShow, children }) => {

    const [data, setData] = useState()

    const toggle = () => {
        setShow(false);
    };
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
                    <Button color="primary" onClick={toggle}>
                        Registro
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalForm