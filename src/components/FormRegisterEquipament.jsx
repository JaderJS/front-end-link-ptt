import api from "../services/axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";

const FormRegisterEquipament = ({ def, submit, setSubmit, setResponse }) => {
  const [data, setData] = useState();
  const { register, handleSubmit, setValue, watch, errors } = useForm();
  const [switchShow, setSwitchShow] = useState(true);
  // react select e controller

  const onSubmit = async (data) => {
    setData(() => data);
    await api
      .post("/equipaments/walktalkie", data)
      .then((response) => {
        setResponse(response.response);
      })
      .catch((error) => {
        setResponse(error.response);
      });
    setSubmit(false);
  };

  const handleInputChange = (name, value) => {
    setValue(name, value);
  };

  const formData = {
    serial: "Fazenda Mariah",
    freqRx: def.freqRx,
    freqTx: def.freqTx,
    type: def.type,
    estation: [
      {
        lat: "18.1234",
        long: "53.1234",
        freqRx: 155.55,
        freqTx: 155.55,
        type: "digital",
        config: {
          colorCode: 0,
          slot: 1,
        },
      },
    ],
    description: "Comentario",
  };

  useEffect(() => {
    if (submit) {
      handleSubmit(onSubmit)();
    }
  }, [submit]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const required = { required: false };
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup floating>
        <Input
          {...register("serial", required)}
          placeholder="Numero de série"
          onChange={(e) => handleInputChange("serial", e.target.value)}
          defaultValue={formData.serial}
        />
        <Label>Número de série</Label>
      </FormGroup>
      <FormGroup floating>
        <Input
          {...register("model", required)}
          placeholder="Modelo"
          onChange={(e) => handleInputChange("model", e.target.value)}
          defaultValue={formData.model}
        />
        <Label>Modelo</Label>
      </FormGroup>

      <FormGroup floating>
        <Input
          {...register("fabricant", required)}
          placeholder="Fabricante"
          onChange={(e) => handleInputChange("fabricant", e.target.value)}
          defaultValue={formData.model}
        />
        <Label>Fabricante</Label>
      </FormGroup>

      <FormGroup switch>
        <Label check>Use os dados da estação</Label>
        <Input
          type="switch"
          checked={switchShow}
          onClick={() => {
            setSwitchShow(!switchShow);
          }}
        />
      </FormGroup>
      {!switchShow && (
        <>
          <FormGroup floating>
            <Input
              {...register("type", required)}
              placeholder="Tipo de tecnlogia"
              onChange={(e) => handleInputChange("type", e.target.value)}
              defaultValue={formData.type}
            />
            <Label>Modelo</Label>
          </FormGroup>

          <FormGroup floating>
            <Input
              {...register("freqRx", required)}
              placeholder="Frequência RX"
              onChange={(e) => handleInputChange("freqRx", e.target.value)}
              defaultValue={formData.freqRx}
            />
            <Label>Frequência RX</Label>
          </FormGroup>

          <FormGroup floating>
            <Input
              {...register("freqRx", required)}
              placeholder="Frequência TX"
              onChange={(e) => handleInputChange("freqTx", e.target.value)}
              defaultValue={formData.freqTx}
            />
            <Label>Frequência TX</Label>
          </FormGroup>

          <FormGroup floating>
            <Input
              {...register("config[0].archives[0].pathUrl", required)}
              placeholder="Arquivo de configuração"
              onChange={(e) =>
                handleInputChange(
                  "config[0].archives[0].pathUrl",
                  e.target.value
                )
              }
            />
            <Label>Arquivo de configuração</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              {...register("config[0].archives[0].name", required)}
              placeholder="Nome da configuração"
              onChange={(e) =>
                handleInputChange("config[0].archives[0].name", e.target.value)
              }
            />
            <Label>Modelo</Label>
          </FormGroup>
        </>
      )}
    </Form>
  );
};

export default FormRegisterEquipament;
