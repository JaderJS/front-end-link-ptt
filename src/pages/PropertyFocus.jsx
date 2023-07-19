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

const PropertyFocus = () => {
  const [data, setData] = useState();
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [formUpdate, setFormUpdate] = useState()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const getPropertie = async (id) => {
    await api.get(`/station/properties?id=${id}`).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    if (data) {
      data?.estation.map((data) => {
        setCoordinates(() => [data.lat, data.long]);
      });
    }
  }, [data]);

  useEffect(() => {
    getPropertie(id);
  }, []);

  const handleDelete = async (_id, data) => {
    await api.delete(`/station/properties/${_id}`, { data }).then((response) => { })
  }

  const handleUpdate = async (_id, data) => {
    if ("group" in data) {
      setFormUpdate(data)
      return
    }
    // await api.put(`/station/properties/${_id}`, { data })
  }

  return (
    <Main>
      {formUpdate?.hasOwnProperty("group") && <FormGroups data={formUpdate} force={true} />}
      {data && (
        <>
          <Row>
            <Col>
              <h2>{data.property}</h2>
              <Map coordinates={coordinates} />
            </Col>
          </Row>
          {console.log(data)}
          {data?.estation?.map((station) => (
            <React.Fragment key={station._id}>
              <Row>
                {console.log(station)}
                <RecursiveTable data={station} excludedColumns={["groups", "equipaments", "config"]}>
                  <Button color="warning"> Editar</Button>
                  <Button color="danger" onClick={() => handleDelete(data._id, { station: station })}> Deletar</Button>
                </RecursiveTable>
              </Row>
              <Row>
                <Col>
                  <p>Equipaments</p>
                  <FormEquipaments data={station} _id={data._id} />
                  {station.equipaments?.map((equipament) => (
                    <div key={equipament._id}>
                      <RecursiveTable data={equipament} excludedColumns={["config", "createdOn", "colorCode", "slot"]}>
                        <Button color="warning"> Editar</Button>
                        <Button color="danger" onClick={() => handleDelete(data._id, { equipament: equipament })}> Deletar</Button>
                      </RecursiveTable>
                    </div>
                  ))}
                </Col>
                <Col>
                  <p>Grupos</p>
                  <FormGroups data={station} _id={data._id} />
                  {station.groups?.map((group) => (
                    <div key={group._id}>
                      <RecursiveTable data={group} excludedColumns={["createdOn"]}>
                        <Button color="warning" onClick={() => handleUpdate(data._id, { group: group })}> Editar</Button>
                        <Button color="danger" onClick={() => handleDelete(data._id, { group: group })}> Deletar</Button>
                      </RecursiveTable>
                    </div>
                  ))}
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

const FormGroups = ({ data, _id, force = false }) => {
  const [show, setShow] = useState(force);
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
