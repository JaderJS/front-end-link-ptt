import React, { useEffect, useState } from 'react'
import { Button, Row } from 'reactstrap'

import api from '../services/axios'

import Main from '../components/Main'
import ModalForm from '../components/ModalForm'
import FormRegisterEstation from '../components/FormRegisterEstation'
import Map from '../components/Map'
import ModalError from '../components/ModalError'
import CardStation from '../components/CardStation'

const Property = () => {
    const [showError, setShowError] = useState(false)
    const [show, setShow] = useState(false)
    const [error, setError] = useState()

    const [submit, setSubmit] = useState(false)
    const [response, setResponse] = useState("")

    const [data, setData] = useState([])

    const getStations = async () => {
        await api.get('/station/properties').then((response) => {
            setData(() => response.data)
        }).catch((error) => {
            setError(() => error)
            setTimeout(() => {
                setError(() => null)
            }, 5000)
        })
        console.log(data)
    }
    useEffect(() => {
        getStations()
    }, [])

    return (
        <Main>
            <Button onClick={() => setShow(true)}>Novo registro</Button>
            <Row>
                {data.map((data) => (
                    <CardStation data={data} />
                ))}
            </Row>
            <ModalError showError={showError} setShowError={setShowError} error={error} />
            <ModalForm
                title={"Cadastro estação"}
                show={show}
                setShow={setShow}
                submit={submit}
                setSubmit={setSubmit}
                response={response}
                setResponse={setResponse}
            >
                <FormRegisterEstation
                    setResponse={setResponse}
                    submit={submit}
                    setSubmit={setSubmit}
                />
            </ModalForm>
        </Main>
    )
}

export default Property