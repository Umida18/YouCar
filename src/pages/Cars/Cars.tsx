import { Col, Row } from "antd";
import api from "../../Api/Api";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "@/components/Cards/CarCard";
import { mapCarDataToItem } from "@/utils/dataMapper";
import { ICar } from "@/Type/Type";

const CarsPage = () => {
  const { data: car } = useQuery<ICar[]>([
    "car",
    async () => {
      const res = await api.get("/cars");
      return res.data;
    },
  ]);

  return (
    <div>
      <Row gutter={[24, 24]} className="py-6">
        {car?.map((car, index) => (
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
    </div>
  );
};

export default CarsPage;
