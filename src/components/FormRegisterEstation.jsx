import api from '../services/axios'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'

const FormRegisterEstation = ({ submit, setSubmit, setResponse }) => {
    const [data, setData] = useState()
    const { register, handleSubmit, setValue, watch, errors } = useForm()
    const selectedType = watch('estation[0].type');
    const selectedSilent = watch('estation[0].config.silent');
    // react select e controller

    const onSubmit = async data => {
        setData(() => data);
        await api.post('/station/properties', data).then((response => {
            setResponse(response.response);
        })).catch((error) => {
            setResponse(error.response);
        })
        setSubmit(false);
    }

    const handleInputChange = (name, value) => {
        setValue(name, value);
    };

    const formData = {
        property: "Fazenda Mariah",
        gerency: "Mariah",
        estation: [
            {
                lat: "18.1234",
                long: "53.1234",
                freqRx: 155.55,
                freqTx: 155.55,
                type: "digital",
                config: {
                    colorCode: 0,
                    slot: 1
                }
            }
        ],
        description: "Comentario",
    }

    useEffect(() => {
        if (submit) {
            handleSubmit(onSubmit)()
        }
    }, [submit])

    useEffect(() => {
        console.log(data)
    }, [data])

    const required = { required: false }
    return (
        <Form onSubmit={onSubmit}>
            <FormGroup floating>
                <Input
                    {...register("property", required)} placeholder="Propriedade"
                    onChange={(e) => handleInputChange('property', e.target.value)}
                    defaultValue={formData.property}
                />
                <Label>
                    Propriedade
                </Label>
            </FormGroup>
            <FormGroup floating>
                <Input
                    {...register("gerency", required)} placeholder="Gerente"
                    onChange={(e) => handleInputChange('gerency', e.target.value)}
                    defaultValue={formData.gerency}
                />
                <Label>
                    Gerente
                </Label>
            </FormGroup>
            <FormGroup floating>
                <Input type='select'
                    name='type'
                    onChange={(e) => handleInputChange('estation[0].type', e.target.value)}
                    defaultValue={formData.estation[0].type}
                >
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
                        <Input
                            {...register("estation[0].lat", required)} placeholder="Latitude"
                            onChange={(e) => handleInputChange('estation[0].lat', e.target.value)}
                            defaultValue={formData.estation[0].lat}
                        />
                        <Label>
                            Latitude
                        </Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup floating>
                        <Input
                            {...register("estation[0].long", required)} placeholder="Longitude"
                            onChange={(e) => handleInputChange('estation[0].long', e.target.value)}
                            defaultValue={formData.estation[0].long}
                        />
                        <Label>
                            Longitude
                        </Label>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup floating>
                        <Input
                            {...register("estation[0].freqRx", required)} placeholder="Frequência RX"
                            onChange={(e) => handleInputChange('estation[0].freqRx', e.target.value)}
                            defaultValue={formData.estation[0].freqRx}
                        />
                        <Label>
                            Frequência RX
                        </Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup floating>
                        <Input
                            {...register("estation[0].freqTx", required)} placeholder="Frequência TX"
                            onChange={(e) => handleInputChange('estation[0].freqTx', e.target.value)}
                            defaultValue={formData.estation[0].freqTx}
                        />
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
                            <Input
                                type='select'
                                {...register("estation[0].config.slot", required)} placeholder="Slot"
                                onChange={(e) => handleInputChange('estation[0].config.slot', e.target.value)}
                                defaultValue={formData.estation[0].config.slot}
                            >
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
                                onChange={(e) => handleInputChange('estation[0].config.colorCode', e.target.value)}
                                defaultValue={formData.estation[0].config.colorCode}
                                >
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
                                        <Input {...register("estation[0].config.encoder", required)} placeholder="Encoder"
                                            onChange={(e) => handleInputChange('estation[0].config.encoder', e.target.value)} />
                                        <Label>
                                            Encoder
                                        </Label>
                                    </FormGroup>
                                    <FormGroup floating>
                                        <Input {...register("estation[0].config.decoder", required)} placeholder="Decoder"
                                            onChange={(e) => handleInputChange('estation[0].config.decoder', e.target.value)} />
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
                <Input type='area' {...register("description")} placeholder="Descrição"
                    onChange={(e) => handleInputChange('description', e.target.value)} />
                <Label>
                    Descrição
                </Label>
            </FormGroup>

        </Form >

    )
}

export default FormRegisterEstation