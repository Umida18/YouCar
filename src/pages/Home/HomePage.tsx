import HeroBanner from "../../components/Banners/HeroBanner";
import CarSelector from "../../components/Car/CarSelector";
import WhyUsSection from "../../components/WhyUs/WhyUs";
import CarBrands from "../../components/Car/CarBrand";
import AboutCompanyBanner from "../../components/Banners/AboutCompanyBanner";
import News from "../../components/News/News";
import Reviews from "../../components/Reviews/Reviews";
import RequestBanner from "../../components/Banners/RequestBanner";
import CatalogCards from "../../components/CatalogCards/CatalogCards";
import { Button, Form } from "antd";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../Api/Api";
import { FilteredAuto } from "../../Type/Type";
import dayjs from "dayjs";

const HomePage = () => {
  const navigate = useNavigate();
  const [filteredCars, setFilteredCars] = useState<FilteredAuto | null>(null);
  const [buttonLabel, setButtonLabel] = useState("Поиск");
  const [selectedTab, setSelectedTab] = useState<string>("car");
  // const [changesVal, setChangedVal] = useState<FilteredAuto | null>(null);

  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      let endpoint = "";

      if (selectedTab === "car") {
        endpoint = "/cars-filter";
      } else if (selectedTab === "commerce") {
        endpoint = "/commerce-filter";
      } else if (selectedTab === "moto") {
        endpoint = "/moto-filter";
      }
      const currentYear = new Date().getFullYear();
      const rateVal = values.rate === "on" ? "cash" : values.rate;

      const requestData: any = {
        statement: values.statement,
        rate: rateVal,
        model: values.model,
        maxYear: currentYear,
      };

      if (values.minPrice) requestData.minPrice = values.minPrice;
      if (values.maxPrice) requestData.maxPrice = values.maxPrice;

      if (values.maxYear && values.maxYear.length > 0) {
        requestData.maxYear = Math.max(
          ...values.maxYear.map((date: any) => dayjs(date).year())
        );
      }

      const response = await api.post(endpoint, requestData);

      setFilteredCars(response.data);

      navigate(
        `/catalog?mark=${values.mark || ""}&model=${
          values.model || ""
        }&selectedTab=${selectedTab}&rate=${rateVal || ""}&country=${
          values.country || ""
        }&minPrice=${values.minPrice || ""}&maxPrice=${
          values.maxPrice || ""
        }&minYear=${values.maxYear?.[0] || currentYear}&maxYear=${
          values.maxYear?.[1] || currentYear
        }&count=${buttonLabel}`
      );
    } catch (error) {
      console.error("Error filtering cars:", error);
    }
  };

  const handleFormValuesChange = async (_: any, allValues: any) => {
    try {
      let endpoint = "";

      if (selectedTab === "car") {
        endpoint = "/cars-filter";
      } else if (selectedTab === "commerce") {
        endpoint = "/commerce-filter";
      } else if (selectedTab === "moto") {
        endpoint = "/moto-filter";
      }

      const rateVal = allValues.rate === "on" ? "cash" : allValues.rate;
      const currentYear = new Date().getFullYear();
      const response = await api.post(endpoint, {
        // page: 1,
        // pageSize: 6,
        statement: allValues.statement,
        rate: rateVal,
        model: allValues.model,
        country: allValues.country,
        maxYear: allValues.maxYear
          ? Math.max(
              ...allValues.maxYear.map((date: any) => dayjs(date).year())
            )
          : currentYear,
        minPrice: allValues.minPrice,
        maxPrice: allValues.maxPrice,
      });

      const buttonLabel = `${response.data.count} Предложений`;
      setButtonLabel(buttonLabel);
    } catch (error) {
      console.error("Error filtering cars:", error);
    }
  };

  useEffect(() => {
    const formValues = form.getFieldsValue();

    if (
      formValues &&
      (formValues.statement ||
        formValues.model ||
        formValues.country ||
        formValues.rate)
    ) {
      handleFormValuesChange(null, formValues);
    }
  }, [selectedTab]);

  return (
    <>
      <HeroBanner />
      <CarSelector
        form={form}
        handleSubmit={handleSubmit}
        filteredCars={filteredCars}
        handleFormValuesChange={handleFormValuesChange}
        buttonLabel={buttonLabel}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setButtonLabel={setButtonLabel}
      />
      <p className="text-3xl font-bold mt-12 mb-12 text-[#293843]">
        Автомобильный каталог
      </p>
      <CatalogCards limit={6} filteredCars={filteredCars} />
      <div className="flex justify-end">
        <Button
          className=" underline text-[#293843]"
          onClick={() => navigate("/catalog")}
          style={{ border: "none", boxShadow: "none" }}
        >
          Перейти в каталог
          <IoIosArrowRoundForward className="text-3xl mt-1" />
        </Button>
      </div>
      <div id="about">
        <WhyUsSection />
        <AboutCompanyBanner />
        <CarBrands />
      </div>
      <RequestBanner />
      <News limit={3} />
      <Reviews />
    </>
  );
};
export default HomePage;
