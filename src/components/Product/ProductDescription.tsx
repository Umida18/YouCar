import { Col, Row } from "antd";
import { ICar } from "../../Type/Type";

interface PropsCar {
  item: ICar;
}

const ProductDescription: React.FC<PropsCar> = ({ item }) => {
  return (
    <div className="flex flex-col py-10 gap-8">
      <div className="boxShadowC px-4 py-5 rounded-xl">
        <p className="text-[24px] font-bold mb-3">Описание</p>
        <p>{item?.description}</p>
      </div>
      <div>
        <Row gutter={[16, 16]} style={{ padding: "0 8px" }}>
          <Col sm={24} xl={12} style={{ width: "100%" }} className="!p-0">
            <div className="boxShadowC  px-6 py-5 rounded-xl h-full">
              <p className="text-[24px] font-bold mb-8">
                Технические характеристики
              </p>
              <div>
                <div className=" text-[15px] flex gap-3 xl:flex-row flex-col flex-wrap justify-between">
                  <div className="flex flex-col gap-3 xl:w-[30%]">
                    <div className="flex justify-between">
                      <p className="text-[#989898]">Марка:</p>
                      <p className="font-semibold">{item?.mark_id}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#989898]">Модель:</p>
                      <p className="font-semibold">{item?.model}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#989898]">Год выпуска:</p>
                      <p className="font-semibold">{item?.year}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#989898]">Пробег:</p>
                      <p className="font-semibold">{item?.milage} км</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#989898]">Цвет:</p>
                      <p className="font-semibold">{item?.color}</p>
                    </div>
                    <div className="flex  justify-between">
                      <p className="text-[#989898]">Двигатель:</p>
                      <p className="font-semibold">{item?.engine}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 xl:w-[30%]">
                    <div className="flex justify-between">
                      <p className="text-[#989898]">Страна:</p>
                      <p className="font-semibold">{item?.country}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#989898]">Топливо:</p>
                      <p className="font-semibold">{item?.engine}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#989898]">Владельцы:</p>
                      <p className="font-semibold">1</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#989898]">Мощность:</p>
                      <p className="font-semibold">{item.horsepower}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#989898]">Объем:</p>
                      <p className="font-semibold">{item.volume}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={24} xl={12} style={{ width: "100%" }}>
            <div className="boxShadowC  px-4 py-5 rounded-xl h-full">
              <p className="text-[24px] font-bold mb-8">
                Задайте вопрос продавцу
              </p>
              <div className="flex flex-wrap gap-4 ">
                <button className="bg-[#293843] text-white border-0 py-2 rounded-lg px-10 xl:w-[190px] w-full">
                  Здравствуйте
                </button>
                <button className="bg-[#293843] text-white border-0 py-2 rounded-lg px-10 xl:w-[190px] w-full">
                  Какой срок доставки?
                </button>
                <button className="bg-[#293843] text-white border-0 py-2 rounded-lg px-10 xl:w-[190px] w-full">
                  ПТС ОРИГИНАЛ?
                </button>
                <button className="bg-[#293843] text-white border-0 py-2 rounded-lg px-10 xl:w-[190px] w-full">
                  Пробег оригинал?
                </button>
                <button className="bg-[#293843] text-white border-0 py-2 rounded-lg px-10 xl:w-[190px] w-full">
                  Какой бензин?
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDescription;
