import { Select, Checkbox, Button, Form, Row, Col } from "antd";
import { XCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface ISelect {
  title: string;
  brands: string[];
  models: string[];
  countries: string[];
  onSearch: (filters: any) => void;
  onReset: () => void;
  yearRange: any;
  priceRange: any;
}

const CarSelector1: React.FC<ISelect> = ({
  title,
  brands,
  models,
  countries,
  onSearch,
  onReset,
  yearRange = { min: 0, max: 2024 },
  priceRange = { min: 0, max: 0 },
}) => {
  const [filters, setFilters] = React.useState({
    brand: "",
    model: "",
    country: "",
    // year: { min: yearRange.min, max: yearRange.max },
    // price: { min: priceRange.min, max: priceRange.max },
  });
  // const [form] = Form.useForm();

  // const handleSubmit = () => {};

  return (
    <div className="min-h-[70vh] flex items-center">
      <div className="w-[100%] ">
        <h1 className="text-3xl font-bold mt-10 mb-14">{title}</h1>

        <div className=" rounded-lg space-y-7 shadow-lg px-4 py-10">
          <div className="flex items-center gap-12 flex-wrap">
            <Tabs defaultValue="all" className="xl:w-[40%] w-full  h-full">
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

          <Form layout="horizontal" className="">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item>
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] "
                    defaultValue={brands}
                    style={{
                      width: "100%",
                      height: "63px",
                    }}
                    options={[{ value: { brands }, label: { brands } }]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item>
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] "
                    defaultValue={models}
                    style={{
                      width: "100%",
                      height: "63px",
                    }}
                    options={[{ value: { models }, label: { models } }]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item>
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] "
                    defaultValue={countries}
                    style={{
                      width: "100%",
                      height: "63px",
                    }}
                    options={[{ value: { countries }, label: { countries } }]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={4} style={{ width: "20%" }}>
                <Form.Item>
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] "
                    defaultValue={yearRange}
                    style={{
                      width: "100%",
                      height: "63px",
                    }}
                    options={[{ value: { yearRange }, label: { yearRange } }]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={5} style={{ width: "20%" }}>
                <Form.Item>
                  <Select
                    className=" [&_.ant-select-selector]:!bg-[#F4F4F4] "
                    defaultValue={priceRange}
                    style={{
                      width: "100%",
                      height: "63px",
                      backgroundColor: "#F4F4F4",
                    }}
                    options={[
                      {
                        value: { priceRange },
                        label: { priceRange },
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div className="flex justify-end mt-6 gap-3">
            <Button
              onClick={() => onReset()}
              style={{ height: "56px" }}
              type="text"
              icon={<XCircle className="h-4 w-4" />}
              className="text-gray-500 hover:text-gray-700"
            >
              Сбросить
            </Button>
            <Button
              onClick={() => onSearch(filters)}
              style={{
                border: 0,
                backgroundColor: "#2684E5",
                borderRadius: 0,
                color: "white",
                height: "56px",
                width: "187px",
              }}
            >
              Поиск
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSelector1;
