import { Collapse, Row, Col, Button, Avatar } from "antd";
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

const { Panel } = Collapse;

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
          <div className="flex justify-between items-center  !min-h-[79px]">
            <div className="w-[100%] h-[46px] !bg-white">
              <Collapse
                className=" min-h-[100%] "
                accordion
                style={{ border: 0 }}
              >
                <Panel
                  style={{ position: "relative", zIndex: 10 }}
                  header="Автомобили"
                  key="1"
                  className="!bg-white [&_.ant-collapse-content]:!bg-white "
                >
                  <Row
                    gutter={[16, 16]}
                    style={{
                      marginTop: "8px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      zIndex: 10,
                    }}
                  >
                    <Col>
                      <a href="/cars">Автомобили</a>
                    </Col>
                    {/* <Col>Авто из Европы</Col>
                  <Col>Авто из Китая</Col>
                  <Col>Авто из ОАЭ</Col> */}
                  </Row>
                </Panel>
              </Collapse>
            </div>
            <div className="w-full h-[46px]">
              <Collapse
                className=" min-h-[100%] w-full"
                accordion
                style={{ border: 0 }}
              >
                <Panel
                  header="Коммерческий транспорт"
                  key="1"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    minHeight: "100%",
                  }}
                  className="!bg-white [&_.ant-collapse-content]:!bg-white min-h-[100%] [&_.ant-collapse-header-text]:!min-w-[170px]"
                >
                  <Row
                    gutter={[16, 16]}
                    style={{
                      marginTop: "8px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      zIndex: 10,
                    }}
                  >
                    <Col>
                      <a href="/commercialCar">Коммерческий транспорт</a>
                    </Col>
                    {/* <Col>Авто из США</Col>
                  <Col>Авто из Европы</Col>
                  <Col>Авто из Китая</Col>
                  <Col>Авто из ОАЭ</Col> */}
                  </Row>
                </Panel>
              </Collapse>
            </div>
            <div className="w-[100%] h-[46px]">
              <Collapse
                className="min-h-[100%]p-0"
                accordion
                style={{ border: 0 }}
              >
                <Panel
                  header="Мотоциклы"
                  key="1"
                  className="!bg-white [&_.ant-collapse-content]:!bg-white "
                  style={{ position: "relative", zIndex: 10 }}
                >
                  <Row
                    gutter={[16, 16]}
                    style={{
                      marginTop: "8px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      zIndex: 10,
                    }}
                  >
                    <Col>
                      <a href="/motobykes">Мотоциклы</a>
                    </Col>
                    {/* <Col>Авто из США</Col>
                  <Col>Авто из Европы</Col>
                  <Col>Авто из Китая</Col>
                  <Col>Авто из ОАЭ</Col> */}
                  </Row>
                </Panel>
              </Collapse>
            </div>
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
          <p className="flex justify-center items-center font-bold text-[30px]">
            <span className="text-[#2684E5]">You</span>
            <span className="text-[#0b0f32]">Car</span>
          </p>
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
      <ResponsiveHeader isOpen={isOpen} />
    </div>
  );
};

export default BottomHeader;
