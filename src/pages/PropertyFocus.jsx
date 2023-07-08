import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Main from "../components/Main";
import api from "../services/axios";
import Map from "../components/Map";
import { Row, Col, Button } from "reactstrap";
import RecursiveTable from "../components/RecursiveTable";
import ModalForm from "../components/ModalForm";
import FormRegisterEquipament from "../components/FormRegisterEquipament";
import FormRegisterGroups from "../components/FormRegisterGroup";
import TableGroups from "../components/TableGroups";

const PropertyFocus = () => {
  const [data, setData] = useState();
  const [coordinates, setCoordinates] = useState([0, 0]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const getPropertie = async (id) => {
    await api.get(`/station/properties?id=${id}`).then((response) => {
      setData(() => response.data);
    });
  };

  const handleClearGroup = async () => {
    await api.put(`/station/properties/${id}`, { group: null });
  };

  useEffect(() => {
    if (data) {
      data?.estation.map((data) => {
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
            </Col>
          </Row>

          {data?.estation?.map((e, index) => (
            <React.Fragment key={index}>
              <Row>
                <RecursiveTable data={e} excludedColumns={["groups", "equipaments", "config"]}>
                  <Button color="warning"> Editar</Button>
                  <Button color="danger"> Deletar</Button>
                </RecursiveTable>
              </Row>
              <Row>
                <Col>
                  <p>Equipaments</p>
                  <FormEquipaments data={e} _id={data._id} />
                  {e.equipaments?.map((e) => (
                    <>
                      {console.log(e)}
                      <RecursiveTable data={e} excludedColumns={["config", "createdOn", "colorCode", "slot"]}>
                        <Button color="warning"> Editar</Button>
                        <Button color="danger"> Deletar</Button>
                      </RecursiveTable>
                    </>
                  ))}
                </Col>
                <Col>
                  <p>Grupos</p>
                  <Button color="danger" onClick={handleClearGroup}>
                    Deletar tudo
                  </Button>
                  {e.groups?.map((e) => (
                    <RecursiveTable data={e} excludedColumns={["createdOn"]}>
                      <Button color="warning"> Editar</Button>
                      <Button color="danger"> Deletar</Button>
                    </RecursiveTable>
                  ))}
                  <FormGroups data={e} _id={data._id} />
                </Col>
              </Row>
            </React.Fragment>
          ))}
          <Row>
            <Button>Adicionar estação</Button>
          </Row>
        </>
      )}
    </Main>
  );
};

const FormEquipaments = ({ data, _id }) => {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Adicionar equipametos</Button>
      <ModalForm title={"Cadastro equipamento"} show={show} setShow={setShow} submit={submit} setSubmit={setSubmit}>
        <FormRegisterEquipament def={data} _id={_id} submit={submit} setSubmit={setSubmit} />
      </ModalForm>
    </>
  );
};

const FormGroups = ({ data, _id }) => {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Adicionar grupos</Button>
      <ModalForm title={"Cadastro grupo"} show={show} setShow={setShow} submit={submit} setSubmit={setSubmit}>
        <FormRegisterGroups def={data} _id={_id} submit={submit} setSubmit={setSubmit} />
      </ModalForm>
    </>
  );
};

export default PropertyFocus;
