import api from '../services/axios'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'

const FormRegisterEstation = ({ data, setData, show, setShow }) => {

    const { register, handleSubmit, setValue, watch, errors } = useForm()
    const selectedType = watch('type');
    const selectedSilent = watch('estation[0].config.silent');
    // react select e controller

    const onSubmit = data => {
        setData(() => data);
        api.post('/station/properties').then((response => console.log(response))).catch((error) => console.log(error))
    }

    const handleInputChange = (name, value) => {
        setValue(name, value);
    };

    useEffect(() => {
        handleSubmit(onSubmit)()
        if (show) {
        }
    }, [show])

    useEffect(() => {
        console.log(data)
    }, [data])

    const required = { required: false }
    return (
        <Form>
            <h4>Cadastro de estação</h4>
            <FormGroup floating>
                <Input {...register("property", required)} placeholder="Propriedade" />
                <Label>
                    Propriedade
                </Label>
            </FormGroup>
            <FormGroup floating>
                <Input {...register("gerency", required)} placeholder="Gerente" />
                <Label>
                    Gerente
                </Label>
            </FormGroup>
            <FormGroup floating>
                <Input type='select'
                    name='type'
                    onChange={(e) => handleInputChange('type', e.target.value)}>
                    <option value="">...</option>
                    <option value="digital">Digital</option>
                    <option value="analog">Analogico</option>
                </Input>
                <Label>
                    Tecnologia
                </Label>
            </FormGroup>
            <Row>
                <Col>
                    <FormGroup floating>
                        <Input {...register("estation[0].lat", required)} placeholder="Latitude" />
                        <Label>
                            Latitude
                        </Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup floating>
                        <Input {...register("estation[0].long", required)} placeholder="Longitude" />
                        <Label>
                            Longitude
                        </Label>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup floating>
                        <Input {...register("estation[0].freqRx", required)} placeholder="Frequência RX" />
                        <Label>
                            Frequência RX
                        </Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup floating>
                        <Input {...register("estation[0].freqTx", required)} placeholder="Frequência TX" />
                        <Label>
                            Frequência TX
                        </Label>
                    </FormGroup>
                </Col>
            </Row>
            {
                selectedType === "digital" && (
                    <>
                        <FormGroup floating>
                            <Input type='select'
                                {...register("estation[0].config.slot", required)} placeholder="Slot"
                                onChange={(e) => handleInputChange('estation[0].config.slot', e.target.value)}>
                                {[0, 1, 2].map((val) => <option key={val} value={val}>{val}</option>)}
                            </Input>
                            <Label>
                                Slot
                            </Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                type='select'
                                {...register("estation[0].config.colorCode", required)} placeholder="colorCode"
                                onChange={(e) => handleInputChange('estation[0].config.colorCode', e.target.value)}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((val) => <option key={val} value={val}>{val}</option>)}
                            </Input>
                            <Label>
                                Codigo de cor
                            </Label>
                        </FormGroup>
                    </>
                )
            }
            {
                selectedType === "analog" && (
                    <Row>
                        <Col>
                            <FormGroup floating>
                                <Input
                                    type='select'
                                    {...register("estation[0].config.silent", required)} placeholder="Silenciador"
                                    onChange={(e) => handleInputChange('estation[0].config.silent', e.target.value)}>
                                    {["CSQ", "TPL", "DPL"].map((val) => <option key={val} value={val}>{val}</option>)}
                                </Input>
                                <Label>
                                    Silenciador
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            {selectedSilent !== "CSQ" &&
                                (<>
                                    <FormGroup floating>
                                        <Input {...register("estation[0].config.encoder", required)} placeholder="Encoder" />
                                        <Label>
                                            Encoder
                                        </Label>
                                    </FormGroup>
                                    <FormGroup floating>
                                        <Input {...register("estation[0].config.decoder", required)} placeholder="Decoder" />
                                        <Label>
                                            Decoder
                                        </Label>
                                    </FormGroup>
                                </>
                                )}
                        </Col>
                    </Row>
                )
            }
            <FormGroup floating>
                <Input type='area' {...register("description")} placeholder="Descrição" />
                <Label>
                    Descrição
                </Label>
            </FormGroup>

            {/* <input type="submit" /> */}
            <Button title="Submit" onClick={handleSubmit(onSubmit)} >Submit</Button>
        </Form >

    )
}

export default FormRegisterEstation