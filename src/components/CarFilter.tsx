import {
  Select,
  Checkbox,
  Button,
  Form,
  Row,
  Col,
  FormInstance,
  Input,
  DatePicker,
  InputNumber,
} from "antd";
import { XCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../src/Api/Api";
import { FilteredAuto, IMark } from "../Type/Type";
import { useSearchParams } from "react-router-dom";

interface CarSelectorProps {
  form: FormInstance;
  handleSubmit: (values: any) => void;
  filteredCars: FilteredAuto | null;
  handleFormValuesChange: (_: any, allValues: any) => void;
  buttonLabel: string;
  updateQueryParams: (values: any) => void;
  title?: string | null;
  setButtonLabel: (val: string) => void;
}

const { RangePicker } = DatePicker;

const CarFilterCard: React.FC<CarSelectorProps> = ({
  form,
  handleSubmit,
  handleFormValuesChange,
  buttonLabel,
  updateQueryParams,
  title,
  setButtonLabel,
}) => {
  const [marks, setMarks] = useState<IMark[]>([]);
  const [model, setModel] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRate, setSelectedRate] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarks = async () => {
      const res = await api.post("/before-filter");
      const uniqueMarks = [...new Set(res.data as IMark[])];
      setMarks(uniqueMarks);
    };
    fetchMarks();
  }, []);

  const handleSelectMark = (value: string) => {
    const selectedMark = marks.find((mark) => mark.mark === value);
    if (selectedMark) {
      searchParams.delete("model");
      searchParams.delete("country");

      setSearchParams(searchParams);

      form.setFieldsValue({ model: undefined, country: undefined });

      mutation.mutate({ mark_id: selectedMark.id });
    }
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const statement = queryParams.get("statement") || "all";

    form.setFieldsValue({ statement });
  }, [location.search, form]);

  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams);
    if (queryParams.mark) {
      const selectedMark = marks.find((mark) => mark.mark === queryParams.mark);
      if (selectedMark) {
        mutation.mutate({ mark_id: selectedMark.id });
      }
    }
  }, [searchParams, marks]);

  const handleReset = () => {
    form.resetFields();

    setSearchParams({});
    setButtonLabel("Поиск");
  };

  return (
    <div className=" flex items-center">
      <div className="w-[100%] ">
        <h1 className="text-3xl font-bold mt-12 mb-12 capitalize">
          {title ? title : "Подбор авто"}
        </h1>

        <div className=" rounded-lg space-y-7 boxShadowC px-4 py-10">
          <Form
            form={form}
            layout="vertical"
            className=""
            onFinish={handleSubmit}
            onValuesChange={handleFormValuesChange}
          >
            <div className="flex items-center gap-12 flex-wrap mb-6">
              <Tabs
                value={form.getFieldValue("statement")}
                defaultValue="all"
                className="xl:w-[30%] w-full  h-full"
                onValueChange={(value) => {
                  form.setFieldsValue({ statement: value });
                  const updatedValues = {
                    ...form.getFieldsValue(),
                    statement: value,
                  };
                  updateQueryParams(updatedValues);
                  console.log("Updated values:", updatedValues);
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
                <Form.Item className="mb-0" name="rate">
                  <div className="flex gap-6">
                    <Checkbox
                      checked={selectedRate === "cash"}
                      onChange={(e) => {
                        const value = e.target.checked ? "cash" : undefined;
                        setSelectedRate(value || null);
                        form.setFieldValue("rate", value);
                      }}
                    >
                      В наличии
                    </Checkbox>
                    <Checkbox
                      checked={selectedRate === "credit"}
                      onChange={(e) => {
                        const value = e.target.checked ? "credit" : undefined;
                        setSelectedRate(value || null);
                        form.setFieldValue("rate", value);
                      }}
                    >
                      Под заказ
                    </Checkbox>
                  </div>
                </Form.Item>
              </div>
            </div>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, выберите марку",
                    },
                  ]}
                  name="mark"
                  label="Выберите марку"
                >
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0"
                    placeholder="Марка"
                    style={{
                      width: "100%",
                      height: "63px",
                    }}
                    options={marks.map((i) => ({
                      label: i.mark,
                      value: i.mark,
                      key: i.id,
                    }))}
                    onChange={(value) => handleSelectMark(value)}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, выберите модель",
                    },
                  ]}
                  name="model"
                  label="Выберите модель"
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
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, выберите страну",
                    },
                  ]}
                  name="country"
                  label="Страна"
                >
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] [&_.ant-select-selector]:!border-0"
                    placeholder="Страна"
                    style={{
                      width: "100%",
                      height: "63px",
                    }}
                    options={[...new Set(country)].map((i, index) => ({
                      label: i,
                      value: i,
                      key: `${i}-${index}`,
                    }))}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={4} style={{ width: "20%" }}>
                <Form.Item name={"maxYear"} label="Год">
                  <RangePicker
                    className="[&_.ant-picker]:!border-0 [&_.ant-picker]:!bg-[#F4F4F4] [&_.ant-picker-outlined]:!border-0 [&_.ant-picker-range]:!border-0 "
                    picker="year"
                    id={{
                      start: "startInput",
                      end: "endInput",
                    }}
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
                    <Form.Item name={"minPrice"} className="mb-0 h-full">
                      <InputNumber
                        min={1}
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
                    <Form.Item name={"maxPrice"}>
                      <InputNumber
                        min={1}
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

            <div className="flex justify-end gap-3">
              <Button
                onClick={handleReset}
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
};

export default CarFilterCard;
