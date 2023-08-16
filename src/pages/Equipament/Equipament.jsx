import React, { useEffect, useState } from 'react'
import Main from '../../components/Main'
import api from '../../services/axios'
import { Table, Button, Row, Col } from 'reactstrap'
import { timeFromNow } from '../../commons/functionTime'

import { ModalForm } from '../../components/ModalForm'
import RegisterSellEquipament from '../../components/Forms/RegisterSellEquipament'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus, faFilter } from '@fortawesome/free-solid-svg-icons';

const Equipament = () => {
    const [data, setData] = useState([])
    const [copyData, setCopyData] = useState([])
    const [show, setShow] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [submit, setSubmit] = useState()
    const [filter, setFilter] = useState()

    const refreshServer = async () => {
        await api.get('/api/equipament').then((response) => {
            setData(() => response.data || []);
            setCopyData(() => response.data || []);
        })
    }
    const handleFilter = (event) => {
        const { name, value } = event.target;

        setFilter((prev) => ({ ...prev, [name]: value }));

        const filteredData = copyData?.filter(item =>
            item[name].toLowerCase().includes(value.toLowerCase())
        );
        setData(() => filteredData);
    }
    useEffect(() => {
        refreshServer();
    }, []);

    return (
        <Main>
            <Row className="align-items-center">
                <Col xs="auto">
                    <Button className='m-3' color='success' onClick={() => setShow(() => true)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button onClick={() => setShowFilter(prev => !prev)}>
                        <FontAwesomeIcon icon={faFilter} />
                    </Button>
                </Col>
                {showFilter &&
                    <>
                        <Col>
                            <div className="form-floating mb-3">
                                <input name='name' type='text' value={filter?.name} className="form-control" placeholder="Serial" onChange={(event) => handleFilter(event)} />
                                <label htmlFor="floatingInput">Nome</label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-floating mb-3">
                                <input name='description' type='text' value={filter?.description} className="form-control" placeholder="Serial" onChange={(event) => handleFilter(event)} />
                                <label htmlFor="floatingInput">Descrição</label>
                            </div>
                        </Col>
                    </>
                }

            </Row>
            <ModalForm title={"Cadastro equipamentos"} show={show} setShow={setShow} submit={submit} setSubmit={setSubmit}>
                <RegisterSellEquipament submit={submit} setSubmit={setSubmit} />
            </ModalForm>
            <DynamicTable data={data} />
        </Main >
    )
}

const DynamicTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>Nenhum dado disponível.</p>;
    }

    const handleDestroy = async (id) => {
        await api.delete(`/api/equipament/${id}`)
    }

    const handleUpdate = async (id) => {
        await api.put(`/api/equipament/${id}`)
    }

    const keys = Object.keys(data[0]);
    const dateKeys = keys.filter(key => key === 'createdAt' || key === 'updatedAt');

    return (
        <Table hover >
            <thead>
                <tr>
                    <th>#</th>
                    {keys.map((key, index) => (
                        <th key={index}>{key.toUpperCase()}</th>
                    ))}
                    <th>OPTIONS</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{rowIndex}</td>
                        {keys.map((key, cellIndex) => (
                            <td key={cellIndex}>
                                {dateKeys.includes(key)
                                    ? timeFromNow((item[key]))
                                    : Array.isArray(item[key])
                                        ? <TagKeys array={item[key]} />
                                        : item[key]}
                            </td>
                        ))}
                        <td>
                            <Button color='danger' className='mx-1' onClick={() => handleDestroy(item.id)}> <FontAwesomeIcon icon={faTrash} /></Button>
                            <Button color='warning' className='mx-1' onClick={() => handleUpdate(item.id)}> <FontAwesomeIcon icon={faPenToSquare} /></Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

const TagKeys = ({ array }) => {
    return (
        <>
            {array.map((element, index) => (
                <span key={index} style={{ margin: '0.08rem' }} className="badge text-bg-primary">{element}</span>
            ))}
        </>
    )
}



export default Equipament