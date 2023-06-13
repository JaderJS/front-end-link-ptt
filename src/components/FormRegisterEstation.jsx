import React from 'react'
import { Form, Row, FormGroup, Label, Input } from 'reactstrap'

const FormRegisterEstation = () => {
    return (
        <div>
            <Form>
                <Row>
                    <FormGroup>
                        <Label for="name">
                            Nome
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Nome"
                            type="text"
                        />
                    </FormGroup>
                </Row>
            </Form>
        </div>
    )
}

export default FormRegisterEstation