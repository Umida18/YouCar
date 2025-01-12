import HeroBanner from "../../components/HeroBanner/HeroBanner";
import CarSelector from "../../components/CarSelector/CarSelector";
import CarCatalog from "../../components/CarCatalog/CarCatalog";
import WhyUsSection from "../../components/WhyUs/WhyUs";
import CarBrands from "../../components/CarBrand/CarBrand";
import AboutCompanyBanner from "../../components/AboutCompanyBanner/AboutCompanyBanner";
import News from "../../components/News/News";
import Reviews from "../../components/Reviews/Reviews";
import RequestBanner from "../../components/RequestBanner/RequestBanner";

const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <CarSelector />
      <CarCatalog />
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
