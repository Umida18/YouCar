import api from "@/Api/Api";
import { CarFormValues, IMark } from "@/Type/Type";
import { useMutation } from "@tanstack/react-query";
import {
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { PhotoUpload } from "../PhotoUpload/PhotoUpload";
import { VideoInput } from "../VideoUpload/VideoUpload";
import TextArea from "antd/es/input/TextArea";
import {
  carColors,
  carTypes,
  doors,
  drive,
  engine,
  kpp,
  statement,
} from "@/Data/Data";

const { Option } = Select;

const NewPost = () => {
  const [selectedType, setSelectedType] = useState("cars");
  const [marks, setMarks] = useState<IMark[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<boolean>(false);
  const [model, setModel] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<boolean>(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [currency, setCurrency] = useState("$");

  const [form] = Form.useForm();

  const handleCurrencyChange = (value: any) => {
    setCurrency(value);
  };

  useEffect(() => {
    const fetchMarks = async () => {
      const res = await api.post("/before-filter");
      const uniqueMarks = [...new Set(res.data as IMark[])];
      setMarks(uniqueMarks);
    };
    fetchMarks();
  }, []);

  const handleMark = (val: any) => {
    const selectedMark = marks.find((mark) => mark.mark === val);
    if (selectedMark) {
      setSelectedBrand(true);

      mutation.mutate({ mark_id: selectedMark.id });
    }
    console.log("val:", val);
  };

  const mutation = useMutation(async (data: { mark_id: number }) => {
    const res = await api.post("/model-filter", data);
    setModel([
      ...new Set([
        ...res.data.cars.models,
        ...res.data.motorcycles.models,
        ...res.data.commerceCars.models,
      ]),
    ]);
    setCountry([
      ...new Set([
        ...res.data.cars.countries,
        ...res.data.motorcycles.countries,
        ...res.data.commerceCars.countries,
      ]),
    ]);

    return res.data;
  });

  const handleSubmitPost = (values: CarFormValues) => {};

  // boxShadowC rounded-xl
  return (
    <div className="flex justify-center py-12">
      <div className=" xl:w-[800px] w-full ">
        <Form form={form} onFinish={handleSubmitPost} layout="vertical">
          <div className="boxShadowC rounded-xl py-6 px-12 my-4">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl font-bold">Разместите объявление</h1>
              <p className="text-muted-foreground">
                Укажите данные об автомобиле для размещения объявления
              </p>
            </div>
            <Form.Item>
              <div className="bg-muted rounded-full p-1 mb-6">
                <nav className="flex justify-between space-x-1" role="tablist">
                  {[
                    { id: "cars", label: "Автомобили" },
                    { id: "commercial", label: "Коммерческий транспорт" },
                    { id: "motorcycles", label: "Мотоциклы" },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`flex-1 px-3 py-2 text-sm rounded-full transition-colors
                ${
                  selectedType === type.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/50"
                }`}
                      role="tab"
                      aria-selected={selectedType === type.id}
                    >
                      {type.label}
                    </button>
                  ))}
                </nav>
              </div>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите марку",
                },
              ]}
              name="mark_id"
            >
              <Select
                className=" [&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0"
                placeholder="Марка"
                style={{
                  width: "100%",
                  height: "63px",
                }}
                options={marks?.map((i) => ({
                  label: i.mark,
                  value: i.mark,
                  key: i.id,
                }))}
                onChange={(val) => handleMark(val)}
              />
            </Form.Item>
            {selectedBrand && (
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, выберите модель",
                  },
                ]}
                name="model"
              >
                <Select
                  className=" [&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0"
                  placeholder="Модель"
                  style={{
                    width: "100%",
                    height: "63px",
                  }}
                  options={[...new Set(model)].map((i, index) => ({
                    label: i,
                    value: i,
                    key: `${i}-${index}`,
                  }))}
                  onChange={() => setSelectedModel(true)}
                />
              </Form.Item>
            )}
            <p className="text-[25px] font-bold">Характеристики</p>
            <Divider />
            <Form.Item
              name="year"
              rules={[{ required: true, message: "Выберите год выпуска" }]}
            >
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">Год выпуска</p>
                <DatePicker
                  placeholder="Год"
                  style={{
                    width: "80px",
                    //   height: "63px",
                    backgroundColor: "#F4F4F4",
                    border: 0,
                  }}
                  className="h-[40px] [&_.ant-picker]:!border-0 [&_.ant-picker-outlined]:!bg-[#F4F4F4] [&_.ant-picker-outlined]:!border-0 [&_.ant-picker-range]:!border-0"
                  picker="year"
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item
              name="milage"
              rules={[{ required: true, message: "Введите пробег" }]}
            >
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">Пробег</p>
                <InputNumber
                  min={1}
                  style={{
                    minWidth: "130px",

                    border: 0,
                    backgroundColor: "#F4F4F4",
                  }}
                  suffix={<p className="text-[#989898]">км</p>}
                  className="h-[40px]"
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item
              name="country"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите страну",
                },
              ]}
            >
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">Страна</p>
                <Select
                  className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 max-w-[160px] h-[40px]"
                  placeholder="Страна"
                  options={[...new Set(country)].map((i, index) => ({
                    label: i,
                    value: i,
                    key: `${i}-${index}`,
                  }))}
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item
              name="engine"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите топливо",
                },
              ]}
            >
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">Топливо</p>
                <Select
                  className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 max-w-[160px] h-[40px]"
                  placeholder="Топливо"
                  options={engine.map((i, index) => ({
                    label: i.label,
                    value: i.val,
                    key: `${i.label}-${index}`,
                  }))}
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item
              name="volume"
              rules={[{ required: true, message: "Введите объем двигателя" }]}
            >
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">Объем</p>
                <InputNumber
                  min={1}
                  style={{
                    minWidth: "130px",

                    border: 0,
                    backgroundColor: "#F4F4F4",
                  }}
                  suffix={<p className="text-[#989898]">л</p>}
                  className="h-[40px]"
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item
              name="horsepower"
              rules={[{ required: true, message: "Введите мощность" }]}
            >
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">Мощность</p>
                <InputNumber
                  min={1}
                  style={{
                    minWidth: "130px",

                    border: 0,
                    backgroundColor: "#F4F4F4",
                  }}
                  suffix={<p className="text-[#989898]">л.с</p>}
                  className="h-[40px]"
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item
              name="drive"
              rules={[
                { required: true, message: "Пожалуйста, выберите тип привода" },
              ]}
            >
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">Привод</p>
                <Select
                  className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 max-w-[160px] h-[40px]"
                  placeholder="Привод"
                  options={drive.map((i, index) => ({
                    label: i.val,
                    value: i.val,
                    key: `${i.val}-${index}`,
                  }))}
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item
              name="checkpoint"
              rules={[
                { required: true, message: "Пожалуйста, выберите тип КПП" },
              ]}
            >
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">КПП</p>
                <Select
                  className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 max-w-[160px] h-[40px]"
                  placeholder="КПП"
                  options={kpp.map((i, index) => ({
                    label: i.label,
                    value: i.val,
                    key: `${i.val}-${index}`,
                  }))}
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item name="doors">
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">Колличество дверей</p>
                <Select
                  className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 max-w-[160px] h-[40px]"
                  placeholder="Колличество"
                  options={doors.map((i, index) => ({
                    label: i.val,
                    value: i.val,
                    key: `${i.val}-${index}`,
                  }))}
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item name="body">
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">Кузов</p>
                <Select
                  className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 max-w-[200px] h-[40px]"
                  placeholder="Кузов"
                  options={carTypes.map((i, index) => ({
                    label: i.label,
                    value: i.value,
                    key: `${i.value}-${index}`,
                  }))}
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item
              name="statement"
              rules={[
                { required: true, message: "Пожалуйста, выберите состояние" },
              ]}
            >
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">Состояние</p>
                <Select
                  className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 max-w-[160px] h-[40px]"
                  placeholder="Состояние"
                  options={statement.map((i, index) => ({
                    label: i.label,
                    value: i.val,
                    key: `${i.val}-${index}`,
                  }))}
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item name="color">
              <div className="flex justify-between items-center">
                <p className="text-[#989898] text-[15px]">Цвет</p>
                <Select
                  className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 max-w-[160px] h-[40px]"
                  placeholder="Цвет"
                  options={carColors.map((i, index) => ({
                    label: i.value,
                    value: i.value,
                    key: `${i.value}-${index}`,
                  }))}
                />
              </div>
            </Form.Item>
            <Divider />
            <Form.Item name={"rate"}>
              <Radio>В наличии</Radio>
              <Radio>Под заказ</Radio>
            </Form.Item>
          </div>
          <div className="boxShadowC rounded-xl py-6 px-12 my-4">
            <Form.Item
              name={"image"}
              rules={[
                {
                  required: true,
                  message:
                    "Пожалуйста, загрузите хотя бы одно фото вашего автомобиля",
                },
              ]}
            >
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Фото</h2>
                <p className="text-sm text-muted-foreground">
                  Загрузите фото вашего автомобиля четко с разных ракурсов!
                </p>
                <PhotoUpload onPhotosChange={setPhotos} />
              </div>
            </Form.Item>

            <Form.Item>
              <div className="space-y-4">
                <h2 className="font-semibold">Видео</h2>
                <VideoInput onVideoChange={setVideoUrl} />
              </div>
            </Form.Item>
          </div>
          <div className="boxShadowC rounded-xl py-6 px-12 my-4">
            <Form.Item>
              <p className="font-semibold text-[25px]">Описание</p>
              <p className="text-sm text-muted-foreground my-2">
                Не указывайте ссылки на источники, цены, контакты и не
                предлагайте другие услуги! Объявление не пройдет модерацию
              </p>
              <textarea
                placeholder="Честно опишите ваше авто "
                className="!min-h-[130px] bg-muted border-0 mt-2 w-full p-2"
              />
            </Form.Item>
          </div>
          <div className="boxShadowC rounded-xl py-6 px-12 my-4">
            <Form.Item
              name={"cost"}
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите цену",
                },
                {
                  pattern: /^\d+(\.\d{1,2})?$/,
                  message:
                    "Введите корректную цену (только цифры, возможно с двумя десятичными знаками)",
                },
              ]}
            >
              <div>
                <p>Цена</p>
                <Input
                  placeholder="Цена"
                  className="flex w-[100%] h-[40px]"
                  addonAfter={
                    <Select
                      defaultValue={currency}
                      onChange={handleCurrencyChange}
                      bordered={false}
                    >
                      <Option value="$">$</Option>
                      <Option value="€">€</Option>
                      <Option value="₽">₽</Option>
                    </Select>
                  }
                  style={{ marginTop: 8, background: "#f7f7f7" }}
                  bordered={false}
                />
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewPost;
