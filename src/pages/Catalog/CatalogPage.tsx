import CarSelector1 from "../../components/CarFilter";
import CatalogCards from "../../components/CatalogCards/CatalogCards";
import RequestBanner from "../../components/Banners/RequestBanner";
import useScrollToTop from "../../utils/scroll";
import api from "@/Api/Api";
import { Form } from "antd";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useQuery } from "@tanstack/react-query";

dayjs.extend(utc);

const CatalogPage = () => {
  useScrollToTop();
  // const [filteredCars, setFilteredCars] = useState<FilteredAuto | null>(null);
  const [buttonLabel, __] = useState("Поиск");
  const [searchParams, setSearchParams] = useSearchParams();

  const [form] = Form.useForm();

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

  // const handleSubmit = async (values: any) => {
  //   try {
  //     const response = await api.post("/all-filter", {
  //       maxYear: values.maxYear?.[1]
  //         ? dayjs(values.maxYear[1]).year()
  //         : undefined,
  //       minPrice: values.minPrice,
  //       maxPrice: values.maxPrice,
  //       statement: values.statement,
  //       rate: values.rate,
  //       model: values.model,
  //       country: values.country,
  //     });
  //     setFilteredCars(response.data);
  //   } catch (error) {
  //     console.error("Error filtering cars:", error);
  //   }
  // };

  const handleSubmit = useCallback(
    async (values: any) => {
      updateQueryParams(values);
      await refetch;
    },
    [updateQueryParams, refetch]
  );

  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams);

    // const minYearRaw = queryParams.get("minYear");
    // const maxYearRaw = queryParams.get("maxYear");

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

  return (
    <>
      <CarSelector1
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
      <CatalogCards filteredCars={filteredCars} />
      <RequestBanner />
    </>
  );
};

export default CatalogPage;
