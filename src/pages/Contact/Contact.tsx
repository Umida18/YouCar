import { Col, Row } from "antd";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { IoLocationOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa6";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { LiaTelegram } from "react-icons/lia";
import SEO from "@/components/Seo/Seo";

const Contact = () => {
  const breadcrumbItems = [{ label: "Контакты", path: "/contact" }];

  return (
    <>
      <SEO
        title="Контакты | YouCar"
        description="Свяжитесь с нами через раздел 'Контакты' на YouCar. Мы всегда рады помочь с выбором автомобиля и ответить на все ваши вопросы."
      />
      <Breadcrumb items={breadcrumbItems} />
      <div className=" mb-4 py-2">
        <Row gutter={[16, 16]}>
          <Col xl={10} md={24} sm={24} className="w-full">
            <h1 className="text-3xl font-bold mb-14">Контакты</h1>
            <div className="text-[17px] text-[#5A5A5A] flex flex-col gap-5">
              <div className="flex gap-3 items-center">
                <div className="bg-[#F3F3F3] h-[50px] w-[50px] flex items-center justify-center">
                  <BsTelephone />
                </div>
                <a href="tel:+7 968 053-14-77">+7 968 053-14-77</a>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-[#F3F3F3] h-[50px] w-[50px] flex items-center justify-center">
                  <MdOutlineEmail />
                </div>
                <p>Info@mail.ru</p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-[#F3F3F3] h-[50px] w-[50px] flex items-center justify-center">
                  <IoLocationOutline />
                </div>
                <p>Санкт-Петербург</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://vk.com/youcarr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="w-[24px] h-[24px]" src="/blueVk.svg" alt="" />
              </a>
              <a href="https://wa.me/79680531477">
                <FaWhatsapp style={{ color: "#2684E5", fontSize: 24 }} />
              </a>
              <a
                href="https://t.me/+79680531477"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiaTelegram style={{ color: "#2684E5", fontSize: 24 }} />
              </a>
            </div>
          </Col>
          <Col xl={14} md={24} sm={24} className="w-full">
            <YMaps>
              <Map
                defaultState={{ center: [59.9342802, 30.3350986], zoom: 10 }}
                width="100%"
                height="400px"
                defaultOptions={{
                  suppressMapOpenBlock: true,
                  yandexMapDisablePoiInteractivity: true,
                }}
              >
                <Placemark
                  geometry={[59.9342802, 30.3350986]}
                  properties={{ balloonContent: "Санкт-Петербург" }}
                />
              </Map>
            </YMaps>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Contact;
