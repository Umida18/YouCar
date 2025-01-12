import { useQuery } from "@tanstack/react-query";
import { ICar } from "@/Type/Type";
import api from "@/Api/Api";
import { Col, Row } from "antd";
import ItemCard from "../CarCard/Card";
import { mapCarDataToItem } from "../../utils/dataMapper";

const CatalogCards = () => {
  const { data: cars } = useQuery<ICar[]>(["cars"], async () => {
    const res = await api.get("/cars");
    console.log("cars:", res);
    return res.data;
  });
  return (
    <Row gutter={[24, 24]} className="py-6">
      {cars?.map((car) => (
        <Col key={car.id} xs={24} md={12} lg={8}>
          <ItemCard item={mapCarDataToItem(car)} />
        </Col>
      ))}
    </Row>
  );
};

export default CatalogCards;
