import HeroBanner from "../../components/Banners/HeroBanner";
import CarSelector from "../../components/Car/CarSelector";
import WhyUsSection from "../../components/WhyUs/WhyUs";
import CarBrands from "../../components/Car/CarBrand";
import AboutCompanyBanner from "../../components/Banners/AboutCompanyBanner";
import News from "../../components/News/News";
import Reviews from "../../components/Reviews/Reviews";
import RequestBanner from "../../components/Banners/RequestBanner";
import CatalogCards from "../../components/CatalogCards/CatalogCards";

const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <CarSelector />
      <CatalogCards limit={6} />
      <WhyUsSection />
      <AboutCompanyBanner />
      <CarBrands />
      <RequestBanner />
      <News />
      <Reviews />
    </>
  );
};
export default HomePage;
