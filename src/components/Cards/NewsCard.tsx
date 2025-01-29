import { Card } from "antd";
import { INews } from "../../Type/Type";
import React from "react";
import { useNavigate } from "react-router-dom";

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
        <h2 className="text-xl font-semibold line-clamp-2">{item?.title}</h2>
        <p className="text-gray-600 line-clamp-2 max-w-96">{item?.content}</p>
        <button className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2">
          Подробнее
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </Card>
  );
};

export default NewsCard;
