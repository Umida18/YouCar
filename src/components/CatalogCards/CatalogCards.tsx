import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ICar } from "@/Type/Type";
import api from "@/Api/Api";
import { Col, Row } from "antd";
import ItemCard from "../Cards/CarCard";
import { mapCarDataToItem } from "../../utils/dataMapper";
import { useParams } from "react-router-dom";

interface CardProps {
  limit?: number;
}

const CatalogCards: React.FC<CardProps> = ({ limit }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: cars } = useQuery<ICar[]>(
    ["cars"],
    async () => {
      const res = await api.get("/cars");
      console.log("cars:", res);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fav"]);
        queryClient.invalidateQueries(["cars"]);
      },
    }
  );

  const filteredCars = id ? cars?.filter((car) => car.id !== Number(id)) : cars;

  const carsLimited = limit ? filteredCars?.slice(0, limit) : filteredCars;

  return (
    <Row gutter={[24, 24]} className="py-6">
      {carsLimited?.map((car) => (
        <Col key={car.id} xs={24} md={12} lg={8}>
          <ItemCard item={mapCarDataToItem(car)} />
        </Col>
      ))}
    </Row>
  );
};

export default CatalogCards;
