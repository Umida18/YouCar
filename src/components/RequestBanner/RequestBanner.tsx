import { Button, Card, Col, Row } from "antd";

const RequestBanner = () => {
  return (
    <div>
      <Card className=" bg-gradient-to-r from-[#3593F3] to-[#0C74DF]">
        <Row gutter={[16, 16]}>
          <Col sm={24} lg={24} xl={12} className="">
            <div>
              <div className="flex flex-col  justify-center relative text-white px-5">
                <h3 className="xl:text-[35px] text-[24px] font-bold mb-2">
                  Не можете определится с выбором?
                </h3>
                <p className=" mb-4 flex-grow xl:text-[16px] text-[14px] max-w-sm">
                  Оставьте заявку, и наши менеджеры проконсультируют вас!
                </p>
                <Button
                  style={{
                    border: 0,
                    backgroundColor: "#71B2F7",
                    borderRadius: 0,
                    color: "white",
                    height: "56px",
                    width: "187px",
                  }}
                >
                  Оставить заявку
                </Button>
              </div>
            </div>
          </Col>
          <Col
            className="h-full flex justify-end items-center"
            sm={24}
            lg={24}
            xl={12}
            style={{
              //   backgroundImage: "url(/ban.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          >
            <img src="/ban.png" alt="" />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RequestBanner;
