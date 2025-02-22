import { ICar, IUserData } from "../../Type/Type";
import React, { useEffect, useState } from "react";
import { Avatar, Divider, notification } from "antd";
import { MdOutlineSms } from "react-icons/md";
import { formatDate } from "../../utils/formatDate";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "@/Api/Api";

interface PropsCar {
  item: ICar;
  userData: IUserData | null;
}

const ProductDetails: React.FC<PropsCar> = ({ item, userData }) => {
  const queryClient = useQueryClient();
  const [param] = useSearchParams();
  const itemType = param.get("type");
  const [liked, setLiked] = useState(false);
  const user_id = Number(localStorage.getItem("id"));
  const email = localStorage.getItem("email") || (undefined as any);
  const navigate = useNavigate();

  const mutation = useMutation(
    async (data: { id: number; user_id: number; count: number }) => {
      let url = "";

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
        return res.data;
      } else {
        const res = await api.get(url);
        return res.data;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fav"]);
      },
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

  const rateType = item.rate === "cash" ? "В наличии" : "Под заказ";

  useEffect(() => {
    if (item?.liked_user.includes(email)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [item?.liked_user]);

  const handleMessage = () => {
    navigate(`/account/messagingPage/${userData?.id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="boxShadowC rounded-xl">
        <div className="xl:px-7 px-2 py-5">
          <p className="text-[25px] font-bold">{`${item?.mark_id}, ${item?.model}`}</p>
          <div className="flex xl:justify-between items-center flex-wrap gap-5">
            <div className="flex gap-4 justify-center items-center text-[#989898] text-[16px] mt-3">
              <p>{formatDate(item?.createdAt)}</p>
              <p className="flex justify-center items-center gap-2">
                <MdOutlineRemoveRedEye className="text-[18px] mt-[2px] " />{" "}
                {item?.seen}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeClick(item?.id);
                }}
              >
                {liked ? (
                  <HeartFilled style={{ color: "red", fontSize: "20px" }} />
                ) : (
                  <HeartOutlined
                    style={{ color: "#989898", fontSize: "20px" }}
                  />
                )}
              </button>
            </div>
            <div className="flex justify-center items-center gap-2 text-[16px] mt-2">
              <span className="flex justify-center items-center h-[25px] w-[25px] rounded-full !bg-[#DDFADC]">
                <FaCheck className="text-[#07C553]" />
              </span>
              <p>{rateType}</p>
            </div>
          </div>
          <Divider />
          <div className=" text-[15px] flex flex-col gap-3 justify-between xl:w-[50%]">
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
        <div className="bg-[#2684E5] w-full h-[70px] text-white text-[16px] font-semibold xl:px-7 px-2 py-5 ">
          <div className="flex justify-between xl:w-[50%]">
            <p>ЦЕНА:</p>
            <p className="text-[20px] font-semibold">{item?.cost}$</p>
          </div>
        </div>

        <div className="text-[16px] xl:px-7 px-2 py-5">
          <div className="flex items-center border-2 border-[#F0F0F0] xl:px-5 px-2 py-4 rounded-xl justify-between ">
            <div className="flex items-center gap-2">
              <Avatar className="text-[18px] h-[40px] w-[40px]">
                {userData?.name.charAt(0)}
              </Avatar>
              <div>
                <p>{userData?.name}</p>
              </div>
            </div>
            <button
              onClick={handleMessage}
              style={{ boxShadow: "none" }}
              className="flex items-center justify-between gap-2 border-2 border-l-gray-200 border-t-0 border-b-0 border-r-0 h-[60px] xl:px-4 px-2"
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
