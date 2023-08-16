import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "reactstrap";

import api from "../services/axios";

import Main from "../components/Main";
import { ModalForm } from "../components/ModalForm";
import FormRegisterEstation from "../components/FormRegisterEstations";
import CardStation from "../components/CardStation";

import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Property = () => {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState();

  const getStations = async () => {
    await api.get('/api/property').then((response) => {
      setData(() => response.data);
    })
  };
  useEffect(() => {
    getStations();
  }, []);


  return (
    <Main>
      <Row style={{ padding: "1rem" }}>
        <Col>
          <Button className="mx-1"><FontAwesomeIcon icon={faList} /></Button>
          <Button onClick={() => setShow(true)}>Novo registro</Button>
        </Col>
      </Row>
      <Row>{data ? data.map((item, index) => <CardStation key={index} data={item} />) : <Loading />}</Row>
      <ModalForm title={"Cadastro estação"} show={show} setShow={setShow} submit={submit} setSubmit={setSubmit}>
        <FormRegisterEstation submit={submit} setSubmit={setSubmit} />
      </ModalForm>
    </Main>
  );
};

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center", minHeight: "100%" }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Property;
