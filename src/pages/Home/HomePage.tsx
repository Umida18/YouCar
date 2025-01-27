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
import { useState } from "react";
import api from "../../Api/Api";
import { FilteredAuto } from "../../Type/Type";
import dayjs from "dayjs";

const HomePage = () => {
  const navigate = useNavigate();
  const [filteredCars, setFilteredCars] = useState<FilteredAuto | null>(null);
  const [buttonLabel, setButtonLabel] = useState("Поиск");

  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const response = await api.post("/all-filter", {
        maxYear: Math.max(
          ...values.maxYear.map((date: any) => dayjs(date).year())
        ),
        minPrice: values.minPrice,
        maxPrice: values.maxPrice,
        // page: 1,
        // pageSize: 6,
        statement: values.statement,
        rate: values.rate,
        model: values.model,
        country: values.country,
      });

      console.log("values.maxYear:", values);
      setFilteredCars(response.data);

      navigate(
        `/catalog?mark=${values.mark}&model=${values.model}&statement=${
          values.statement || "all"
        }&rate=${values.rate}&country=${values.country}&minPrice=${
          values.minPrice
        }&maxPrice=${values.maxPrice}&minYear=${values.maxYear[0]}&maxYear=${
          values.maxYear[1]
        }&count=${buttonLabel}`
      );
      console.log("Filtered cars:", response.data);
    } catch (error) {
      console.error("Error filtering cars:", error);
    }
  };

  const handleFormValuesChange = async (_: any, allValues: any) => {
    try {
      const response = await api.post("/all-filter", {
        maxYear: allValues.maxYear,
        minPrice: allValues.minPrice,
        maxPrice: allValues.maxPrice,
        // page: 1,
        // pageSize: 6,
        statement: allValues.statement,
        rate: allValues.rate,
        model: allValues.model,
        country: allValues.country,
      });
      console.log("changed All:", allValues);

      setFilteredCars(response.data);

      const buttonLabel = `${response.data.count} Предложений`;
      setButtonLabel(buttonLabel);
    } catch (error) {
      console.error("Error filtering cars:", error);
    }
  };

  return (
    <>
      <HeroBanner />
      <CarSelector
        form={form}
        handleSubmit={handleSubmit}
        filteredCars={filteredCars}
        handleFormValuesChange={handleFormValuesChange}
        buttonLabel={buttonLabel}
      />
      <>
        <p className="text-3xl font-bold mt-12 mb-12">Автомобильный каталог</p>
        <CatalogCards limit={6} />
        <div className="flex justify-end">
          <Button
            onClick={() => navigate("/catalog")}
            style={{ border: "none", boxShadow: "none" }}
          >
            Перейти в каталог
            <IoIosArrowRoundForward className="text-3xl mt-1" />
          </Button>
        </div>
      </>
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
