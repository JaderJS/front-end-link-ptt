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
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Map from "./Map";
import { timeFromNow } from "../commons/functionTime";

const CardStation = ({ data }) => {
  const [cordinates, setCordinates] = useState([-12, -58]);

  useEffect(() => {
    const cord = data.station.map((item) => [+item.latitude, +item.longitude])
    console.log(cord)
    // setCordinates(() => (...cord))
  }, [data]);

  return (
    <Col>
      {data && (
        <Card style={{ width: "24rem" }}>
          <CardBody>
            <Map coordinates={cordinates} />
            <CardTitle tag="h5">{data.title}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {data.gerency}
            </CardSubtitle>
            <CardText>{data.description}</CardText>
            <NavLink
              to={{ pathname: "/station/propertie", search: `?id=${data.id}` }}
            >
              <Button><FontAwesomeIcon icon={faSearch} /></Button>
            </NavLink>
          </CardBody>
          <CardFooter>
            {timeFromNow(data.createdAt)}
          </CardFooter>
        </Card>
      )}
    </Col>
  );
};

export default CardStation;
