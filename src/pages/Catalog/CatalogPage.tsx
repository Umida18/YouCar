import CarSelector1 from "../../components/CarFilter";
import CatalogCards from "../../components/CatalogCards/CatalogCards";
import RequestBanner from "../../components/Banners/RequestBanner";
import useScrollToTop from "../../utils/scroll";
import api from "@/Api/Api";
import { Form } from "antd";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FilteredAuto } from "@/Type/Type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const CatalogPage = () => {
  useScrollToTop();
  const [filteredCars, setFilteredCars] = useState<FilteredAuto | null>(null);
  const [buttonLabel, __] = useState("Поиск");
  const [searchParams, setSearchParams] = useSearchParams();

  const [form] = Form.useForm();

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

  const handleSubmit = async (values: any) => {
    try {
      const response = await api.post("/all-filter", {
        maxYear: values.maxYear?.[1]
          ? dayjs(values.maxYear[1]).year()
          : undefined,
        minPrice: values.minPrice,
        maxPrice: values.maxPrice,
        statement: values.statement,
        rate: values.rate,
        model: values.model,
        country: values.country,
      });
      setFilteredCars(response.data);
    } catch (error) {
      console.error("Error filtering cars:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const minYearRaw = queryParams.get("minYear");
    const maxYearRaw = queryParams.get("maxYear");

    const defaultValues = {
      mark: queryParams.get("mark") || undefined,
      model: queryParams.get("model") || undefined,
      statement: queryParams.get("statement") || "all",
      rate: queryParams.get("rate")
        ? queryParams.get("rate")!.split(",")
        : undefined,
      country: queryParams.get("country") || undefined,
      minPrice: queryParams.get("minPrice")
        ? Number.parseInt(queryParams.get("minPrice") as string, 10)
        : undefined,
      maxPrice: queryParams.get("maxPrice")
        ? Number.parseInt(queryParams.get("maxPrice") as string, 10)
        : undefined,
      maxYear: [
        minYearRaw ? dayjs(minYearRaw) : undefined,
        maxYearRaw ? dayjs(maxYearRaw) : undefined,
      ].filter(Boolean),
    };

    form.setFieldsValue(defaultValues);
  }, [searchParams]);

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
