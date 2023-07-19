import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardSubtitle,
  CardText,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import formatDate from "../services/functionsDate";

import Map from "./Map";

const CardStation = ({ data }) => {
  const [cordinates, setCordinates] = useState([0, 0]);

  useEffect(() => {
    data.estation.map((data) => {
      const lat = parseFloat(data.lat);
      const long = parseFloat(data.long);
      setCordinates(() => [lat, long]);
    });
    console.log(data._id);
  }, [data]);

  return (
    <Col>
      {data && (
        <Card style={{ width: "24rem" }}>
          <CardBody>
            <Map coordinates={cordinates} />
            <CardTitle tag="h5">{data.property}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {data.gerency}
            </CardSubtitle>
            <CardText>{data.description}</CardText>
            <NavLink
              to={{ pathname: "/station/propertie", search: `?id=${data._id}` }}
            >
              <Button>continue..</Button>
            </NavLink>
          </CardBody>
          <CardFooter>
            {formatDate(data.createdOn)} {data._id}
          </CardFooter>
        </Card>
      )}
    </Col>
  );
};

export default CardStation;
