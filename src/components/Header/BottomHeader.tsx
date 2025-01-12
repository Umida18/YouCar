import { Collapse, Row, Col, Button } from "antd";
import { CiSearch } from "react-icons/ci";
import { LuBell } from "react-icons/lu";
import "./Header.scss";
import { useState } from "react";
import { FiAlignRight } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import ResponsiveHeader from "./ResponsiveHeader";

const { Panel } = Collapse;

const BottomHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="h-full">
      <div className="xl:!min-h-[79px] xl:flex items-center justify-between  px-14 shadow-md hidden ">
        <p className="flex justify-center items-center font-bold text-[30px]">
          <span className="text-[#2684E5]">You</span>
          <span className="text-[#0b0f32]">Car</span>
        </p>
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
                  <Col>Авто из США</Col>
                  <Col>Авто из Европы</Col>
                  <Col>Авто из Китая</Col>
                  <Col>Авто из ОАЭ</Col>
                </Row>
              </Panel>
            </Collapse>
          </div>
          <div className="w-[100%] h-[46px]">
            <Collapse className=" min-h-[100%]" accordion style={{ border: 0 }}>
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
                  <Col>Авто из США</Col>
                  <Col>Авто из Европы</Col>
                  <Col>Авто из Китая</Col>
                  <Col>Авто из ОАЭ</Col>
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
                  <Col>Авто из США</Col>
                  <Col>Авто из Европы</Col>
                  <Col>Авто из Китая</Col>
                  <Col>Авто из ОАЭ</Col>
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

        <LuBell style={{ fontSize: "22px" }} />
        <Button
          style={{
            border: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
            fontSize: "16px",
          }}
        >
          Войти
        </Button>

        <Button
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
      </div>
      <div className="xl:hidden flex justify-between items-center px-14 py-3 gap-3">
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
      <ResponsiveHeader isOpen={isOpen} />
    </div>
  );
};

export default BottomHeader;
