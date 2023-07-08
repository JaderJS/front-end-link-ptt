import React, { useEffect, useState } from "react";
import { Button, Row } from "reactstrap";

import api from "../services/axios";

import Main from "../components/Main";
import ModalForm from "../components/ModalForm";
import FormRegisterEstation from "../components/FormRegisterEstations";
import CardStation from "../components/CardStation";

const Property = () => {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState();

  const getStations = async () => {
    await api.get("/station/properties").then((response) => {
      setData(() => response.data);
    });
  };
  useEffect(() => {
    getStations();
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <Main>
      <Button onClick={() => setShow(true)}>Novo registro</Button>
      <Row>{data ? data.map((item, index) => <CardStation key={index} data={item} />) : <p>Loading...</p>}</Row>
      <ModalForm title={"Cadastro estação"} show={show} setShow={setShow} submit={submit} setSubmit={setSubmit}>
        <FormRegisterEstation submit={submit} setSubmit={setSubmit} />
      </ModalForm>
    </Main>
  );
};

export default Property;
