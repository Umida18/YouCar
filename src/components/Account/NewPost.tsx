import api from "@/Api/Api";
import { CarFormValues, IMark, IUser } from "@/Type/Type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Radio,
  Select,
  UploadFile,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { PhotoUpload } from "../PhotoUpload/PhotoUpload";
import { VideoInput } from "../VideoUpload/VideoUpload";
import {
  carColors,
  carTypes,
  doors,
  drive,
  driveMoto,
  engine,
  kpp,
  motoType,
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
  const [__, setVideoUrl] = useState("");
  const [currency, setCurrency] = useState("$");
  const [markId, setMarkId] = useState<number | null>(null);
  const [hasUploadedImages, setHasUploadedImages] = useState(false);
  const [url, setUrl] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const [fileL, setFileL] = useState<UploadFile[]>();

  const [form] = Form.useForm();

  const { data: userData } = useQuery<IUser>(["userData"], async () => {
    const res = await api.get("/user-dashboard");
    console.log(res.data);

    return res.data;
  });

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
      setMarkId(selectedMark.id);
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

  const handleSubmitPost = async (values: CarFormValues) => {
    try {
      setLoading(true);
      console.log("values", values);

      let endpoint = "";
      if (selectedType === "motorcycles") {
        endpoint = "/add-motorcycle";
      } else if (selectedType === "commercial") {
        endpoint = "/add-commerce-car";
      } else if (selectedType === "cars") {
        endpoint = "/add-car";
      }

      const { image, authoremail, ...filteredValues } = values;

      const formData = new FormData();

      const correctedYear = values.year
        ? new Date(values.year).getFullYear()
        : null;

      Object.entries({
        ...filteredValues,
        year: Number(correctedYear),
        authoremail: userData?.userData.email,
        mark_id: Number(markId),
        milage: values.milage ? Number(values.milage) : 0,
        cost: values.cost ? Number(values.cost) : undefined,
        // milage: values.milage ? Number(values.milage) : undefined,
        volume: values.volume ? values.volume : undefined,
        horsepower: values.horsepower ? Number(values.horsepower) : undefined,
        doors: values.doors ? Number(values.doors) : undefined,
      }).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      fileL?.forEach((file: any) => {
        if (file.originFileObj) {
          formData.append("image", file.originFileObj);
        }
      });

      console.log("Final FormData payload:", formData);

      const res = await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      notification.success({
        message: "Успешно!",
        description: "Объявление успешно добавлено.",
      });

      form.resetFields();
      queryClient.invalidateQueries(["userData"]);

      console.log("res:", res);
    } catch (error) {
      console.error("add error:", error);
      notification.error({
        message: "Ошибка",
        description: "Произошла ошибка при добавлении объявления.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-12">
      <div className=" xl:w-[750px] w-full ">
        <Form form={form} onFinish={handleSubmitPost} layout="vertical">
          <div className="boxShadowC rounded-xl py-10 xl:px-16 my-4 px-2">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl font-bold">Разместите объявление</h1>
              <p className="text-muted-foreground">
                Укажите данные об автомобиле для размещения объявления
              </p>
            </div>
            <div className="bg-muted rounded-full p-1 mb-6">
              <nav className="flex justify-between" role="tablist">
                {[
                  { id: "cars", label: "Автомобили" },
                  { id: "commercial", label: "Коммерческий транспорт" },
                  { id: "motorcycles", label: "Мотоциклы" },
                ].map((type) => (
                  <button
                    type="button"
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex-1 px-2 !mr-0 py-2 text-sm rounded-full transition-colors
                ${
                  selectedType === type.id
                    ? "bg-background text-foreground !mr-0 shadow-sm"
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
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите марку",
                },
              ]}
              // name="mark_id"
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
            {selectedModel && (
              <>
                <p className="text-[25px] font-bold">Характеристики</p>
                <Divider />
                <div className="flex justify-between items-center ">
                  <p className="text-[#989898] text-[15px]">Год выпуска</p>
                  <Form.Item
                    className="mb-0"
                    name="year"
                    rules={[
                      { required: true, message: "Выберите год выпуска" },
                    ]}
                  >
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
                  </Form.Item>
                </div>
                <Divider />
                <div className="flex justify-between items-center">
                  <p className="text-[#989898] text-[15px]">Пробег</p>
                  <Form.Item
                    className="mb-0"
                    name="milage"
                    // rules={[{ required: true, message: "Введите пробег" }]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        minWidth: "130px",

                        border: 0,
                        backgroundColor: "#F4F4F4",
                      }}
                      suffix={<p className="text-[#989898]">км</p>}
                      className="h-[40px]"
                    />
                  </Form.Item>
                </div>
                <Divider />
                <div className="flex justify-between items-center">
                  <p className="text-[#989898] text-[15px]">Страна</p>
                  <Form.Item
                    className="mb-0"
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, выберите страну",
                      },
                    ]}
                  >
                    <Select
                      className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[160px] h-[40px]"
                      placeholder="Страна"
                      options={[...new Set(country)].map((i, index) => ({
                        label: i,
                        value: i,
                        key: `${i}-${index}`,
                      }))}
                    />
                  </Form.Item>
                </div>
                <Divider />

                <div className="flex justify-between items-center">
                  <p className="text-[#989898] text-[15px]">Топливо</p>
                  <Form.Item
                    className="mb-0"
                    name="engine"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, выберите топливо",
                      },
                    ]}
                  >
                    <Select
                      className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[160px] h-[40px]"
                      placeholder="Топливо"
                      options={engine.map((i, index) => ({
                        label: i.label,
                        value: i.val,
                        key: `${i.label}-${index}`,
                      }))}
                    />
                  </Form.Item>
                </div>
                <Divider />
                <div className="flex justify-between items-center">
                  <p className="text-[#989898] text-[15px]">Объем</p>
                  <Form.Item
                    className="mb-0"
                    name="volume"
                    rules={[
                      { required: true, message: "Введите объем двигателя" },
                    ]}
                  >
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
                  </Form.Item>
                </div>
                <Divider />
                <div className="flex justify-between items-center">
                  <p className="text-[#989898] text-[15px]">Мощность</p>
                  <Form.Item
                    className="mb-0"
                    name="horsepower"
                    rules={[{ required: true, message: "Введите мощность" }]}
                  >
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
                  </Form.Item>
                </div>
                <Divider />
                {selectedType === "motorcycles" ? (
                  <>
                    <div className="flex justify-between items-center">
                      <p className="text-[#989898] text-[15px]">Привод</p>
                      <Form.Item
                        className="mb-0"
                        name="drive"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, выберите тип привода",
                          },
                        ]}
                      >
                        <Select
                          className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[160px] h-[40px]"
                          placeholder="Привод"
                          options={driveMoto.map((i, index) => ({
                            label: i.val,
                            value: i.val,
                            key: `${i.val}-${index}`,
                          }))}
                        />
                      </Form.Item>
                    </div>
                    <Divider />
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <p className="text-[#989898] text-[15px]">Привод</p>
                      <Form.Item
                        className="mb-0"
                        name="drive"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, выберите тип привода",
                          },
                        ]}
                      >
                        <Select
                          className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[160px] h-[40px]"
                          placeholder="Привод"
                          options={drive.map((i, index) => ({
                            label: i.val,
                            value: i.val,
                            key: `${i.val}-${index}`,
                          }))}
                        />
                      </Form.Item>
                    </div>
                    <Divider />
                  </>
                )}
                <div className="flex justify-between items-center">
                  <p className="text-[#989898] text-[15px]">КПП</p>
                  {selectedType === "motorcycles" ? (
                    <Form.Item
                      className="mb-0"
                      name="transmission"
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, выберите тип КПП",
                        },
                      ]}
                    >
                      <Select
                        className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[160px] h-[40px]"
                        placeholder="КПП"
                        options={kpp.map((i, index) => ({
                          label: i.label,
                          value: i.val,
                          key: `${i.val}-${index}`,
                        }))}
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item
                      className="mb-0"
                      name="checkpoint"
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, выберите тип КПП",
                        },
                      ]}
                    >
                      <Select
                        className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[160px] h-[40px]"
                        placeholder="КПП"
                        options={kpp.map((i, index) => ({
                          label: i.label,
                          value: i.val,
                          key: `${i.val}-${index}`,
                        }))}
                      />
                    </Form.Item>
                  )}
                </div>
                <Divider />
                {selectedType !== "commercial" &&
                  selectedType !== "motorcycles" && (
                    <>
                      <div className="flex justify-between items-center">
                        <p className="text-[#989898] text-[15px]">
                          Колличество дверей
                        </p>
                        <Form.Item className="mb-0" name="doors">
                          <Select
                            className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[160px] h-[40px]"
                            placeholder="Колличество"
                            options={doors.map((i, index) => ({
                              label: i.val,
                              value: i.val,
                              key: `${i.val}-${index}`,
                            }))}
                          />
                        </Form.Item>
                      </div>
                      <Divider />
                    </>
                  )}
                {selectedType === "motorcycles" ? (
                  <>
                    <div className="flex justify-between items-center">
                      <p className="text-[#989898] text-[15px]">Кузов</p>
                      <Form.Item className="mb-0" name="body">
                        <Select
                          className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[200px] h-[40px]"
                          placeholder="Кузов"
                          options={motoType.map((i, index) => ({
                            label: i.label,
                            value: i.value,
                            key: `${i.value}-${index}`,
                          }))}
                        />
                      </Form.Item>
                    </div>
                    <Divider />
                  </>
                ) : (
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#989898] text-[15px]">Кузов</p>
                      <Form.Item className="mb-0" name="body">
                        <Select
                          className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[200px] h-[40px]"
                          placeholder="Кузов"
                          options={carTypes.map((i, index) => ({
                            label: i.label,
                            value: i.value,
                            key: `${i.value}-${index}`,
                          }))}
                        />
                      </Form.Item>
                    </div>
                    <Divider />
                  </div>
                )}
                {selectedType === "motorcycles" ? (
                  <>
                    <div className="flex justify-between items-center">
                      <p className="text-[#989898] text-[15px]">Состояние</p>
                      <Form.Item
                        className="mb-0"
                        name="condition"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, выберите состояние",
                          },
                        ]}
                      >
                        <Select
                          className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[160px] h-[40px]"
                          placeholder="Состояние"
                          options={statement.map((i, index) => ({
                            label: i.label,
                            value: i.val,
                            key: `${i.val}-${index}`,
                          }))}
                        />
                      </Form.Item>
                    </div>
                    <Divider />
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <p className="text-[#989898] text-[15px]">Состояние</p>
                      <Form.Item
                        className="mb-0"
                        name="statement"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, выберите состояние",
                          },
                        ]}
                      >
                        <Select
                          className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[160px] h-[40px]"
                          placeholder="Состояние"
                          options={statement.map((i, index) => ({
                            label: i.label,
                            value: i.val,
                            key: `${i.val}-${index}`,
                          }))}
                        />
                      </Form.Item>
                    </div>
                    <Divider />
                  </>
                )}
                <div className="flex justify-between items-center">
                  <p className="text-[#989898] text-[15px]">Цвет</p>
                  <Form.Item className="mb-0" name="color">
                    <Select
                      className="[&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0 min-w-[160px] h-[40px]"
                      placeholder="Цвет"
                      options={carColors.map((i, index) => ({
                        label: i.value,
                        value: i.value,
                        key: `${i.value}-${index}`,
                      }))}
                    />
                  </Form.Item>
                </div>
                <Divider />
                <Form.Item name={"rate"}>
                  <Radio>В наличии</Radio>
                  <Radio>Под заказ</Radio>
                </Form.Item>
              </>
            )}
            {selectedModel && (
              <>
                <div className="boxShadowC rounded-xl py-6 xl:px-12 my-4 px-4">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Фото</h2>
                    <p className="text-sm text-muted-foreground">
                      Загрузите фото вашего автомобиля четко с разных ракурсов!
                    </p>
                    <Form.Item
                      name="image"
                      valuePropName="value"
                      getValueFromEvent={(e) => {
                        const fileList = e?.fileList;
                        setHasUploadedImages(fileList && fileList.length > 0);
                        return fileList;
                      }}
                      rules={[
                        {
                          required: true,
                          message:
                            "Пожалуйста, загрузите хотя бы одно фото вашего автомобиля",
                        },
                      ]}
                    >
                      <PhotoUpload
                        url={url}
                        setUrl={setUrl}
                        onPhotosChange={(fileList) => {
                          form.setFieldsValue({ image: fileList });
                          setHasUploadedImages(fileList && fileList.length > 0);
                        }}
                        setFileL={setFileL}
                      />
                    </Form.Item>
                  </div>
                  {hasUploadedImages && (
                    <div className="space-y-4 my-5">
                      <h2 className="font-semibold">Видео</h2>
                      <Form.Item>
                        <VideoInput onVideoChange={setVideoUrl} />
                      </Form.Item>
                    </div>
                  )}
                </div>
                <div className="boxShadowC rounded-xl py-6 xl:px-12 my-4 px-4">
                  {/* <Form.Item> */}
                  <p className="font-semibold text-[25px]">Описание</p>
                  <p className="text-sm text-muted-foreground my-2">
                    Не указывайте ссылки на источники, цены, контакты и не
                    предлагайте другие услуги! Объявление не пройдет модерацию
                  </p>
                  <Form.Item>
                    <textarea
                      placeholder="Честно опишите ваше авто "
                      className="!min-h-[130px] bg-muted border-0 mt-2 w-full p-2"
                    />
                  </Form.Item>
                </div>
                <div className="boxShadowC rounded-xl py-6 xl:px-12 my-4 px-4">
                  <div>
                    <p className="text-[25px] text-[#293843]">Цена</p>
                    <Form.Item
                      name={"cost"}
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, введите цену",
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        style={{
                          minWidth: "130px",
                          border: 0,
                          backgroundColor: "#F4F4F4",
                        }}
                        placeholder="Цена"
                        className="flex justify-center items-center w-[100%] h-[40px] [&_.ant-input-number-outlined]:!bg-[#F6F6F6] [&_.ant-input-number-group-addon]:!border-0 [&_.ant-input-number]:border-0  "
                        addonAfter={
                          <Select
                            defaultValue={currency}
                            onChange={handleCurrencyChange}
                          >
                            <Option value="$">$</Option>
                            <Option value="€">€</Option>
                            <Option value="₽">₽</Option>
                          </Select>
                        }
                      />
                    </Form.Item>
                  </div>
                </div>
                <Form.Item>
                  <button
                    className="bg-[#D7EAFF] w-full border-0 text-[#2684E5] text-[15px] font-bold h-[70px] rounded-sm my-3"
                    type="submit"
                  >
                    {loading ? "Загрузка..." : "Опубликовать объявление"}
                  </button>
                </Form.Item>
              </>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewPost;
