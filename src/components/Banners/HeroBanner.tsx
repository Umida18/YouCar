import { Button, Card, Carousel, Col, ConfigProvider, Row } from "antd";
import { useRef, useState } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const slides = [
  {
    id: 1,
    title: "НОВЫЙ GEELY MONJARO!",
    description:
      "Кроссовер Monjaro - премиальная модель Geely по уровню дизайна, материалов и технологий.",
    image: "/hero1.png",
  },
  {
    id: 2,
    title: "BMW XM!",
    description:
      "BMW XM - премиальная модель BMW по уровню дизайна, материалов и технологий.",
    image: "/hero1.png",
  },
];

const HeroBanner = () => {
  const [_, setCurrentSlide] = useState(0);
  const carouselRef = useRef<any>(null);

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
            dotActiveWidth: 9,
          },
        },
      }}
    >
      <div className="relative mx-auto my-6 w-full">
        <Carousel
          ref={carouselRef}
          {...carouselSettings}
          beforeChange={(_, to) => setCurrentSlide(to)}
          className="  [&_.slick-dots]:!bottom-8 [&_.slick-dots]:!right-36 [&_.slick-dots]:!justify-end [&_.slick-dots]:!w-auto [&_.slick-dots_li.slick-active_button]:6 [&_.slick-dots_li.slick-active_button]:!bg-[#2684E5] [&_.slick-dots_li_button]:!bg-gray-600 [&_.slick-dots_li]:!mx-1"
        >
          {slides.map((slide) => (
            <div key={slide.id}>
              <Card className="bg-[#F4F4F4] h-[575px] xl:h-full w-full border-none rounded-xl [&_.ant-card-body]:min-w-full">
                <Row>
                  <Col md={24} xl={12} className="flex flex-col xl:px-7 px-4">
                    <h3 className="xl:text-[35px] text-[24px] font-bold mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-[14px] xl:text-[16px] max-w-md">
                      {slide.description}
                    </p>
                    <Button
                      className="xl:w-[187px]"
                      style={{
                        border: 0,
                        backgroundColor: "#2684E5",
                        borderRadius: 4,
                        color: "white",
                        height: "56px",
                        // width: "187px",
                      }}
                    >
                      Подробнее
                    </Button>
                  </Col>
                  <Col
                    md={24}
                    xl={12}
                    className="flex justify-center h-full items-center"
                  >
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      className="relative xl:top-0 top-24 xl:left-0 xl:scale-95 left-20 scale-150"
                    />
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </Carousel>
        <button
          // onClick={prevSlide}
          onClick={() => carouselRef.current?.prev()}
          className="absolute right-20 bottom-0  -translate-y-1/2 p-2 bg-white rounded-full hover:bg-white transition-colors z-10"
        >
          <IoIosArrowRoundBack className="h-6 w-6 text-[#989898]" />
        </button>
        <button
          // onClick={nextSlide}
          onClick={() => carouselRef.current?.next()}
          className="absolute right-8 bottom-0 -translate-y-1/2 p-2 bg-white rounded-full hover:bg-white transition-colors z-10"
        >
          <IoIosArrowRoundForward className="h-6 w-6 text-[#989898]" />
        </button>
      </div>
    </ConfigProvider>
  );
};

export default HeroBanner;
