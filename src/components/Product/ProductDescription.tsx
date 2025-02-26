import { Col, Row } from "antd";
import { ICar } from "../../Type/Type";
import { useNavigate } from "react-router-dom";

interface PropsCar {
  item: ICar;
}

const ProductDescription: React.FC<PropsCar> = ({ item }) => {
  const navigate = useNavigate();

  const handleSendMessage = (text: string, id: number) => {
    if (id) {
      navigate(`/account/messagingPage/${id}`, {
        state: { autoMessage: text },
      });
    }
  };

  const handleSendMessag = (text: string, id: number) => {
    if (id) {
      navigate(`/messagingPage/${id}`, {
        state: { autoMessage: text },
      });
    }
  };

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
              <div className="xl:flex  hidden flex-wrap xl:gap-4 gap-2 ">
                <button
                  onClick={() => handleSendMessage("Здравствуйте", item.id)}
                  className="bg-[#293843] text-white border-0 xl:py-2 rounded-lg h-[55px] xl:px-10 xl:w-[190px] w-[43%]"
                >
                  Здравствуйте
                </button>
                <button
                  onClick={() =>
                    handleSendMessage("Какой срок доставки?", item.id)
                  }
                  className="bg-[#293843] truncate text-white border-0 xl:py-2 h-[55px] rounded-lg px-10 xl:w-[225px] w-[54%]"
                >
                  Какой срок доставки?
                </button>
                <button
                  onClick={() => handleSendMessage(" ПТС ОРИГИНАЛ?", item.id)}
                  className="bg-[#293843] text-white border-0 xl:py-2 rounded-lg px-10 h-[55px] xl:w-[200px] w-[54%]"
                >
                  ПТС ОРИГИНАЛ?
                </button>
                <button
                  onClick={() => handleSendMessage("Пробег оригинал?", item.id)}
                  className="bg-[#293843] text-white border-0 xl:py-2 rounded-lg h-[55px] px-10 xl:w-[200px] w-[43%]"
                >
                  Пробег оригинал?
                </button>
                <button
                  onClick={() => handleSendMessage("Какой бензин?", item.id)}
                  className="bg-[#293843] text-white border-0 xl:py-2 rounded-lg px-10 h-[55px] xl:w-[190px] w-full xl:h-auto "
                >
                  Какой бензин?
                </button>
              </div>
              <div className="flex xl:hidden flex-wrap xl:gap-4 gap-1 ">
                <button
                  onClick={() => handleSendMessag("Здравствуйте", item.id)}
                  className="bg-[#293843] text-white border-0 py-2 rounded-lg xl:px-10 xl:w-[190px] w-[40%]"
                >
                  Здравствуйте
                </button>
                <button
                  onClick={() =>
                    handleSendMessag("Какой срок доставки?", item.id)
                  }
                  className="bg-[#293843] text-white border-0 py-2 rounded-lg xl:w-[190px] w-[58%] h-[55px]"
                >
                  Какой срок доставки?
                </button>
                <button
                  onClick={() => handleSendMessag(" ПТС ОРИГИНАЛ?", item.id)}
                  className="bg-[#293843] text-white border-0 py-2 rounded-lg xl:w-[190px] w-[48%] h-[55px]"
                >
                  ПТС оригинал?
                </button>
                <button
                  onClick={() => handleSendMessag("Пробег оригинал?", item.id)}
                  className="bg-[#293843] text-white border-0  py-2 rounded-lg  xl:w-[190px] w-[50%] h-[55px]"
                >
                  Пробег оригинал?
                </button>
                <button
                  onClick={() => handleSendMessag("Какой бензин?", item.id)}
                  className="bg-[#293843] text-white border-0 py-2 rounded-lg  xl:w-[190px] w-full xl:h-auto h-[55px]"
                >
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
