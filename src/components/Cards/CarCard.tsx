import api from "../../Api/Api";
import { ICar } from "../../Type/Type";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Carousel, ConfigProvider, notification } from "antd";
import React, { useEffect, useState } from "react";
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
  const [_, setCurrentSlide] = useState(0);
  const carouselRef = React.useRef<any>();
  const [itemType, setItemType] = useState<string | undefined>(type);

  useEffect(() => {
    setItemType(item?.type || type);
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
        item?.mark_id || ""
      )}&model=${encodeURIComponent(item?.model || "")}&type=${itemType}`
    );
  };
  console.log("usefinedTekshirish", item);

  const { data: markId } = useQuery(
    ["markId", item?.mark_id],
    async () => {
      if (typeof item?.mark_id === "number") {
        const res = await api.get(`/marks/${item?.mark_id}`);
        return res.data;
      }
      return null;
    },
    {
      enabled: typeof item?.mark_id === "number",
    }
  );

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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2684E5",
        },
      }}
    >
      <Card
        hoverable
        className="h-full rounded-2xl border-0 shadow-lg [&_.ant-card-body]:p-0 boxShadowC cursor-pointer"
      >
        <Carousel
          className="[&_.slick-dots]:!bottom-0 [&_.slick-dots]:!w-full [&_.slick-dots-bottom]:!w-full
           [&_.slick-dots]:!mb-0 [&_.slick-dots]:absolute [&_.slick-dots]:flex 
           [&_.slick-dots]:justify-between [&_.slick-dots]:px-4
           [&_.slick-dots_li]:!flex-1 [&_.slick-dots_li]:!m-0
           [&_.slick-dots_li_button]:!h-1 [&_.slick-dots_li_button]:!w-full
           [&_.slick-dots_li_button]:!rounded-md [&_.slick-dots_li_button]:!bg-gray-300
           [&_.slick-dots_li.slick-active_button]:!bg-blue-500"
          ref={carouselRef}
          {...carouselSettings}
          beforeChange={(_, to) => setCurrentSlide(to)}
        >
          {item?.image.map((i) => (
            <div
              className="relative h-[240px] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={i}
                alt={item?.model}
                className="object-cover h-full w-full rounded-2xl "
              />
            </div>
          ))}
        </Carousel>
        <div className="flex gap-7 p-4" onClick={handleCardClick}>
          <div className="flex-1">
            {/* <h1>{item?.id}</h1>
          <h1>{item?.type}</h1> */}
            <div className="flex justify-between flex-col items-start space-y-1 mb-1">
              <h2 className="text-xl font-semibold text-[#293843]">{`${markId}, ${item?.model}`}</h2>
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
    </ConfigProvider>
  );
};

export default ItemCard;
