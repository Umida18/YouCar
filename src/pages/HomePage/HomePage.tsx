import HeroBanner from "../../components/HeroBanner/HeroBanner";
import FooterComponent from "../../components/Footer/Footer";
import HeaderComponent from "../../components/Header/Header";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
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
    <Layout style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Header className="!p-0 bg-transparent h-full">
        <HeaderComponent />
      </Header>
      <Content style={{ paddingInline: "48px" }}>
        <HeroBanner />
        <CarSelector />
        <CarCatalog />
        <WhyUsSection />
        <AboutCompanyBanner />
        <CarBrands />
        <RequestBanner />
        <News />
        <Reviews />
      </Content>
      <Footer className="!p-0 bg-transparent ">
        <FooterComponent />
      </Footer>
    </Layout>
  );
};
export default HomePage;
