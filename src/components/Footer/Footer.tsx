import api from "@/Api/Api";
import { IMarks } from "@/Type/Type";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Typography, Space } from "antd";
import { FaWhatsapp } from "react-icons/fa6";
import { LiaTelegram } from "react-icons/lia";

const { Title } = Typography;

export default function FooterComponent() {
  const { data: marks } = useQuery<IMarks[]>(["marksBrand"], async () => {
    const res = await api.get("/marks");
    return res.data;
  });
  console.log("marks", marks);

  const chunkSize = 5;

  const chunkArray = (arr: IMarks[], size: number) => {
    return arr
      ? arr.reduce((acc: IMarks[][], _, i) => {
          if (i % size === 0) acc.push(arr.slice(i, i + size));
          return acc;
        }, [])
      : [];
  };

  const chunks = chunkArray(marks || [], chunkSize);

  const country = [
    { label: "Из Европы" },
    { label: "Из США" },
    { label: "Из ОАЭ" },
    { label: "Из Китая" },
    { label: "Из Кореи" },
  ];

  const navig = [
    { link: "/catalog", label: "Каталог" },
    { link: "/news", label: "Новости" },
    { link: "/contact", label: "Контакты" },
    { link: "/account/favorites", label: "Избранные" },
  ];

  return (
    <div>
      <div className="container mx-auto bg-white pt-8 pb-4 xl:!px-14 px-4">
        <div className=" border-t border-gray-200 pt-12 flex flex-col justify-between">
          <Row gutter={[32, 32]} className="mb-8">
            <Col xs={24} md={6}>
              <div className="">
                <a href="/" className="inline-block">
                  <div className="flex items-center mb-5 text-[30px]">
                    <span className=" font-bold text-blue-500">You</span>
                    <span className=" font-bold">Car</span>
                  </div>
                </a>
                <div className="flex space-x-4 mb-5 !text-[#989898] ">
                  <a href="https://vk.com/youcarr" className=" ">
                    {/* <SlSocialVkontakte className="text-[24px]" /> */}
                    <img className="w-[24px] h-[24px]" src="/vk.svg" alt="" />
                  </a>
                  <a href="https://wa.me/79680531477">
                    <FaWhatsapp style={{ color: "#989898", fontSize: 24 }} />
                  </a>
                  <a
                    href="https://t.me/+79680531477"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LiaTelegram style={{ color: "#989898", fontSize: 24 }} />
                  </a>
                </div>
                <p className="text-gray-500 block">© 1-й автоброкер</p>
                <p className="text-gray-500 block">
                  Внесём качественные изменения в Вашу жизнь!
                </p>
              </div>
            </Col>

            <Col xs={12} md={4}>
              <Title level={5} className="mb-4">
                Компания
              </Title>
              <Space direction="vertical" className="w-full">
                {navig.map((i) => (
                  <a href={i.link} className="text-[#5A5A5A]">
                    {i.label}
                  </a>
                ))}
              </Space>
            </Col>

            <Col xs={12} md={4}>
              <Title level={5} className="mb-4">
                Автомобили
              </Title>
              <Space direction="vertical" className="w-full">
                {country.map((i) => (
                  <p className="text-[#5A5A5A]">{i.label}</p>
                ))}
              </Space>
            </Col>

            <Col xs={24} md={10}>
              <Title level={5} className="mb-4">
                Марки
              </Title>
              <Row gutter={[16, 16]}>
                {chunks.map((chunk, chunkIndex) => (
                  <Col span={6} key={chunkIndex}>
                    <Space direction="vertical" className="w-full">
                      {chunk.map((mark) => (
                        <a
                          href={`/brand?markId=${mark.id}&mark=${mark.name}`}
                          key={mark.id}
                          className="text-[#5A5A5A] font-semibold capitalize"
                        >
                          {mark.name}
                        </a>
                      ))}
                    </Space>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <Row className="pt-4 flex ">
            <Col
              xs={14}
              span={8}
              className="flex justify-start xl:justify-end "
            >
              <a href="#" className="text-gray-500 hover:text-gray-700 ">
                Политика конфиденциальности
              </a>
            </Col>
            <Col xs={10} span={8} className="text-right">
              <p className="text-gray-500">Сделано в UserTech</p>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
