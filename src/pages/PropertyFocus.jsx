import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Main from "../components/Main";
import api from "../services/axios";
import Map from "../components/Map";
import ModalError from "../components/ModalError";
import { Row, Col, Button } from "reactstrap";
import RecursiveTable from "../components/RecursiveTable";
import ModalForm from "../components/ModalForm";
import FormRegisterEquipament from "../components/FormRegisterEquipament";
import FormRegisterGroups from "../components/FormRegisterGroup";

const PropertyFocus = () => {
  const [data, setData] = useState();
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [error, setError] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const getPropertie = async (id) => {
    await api
      .get(`/station/properties?id=${id}`)
      .then((response) => {
        setData(() => response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setTimeout(() => setError(null), 2000);
      });
  };

  useEffect(() => {
    if (data) {
      data.estation.map((data) => {
        setCoordinates(() => [data.lat, data.long]);
      });
    }
    console.log(data);
  }, [data]);

  useEffect(() => {
    getPropertie(id);
  }, []);

  return (
    <Main>
      {data && (
        <>
          <Row>
            <Col>
              <h2>{data.property}</h2>
              <Map coordinates={coordinates} />
              <ModalError error={error} />
            </Col>
          </Row>

          {data.estation.map((e) => (
            <>
              <Row>
                <RecursiveTable
                  data={e}
                  excludedColumns={["groups", "equipaments"]}
                />
              </Row>
              <Row>
                <Col>
                  <p>Equipaments</p>
                  <FormEquipaments data={e} />
                </Col>
                <Col>
                  <p>Grupos</p>
                  <FormGroups data={e} _id={data._id} />
                </Col>
              </Row>
            </>
          ))}
          <Row>
            <Button>Adicionar estação</Button>
          </Row>
        </>
      )}
    </Main>
  );
};

const FormEquipaments = ({ data }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState();

  const [submit, setSubmit] = useState(false);
  const [response, setResponse] = useState("");

  return (
    <>
      <Button onClick={() => setShow(true)}>Adicionar equipametos</Button>
      <ModalForm
        title={"Cadastro equipamento"}
        show={show}
        setShow={setShow}
        submit={submit}
        setSubmit={setSubmit}
        response={response}
        setResponse={setResponse}
      >
        <FormRegisterEquipament
          def={data}
          setResponse={setResponse}
          submit={submit}
          setSubmit={setSubmit}
        />
      </ModalForm>
    </>
  );
};

const FormGroups = ({ data, _id }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState();

  const [submit, setSubmit] = useState(false);
  const [response, setResponse] = useState("");

  return (
    <>
      <Button onClick={() => setShow(true)}>Adicionar grupos</Button>
      <ModalForm
        title={"Cadastro grupo"}
        show={show}
        setShow={setShow}
        submit={submit}
        setSubmit={setSubmit}
        response={response}
        setResponse={setResponse}
      >
        <FormRegisterGroups
          def={data}
          _id={_id}
          setResponse={setResponse}
          submit={submit}
          setSubmit={setSubmit}
        />
      </ModalForm>
    </>
  );
};

export default PropertyFocus;
