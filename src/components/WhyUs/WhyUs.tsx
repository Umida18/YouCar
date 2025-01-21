import { Row, Col } from "antd";
import {
  KeyOutlined,
  MessageOutlined,
  CarOutlined,
  RocketOutlined,
} from "@ant-design/icons";

export default function WhyUsSection() {
  const features = [
    {
      icon: <KeyOutlined className="text-4xl text-blue-500" />,
      title: "Работаем под ключ",
      description:
        "У нас вы можете приобрести автомобиль напрямую у официального автодилера, без посредников и переводчиков.",
    },
    {
      icon: <MessageOutlined className="text-4xl text-blue-500" />,
      title: "Онлайн-чат 24/7",
      description:
        "Мы всегда на связи, чтобы ответить на ваши вопросы и помочь вам с выбором.",
    },
    {
      icon: <CarOutlined className="text-4xl text-blue-500" />,
      title: "Упрощенный выбор авто",
      description:
        "Мы создали этот сайт, чтобы сделать поиск автомобиля по вашим критериям максимально простым и удобным.",
    },
    {
      icon: <RocketOutlined className="text-4xl text-blue-500" />,
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
                <div className="text-blue-500">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
