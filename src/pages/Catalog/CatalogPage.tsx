import CarSelector1 from "../../components/CarFilter";
import CatalogCards from "../../components/CatalogCards/CatalogCards";
import RequestBanner from "../../components/Banners/RequestBanner";
import useScrollToTop from "../../utils/scroll";

const CatalogPage = () => {
  useScrollToTop();
  return (
    <>
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
      <RequestBanner />
    </>
  );
};

export default CatalogPage;
