import React from "react";
import CardC from "../card";
import { useQuery } from "@tanstack/react-query";
import { ICar } from "@/Type/Type";
import api from "@/Api/Api";
import { Col, Row } from "antd";

const CatalogCards = () => {
  const { data: cars } = useQuery<ICar[]>(["cars"], async () => {
    const res = await api.get("/cars");
    console.log("cars:", res);
    return res.data;
  });
  return (
    <Row>
      <CardC cars={cars} />;
    </Row>
  );
};

export default CatalogCards;
