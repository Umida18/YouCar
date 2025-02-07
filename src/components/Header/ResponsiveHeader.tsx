import { LuBell } from "react-icons/lu";
import HeaderInfo from "./HeaderInfo";
import { Avatar, Button } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../Type/Type";
import api from "../../Api/Api";
import { IoIosArrowForward } from "react-icons/io";

const ResponsiveHeader = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const { data: user } = useQuery<IUser>(
    ["user"],
    async () => {
      try {
        const res = await api.get("/user-dashboard");
        setIsRegistered(true);

        return res.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem("id");
          localStorage.removeItem("token");

          setIsRegistered(false);
        }
        throw error;
      }
    },
    {
      onError: (error: any) => {
        if (error.response?.status === 401) {
          setIsRegistered(false);
        }
      },
    }
  );

  useEffect(() => {
    if (user) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  }, [user]);

  const handleToAccount = () => {
    setIsOpen(false);
    navigate("/account/favorites");
  };

  return (
    <div className="">
      {isOpen && (
        <div className="xl:!px-14 px-4 py-5 !min-h-[100%] xl:hidden">
          <button
            onClick={handleToAccount}
            className="flex justify-between items-center px-4 py-1 w-full my-3 bg-[#F6F6F6] border-0"
          >
            <span className="flex gap-2 items-center">
              <Avatar>{user?.userData.name?.charAt(0)}</Avatar>
              {user?.userData.name}
            </span>
            <span>
              <IoIosArrowForward className="text-[#2684E5] mt-1 text-[18px]" />
            </span>
          </button>
          <div className="flex justify-between">
            <div className="flex flex-wrap  flex-col gap-4 text-sm sm:text-base flex-1">
              <a href="/" className="hover:underline">
                Главная
              </a>
              <a href="/catalog" className="hover:underline">
                Каталог
              </a>
              {/* <a href="/#about" className="hover:underline">
                О нас
              </a> */}
              <a href="/news" className="hover:underline">
                Новости
              </a>
              <a href="/contact" className="hover:underline">
                Контакты
              </a>
            </div>
            <div className="flex justify-center items-start gap-5">
              <LuBell style={{ fontSize: "22px" }} />
              {/* <select className="bg-transparent text-sm sm:text-base outline-none cursor-pointer">
                <option>RU</option>
                <option>EN</option>
              </select> */}
            </div>
          </div>
          <div>
            <button
              onClick={() => navigate("/cars")}
              className="flex justify-between items-center px-4 py-1 w-full my-3 bg-[#F6F6F6] border-0"
            >
              <span className="flex gap-2 items-center">Автомобили</span>
              <span>
                <IoIosArrowForward className="text-[#2684E5] mt-1" />
              </span>
            </button>
            <button
              onClick={() => navigate("/commerceCars")}
              className="flex justify-between items-center px-4 py-1 w-full my-3 bg-[#F6F6F6] border-0"
            >
              <span className="flex gap-2 items-center">
                Коммерческий транспорт
              </span>
              <span>
                <IoIosArrowForward className="text-[#2684E5] mt-1" />
              </span>
            </button>
            <button
              onClick={() => navigate("/motobykes")}
              className="flex justify-between items-center px-4 py-1 w-full my-3 bg-[#F6F6F6] border-0"
            >
              <span className="flex gap-2 items-center">Мотоциклы</span>
              <span>
                <IoIosArrowForward className="text-[#2684E5] mt-1" />
              </span>
            </button>
          </div>
          <HeaderInfo />
          <div className="flex flex-col w-full gap-2">
            {!isRegistered && (
              <>
                <Button
                  onClick={() => navigate("login")}
                  style={{
                    border: 0,
                    backgroundColor: "#EEEEEE",
                    boxShadow: "none",
                    fontSize: "16px",
                    height: "56px",
                    borderRadius: 0,
                  }}
                >
                  Войти
                </Button>

                <Button
                  onClick={() => navigate("/register")}
                  style={{
                    border: 0,
                    backgroundColor: "#2684E5",
                    borderRadius: 0,
                    color: "white",
                    height: "56px",
                    fontSize: "16px",
                  }}
                >
                  Регистрация
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveHeader;
