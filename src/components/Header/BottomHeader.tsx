import { Button, Avatar } from "antd";
import { CiSearch } from "react-icons/ci";
import "./Header.scss";
import { useEffect, useState } from "react";
import { FiAlignRight } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import ResponsiveHeader from "./ResponsiveHeader";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../Api/Api";
import { ICar, IUser } from "../../Type/Type";
import { IoIosArrowForward } from "react-icons/io";
import { CountryDropdown } from "./CountryDropdown";
import Notification from "./Notification";
import SearchCard from "./SearchCard";

const BottomHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isOpenBell, setIsOpenBell] = useState(false);
  const [activeTab, setActiveTab] = useState("messages");
  const [search, setSearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<ICar[]>([]);

  const token = localStorage.getItem("token");

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
      enabled: !!localStorage.getItem("token"),
      onError: (error: any) => {
        if (error.response?.status === 401) {
          setIsRegistered(false);
        }
      },
    }
  );
  useEffect(() => {
    if (!token) {
      setIsRegistered(false);
    } else {
      setIsRegistered(true);
    }
  }, [token]);

  const handleMouseEnter = (type: string) => {
    setActiveDropdown(type);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    const f = async () => {
      const res = await api.get(`https://api.youcarrf.ru/search/${search} `);
      console.log("search", res.data);
      const all = [...res.data.cars, res.data.moto, res.data.commerce];
      console.log("all", all);

      setSearchValue(all);
    };
    f();
  }, [search]);

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

          <nav className="relative">
            <div className="flex items-center justify-between gap-7">
              <div
                className="relative group"
                onMouseEnter={() => handleMouseEnter("cars")}
                onMouseLeave={handleMouseLeave}
              >
                <p className="flex justify-center gap-1 items-center cursor-pointer text-black hover:text-black">
                  <span className="text-[16px] ">Автомобили</span>
                  <IoIosArrowForward className="text-[#2684E5] mt-1 transition-transform duration-300 group-hover:-rotate-90" />
                </p>
                <CountryDropdown
                  isOpen={activeDropdown === "cars"}
                  onClose={() => setActiveDropdown(null)}
                  type="cars"
                />
              </div>

              <div
                className="relative group"
                onMouseEnter={() => handleMouseEnter("commerceCars")}
                onMouseLeave={handleMouseLeave}
              >
                <p className="flex justify-center items-center gap-1 cursor-pointer text-black hover:text-black">
                  <span className="text-[16px] leading-tight">
                    Коммерческий транспорт
                  </span>
                  <IoIosArrowForward className="text-[#2684E5] mt-1 transition-transform duration-300 group-hover:-rotate-90" />
                </p>
                <CountryDropdown
                  isOpen={activeDropdown === "commerceCars"}
                  onClose={() => setActiveDropdown(null)}
                  type="commerceCars"
                />
              </div>

              <div
                className="relative group"
                onMouseEnter={() => handleMouseEnter("motobykes")}
                onMouseLeave={handleMouseLeave}
              >
                <p className="flex justify-center gap-1 items-center cursor-pointer text-black hover:text-black">
                  <span className="text-[16px]">Мотоциклы</span>
                  <IoIosArrowForward className="text-[#2684E5] mt-1 transition-transform duration-300 group-hover:-rotate-90" />
                </p>
                <CountryDropdown
                  isOpen={activeDropdown === "motobykes"}
                  onClose={() => setActiveDropdown(null)}
                  type="motobykes"
                />
              </div>
            </div>
          </nav>
          <div className="relative bg-[#F6F6F6]">
            <CiSearch
              style={{ color: "#989898", fontSize: "22px" }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 0, backgroundColor: "transparent" }}
              className=" flex w-[340px] h-[52px] pl-11"
              placeholder="Поиск по названию"
            />
          </div>
          {/* <div className="relative">
            <button
              onClick={() => setIsOpenBell(!isOpenBell)}
              className={`${
                isOpenBell ? "bg-[#EEEEEE]  !rounded-full" : ""
              }  w-[35px] h-[35px] flex justify-center items-center`}
            >
              <LuBell
                size={22}
                className="hover:text-[#2684E5] transition-colors"
              />
            </button>
          </div> */}
          <Notification
            isOpenBell={isOpenBell}
            setActiveTab={setActiveTab}
            isRegistered={isRegistered}
            activeTab={activeTab}
            setIsOpenBell={setIsOpenBell}
          />
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
                <p className="max-w-[300px] max-h-[65px] leading-tight !block">
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
            className="flex justify-center items-center font-bold text-[22px]"
          >
            <span className="text-[#2684E5]">You</span>
            <span className="text-[#0b0f32]">Car</span>
          </a>
          <div className=" z-50">
            <div className="relative bg-[#F6F6F6] w-full">
              <CiSearch
                style={{ color: "#989898", fontSize: "22px" }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <Input
                style={{ border: 0, backgroundColor: "transparent" }}
                className=" flex min-w-full h-[45px] pl-9"
                placeholder="Поиск по названию"
              />
            </div>
            {/* {search.length > 0 && (
              <div className="absolute top-full left-0 w-full z-50">
                <SearchCard searchValue={searchValue} />
              </div>
            )} */}
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

      {search.length > 0 && <SearchCard searchValue={searchValue} />}
    </div>
  );
};

export default BottomHeader;
