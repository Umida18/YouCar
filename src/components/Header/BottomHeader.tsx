import { Button, Avatar } from "antd";
import { CiSearch } from "react-icons/ci";
import { LuBell } from "react-icons/lu";
import "./Header.scss";
import { useEffect, useState } from "react";
import { FiAlignRight } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import ResponsiveHeader from "./ResponsiveHeader";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../Api/Api";
import { IUser } from "../../Type/Type";
import { IoIosArrowForward } from "react-icons/io";

const BottomHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  return (
    <div className="h-full">
      <div className="shadow-md">
        <div className="xl:!min-h-[79px] xl:flex items-center justify-between  px-14  hidden container mx-auto ">
          <a
            href="/"
            className="flex justify-center items-center font-bold text-[30px]"
          >
            <span className="text-[#2684E5]">You</span>
            <span className="text-[#0b0f32]">Car</span>
          </a>

          <div className="flex items-center justify-between gap-7">
            <a href="/cars" className="flex justify-center gap-2 items-center ">
              <span className="text-[16px]">Автомобили</span>
              <span>
                <IoIosArrowForward className="text-[#2684E5] mt-1" />
              </span>
            </a>
            <a href="/cars" className="flex justify-center gap-2 items-center ">
              <span className="text-[16px]">Коммерческий транспорт</span>
              <span>
                <IoIosArrowForward className="text-[#2684E5] mt-1" />
              </span>
            </a>
            <a href="/cars" className="flex justify-center gap-2 items-center ">
              <span className="text-[16px]">Мотоциклы</span>
              <span>
                <IoIosArrowForward className="text-[#2684E5] mt-1" />
              </span>
            </a>
          </div>
          <div className="relative bg-[#F6F6F6]">
            <CiSearch
              style={{ color: "#989898", fontSize: "22px" }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              style={{ border: 0, backgroundColor: "transparent" }}
              className=" flex w-[345px] h-[52px] pl-11"
              placeholder="Поиск по названию"
            />
          </div>
          <button>
            <LuBell style={{ fontSize: "22px" }} />
          </button>
          {!isRegistered ? (
            <>
              <Button
                onClick={() => navigate("login")}
                style={{
                  border: 0,
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  fontSize: "16px",
                  height: "56px",
                  width: "187px",
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
                  width: "187px",
                  fontSize: "16px",
                }}
              >
                Регистрация
              </Button>
            </>
          ) : (
            <>
              <button
                className="flex justify-center items-center gap-3"
                onClick={() => navigate("/account/favorites")}
                style={{
                  border: 0,
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  fontSize: "16px",
                }}
              >
                <p className="max-w-[300px] max-h-[65px] ">
                  {user?.userData.name}
                </p>
                <Avatar>{user?.userData.name?.charAt(0)}</Avatar>
              </button>
            </>
          )}
        </div>
        <div className="xl:hidden flex justify-between items-center xl:!px-14 px-4 py-3 gap-3">
          <a
            href="/"
            className="flex justify-center items-center font-bold text-[30px]"
          >
            <span className="text-[#2684E5]">You</span>
            <span className="text-[#0b0f32]">Car</span>
          </a>
          <div className="relative bg-[#F6F6F6] w-full">
            <CiSearch
              style={{ color: "#989898", fontSize: "22px" }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              style={{ border: 0, backgroundColor: "transparent" }}
              className=" flex min-w-full h-[45px] pl-11"
              placeholder="Поиск по названию"
            />
          </div>
          <Button
            className="border-0 shadow-none p-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FiAlignRight style={{ fontSize: "30px" }} />
          </Button>
        </div>
      </div>
      <ResponsiveHeader isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default BottomHeader;
