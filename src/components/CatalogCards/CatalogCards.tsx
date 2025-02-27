import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FilteredAuto, ICar } from "../../Type/Type";
import api from "@/Api/Api";
import { Col, Row } from "antd";
import ItemCard from "../Cards/CarCard";
import { mapCarDataToItem } from "../../utils/dataMapper";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import PaginationComponent from "../Pagination/Pagination";

interface CardProps {
  limit?: number;
  filteredCars?: FilteredAuto | null;
  currentPage?: number;
  setCurrentPage?: (num: number) => void;
}

const CatalogCards: React.FC<CardProps> = ({
  limit,
  filteredCars,
  currentPage,
  setCurrentPage,
}) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: cars } = useQuery<ICar[]>(
    ["cars"],
    async () => {
      const res = await api.get("/cars");
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

  const filtered = id
    ? carsRender?.filter((car) => car.id !== Number(id))
    : carsRender;

  const carsLimited = limit ? filtered?.slice(0, limit) : filtered;

  const buttonAll = Math.ceil(
    filteredCars ? filteredCars.count / 10 : carsRender.length / 10
  );
  const buttonsPage = Array.from(
    { length: buttonAll },
    (_, index) => index + 1
  );

  return (
    <div>
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
      {!limit && (
        <div className="">
          <PaginationComponent
            buttonsPage={buttonsPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default CatalogCards;
