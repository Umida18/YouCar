import { Col, Row } from "antd";
import { ICar } from "../../Type/Type";

interface PropsCar {
  item: ICar;
}

const ProductDescription: React.FC<PropsCar> = ({ item }) => {
  return (
    <div className="flex flex-col py-10 gap-8">
      <div className="boxShadowC px-4 py-5 rounded-xl">
        <p className="text-[24px] font-bold">Описание</p>
        <p>{item?.description}</p>
      </div>
      <div>
        <Row gutter={[16, 16]} style={{ padding: "0 8px" }}>
          <Col sm={24} xl={12} style={{ width: "100%" }}>
            <div className="boxShadowC  px-6 py-5 rounded-xl h-full">
              <p className="text-[24px] font-bold mb-8">
                Технические характеристики
              </p>
              <div>
                <div className=" text-[15px] flex flex-col gap-3 w-[50%]">
                  <div className="flex justify-between">
                    <p className="text-[#989898]">Марка:</p>
                    <p className="font-semibold">{item?.mark}</p>
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
                  <div className="flex justify-between">
                    <p className="text-[#989898]">Страна:</p>
                    <p className="font-semibold">{item?.country}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[#989898]">Топливо:</p>
                    <p className="font-semibold">{item?.engine}</p>
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
                <button className="bg-[#293843] text-white border-0 py-2 rounded-lg px-10 w-[190px]">
                  Здравствуйте
                </button>
                <button className="bg-[#293843] text-white border-0 py-2 rounded-lg px-10 w-[190px]">
                  Какой срок доставки?
                </button>
                <button className="bg-[#293843] text-white border-0 py-2 rounded-lg px-10 w-[190px]">
                  ПТС ОРИГИНАЛ?
                </button>
                <button className="bg-[#293843] text-white border-0 py-2 rounded-lg px-10 w-[190px]">
                  Пробег оригинал?
                </button>
                <button className="bg-[#293843] text-white border-0 py-2 rounded-lg px-10 w-[190px]">
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
