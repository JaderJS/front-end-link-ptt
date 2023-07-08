import React from "react";
import { Table, Button } from "reactstrap";
import api from "../services/axios";

const TableGroups = ({ data, children }) => {
  const handlerDelete = async () => {
    await api.delete(`/station/properties/${data._id}`).then((response) => {
      console.log(response);
    });
  };
  const handlerUpdate = async () => {
    await api.delete(`/station/properties/${data._id}`).then((response) => {
      console.log(response);
    });
  };

  console.log(data);
  return (
    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>titulo</th>
          <th>nome</th>
          <th>sinalização</th>
          <th>sinal</th>
          <th>edit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.id}</td>
          <td>{data.title}</td>
          <td>{data.name}</td>
          <td>{data.sinalization}</td>
          <td>{data.signal}</td>
          <td>
            <Button color="warning" onClick={handlerUpdate}>
              Editar
            </Button>
            <Button color="danger" onClick={handlerDelete}>
              Excluir
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TableGroups;
