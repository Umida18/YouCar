import { Avatar, Button, Divider } from "antd";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlineSms } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { IUser } from "../../Type/Type";
import api from "../../Api/Api";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { id: "favorites", name: "Избранное", icon: <IoMdStarOutline /> },
    { id: "messages", name: "Сообщения", icon: <MdOutlineSms /> },
    { id: "post", name: "Разместить объявление", icon: <MdOutlinePostAdd /> },
    { id: "tariff", name: "Тариф", icon: <BsLightningCharge /> },
    { id: "settings", name: "Настройки аккаунта", icon: <IoSettingsOutline /> },
  ];

  const handleLeave = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    queryClient.invalidateQueries(["user"]);
    navigate("/");
  };

  const { data: user } = useQuery<IUser>(
    ["user"],
    async () => {
      try {
        const res = await api.get("/user-dashboard");
        // setIsRegistered(true);

        return res.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem("id");
          localStorage.removeItem("token");

          // setIsRegistered(false);
        }
        throw error;
      }
    },
    {
      onError: (error: any) => {
        // if (error.response?.status === 401) {
        // setIsRegistered(false);
        console.log(error);

        // }
      },
    }
  );

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    setActiveSection(path || "favorites");
  }, [location.pathname]);

  const handleNavigation = (id: string) => {
    setActiveSection(id);
    navigate(`/account/${id}`);
  };

  return (
    <div className="py-7 px-4 boxShadowC w-full rounded-xl">
      <div className="flex gap-3 text-[17px] font-semibold items-center">
        <div>
          <Avatar className="h-[50px] w-[50px] text-xl">
            {user?.userData.name?.charAt(0)}
          </Avatar>
        </div>
        <div>
          <p>{user?.userData.name}</p>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between items-center mb-8">
        <p className="text-[#5A5A5A] text-[16px]">E-mail</p>
        <p className="text-[#2684E5] text-[16px]">{user?.userData.email}</p>
      </div>
      <div className="flex flex-col gap-16">
        <div className=" flex flex-col shadow-none gap-1">
          {navigation.map((item) => (
            <Button
              className={`w-full justify-start !shadow-none text-[15px] h-[53px] border-0 ${
                activeSection === item.id
                  ? "bg-[#F3F5FC] text-black hover:text-white hover:!bg-[##F3F5FC]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleNavigation(item.id)}
              key={item.id}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Button>
          ))}
        </div>
        <div>
          <Button
            onClick={handleLeave}
            className="w-full  text-black text-[15px] font-semibold hover:bg-red-50 hover:!text-red-700 border-0 bg-[#F6F6F6] !text-center h-[53px]"
          >
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
