import React, { useState } from 'react'
import Main from '../components/Main'
import Map from '../components/Map'
import ModalForm from '../components/ModalForm'
import { Button } from 'reactstrap'
import FormRegisterEstation from '../components/FormRegisterEstation'

const Estations = () => {
    const [show, setShow] = useState(false)
    const [data, setData] = useState()
    return (
        <Main>
            <Map coordinates={[51.505, -0.09]} />
            <Button onClick={() => setShow(true)}>Novo registro</Button>
            <ModalForm show={show} setShow={setShow} >
                <FormRegisterEstation data={data} setData={setData} show={show} />
            </ModalForm>
        </Main>
    )
}

export default Estations