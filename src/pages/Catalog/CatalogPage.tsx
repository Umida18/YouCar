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
import CarSelector from "../../components/Car/CarSelector";

dayjs.extend(utc);

const CatalogPage = () => {
  useScrollToTop();
  const [buttonLabel, setButtonLabel] = useState("Поиск");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("selectedTab") || "car";
  const [selectedTab, setSelectedTab] = useState<string>(initialTab);

  const [form] = Form.useForm();

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
      await refetch;
    },
    [updateQueryParams, refetch]
  );

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

  return (
    <>
      <CarSelector
        form={form}
        handleSubmit={handleSubmit}
        filteredCars={filteredCars}
        handleFormValuesChange={(_, allvalues) => {
          updateQueryParams(allvalues);
          handleSubmit(allvalues);
        }}
        updateQueryParams={updateQueryParams}
        buttonLabel={buttonLabel}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <CatalogCards filteredCars={filteredCars} />
      <RequestBanner />
    </>
  );
};

export default CatalogPage;
