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
      <Card className=" bg-gradient-to-r from-[#3593F3] to-[#0C74DF] border-0">
        <Row gutter={[16, 16]}>
          <Col sm={24} lg={24} xl={12} className="">
            <div>
              <div className="flex flex-col  justify-center relative text-white px-5 gap-1">
                <h3 className="xl:text-[28px] text-[22px] font-bold mb-2">
                  Не можете определиться с выбором?
                </h3>
                <p className=" mb-4 flex-grow xl:text-[16px] text-[14px] max-w-sm">
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
              backgroundSize: "contain",
            }}
          >
            <img src="/ban.png" alt="" />
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
