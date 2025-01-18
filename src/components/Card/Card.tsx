import { ICar } from "../../Type/Type";
import { HeartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
  item: ICar;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<ICar>();

  const handleCardClick = () => {
    navigate(`/productDetailsPage/${item.id}`);
    setSelectedProduct(item);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="h-full rounded-2xl border-0 shadow-lg [&_.ant-card-body]:px-4"
      cover={
        <div className="relative h-[240px]">
          <img
            src={item.image[0]}
            alt={item.model}
            className="object-cover h-full w-full rounded-2xl "
          />
        </div>
      }
    >
      <div className="flex gap-7">
        <div className="flex-1">
          <div className="flex justify-between flex-col items-start space-y-1 mb-1">
            <h2 className="text-xl font-semibold">{`${item.mark}, ${item.model}`}</h2>
            <span className="text-xl font-bold ">{item.cost} $</span>
          </div>
          <div className="flex justify-between text-[#989898]">
            <div className="flex flex-col space-y-1">
              <span>{item.milage} км</span>
              <span>{item.engine}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span>{item.checkpoint}</span>
              <span>{item.drive}</span>
            </div>
          </div>
          <div className="pt-2 text-gray-500">{item.country}</div>
        </div>
        <div className="px-2 flex  items-end">
          <HeartOutlined style={{ color: "#989898", fontSize: "20px" }} />
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
