import { Button, Card, Carousel, Col, ConfigProvider, Row } from "antd";

const HeroBanner = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00C65E",
        },
        components: {
          Carousel: {
            dotWidth: 8,
            dotHeight: 8,
            dotActiveWidth: 24,
          },
        },
      }}
    >
      <div className=" mx-auto  my-6 h-[100%] w-full">
        <Carousel
          {...carouselSettings}
          className="[&_.slick-slide]:px-2 [&_.slick-dots]:!bottom-7 [&_.slick-dots_li.slick-active_button]:!bg-[#2684E5] [&_.slick-dots_li_button]:!bg-gray-400 w-full"
        >
          {/* <div className="mb-3 w-full"> */}
          <Card className=" bg-[#F4F4F4] w-full border-none rounded-xl [&_.ant-card-body]:min-w-full">
            <Row>
              <Col
                md={24}
                xl={12}
                className="flex justify-center flex-col xl:px-14 px-4"
              >
                <h3 className="xl:text-[35px] text-[24px] font-bold mb-2">
                  Новый Geely Monjaro!
                </h3>
                <p className="text-gray-600 mb-4 text-[14px] xl:text-[16px] max-w-md">
                  Кроссовер Monjaro - премиальная модель Geely по уровню
                  дизайна, материалов и технологий.
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
              </Col>
              <Col
                md={24}
                xl={12}
                className="flex justify-center h-full items-center "
              >
                <img
                  src="/hero1.png"
                  alt=""
                  // className=" object-contain"
                  // height={770}
                />
              </Col>
            </Row>
          </Card>
          {/* </div> */}
        </Carousel>
      </div>
    </ConfigProvider>
  );
};

export default HeroBanner;
