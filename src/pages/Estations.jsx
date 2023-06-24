import React, { useEffect, useState } from 'react'
import Main from '../components/Main'
import Map from '../components/Map'
import ModalForm from '../components/ModalForm'
import { Button } from 'reactstrap'
import FormRegisterEstation from '../components/FormRegisterEstation'
import api from '../services/axios'
import ModalError from '../components/ModalError'

const Estations = () => {
    const [showError, setShowError] = useState(false)
    const [show, setShow] = useState(false)
    const [error, setError] = useState()

    const [submit, setSubmit] = useState(false)
    const [response, setResponse] = useState("")

    const [data, setData] = useState()

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
            {/* <Map coordinates={[51.505, -0.09]} /> */}
            <Button onClick={() => setShow(true)}>Novo registro</Button>
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

export default Estations