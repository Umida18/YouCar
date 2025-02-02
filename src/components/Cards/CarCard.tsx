import api from "../../Api/Api";
import { ICar } from "../../Type/Type";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
  item: ICar | undefined;
  type?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, type }) => {
  const navigate = useNavigate();
  const user_id = Number(localStorage.getItem("id"));
  const email = localStorage.getItem("email") || (undefined as any);
  const queryClient = useQueryClient();

  const [liked, setLiked] = useState(false);

  const [itemType, setItemType] = useState<string | undefined>(type);

  useEffect(() => {
    setItemType(type || item?.type || "car");
  }, [item, type]);

  const mutation = useMutation(
    async (data: { id: number; user_id: number; count: number }) => {
      let url = "";
      console.log("dataa", data);
      console.log("dataTypeeee", itemType);

      if (!itemType) {
        throw new Error("Item type is undefined");
      }

      if (itemType === "car") {
        url = `/liked-car/${data.id}?user_id=${data.user_id}&count=${data.count}`;
      } else if (itemType === "moto") {
        url = `/liked-moto/${data.id}?user_id=${data.user_id}&count=${data.count}`;
      } else if (itemType === "commerce") {
        url = `/liked-commerce/${data.id}?user_id=${data.user_id}&count=${data.count}`;
      } else {
        throw new Error("Noto'g'ri type: " + itemType);
      }

      if (itemType === "car") {
        const res = await api.post(url, {});
        console.log("Response:", res);
        return res.data;
      } else {
        const res = await api.get(url);
        console.log("Response:", res);
        return res.data;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fav"]);
      },
    }
  );

  const handleCardClick = () => {
    navigate(
      `/productDetailsPage/${item?.id}?mark=${encodeURIComponent(
        item?.mark || ""
      )}&model=${encodeURIComponent(item?.model || "")}`,
      {
        state: { item },
      }
    );
  };

  const handleLikeClick = async (id: number | any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        notification.error({
          message: "Ошибка",
          description: "Войдите в аккаунт, чтобы добавить в избранное.",
        });
        return;
      }

      const count = liked ? -1 : 1;

      setLiked(!liked);

      console.log("Type:", item?.type);
      console.log("Item:", item);

      mutation.mutate(
        { id, user_id, count },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["fav"]);
          },
          onError: () => {
            setLiked(liked);
          },
        }
      );
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (item?.liked_user.includes(email)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [item?.liked_user]);

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      className="h-full rounded-2xl border-0 shadow-lg [&_.ant-card-body]:px-4 boxShadowC cursor-pointer"
      cover={
        <div className="relative h-[240px]">
          <img
            src={item?.image[0]}
            alt={item?.model}
            className="object-cover h-full w-full rounded-2xl "
          />
        </div>
      }
    >
      <div className="flex gap-7">
        <div className="flex-1">
          <div className="flex justify-between flex-col items-start space-y-1 mb-1">
            <h2 className="text-xl font-semibold">{`${item?.mark}, ${item?.model}`}</h2>
            <span className="text-xl font-bold ">{item?.cost} $</span>
          </div>
          <div className="flex justify-between text-[#989898]">
            <div className="flex flex-col space-y-1">
              <span>{item?.milage} км</span>
              <span>{item?.engine}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span>{item?.checkpoint}</span>
              <span>{item?.drive}</span>
            </div>
          </div>
          <div className="pt-2 text-gray-500">{item?.country}</div>
        </div>
        <div className="px-2 flex  items-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLikeClick(item?.id);
            }}
          >
            {liked ? (
              <HeartFilled style={{ color: "red", fontSize: "20px" }} />
            ) : (
              <HeartOutlined style={{ color: "#989898", fontSize: "20px" }} />
            )}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
