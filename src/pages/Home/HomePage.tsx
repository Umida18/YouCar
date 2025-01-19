import HeroBanner from "../../components/Banners/HeroBanner";
import CarSelector from "../../components/Car/CarSelector";
import WhyUsSection from "../../components/WhyUs/WhyUs";
import CarBrands from "../../components/Car/CarBrand";
import AboutCompanyBanner from "../../components/Banners/AboutCompanyBanner";
import News from "../../components/News/News";
import Reviews from "../../components/Reviews/Reviews";
import RequestBanner from "../../components/Banners/RequestBanner";
import CatalogCards from "../../components/CatalogCards/CatalogCards";
import { Button } from "antd";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeroBanner />
      <CarSelector />
      <>
        <p className="text-3xl font-bold mt-10 mb-10">Автомобильный каталог</p>
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
      <WhyUsSection />
      <AboutCompanyBanner />
      <CarBrands />
      <RequestBanner />
      <News limit={3} />
      <Reviews />
    </>
  );
};
export default HomePage;
