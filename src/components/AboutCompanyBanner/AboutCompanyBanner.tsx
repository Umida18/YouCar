import { Button, Card, Col, Row } from "antd";

const AboutCompanyBanner = () => {
  return (
    <div>
      <Card className="xl:h-[390px] bg-[#F6F6F6]">
        <Row gutter={[16, 16]}>
          <Col
            className="h-full  xl:h-[320px]"
            xl={12}
            style={{
              backgroundImage: "url(/col1.png)",
              backgroundRepeat: "no-repeat",
            }}
          >
            <img
              style={{ position: "relative", bottom: "24%" }}
              src="/person.png"
              alt=""
            />
          </Col>
          <Col xl={12} className="xl:h-[320px]">
            <div>
              <div className="flex flex-col  justify-center relative">
                <h3 className="text-[35px] font-bold mb-2">О нашей компании</h3>
                <p className="text-gray-600 mb-4 flex-grow text-[16px] max-w-md">
                  Мы имеем огромный опыт работы с автомобильным рынком Кореи и
                  тщательно отбираем автомобили для наших клиентов, учитывая их
                  потребности и бюджет. Мы работаем только с надежными
                  поставщиками и перевозчиками, чтобы обеспечить безопасность и
                  надежность доставки.
                </p>
                <Button
                  style={{
                    border: 0,
                    backgroundColor: "#2684E5",
                    borderRadius: 0,
                    color: "white",
                    height: "56px",
                    width: "187px",
                  }}
                >
                  Подробнее
                </Button>
              </div>
              <div
                className=" relative bottom-20 right-24 flex justify-end"
                style={{
                  backgroundImage: "url(/Photo.png)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right bottom",
                  backgroundSize: "contain",
                }}
              >
                <img className=" relative -right-24" src="/n1.png" alt="" />
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AboutCompanyBanner;
