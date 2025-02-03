import RequestBanner from "@/components/Banners/RequestBanner";
import CarFilterCard from "../../components/CarFilter";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Col, Form, Row } from "antd";
import api from "@/Api/Api";
import dayjs from "dayjs";
import ItemCard from "@/components/Cards/CarCard";
import { mapCarDataToItem } from "@/utils/dataMapper";
import { ICar } from "@/Type/Type";

const Brand = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("selectedTab") || "car";
  const [selectedTab, __] = useState<string>(initialTab);
  const markId = Number(searchParams.get("markId"));
  const [markFil, setMarkFil] = useState<ICar[] | null | undefined>(null);
  const [showFilteredCars, setShowFilteredCars] = useState<boolean>(false);

  const [buttonLabel, setButtonLabel] = useState("Поиск");

  console.log("markId", markId);

  const [form] = Form.useForm();

  const { data: markBrand } = useQuery(["markBrand"], async () => {
    const res = await api.get(`/mark/${markId}?page=1&pageSize=12`);
    console.log("markBrand", res.data);

    const vehicles = res.data?.vehicles || {};

    return [
      ...(vehicles.resultCars || []).map((item: any) => ({
        ...item,
        type: "car",
      })),
      ...(vehicles.resultCommerce || []).map((item: any) => ({
        ...item,
        type: "commerce",
      })),
      ...(vehicles.resultMoto || []).map((item: any) => ({
        ...item,
        type: "moto",
      })),
    ];
  });
  console.log(markBrand);

  const { data: filteredCars, refetch } = useQuery(
    ["filteredCars", searchParams.toString()],
    async () => {
      let endpoint = "";

      if (selectedTab === "car") {
        endpoint = "/cars-filter";
      } else if (selectedTab === "commerce") {
        endpoint = "/commerce-filter";
      } else if (selectedTab === "moto") {
        endpoint = "/moto-filter";
      }

      const params = Object.fromEntries(searchParams);

      const rateVal = params.rate === "on" ? "cash" : params.rate;
      if (params.model) {
        const res = await api.post(endpoint, {
          maxYear: params.maxYear ? dayjs(params.maxYear).year() : undefined,
          minPrice: params.minPrice ? Number(params.minPrice) : undefined,
          maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
          selectedTab: params.selectedTab,
          rate: rateVal,
          model: params.model,
          country: params.country,
        });
        console.log("resdata", res.data);
        setButtonLabel(`${res.data.count} Предложений`);
        return res.data;
      }
      return null;
    },
    {
      enabled: !!searchParams.get("model"),
    }
  );

  const updateQueryParams = (values: any) => {
    const query = { ...Object.fromEntries(searchParams.entries()) };

    if (values.mark) query.mark = values.mark;
    if (values.model) query.model = values.model;
    if (values.selectedTab) query.selectedTab = values.selectedTab;
    if (values.rate && values.rate.length) query.rate = values.rate;
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
      setShowFilteredCars(true);
      await refetch();
    },
    [updateQueryParams, refetch]
  );

  useEffect(() => {
    if (showFilteredCars && filteredCars) {
      setMarkFil(filteredCars.cars);
    } else {
      setMarkFil(markBrand);
    }
  }, [filteredCars, markBrand, showFilteredCars]);

  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams);

    const defaultValues = {
      mark: queryParams.mark || undefined,
      model: queryParams.model || undefined,
      selectedTab: queryParams.selectedTab,
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
  }, [searchParams, form, refetch, selectedTab]);

  console.log("markFil", markFil);

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
        title={"Каталог"}
      />
      <div>
        <Row gutter={[24, 24]} className="py-6">
          {markFil?.map((car: ICar, index: number) => (
            <Col
              key={car.id ? `${car.id}-${index}` : `fallback-${index}`}
              xs={24}
              md={12}
              lg={8}
            >
              <ItemCard item={mapCarDataToItem(car)} />
            </Col>
          ))}
        </Row>
      </div>
      <RequestBanner />
    </div>
  );
};

export default Brand;
