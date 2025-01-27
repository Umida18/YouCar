import {
  Select,
  Checkbox,
  Button,
  Form,
  Row,
  Col,
  FormInstance,
  DatePicker,
  InputNumber,
  Input,
} from "antd";
import { XCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import api from "../../Api/Api";
import { useMutation } from "@tanstack/react-query";
import { FilteredAuto } from "../../Type/Type";

interface CarSelectorProps {
  form: FormInstance;
  handleSubmit: (values: any) => void;
  filteredCars: FilteredAuto | null;
  handleFormValuesChange: (_: any, allValues: any) => void;
  buttonLabel: string;
}
const { RangePicker } = DatePicker;

export default function CarSelector({
  form,
  handleSubmit,
  handleFormValuesChange,
  buttonLabel,
}: CarSelectorProps) {
  const [marks, setMarks] = useState<string[]>([]);
  const [model, setModel] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);

  useEffect(() => {
    const fetchMarks = async () => {
      const res = await api.post("/before-filter");
      console.log("marks", res.data);
      setMarks([...res.data.car, res.data.moto, res.data.commerce]);

      return res.data;
    };
    fetchMarks();
  }, []);

  const handleSelectMark = (value: string) => {
    mutation.mutate({ mark: value });
  };

  const mutation = useMutation(async (data: { mark: string }) => {
    const res = await api.post(`/model-filter?mark=${data.mark}`);
    console.log("fieee", res.data);
    setModel([
      ...new Set([
        ...res.data.cars.models,
        res.data.motorcycles.models,
        res.data.commerceCars.models,
      ]),
    ]);
    setCountry([
      ...new Set([
        ...res.data.cars.countries,
        res.data.motorcycles.countries,
        res.data.commerceCars.countries,
      ]),
    ]);

    return res.data;
  });

  return (
    <div className=" flex items-center">
      <div className="w-[100%] ">
        <h1 className="text-3xl font-bold mt-12 mb-12">Подбор авто</h1>

        <div className=" rounded-lg space-y-7 boxShadowC px-4 py-10">
          <Form
            form={form}
            layout="vertical"
            className=""
            onFinish={handleSubmit}
            onValuesChange={handleFormValuesChange}
          >
            <div className="flex items-center gap-12 flex-wrap mb-12">
              <Tabs
                defaultValue="all"
                className="xl:w-[30%] w-full  h-full"
                onValueChange={(value) => {
                  form.setFieldsValue({ statement: value });
                  console.log("Updated statement:", value);
                }}
              >
                <Form.Item name="statement" hidden>
                  <Input />
                </Form.Item>
                <TabsList className="w-full bg-[#F4F4F4] p-0 rounded-xl h-full">
                  <Form.Item className="w-full mb-0">
                    <TabsTrigger
                      value="all"
                      className="flex-1 w-full h-[57px] data-[state=active]:bg-[#2A333D] data-[state=active]:text-white rounded-xl transition-all"
                    >
                      Все
                    </TabsTrigger>
                  </Form.Item>

                  <Form.Item className="w-full mb-0">
                    <TabsTrigger
                      value="new"
                      className="flex-1 h-[57px] w-full data-[state=active]:bg-[#2A333D] data-[state=active]:text-white rounded-xl transition-all"
                    >
                      Новые
                    </TabsTrigger>
                  </Form.Item>

                  <Form.Item className="w-full mb-0">
                    <TabsTrigger
                      value="used"
                      className="flex-1 h-[57px] w-full data-[state=active]:bg-[#2A333D] data-[state=active]:text-white rounded-xl transition-all"
                    >
                      С пробегом
                    </TabsTrigger>
                  </Form.Item>
                </TabsList>
              </Tabs>

              <div className="flex flex-1 gap-6">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Выберите хотя бы один вариант",
                    },
                  ]}
                  className="mb-0"
                  name="rate"
                >
                  <Checkbox.Group>
                    <Checkbox value="cash">В наличии</Checkbox>
                    <Checkbox value="credit">Под заказ</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </div>
            </div>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item
                  name="mark"
                  label="Выберите марку"
                  rules={[
                    { required: true, message: "Пожалуйста, выберите марку" },
                  ]}
                >
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0"
                    placeholder="Марка"
                    style={{ width: "100%", height: "63px" }}
                    options={marks.map((i) => ({ label: i, value: i }))}
                    onChange={handleSelectMark}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item
                  name="model"
                  label="Выберите модель"
                  rules={[
                    { required: true, message: "Пожалуйста, выберите модель" },
                  ]}
                >
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0"
                    placeholder="Модель"
                    style={{ width: "100%", height: "63px" }}
                    options={[...new Set(model)].map((i, index) => ({
                      label: i,
                      value: i,
                      key: `${i}-${index}`,
                    }))}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item
                  name="country"
                  label="Страна"
                  rules={[
                    { required: true, message: "Пожалуйста, выберите страну" },
                  ]}
                >
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0"
                    placeholder="Страна"
                    style={{ width: "100%", height: "63px" }}
                    options={[...new Set(country)].map((i, index) => ({
                      label: i,
                      value: i,
                      key: `${i}-${index}`,
                    }))}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={4} style={{ width: "20%" }}>
                <Form.Item name="maxYear" label="Год">
                  <RangePicker
                    className="[&_.ant-picker]:!border-0 [&_.ant-picker]:!bg-[#F4F4F4] [&_.ant-picker-outlined]:!border-0 [&_.ant-picker-range]:!border-0"
                    picker="year"
                    id={{ start: "startInput", end: "endInput" }}
                    style={{
                      width: "100%",
                      height: "63px",
                      backgroundColor: "#F4F4F4",
                      border: 0,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item label="Цена">
                  <div className="flex flex-row gap-1">
                    <Form.Item
                      name="minPrice"
                      className="mb-0 h-full"
                      rules={[
                        { required: true, message: "Введите минимальную цену" },
                        {
                          type: "number",
                          min: 0,
                          message: "Цена должна быть больше 0",
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        style={{
                          width: "100%",
                          height: "63px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: 0,
                          backgroundColor: "#F4F4F4",
                        }}
                        placeholder="От"
                      />
                    </Form.Item>
                    <span className="flex py-5">-</span>
                    <Form.Item
                      name="maxPrice"
                      rules={[
                        {
                          required: true,
                          message: "Введите максимальную цену",
                        },
                        {
                          type: "number",
                          min: 0,
                          message: "Цена должна быть больше 0",
                        },
                      ]}
                    >
                      <InputNumber
                        style={{
                          width: "100%",
                          height: "63px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: 0,
                          backgroundColor: "#F4F4F4",
                        }}
                        placeholder="До"
                      />
                    </Form.Item>
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-end mt-6 gap-3">
              <Button
                onClick={() => form.resetFields()}
                style={{ height: "56px" }}
                type="text"
                icon={<XCircle className="h-4 w-4" />}
                className="text-gray-500 hover:text-gray-700"
              >
                Сбросить
              </Button>
              <Button
                htmlType="submit"
                style={{
                  border: 0,
                  backgroundColor: "#2684E5",
                  borderRadius: 0,
                  color: "white",
                  height: "56px",
                  width: "187px",
                }}
              >
                {buttonLabel}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
