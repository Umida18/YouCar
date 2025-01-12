import { Card, Row, Col, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";

import { IoIosArrowRoundForward } from "react-icons/io";
import { ICar } from "../../Type/Type";
import api from "../../Api/Api";
import { useNavigate } from "react-router-dom";

const CarCatalog = () => {
  const navigate = useNavigate();

  const { data: cars } = useQuery<ICar[]>(["cars"], async () => {
    const res = await api.get("/cars");
    console.log("cars:", res);
    return res.data;
  });

  return (
    <div className="py-6 min-h-screen">
      <h1 className="text-3xl font-bold mt-10 mb-12">Автомобильный каталог</h1>
      <Row gutter={[24, 24]}>
        {cars?.slice(0, 6).map((car) => (
          <Col key={car.id} xs={24} md={12} lg={8}>
            <Card
              className="h-full rounded-2xl border-0 shadow-lg [&_.ant-card-body]:px-4"
              cover={
                <div className="relative h-[240px]">
                  <img
                    src={car.image[0]}
                    alt={car.model}
                    // fill
                    className="object-cover h-full w-full rounded-2xl "
                  />
                </div>
              }
            >
              <div className="flex gap-7">
                <div className="flex-1">
                  <div className="flex justify-between flex-col items-start space-y-1 mb-1">
                    <h2 className="text-xl font-semibold">
                      {`${car.mark} ${car.model}, ${car.year}`}
                    </h2>
                    <span className="text-xl font-bold ">
                      {car.cost.toLocaleString()} $
                    </span>
                  </div>
                  <div className="flex justify-between text-[#989898]">
                    <div className="flex flex-col space-y-1">
                      <span>{car.milage.toLocaleString()} км</span>
                      <span>{car.engine}</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span>{car.checkpoint}</span>
                      <span>{car.drive}</span>
                    </div>
                  </div>
                  <div className="pt-2 text-gray-500">{car.country}</div>
                </div>
                <div className="px-2 flex  items-end">
                  <HeartOutlined
                    style={{ color: "#989898", fontSize: "20px" }}
                  />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => navigate("/")}
          className=" border-0 underline shadow-none pr-0 relative left-3"
        >
          Перейти в каталог
          <IoIosArrowRoundForward
            className=" relative right-2 top-[1px]"
            style={{ fontSize: "32px" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default CarCatalog;
