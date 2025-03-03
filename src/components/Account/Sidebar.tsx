import { Avatar, Divider } from "antd";
import { IoIosArrowForward, IoMdStarOutline } from "react-icons/io";
import { MdOutlineSms } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IUser } from "../../Type/Type";
import api from "../../Api/Api";
import { TbLayoutSidebar } from "react-icons/tb";
import { TbLayoutSidebarRight } from "react-icons/tb";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  // const [activeKey, setActiveKey] = useState<string | string[]>([]);
  const [isOpenCallapse, setIsOpenCallapse] = useState(false);

  // const navigation = [
  //   { id: "favorites", name: "Избранное", icon: <IoMdStarOutline /> },
  //   { id: "messages", name: "Сообщения", icon: <MdOutlineSms /> },
  //   // { id: "tariff", name: "Тариф", icon: <BsLightningCharge /> },
  //   { id: "settings", name: "Настройки аккаунта", icon: <IoSettingsOutline /> },
  // ];

  const handleLeave = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    queryClient.invalidateQueries(["user"]);
    queryClient.invalidateQueries(["userData"]);
    navigate("/");
  };

  const { data: user } = useQuery<IUser>(
    ["user"],
    async () => {
      try {
        const res = await api.get("/user-dashboard");
        return res.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem("id");
          localStorage.removeItem("token");
        }
        throw error;
      }
    },
    {
      onError: (error: any) => {
        console.log(error);
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
    <>
      <div className="py-7 px-4 boxShadowC w-full rounded-xl xl:block hidden">
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
          <div className="flex flex-col shadow-none gap-1">
            <button
              className={`w-full flex px-3 gap-2 rounded-md justify-start items-center !shadow-none text-[15px] h-[53px] border-0 ${
                activeSection === "favorites"
                  ? "bg-[#F3F5FC] text-black "
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleNavigation("favorites")}
              key={"favorites"}
            >
              <IoMdStarOutline className="text-[24px] hover:text-black" />
              <span className="text-[#293843] font-medium">Избранное</span>
            </button>

            <div>
              <button
                className={`w-full flex px-3 gap-2 rounded-md justify-start items-center !shadow-none text-[15px] h-[53px] border-0 ${
                  activeSection === "post"
                    ? "bg-[#F3F5FC] text-black "
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpenCallapse(!isOpenCallapse)}
                key={"post"}
              >
                <TbLayoutSidebar className="text-[24px] hover:text-black" />
                <span className="text-[#293843] font-medium flex items-center gap-3">
                  Разместить объявление{" "}
                  <IoIosArrowForward
                    className={`mt-1 transition-transform duration-300 ${
                      isOpenCallapse ? " -rotate-90 " : ""
                    } `}
                  />
                </span>
              </button>
              <div className="transition-transform duration-1000 ease-in-out ease-[cubic-bezier(0.25,1,0.5,1)] delay-200 will-change-transform">
                {isOpenCallapse && (
                  <div className="flex flex-col gap-2 px-8 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform delay-200">
                    <button
                      className="w-full flex items-center px-2 gap-2 text-left rounded-md h-[40px] text-gray-700 hover:bg-gray-100"
                      onClick={() => navigate("/newPost")}
                    >
                      <TbLayoutSidebar className="text-[24px] hover:text-black" />
                      Новое объявление
                    </button>
                    <button
                      className="w-full text-left flex px-2  items-center rounded-md h-[40px] gap-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => navigate("/account/postsUser")}
                    >
                      <TbLayoutSidebarRight className="text-[24px] hover:text-black" />
                      Мои объявления
                    </button>
                  </div>
                )}
              </div>
              <div></div>
            </div>

            <button
              className={`w-full flex px-3 gap-2 rounded-md justify-start items-center !shadow-none text-[15px] h-[53px] border-0 ${
                activeSection === "messages"
                  ? "bg-[#F3F5FC] text-black "
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleNavigation("messages")}
              key={"messages"}
            >
              <MdOutlineSms className="text-[24px] hover:text-black" />
              <span className="text-[#293843] font-medium">Сообщения</span>
            </button>

            {/* <Collapse
              activeKey={activeKey}
              onChange={(key) => setActiveKey(key)}
              ghost
          
            >
              <Collapse.Panel
              
                key="post"
                header={
                  <div className="flex flex-row-reverse items-center justify-between w-full text-[15px] font-medium">
                    <span className="flex-grow text-left">
                      Разместить объявление
                    </span>
                  </div>
                }
              >
                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate("/newPost")}
                  >
                    Новое объявление
                  </Button>
                  <Button
                    className="w-full text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate("/account/postsUser")}
                  >
                    Мои объявления
                  </Button>
                </div>
              </Collapse.Panel>
            </Collapse> */}
            {/* {navigation.map((item) => (
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
            ))} */}

            <button
              className={`w-full flex px-3 gap-2 rounded-md justify-start items-center !shadow-none text-[15px] h-[53px] border-0 ${
                activeSection === "settings"
                  ? "bg-[#F3F5FC] text-black "
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleNavigation("settings")}
              key={"settings"}
            >
              <IoSettingsOutline className="text-[24px] hover:text-black" />
              <span className="text-[#293843] font-medium">
                Настройки аккаунта
              </span>
            </button>
          </div>
          <div>
            <button
              onClick={handleLeave}
              className="w-full rounded-md text-black text-[15px] font-semibold hover:bg-red-50 hover:!text-red-700 border-0 bg-[#F6F6F6] !text-center h-[53px]"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
      {/* <div className="xl:hidden block w-full">
        <ProfilePage />
      </div> */}
    </>
  );
};

export default Sidebar;
