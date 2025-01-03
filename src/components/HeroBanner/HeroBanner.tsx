import { Button, Card, Carousel, ConfigProvider, Typography } from "antd";

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
          slidesToShow: 2,
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
      <div className=" mx-auto  my-6 h-[100%]">
        <Carousel
          {...carouselSettings}
          className="[&_.slick-slide]:px-2 [&_.slick-dots]:!bottom-7 [&_.slick-dots_li.slick-active_button]:!bg-[#2684E5] [&_.slick-dots_li_button]:!bg-gray-400"
        >
          <div className="mb-3">
            <div className="!h-[400px] bg-[#F4F4F4] border-none rounded-xl">
              <div className="flex h-full justify-between">
                <div className="py-20 px-14">
                  <h3 className="text-[35px] font-bold mb-2">
                    Новый Geely Monjaro!
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow text-[16px] max-w-md">
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
                </div>
                <div className="flex justify-center items-center ">
                  <img
                    src="/hero1.png"
                    alt=""
                    className=" object-contain"
                    height={770}
                  />
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </ConfigProvider>
  );
};

export default HeroBanner;
