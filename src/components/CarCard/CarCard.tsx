import { HeartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";

const CarCard = () => {
  return (
    <Card
      className="h-full rounded-2xl  [&_.ant-card-body]:px-4"
      cover={
        <div className="relative h-[240px]">
          <img
            src={car.image}
            alt={car.name}
            // fill
            className="object-cover h-full rounded-2xl bg-red-500"
          />
        </div>
      }
    >
      <div className="flex gap-7">
        <div className="flex-1">
          <div className="flex justify-between flex-col items-start space-y-1 mb-1">
            <h2 className="text-xl font-semibold">
              {car.name} {car.year}
            </h2>
            <span className="text-xl font-bold ">
              {car.price.toLocaleString()} $
            </span>
          </div>
          <div className="flex justify-between text-[#989898]">
            <div className="flex flex-col space-y-1">
              <span>{car.mileage.toLocaleString()} км</span>
              <span>{car.engine}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span>{car.transmission}</span>
              <span>{car.driveType}</span>
            </div>
          </div>
          <div className="pt-2 text-gray-500">{car.origin}</div>
        </div>
        <div className="px-2 flex  items-end">
          <HeartOutlined style={{ color: "#989898", fontSize: "20px" }} />
        </div>
      </div>
    </Card>
  );
};

export default CarCard;
