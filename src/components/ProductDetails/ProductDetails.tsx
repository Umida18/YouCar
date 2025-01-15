import { Divider } from "antd";
import { ICar } from "../../Type/Type";
import React from "react";

interface PropsCar {
  car: ICar | undefined;
}

const ProductDetails: React.FC<PropsCar> = ({ car }) => {
  return (
    <div className="boxShadowC">
      <div className="p-5">
        <p>{`${car?.mark}, ${car?.model}`}</p>
        <div className="flex justify-between items-center">
          <div>
            <p>{car?.createdAt}</p>
            <p>{car?.seen}</p>
            {/* <span>{car.}</span> */}
          </div>
          <div>
            <span></span>
            <p></p>
          </div>
        </div>
        <Divider />
        <div className=" text-[15px]">
          <div className="flex justify-between">
            <p className="text-[#989898]">Марка:</p>
            <p className="font-semibold">{car?.mark}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#989898]">Модель:</p>
            <p className="font-semibold">{car?.model}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#989898]">Год выпуска:</p>
            <p className="font-semibold">{car?.year}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#989898]">Пробег:</p>
            <p className="font-semibold">{car?.milage} км</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#989898]">Цвет:</p>
            <p className="font-semibold">{car?.color}</p>
          </div>{" "}
          <div className="flex  justify-between">
            <p className="text-[#989898]">Двигатель:</p>
            <p className="font-semibold">{car?.engine}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#989898]">Страна:</p>
            <p className="font-semibold">{car?.country}</p>
          </div>
        </div>
      </div>
      <div className="bg-[#2684E5] w-full h-[70px] text-white p-5">
        <div className="flex justify-between">
          <p>ЦЕНА:</p>
          <p>{car?.cost}$</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
