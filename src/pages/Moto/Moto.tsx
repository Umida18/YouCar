import { Col, Form, Row } from "antd";
import api from "../../Api/Api";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "@/components/Cards/CarCard";
import { mapCarDataToItem } from "@/utils/dataMapper";
import { ICar } from "@/Type/Type";
import CarFilterCard from "../../components/CarFilter";
import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

const MotoPage = () => {
  const [buttonLabel, setButtonLabel] = useState("Поиск");
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();

  const { data: car } = useQuery<ICar[]>(["moto"], async () => {
    const res = await api.get("/motorcycles");
    return res.data;
  });

  const { data: filteredCars, refetch } = useQuery(
    ["filteredCars", searchParams.toString()],
    async () => {
      const params = Object.fromEntries(searchParams);
      const res = await api.post("/all-filter", {
        maxYear: params.maxYear ? dayjs(params.maxYear).year() : undefined,
        minPrice: params.minPrice ? Number(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
        statement: params.statement,
        rate: params.rate ? params.rate.split(",") : undefined,
        model: params.model,
        country: params.country,
      });
      console.log("resdata", res.data);
      setButtonLabel(`${res.data.count} Предложений`);
      return res.data;
    },
    {
      enabled: searchParams.toString() !== "",
    }
  );

  const updateQueryParams = (values: any) => {
    const query: Record<string, string | any> = {};

    if (values.mark) query.mark = values.mark;
    if (values.model) query.model = values.model;
    if (values.statement) query.statement = values.statement;
    if (values.rate && values.rate.length) query.rate = values.rate.join(",");
    if (values.country) query.country = values.country;
    if (values.minPrice) query.minPrice = values.minPrice.toString();
    if (values.maxPrice) query.maxPrice = values.maxPrice.toString();
    if (values.maxYear?.[0]) query.minYear = dayjs(values.maxYear[0]).format();
    if (values.maxYear?.[1]) query.maxYear = dayjs(values.maxYear[1]).format();

    setSearchParams(query);
  };

  const handleSubmit = useCallback(
    async (values: any) => {
      updateQueryParams(values);
      await refetch;
    },
    [updateQueryParams, refetch]
  );

  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams);

    const defaultValues = {
      mark: queryParams.mark || undefined,
      model: queryParams.model || undefined,
      statement: queryParams.statement || "all",
      rate: queryParams.rate ? queryParams.rate.split(",") : undefined,
      country: queryParams.country || undefined,
      minPrice: queryParams.minPrice ? Number(queryParams.minPrice) : undefined,
      maxPrice: queryParams.maxPrice ? Number(queryParams.maxPrice) : undefined,
      maxYear: [
        queryParams.minYear ? dayjs(queryParams.minYear) : undefined,
        queryParams.maxYear ? dayjs(queryParams.maxYear) : undefined,
      ].filter(Boolean),
    };

    form.setFieldsValue(defaultValues);
    if (Object.keys(queryParams).length > 0) {
      refetch();
    }
  }, [searchParams, form, refetch]);

  const carsRender = useMemo(() => {
    if (filteredCars) {
      return [
        ...(filteredCars.cars || []).map((item: ICar) => ({
          ...item,
          type: "car",
          uniqueId: `${item.id}-cars`,
        })),
        ...(filteredCars.motorcycles || []).map((item: ICar) => ({
          ...item,
          type: "moto",
          uniqueId: `${item.id}-motorcycles`,
        })),
        ...(filteredCars.commerce || []).map((item: ICar) => ({
          ...item,
          type: "commerce",
          uniqueId: `${item.id}-commerce`,
        })),
      ];
    }
    return car || [];
  }, [filteredCars, car]);

  return (
    <div>
      <CarFilterCard
        form={form}
        handleSubmit={handleSubmit}
        filteredCars={filteredCars}
        handleFormValuesChange={(_, allvalues) => {
          updateQueryParams(allvalues);
          handleSubmit(allvalues);
        }}
        updateQueryParams={updateQueryParams}
        buttonLabel={buttonLabel}
      />
      <div>
        <Row gutter={[24, 24]} className="py-6">
          {carsRender?.map((car, index) => (
            <Col
              key={car.id ? `${car.id}-${index}` : `fallback-${index}`}
              xs={24}
              md={12}
              lg={8}
            >
              <ItemCard item={mapCarDataToItem(car)} type={"moto"} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MotoPage;
