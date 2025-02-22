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
import RequestBanner from "../../components/Banners/RequestBanner";
import PaginationComponent from "@/components/Pagination/Pagination";

const CarsPage = () => {
  const [buttonLabel, setButtonLabel] = useState("Поиск");
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const [form] = Form.useForm();

  const { data: car } = useQuery<ICar[]>(["car"], async () => {
    const res = await api.get(`/cars?page=${currentPage}&pageSize=${12}`);
    return res.data;
  });

  const { data: filteredCars, refetch } = useQuery(
    ["filteredCars", searchParams.toString()],
    async () => {
      const params = Object.fromEntries(searchParams);
      const currentYear = new Date().getFullYear();

      const rateVal = params.rate === "on" ? "cash" : params.rate;
      if (params.model && params.country) {
        const res = await api.post("/all-filter", {
          maxYear: params.maxYear ? dayjs(params.maxYear).year() : currentYear,
          minPrice: params.minPrice ? Number(params.minPrice) : undefined,
          maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
          statement: params.statement,
          rate: rateVal ? rateVal : undefined,
          model: params.model,
          country: params.country,
          page: currentPage,
        });
        setButtonLabel(`${res.data.count} Предложений`);
        return res.data;
      }
      return null;
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
    if (values.rate && values.rate.length) query.rate = values.rate;
    if (values.country) query.country = values.country;
    if (values.minPrice) query.minPrice = values.minPrice.toString();
    if (values.maxPrice) query.maxPrice = values.maxPrice.toString();
    if (values.maxYear?.[0]) query.minYear = dayjs(values.maxYear[0]).format();
    if (values.maxYear?.[1]) query.maxYear = dayjs(values.maxYear[1]).format();

    query.page = values.currentPage || 1;

    setSearchParams(query);
  };

  const handleSubmit = useCallback(
    async (values: any) => {
      updateQueryParams(values);
      await refetch();
    },
    [updateQueryParams, refetch, currentPage]
  );

  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams);
    const page = Number(queryParams.page) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams);

    const defaultValues = {
      mark: queryParams.mark || undefined,
      model: queryParams.model || undefined,
      statement: queryParams.statement || "all",
      rate: queryParams.rate ? queryParams.rate : undefined,
      country: queryParams.country || undefined,
      minPrice: queryParams.minPrice ? Number(queryParams.minPrice) : undefined,
      maxPrice: queryParams.maxPrice ? Number(queryParams.maxPrice) : undefined,
      maxYear: [
        queryParams.minYear ? dayjs(queryParams.minYear) : undefined,
        queryParams.maxYear ? dayjs(queryParams.maxYear) : undefined,
      ].filter(Boolean),

      page: Number(queryParams.page) || 1,
      pageSize: Number(queryParams.pageSize) || pageSize,
    };

    setPageSize(Number(queryParams.pageSize) || pageSize);
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

  const buttonAll = Math.ceil(
    filteredCars?.count
      ? filteredCars?.count / 12
      : car
      ? car?.length / 12
      : filteredCars?.count / 12
  );
  const buttonsPage = Array.from(
    { length: buttonAll },
    (_, index) => index + 1
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const queryParams = Object.fromEntries(searchParams);
    setSearchParams({ ...queryParams, page: page.toString() });
  };

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
        setButtonLabel={setButtonLabel}
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
              <ItemCard item={mapCarDataToItem(car)} type={"car"} />
            </Col>
          ))}
        </Row>
      </div>
      <div className="">
        <PaginationComponent
          buttonsPage={buttonsPage}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      </div>
      <RequestBanner />
    </div>
  );
};

export default CarsPage;
