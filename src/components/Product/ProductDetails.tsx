import { ICar } from "../../Type/Type";
import React from "react";
import { Avatar, Button, Divider } from "antd";
import { MdOutlineSms } from "react-icons/md";

interface PropsCar {
  item: ICar;
}

const ProductDetails: React.FC<PropsCar> = ({ item }) => {
  const name = localStorage.getItem("name");

  return (
    <div className="flex flex-col">
      <div className="boxShadowC rounded-xl">
        <div className="px-7 py-5">
          <p className="text-[25px] font-bold">{`${item?.mark}, ${item?.model}`}</p>
          <div className="flex justify-between items-center">
            <div>
              <p>{item?.createdAt}</p>
              <p>{item?.seen}</p>
            </div>
            <div>
              <span></span>
              <p></p>
            </div>
          </div>
          <Divider />
          <div className=" text-[15px] flex flex-col gap-3 w-[50%]">
            <div className="flex justify-between">
              <p className="text-[#989898]">Марка:</p>
              <p className="font-semibold">{item?.mark}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#989898]">Модель:</p>
              <p className="font-semibold">{item?.model}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#989898]">Год выпуска:</p>
              <p className="font-semibold">{item?.year}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#989898]">Пробег:</p>
              <p className="font-semibold">{item?.milage} км</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#989898]">Цвет:</p>
              <p className="font-semibold">{item?.color}</p>
            </div>{" "}
            <div className="flex  justify-between">
              <p className="text-[#989898]">Двигатель:</p>
              <p className="font-semibold">{item?.engine}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#989898]">Страна:</p>
              <p className="font-semibold">{item?.country}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#2684E5] w-full h-[70px] text-white text-[16px] font-semibold px-7 py-5 ">
          <div className="flex justify-between w-[50%]">
            <p>ЦЕНА:</p>
            <p>{item?.cost}$</p>
          </div>
        </div>

        <div className="text-[18px] px-7 py-5">
          <div className="flex items-center border-2 border-[#F0F0F0] px-5 py-2 rounded-xl gap-12">
            <div className="flex items-center gap-3">
              <Avatar className="text-[24px] h-[55px] w-[55px]">
                {name?.charAt(0)}
              </Avatar>
              <div>{name}</div>
            </div>
            <Divider type="vertical" style={{ height: 60 }} />
            <Button
              style={{ border: 0, boxShadow: "none" }}
              className="flex items-center gap-3"
            >
              <MdOutlineSms className="text-[#2684E5] text-2xl mt-2" />
              <p className="text-[18px]">Написать</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
