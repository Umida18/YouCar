import CatalogCards from "../../components/CatalogCards/CatalogCards";
import RequestBanner from "../../components/Banners/RequestBanner";
import useScrollToTop from "../../utils/scroll";
import api from "@/Api/Api";
import { Form } from "antd";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useQuery } from "@tanstack/react-query";
import CarSelector from "../../components/Car/CarSelector";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

dayjs.extend(utc);

const CatalogPage = () => {
  useScrollToTop();
  const [buttonLabel, setButtonLabel] = useState("Поиск");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("selectedTab") || "car";
  const [selectedTab, setSelectedTab] = useState<string>(initialTab);
  const country = searchParams.get("country");

  const [currentPage, setCurrentPage] = useState(1);

  const [form] = Form.useForm();

  const { data: filteredCars, refetch } = useQuery(
    ["filteredCars", searchParams.toString(), currentPage],
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
      const currentYear = new Date().getFullYear();
      if (params.model && params.country) {
        const res = await api.post(endpoint, {
          maxYear: params.maxYear ? dayjs(params.maxYear).year() : currentYear,
          minPrice: params.minPrice ? Number(params.minPrice) : undefined,
          maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
          page: currentPage,
          // selectedTab: params.selectedTab,
          rate: rateVal,
          model: params.model,
          country: params.country,
        });
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
    if (values.currentPage) query.currentPage = values.currentPage;
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
      currentPage: queryParams.currentPage,
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

  const breadcrumbItems = [{ label: "Каталог", path: "/catalog" }];

  const onlyCountryAndTabExist =
    selectedTab &&
    country &&
    // Object.keys(searchParamsObj) &&
    searchParams.toString() === `country=${country}&selectedTab=${selectedTab}`;

  const { data: countries } = useQuery(
    ["countries", selectedTab, country],
    async () => {
      let endpoint = "";
      let dataType = "";

      if (selectedTab === "car") {
        endpoint = `/country-cars?name=${country}`;
        dataType = "cars";
      } else if (selectedTab === "commerce") {
        endpoint = `/country-commerce?name=${country}`;
        dataType = "commerce";
      } else if (selectedTab === "moto") {
        endpoint = `/country-moto?name=${country}`;
        dataType = "motorcycles";
      }

      const res = await api.get(endpoint);

      let returnData = { [dataType]: res.data };

      return returnData;
    },
    {
      enabled: !!onlyCountryAndTabExist,
    }
  );

  const data = useMemo(
    () => countries || filteredCars,
    [countries, filteredCars]
  );

  useEffect(() => {
    setSelectedTab(initialTab);
  }, [initialTab]);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <CarSelector
        form={form}
        handleSubmit={handleSubmit}
        filteredCars={data}
        handleFormValuesChange={(_, allvalues) => {
          updateQueryParams(allvalues);
          handleSubmit(allvalues);
        }}
        updateQueryParams={updateQueryParams}
        buttonLabel={buttonLabel}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        title={"Каталог"}
        setButtonLabel={setButtonLabel}
      />
      <CatalogCards
        filteredCars={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <RequestBanner />
    </>
  );
};

export default CatalogPage;
