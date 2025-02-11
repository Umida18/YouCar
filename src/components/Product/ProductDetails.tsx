import { ICar, IUserData } from "../../Type/Type";
import React from "react";
import { Avatar, Divider } from "antd";
import { MdOutlineSms } from "react-icons/md";
import { formatDate } from "../../utils/formatDate";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

interface PropsCar {
  item: ICar;
  userData: IUserData | null;
}

const ProductDetails: React.FC<PropsCar> = ({ item, userData }) => {
  const rateType = item.rate === "cash" ? "В наличии" : "Под заказ";
  return (
    <div className="flex flex-col">
      <div className="boxShadowC rounded-xl">
        <div className="px-7 py-5">
          <p className="text-[25px] font-bold">{`${item?.mark_id}, ${item?.model}`}</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 justify-center items-center text-[#989898] text-[16px] mt-3">
              <p>{formatDate(item?.createdAt)}</p>
              <p className="flex justify-center items-center gap-2">
                <MdOutlineRemoveRedEye className="text-[18px] mt-[2px] " />{" "}
                {item?.seen}
              </p>
            </div>
            <div className="flex justify-center items-center gap-2 text-[16px]">
              <span className="flex justify-center items-center h-[25px] w-[25px] rounded-full !bg-[#DDFADC]">
                <FaCheck className="text-[#07C553]" />
              </span>
              <p>{rateType}</p>
            </div>
          </div>
          <Divider />
          <div className=" text-[15px] flex flex-col gap-3 w-[50%]">
            <div className="flex justify-between">
              <p className="text-[#989898]">Марка:</p>
              <p className="font-semibold">{item?.mark_id}</p>
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

        <div className="text-[16px] px-7 py-5">
          <div className="flex items-center border-2 border-[#F0F0F0] px-5 py-2 rounded-xl ">
            <div className="flex items-center gap-2">
              <Avatar className="text-[16px] h-[30px] w-[30px]">
                {userData?.name.charAt(0)}
              </Avatar>
              <div>
                <p>{userData?.name}</p>
              </div>
            </div>
            <Divider type="vertical" style={{ height: 60 }} />
            <button
              style={{ border: 0, boxShadow: "none" }}
              className="flex items-center justify-between gap-2"
            >
              <MdOutlineSms className="text-[#2684E5] text-xl mt-1 ml-2" />
              <p className="text-[16px]">Написать</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
