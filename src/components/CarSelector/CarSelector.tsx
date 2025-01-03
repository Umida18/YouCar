import { Select, Checkbox, Button, Form, Row, Col } from "antd";
import { XCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CarSelector() {
  const [form] = Form.useForm();

  const handleSubmit = () => {};

  return (
    <div className="min-h-[70vh] flex items-center">
      <div className="w-[100%] ">
        <h1 className="text-3xl font-bold mt-10 mb-14">Подбор авто</h1>

        <div className=" rounded-lg space-y-7 shadow-lg px-4 py-10">
          <div className="flex items-center gap-12 ">
            <Tabs defaultValue="all" className="w-[40%]  h-full">
              <TabsList className="w-full bg-[#F4F4F4] p-0 rounded-xl h-full">
                <TabsTrigger
                  value="all"
                  className="flex-1 h-[57px] data-[state=active]:bg-[#2A333D] data-[state=active]:text-white rounded-xl transition-all"
                >
                  Все
                </TabsTrigger>
                <TabsTrigger
                  value="new"
                  className="flex-1 h-[57px] data-[state=active]:bg-[#2A333D] data-[state=active]:text-white rounded-xl transition-all"
                >
                  Новые
                </TabsTrigger>
                <TabsTrigger
                  value="used"
                  className="flex-1 h-[57px] data-[state=active]:bg-[#2A333D] data-[state=active]:text-white rounded-xl transition-all"
                >
                  С пробегом
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-1 gap-6">
              <Checkbox>В наличии</Checkbox>
              <Checkbox>Под заказ</Checkbox>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"> */}
          <Form layout="horizontal" className="">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item>
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] "
                    defaultValue="Geely"
                    style={{
                      width: "100%",
                      height: "63px",
                    }}
                    options={[{ value: "geely", label: "Geely" }]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item>
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] "
                    defaultValue="Monjaro"
                    style={{
                      width: "100%",
                      height: "63px",
                    }}
                    options={[{ value: "monjaro", label: "Monjaro" }]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item>
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] "
                    defaultValue="Китай"
                    style={{
                      width: "100%",
                      height: "63px",
                    }}
                    options={[{ value: "china", label: "Китай" }]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={4} style={{ width: "20%" }}>
                <Form.Item>
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] "
                    defaultValue="0 - 2024"
                    style={{
                      width: "100%",
                      height: "63px",
                    }}
                    options={[{ value: "0-2024", label: "0 - 2024" }]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item>
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] "
                    defaultValue="3 000 000 - 4 500 000"
                    style={{
                      width: "100%",
                      height: "63px",
                      backgroundColor: "#F4F4F4",
                    }}
                    options={[
                      {
                        value: "3000000-4500000",
                        label: "3 000 000 - 4 500 000",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {/* </div> */}

          <div className="flex justify-end mt-6 gap-3">
            <Button
              style={{ height: "56px" }}
              type="text"
              icon={<XCircle className="h-4 w-4" />}
              className="text-gray-500 hover:text-gray-700"
            >
              Сбросить
            </Button>
            <Button
              style={{
                border: 0,
                backgroundColor: "#2684E5",
                borderRadius: 0,
                color: "white",
                height: "56px",
                width: "187px",
              }}
            >
              Регистрация
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
