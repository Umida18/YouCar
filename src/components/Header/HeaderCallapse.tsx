import { Col, Collapse, Row } from "antd";

const { Panel } = Collapse;

const HeaderCallapse = () => {
  return (
    <div className="flex justify-between flex-col items-start gap-3 mt-4">
      <div className="w-[100%] h-full !bg-white ">
        <Collapse
          className=" min-h-[100%] "
          accordion
          style={{ border: 0, borderRadius: "0px" }}
        >
          <Panel
            style={{ position: "relative", zIndex: 10 }}
            header="Автомобили"
            key="1"
            className="!bg-[#F6F6F6] [&_.ant-collapse-content]:!bg-[#F6F6F6] "
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
      <div className="w-[100%] h-full">
        <Collapse
          className=" min-h-[100%]"
          accordion
          style={{ border: 0, borderRadius: "0px" }}
        >
          <Panel
            header="Коммерческий транспорт"
            key="1"
            style={{
              position: "relative",
              zIndex: 10,
              minHeight: "100%",
            }}
            className="!bg-[#F6F6F6] [&_.ant-collapse-content]:!bg-[#F6F6F6] min-h-[100%] [&_.ant-collapse-header-text]:!min-w-[170px]"
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
      <div className="w-[100%] h-full ">
        <Collapse
          className="min-h-[100%] p-0 [&_.ant-collapse-header]:!bg-[#F6F6F6]"
          accordion
          style={{ border: 0, borderRadius: "0px" }}
        >
          <Panel
            header="Мотоциклы"
            key="1"
            className="!bg-[#F6F6F6] [&_.ant-collapse-content]:!bg-[#F6F6F6] "
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
  );
};

export default HeaderCallapse;
