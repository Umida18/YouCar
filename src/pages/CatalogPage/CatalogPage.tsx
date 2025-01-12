import HeaderComponent from "@/components/Header/Header";
import CarSelector1 from "../../components/nn";

import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import FooterComponent from "@/components/Footer/Footer";
import CatalogCards from "../../components/CatalogCards/CatalogCards";

const CatalogPage = () => {
  return (
    <div>
      <Layout style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Header className="!p-0 bg-transparent h-full">
          <HeaderComponent />
        </Header>
        <Content style={{ paddingInline: "48px" }}>
          <CarSelector1
            title={"Каталог"}
            brands={["Toyota", "Honda"]}
            models={["Corolla", "Civic"]}
            countries={["USA", "Japan"]}
            onSearch={(filters) => console.log("Search with filters:", filters)}
            onReset={() => console.log("Reset filters")}
            yearRange={{ min: 0, max: 2024 }}
            priceRange={{ min: 0, max: 0 }}
          />
          <CatalogCards />
        </Content>
        <Footer className="!p-0 bg-transparent ">
          <FooterComponent />
        </Footer>
      </Layout>
    </div>
  );
};

export default CatalogPage;
