import { Card } from "antd";
import { INews } from "../../Type/Type";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

interface PropsNews {
  item: INews | undefined;
}

const NewsCard: React.FC<PropsNews> = ({ item }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/singleNews/${item?.id}`);
  };

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      className="group shadow-lg rounded-2xl [&_.ant-card-body]:px-4 cursor-pointer"
      cover={
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={item?.image}
            alt={item?.title}
            className="w-full h-[300px] object-cover rounded-2xl "
          />
        </div>
      }
    >
      <div className=" space-y-3 p-0">
        <h2 className="text-xl font-bold line-clamp-2 text-[#293843]">
          {item?.title}
        </h2>
        <p className="text-[#989898] line-clamp-2 max-w-80">{item?.content}</p>
        <button className="text-[#293843] font-medium inline-flex items-center gap-1 underline">
          Подробнее
          <IoIosArrowRoundForward className="mt-1 text-[26px]" />
        </button>
      </div>
    </Card>
  );
};

export default NewsCard;
