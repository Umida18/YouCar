import { Row, Col } from "antd";

export default function WhyUsSection() {
  const features = [
    {
      icon: "/1.svg",
      title: "Работаем под ключ",
      description:
        "У нас вы можете приобрести автомобиль напрямую у официального автодилера, без посредников и переводчиков.",
    },
    {
      icon: "/2.svg",
      title: "Онлайн-чат 24/7",
      description:
        "Мы всегда на связи, чтобы ответить на ваши вопросы и помочь вам с выбором.",
    },
    {
      icon: "/3.svg",
      title: "Упрощенный выбор авто",
      description:
        "Мы создали этот сайт, чтобы сделать поиск автомобиля по вашим критериям максимально простым и удобным.",
    },
    {
      icon: "/4.svg",
      title: "Доставка",
      description: "Доставка в любой регион РФ, прямая связь без посредников",
    },
  ];

  return (
    <div className=" py-10">
      <h2 className="text-3xl font-bold mb-12 ">Почему мы?</h2>
      <Row gutter={[16, 16]} className="">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <div className="bg-white p-6 py-10 rounded-lg boxShadowC h-full">
              <div className="flex flex-col items-start gap-4">
                <img src={feature.icon} alt="" />
                <h3 className="text-xl font-bold text-[#202020]">
                  {feature.title}
                </h3>
                <p className="text-[#989898] text-sm">{feature.description}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
