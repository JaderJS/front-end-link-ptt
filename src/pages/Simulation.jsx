import React, { useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import api from "../services/axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFloppyDisk, faMicrophoneLines, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Main from "../components/Main";
import RegisterSimulation from "../components/Forms/RegisterSimulation";
import { ModalForm as ModalSave } from "../components/ModalForm";
import { SelectComponent } from "../components/MultiSelect";

function Simulation() {
    const [show, setShow] = useState(false)

    const [showCreate, setShowCreate] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [options, setOptions] = useState()
    const [selectId, setSelectId] = useState()

    const [data, setData] = useState({
        properties: [
            {
                id: 1,
                name: "Fazenda 1",
                slot1: {
                    groups: [{ id: 1000, activated: false, status: "idle" }, { id: 1001, activated: false, status: "idle" }],
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
    };

    const getSimulations = async () => {
        await api.get('/api/simulation').then((response) => {
            setOptions(() => {
                const flag = response.data.map((val) => ({ value: val.id, label: val.name }));
                return flag;
            });
        });
    };

    const getSimulationId = async (id) => {
        if (!id) {
            return;
        }
        await api.get(`/api/simulation?id=${id}`).then((response) => {
            console.log(response);
            setData(() => response.data.content);
        });
    };

    const dropSimulation = async (id) => {
        if (!id) {
            return;
        }
        await api.delete(`/api/simulation/${id}`).then((response) => {
            // setData(() => response.data.content)
        });
    }

    useEffect(() => {
        getSimulations();
    }, []);

    return (
        <Main>
            <ModalForm show={show} setShow={setShow} setData={setData} />
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                    <Button className='mx-1' color='primary' onClick={() => setShow(true)}><FontAwesomeIcon icon={faPlus} /></Button>
                    <Button className='mx-1' color='success' onClick={() => setShowCreate(true)}><FontAwesomeIcon icon={faFloppyDisk} /></Button>
                    <Button className='mx-1' color='success' onClick={() => getSimulationId(selectId?.id)}><FontAwesomeIcon icon={faDownload} /></Button>
                </div>

                <div style={{ flex: '2' }}>
                    <SelectComponent options={options} setSelect={setSelectId} />
                </div>
                <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                    <Button className='mx-1' onClick={() => dropSimulation(selectId?.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                </div>


                <ModalSave title={"Cadastro simulação"} show={showCreate} setShow={setShowCreate} submit={submit} setSubmit={setSubmit}>
                    <RegisterSimulation submit={submit} setSubmit={setSubmit} values={data} />
                </ModalSave>

            </div>

            <div style={{ display: 'flex' }}>
                {data.properties?.map((property, index) => (
                    <div key={index} className="card" style={{ width: "18rem", margin: '0.8rem' }}>
                        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: '2' }}>
                                <span className="card-title">{property.name}</span>
                            </div>
                            <div style={{ flex: '1' }}>
                                <div color="danger" onClick={() => removeProprety(index)} style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faTrash} opacity='0.6' />
                                </div>
                            </div>

                        </div>
                        <div className="card-body">
                            {Object.keys(property).map(slotKey => {
                                if (slotKey !== "name" && slotKey !== "id") {
                                    return (
                                        <div key={slotKey} className="list-group-item">
                                            <h6 className="text-body-secondary text-center">{slotKey.toUpperCase()}</h6>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                {property[slotKey].groups.map((group, groupIndex) => (
                                                    <div style={{ display: 'flex' }} key={groupIndex}>
                                                        <Button style={{ flex: 'auto', margin: '0.2rem' }}
                                                            size="sm"
                                                            color={changeColor(group.status)}
                                                            onMouseDown={() => handleGroupActivation(property.id, group.id, slotKey, true)}
                                                            onMouseUp={() => handleGroupActivation(property.id, group.id, slotKey, false)}
                                                        >
                                                            <div >
                                                                {group.activated && <FontAwesomeIcon icon={faMicrophoneLines} bounce />}
                                                                {group.status === "receiving" && <FontAwesomeIcon icon={faBan} />}
                                                                {!group.activated && group.status === "transmitting" && <FontAwesomeIcon icon={faVolumeHigh} beatFade />}
                                                                {group.status === "idle" && <FontAwesomeIcon icon={faArrowsRotate} spin />}
                                                            </div>
                                                            {group.id}
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                ))}
            </div>

        </Main >
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

    const onSubmit = (data) => {
        setData((previus) => ({ ...previus, properties: [...previus.properties, data.property] }));
    };


    const addGroup = (slot, valueId) => {
        if (!valueId) {
            return;
        }
        const property = watch("property");
        const newGroup = {
            id: +valueId,
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