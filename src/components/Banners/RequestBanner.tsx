import { Button, Card, Col, Form, Row } from "antd";
import RequestModal from "../RequestModal/RequestModal";
import { useState } from "react";

const RequestBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="py-10">
      <Card className=" bg-gradient-to-r from-[#3593F3] to-[#0C74DF] border-0 p-0 xl:px-3 [&_.ant-card-body]:px-0 [&_.ant-card-body]:py-4 h-full  xl:h-[250px]">
        <Row gutter={[16, 16]}>
          <Col sm={24} lg={24} xl={12} className="">
            <div className="px-3">
              <div className="flex flex-col  justify-center relative text-white px-3 gap-1">
                <h3 className="text-[28px] leading-tight font-bold mb-2">
                  Не можете определиться с выбором?
                </h3>
                <p className=" mb-4 flex-grow text-[16px] max-w-sm">
                  Оставьте заявку, и наши менеджеры проконсультируют вас!
                </p>
                <Button
                  onClick={showModal}
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
              backgroundRepeat: "no-repeat",
              // backgroundSize: "contain",
            }}
          >
            <div className=" overflow-hidden ">
              <img
                src="/ban.png"
                alt=""
                className=" relative left-0 overflow-hidden xl:left-0 min-h-[173px] min-w-[503px]"
              />
            </div>
          </Col>
        </Row>
      </Card>
      <RequestModal
        handleCancel={handleCancel}
        onFinish={onFinish}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};

export default RequestBanner;
