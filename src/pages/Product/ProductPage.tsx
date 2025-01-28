import { useLocation } from "react-router-dom";
import { Col, Row } from "antd";
import PhotoGallery from "../../components/Product/PhotoGallery";
import ProductDetails from "../../components/Product/ProductDetails";
import ProductDescription from "../../components/Product/ProductDescription";
import { mapCarDataToItem } from "../../utils/dataMapper";
import CatalogCards from "../../components/CatalogCards/CatalogCards";
import useScrollToTop from "../../utils/scroll";
import RequestBanner from "../../components/Banners/RequestBanner";

const ProductPage = () => {
  // const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mark = queryParams.get("mark");
  const model = queryParams.get("model");
  const car = location.state?.item;
  useScrollToTop();

  const carr = car?.mark === mark && car.model === model ? car : null;

  return (
    <div className="py-10">
      {carr ? (
        <>
          <Row gutter={[20, 20]}>
            <Col xl={14}>
              <PhotoGallery item={mapCarDataToItem(carr)} />
            </Col>
            <Col xl={10}>
              <ProductDetails item={mapCarDataToItem(carr)} />
            </Col>
          </Row>
          <ProductDescription item={mapCarDataToItem(carr)} />
        </>
      ) : (
        <p>Car not found!</p>
      )}
      <div className="my-12">
        <p className="text-3xl font-bold mt-10 mb-6">Похожие</p>
        <CatalogCards limit={3} />
      </div>
      <RequestBanner />
    </div>
  );
};

export default ProductPage;
