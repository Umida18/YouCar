import { Row, Col, Typography, Space } from "antd";

const { Title, Text } = Typography;

export default function FooterComponent() {
  return (
    <div
      className=""
      // style={{ paddingInline: "48px" }}
    >
      <div className="container mx-auto bg-white pt-8 pb-4 xl:!px-14 px-4">
        <div className=" border-t border-gray-200 pt-12 flex flex-col justify-between">
          <Row gutter={[32, 32]} className="mb-8">
            <Col xs={24} md={6}>
              <div className="space-y-4">
                <a href="/" className="inline-block">
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-blue-500">
                      You
                    </span>
                    <span className="text-2xl font-bold">Car</span>
                  </div>
                </a>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21.547 7.016c0.014 0.188 0.014 0.375 0.014 0.563 0 5.766-4.391 12.422-12.422 12.422-2.469 0-4.766-0.719-6.703-1.969 0.352 0.039 0.688 0.053 1.055 0.053 2.039 0 3.922-0.695 5.422-1.875-1.922-0.039-3.531-1.305-4.086-3.047 0.27 0.039 0.547 0.066 0.832 0.066 0.398 0 0.797-0.053 1.168-0.156-2.004-0.406-3.508-2.172-3.508-4.297v-0.055c0.578 0.32 1.25 0.516 1.961 0.539-1.18-0.785-1.953-2.133-1.953-3.656 0-0.813 0.219-1.562 0.598-2.211 2.156 2.656 5.391 4.391 9.023 4.578-0.070-0.32-0.109-0.652-0.109-0.984 0-2.367 1.914-4.281 4.281-4.281 1.234 0 2.344 0.52 3.125 1.355 0.969-0.188 1.891-0.539 2.711-1.023-0.32 0.992-0.992 1.828-1.875 2.355 0.859-0.094 1.688-0.328 2.453-0.66-0.578 0.852-1.305 1.602-2.133 2.203z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
                <Text className="text-gray-500 block">© 1-й автоброкер</Text>
                <Text className="text-gray-500 block">
                  Внесём качественные изменения в Вашу жизнь!
                </Text>
              </div>
            </Col>

            <Col xs={24} md={4}>
              <Title level={5} className="mb-4">
                Компания
              </Title>
              <Space direction="vertical" className="w-full">
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Каталог
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  О нас
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Новости
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Контакты
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Избранные
                </a>
              </Space>
            </Col>

            <Col xs={24} md={4}>
              <Title level={5} className="mb-4">
                Автомобили
              </Title>
              <Space direction="vertical" className="w-full">
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Из Европы
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Из США
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Из ОАЭ
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Из Китая
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Из Кореи
                </a>
              </Space>
            </Col>

            <Col xs={24} md={10}>
              <Title level={5} className="mb-4">
                Марки
              </Title>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Space
                    direction="vertical"
                    // className=""
                    className="text-gray-500 hover:text-gray-700 w-full"
                  >
                    <a href="#">Audi</a>
                    <a href="#">Aston Martin</a>
                    <a href="#">Acura</a>
                    <a href="#">Alfa Romeo</a>
                    <a href="#">Avatr</a>
                  </Space>
                </Col>
                <Col span={6}>
                  <Space
                    direction="vertical"
                    className="w-full text-gray-500 hover:text-gray-700"
                  >
                    <a href="#">BMW</a>
                    <a href="#">Baic</a>
                    <a href="#">Byd</a>
                    <a href="#">Bently</a>
                    <a href="#">Chery</a>
                  </Space>
                </Col>
                <Col span={6}>
                  <Space direction="vertical" className="w-full">
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      Chery
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      Cadillac
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      Changan
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      Chevrolet
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      Citroen
                    </a>
                  </Space>
                </Col>
                <Col span={6}>
                  <Space direction="vertical" className="w-full">
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      Daewoo
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      Datsun
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      Dodge
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      EXEED
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      Ferrari
                    </a>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="pt-4 border-t border-gray-200">
            <Col span={12}>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Политика конфиденциальности
              </a>
            </Col>
            <Col span={12} className="text-right">
              <Text className="text-gray-500">Сделано в UserTech</Text>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
