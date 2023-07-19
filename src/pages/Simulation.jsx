import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import api from "../services/axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Alert } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Main from "../components/Main";

function Simulation() {
    const [show, setShow] = useState(false)
    const [data, setData] = useState({
        properties: [
            {
                id: 1,
                name: "Fazenda 1",
                slot1: {
                    groups: [{ id: 1000, activated: false, status: "idle" }, { id: 1001, activated: false, status: "idle" }, { id: 1002, activated: false, status: "idle" }, { id: 1002, activated: false, status: "idle" }, { id: 1002, activated: false, status: "idle" }],
                    activated: false
                },
                slot2: {
                    groups: [{ id: 2000, activated: false, status: "idle" }, { id: 2001, activated: false, status: "idle" }, { id: 1002, activated: false, status: "idle" }],
                    activated: false
                }
            },
            {
                id: 2,
                name: "Fazenda 2",
                slot1: {
                    groups: [{ id: 1000, activated: false, status: "idle" }, { id: 1001, activated: false, status: "idle" }],
                    activated: false
                },
                slot2: {
                    groups: [{ id: 2000, activated: false, status: "idle" }, { id: 2001, activated: false, status: "idle" }],
                    activated: false
                }
            },
            {
                id: 3,
                name: "Fazenda 3",
                slot1: {
                    groups: [{ id: 1000, activated: false, status: "idle" }, { id: 1001, activated: false, status: "idle" }],
                    activated: false
                },
                slot2: {
                    groups: [{ id: 2000, activated: false, status: "idle" }, { id: 2001, activated: false, status: "idle" }],
                    activated: false
                }
            }
        ]
    });

    const removeProprety = (index) => {
        setData((previous) => {
            const newData = { ...previous };
            newData.properties.splice(index, 1);
            return newData;
        });
    };

    const handleGroupActivation = (id, groupId, slot, activate) => {
        setData(prevData => {
            const newData = { ...prevData };
            newData.properties.forEach(property => {
                Object.keys(property).forEach(slotKey => {
                    if (slotKey !== "name" && slot === slotKey) {
                        property[slotKey].groups.forEach(group => {
                            if (group.id === groupId) {
                                // group.activated = group.id === groupId && activate;
                                group.status = activate ? "transmitting" : "idle";
                            }
                            else {
                                group.status = activate ? "receiving" : "idle";
                            }
                        });
                    }
                });
            });
            newData.properties.forEach(property => {
                if (property.id === id) {
                    Object.keys(property).forEach(slotKey => {
                        if (slotKey !== "name" && slotKey !== "id" && slot === slotKey) {
                            property[slotKey].groups.forEach(group => {
                                if (group.id === groupId) {
                                    group.activated = group.id === groupId && activate;
                                }
                            });
                        }
                    });
                }
            });
            return newData;
        });
    };

    const changeColor = (status) => {
        if (status === "receiving") {
            return 'danger';
        } else if (status === "transmitting") {
            return 'success';
        } else if (status === "idle") {
            return 'primary';
        }
        return
    }

    return (
        <Main>
            {console.log(data)}
            <ModalForm show={show} setShow={setShow} setData={setData} />
            <Button onClick={() => setShow(true)}>Adicionar sistema</Button>
            <Row >
                {data.properties.map((property, index) => (
                    <div key={property.id} className="card m-2" style={{ width: "20rem" }}>
                        <div className="card-header">
                            <Row>
                                <Col>
                                    <h5 className="card-title">{property.name}</h5>
                                </Col>
                                <Col>
                                    <Button color="danger" onClick={() => removeProprety(index)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        <div className="card-body">

                            <ul className="list-group list-group-flush">
                                {Object.keys(property).map(slotKey => {
                                    if (slotKey !== "name" && slotKey !== "id") {
                                        return (
                                            <li key={slotKey} className="list-group-item">
                                                <h6 className="card-subtitle mb-2 text-body-secondary text-center">{slotKey.toUpperCase()}</h6>
                                                <div className="d-flex flex-wrap ">
                                                    {property[slotKey].groups.map((group, groupIndex) => (
                                                        <Col className="my-1" key={groupIndex}>
                                                            <Button
                                                                size="sm"
                                                                color={changeColor(group.status)}
                                                                onMouseDown={() => handleGroupActivation(property.id, group.id, slotKey, true)}
                                                                onMouseUp={() => handleGroupActivation(property.id, group.id, slotKey, false)}
                                                            >
                                                                <div>
                                                                    {group.activated && <FontAwesomeIcon icon={faMicrophoneLines} bounce />}
                                                                    {group.status === "receiving" && <FontAwesomeIcon icon={faBan} />}
                                                                    {!group.activated && group.status === "transmitting" && <FontAwesomeIcon icon={faVolumeHigh} beatFade />}
                                                                    {group.status === "idle" && <FontAwesomeIcon icon={faArrowsRotate} spin />}
                                                                </div>
                                                                {group.id}
                                                            </Button>
                                                        </Col>
                                                    ))}
                                                </div>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </Row>
        </Main>
    );
}

const ModalForm = ({ show, setShow, setData }) => {
    const [submit, setSubmit] = useState(false)

    const handleSubmit = () => {
        setSubmit((previus) => !previus);
    };

    return (
        <div>
            <Modal isOpen={show}>
                <ModalHeader >Cadastro da estação</ModalHeader>
                <ModalBody>
                    <FormRegisterRepeater submit={submit} setSubmit={setSubmit} setData={setData} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                        Registro
                    </Button>
                    <Button color="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

const FormRegisterRepeater = ({ submit, setSubmit, setData }) => {
    const [groupId, setGroupId] = useState()
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [showMenu, setShowMenu] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            property: {
                id: 100,
                name: "Fazenda A",
                slot1: {
                    groups: [],
                    activated: false
                },
                slot2: {
                    groups: [],
                    activated: false
                }
            }
        },
    });

    useEffect(() => {
        if (submit) {
            handleSubmit(onSubmit)();
            setSubmit((previus) => !previus);
        }
    }, [submit]);

    const onSubmit = async (data) => {
        console.log(data);
        setData((previus) => ({ ...previus, properties: [...previus.properties, data.property] }))
        // await api.post("/station/properties", data).then((response) => { });
    };


    const addGroup = (slot, valueId) => {
        if (!valueId) {
            return;
        }
        const property = watch("property");
        const newGroup = {
            id: valueId,
            activated: false,
            status: 'idle'
        }
        property[slot].groups.push(newGroup);
        reset({ property });
    }

    const removeGroup = (slot, index) => {
        const property = watch('property');
        property[slot].groups.splice(index, 1);
        reset({ property });
    };

    const handleContextMenu = (event, slot, index) => {
        event.preventDefault();
        setMenuPosition({ x: event.clientX, y: event.clientY });
        setShowMenu(true);
        setGroupId({ slot, index });
    };

    const renderContextMenu = () => {
        const style = {
            position: 'fixed',
            top: menuPosition.y,
            left: menuPosition.x,
            zIndex: 9999,
            cursor: 'pointer',
        };

        return (
            <div className="custom-context-menu" style={style}>
                <ul className="list-group">
                    <li className="list-group-item" onClick={() => handleMenuOptionClick('delete')}>
                        Deletar grupo
                    </li>
                </ul>
            </div >
        );
    };

    const handleMenuOptionClick = (option) => {
        if (option === 'delete' && groupId) {
            const { slot, index } = groupId;
            removeGroup(slot, index);
        }
        setShowMenu(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {showMenu && renderContextMenu()}
            <div className="form-floating mb-3">
                <input className="form-control" {...register("property.name", { required: "Preencha o nome da propriedade" })} placeholder="Nome" />
                <label htmlFor="floatingInput">Nome</label>
                <div style={{ color: '#f2b809' }}>
                    <ErrorMessage errors={errors} name="property.name" />
                </div>
            </div>
            <span className="badge text-bg-light">SLOT 1</span>
            <div className="input-group mb-3">
                <input className="form-control" onChange={(event) => setGroupId(() => event.target.value)} placeholder="id" />
                <Button color="success" onClick={() => addGroup('slot1', groupId)}>Adicionar grupo</Button>
            </div>
            <div>
                {watch("property")?.slot1.groups.map((group, index) => (
                    <Button
                        key={index}
                        className="m-1"
                        onContextMenu={(event) => handleContextMenu(event, 'slot1', index)}
                    >{group.id}</Button>
                ))}
            </div>
            <span className="badge text-bg-light">SLOT 2</span>
            <div className="input-group mb-3">
                <input className="form-control" onChange={(event) => setGroupId(() => event.target.value)} placeholder="id" />
                <Button color="success" onClick={() => addGroup('slot2', groupId)}>Adicionar grupo</Button>
            </div>
            <div>
                {watch("property")?.slot2.groups.map((group, index) => (
                    <Button
                        key={index}
                        className="m-1"
                        onContextMenu={(event) => handleContextMenu(event, 'slot2', index)}
                    >{group.id}</Button>
                ))}
            </div>
        </form >
    )
}

export default Simulation