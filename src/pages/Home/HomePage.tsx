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
      const rateVal = values.rate === "on" ? "cash" : values.rate;
      const response = await api.post(endpoint, {
        minPrice: values.minPrice,
        maxPrice: values.maxPrice,
        // page: 1,
        // pageSize: 6,
        statement: values.statement,
        rate: rateVal,
        model: values.model,
        country: values.country,
        maxYear: values.maxYear
          ? Math.max(...values.maxYear.map((date: any) => dayjs(date).year()))
          : 0,
      });

      console.log("values.maxYear:", values);
      setFilteredCars(response.data);

      navigate(
        `/catalog?mark=${values.mark}&model=${values.model}&selectedTab=${selectedTab}&rate=${values.rate}&country=${values.country}&minPrice=${values.minPrice}&maxPrice=${values.maxPrice}&minYear=${values.maxYear[0]}&maxYear=${values.maxYear[1]}&count=${buttonLabel}`
      );
      console.log("Filtered cars:", response.data);
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
          : null,
        minPrice: allValues.minPrice,
        maxPrice: allValues.maxPrice,
      });
      console.log("allValues.rate:", allValues);
      console.log("changed All:", allValues);

      setFilteredCars(response.data);

      const buttonLabel = `${response.data.count} Предложений`;
      setButtonLabel(buttonLabel);
    } catch (error) {
      console.error("Error filtering cars:", error);
      console.log("allValues.rate:", allValues);
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
      />
      <p className="text-3xl font-bold mt-12 mb-12">Автомобильный каталог</p>
      <CatalogCards limit={6} filteredCars={filteredCars} />
      <div className="flex justify-end">
        <Button
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
