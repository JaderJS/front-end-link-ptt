import api from "../services/axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";

const FormRegisterGroup = ({ def, _id, submit, setSubmit, setResponse }) => {
  const [data, setData] = useState();
  const [saveResult, setSaveResult] = useState();
  const { register, handleSubmit, setValue, watch, errors } = useForm();
  // react select e controller

  const onSubmit = async (data) => {
    setData(() => data);
    // await api
    //   .post("/groups", data)
    //   .then((response) => {
    //     setResponse(response);
    //     setSaveResult(response.data.saveResult);
    //   })
    //   .catch((error) => {
    //     setResponse(error.response);
    //   });
    console.log(_id);
    await api
      .put(`/station/properties/${_id}`, { group: data })
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        setResponse(error.response);
      });
    // await api
    //   .put(`/station/proprierties/${_id}`, { _id: saveResult._id })
    //   .then((response) => {})
    //   .catch((error) => console.log(error));
    setSubmit(false);
  };

  const handleInputChange = (name, value) => {
    setValue(name, value);
  };

  const formData = {
    serial: "Fazenda Mariah",
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
          {...register("id", required)}
          placeholder="ID"
          onChange={(e) => handleInputChange("id", e.target.value)}
          defaultValue={formData.serial}
        />
        <Label>ID</Label>
      </FormGroup>
      <FormGroup floating>
        <Input
          {...register("title", required)}
          placeholder="Titulo"
          onChange={(e) => handleInputChange("title", e.target.value)}
          defaultValue={formData.model}
        />
        <Label>Titulo</Label>
      </FormGroup>

      <FormGroup floating>
        <Input
          {...register("name", required)}
          placeholder="Nome"
          onChange={(e) => handleInputChange("name", e.target.value)}
          defaultValue={formData.model}
        />
        <Label>Nome</Label>
      </FormGroup>

      <FormGroup floating>
        <Input
          {...register("sinalization", required)}
          placeholder="Sinalização"
          onChange={(e) => handleInputChange("sinalization", e.target.value)}
          defaultValue={formData.type}
        />
        <Label>Sinalização</Label>
      </FormGroup>

      <FormGroup floating>
        <Input
          {...register("signal", required)}
          placeholder="Sinal"
          onChange={(e) => handleInputChange("signal", e.target.value)}
          defaultValue={formData.freqRx}
        />
        <Label>Sinal</Label>
      </FormGroup>
    </Form>
  );
};

export default FormRegisterGroup;
