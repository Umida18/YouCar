import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FilteredAuto, ICar } from "../../Type/Type";
import api from "@/Api/Api";
import { Col, Row } from "antd";
import ItemCard from "../Cards/CarCard";
import { mapCarDataToItem } from "../../utils/dataMapper";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

interface CardProps {
  limit?: number;
  filteredCars?: FilteredAuto | null;
}

const CatalogCards: React.FC<CardProps> = ({ limit, filteredCars }) => {
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
      },
    }
  );
  console.log("filteredCars", filteredCars);

  const carsRender = useMemo(() => {
    if (filteredCars) {
      return [
        ...(filteredCars.cars || []).map((item) => ({
          ...item,
          type: "car",
          uniqueId: `${item.id}-cars`,
        })),
        ...(filteredCars.motorcycles || []).map((item) => ({
          ...item,
          type: "moto",
          uniqueId: `${item.id}-motorcycles`,
        })),
        ...(filteredCars.commerce || []).map((item) => ({
          ...item,
          type: "commerce",
          uniqueId: `${item.id}-commerce`,
        })),
      ];
    }
    return cars || [];
  }, [filteredCars, cars]);

  console.log("activeCars", carsRender);

  const filtered = id
    ? carsRender?.filter((car) => car.id !== Number(id))
    : carsRender;

  const carsLimited = limit ? filtered?.slice(0, limit) : filtered;

  return (
    <Row gutter={[24, 24]} className="py-6">
      {carsLimited?.map((car, index) => (
        <Col
          key={car.id ? `${car.id}-${index}` : `fallback-${index}`}
          xs={24}
          md={12}
          lg={8}
        >
          <ItemCard item={mapCarDataToItem(car)} />
        </Col>
      ))}
    </Row>
  );
};

export default CatalogCards;
