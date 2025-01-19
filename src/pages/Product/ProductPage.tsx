import { ICar } from "../../Type/Type";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import PhotoGallery from "../../components/Product/PhotoGallery";
import ProductDetails from "../../components/Product/ProductDetails";
import ProductDescription from "../../components/Product/ProductDescription";
import { mapCarDataToItem } from "../../utils/dataMapper";
import CatalogCards from "../../components/CatalogCards/CatalogCards";
import { useQuery } from "@tanstack/react-query";
import api from "../../Api/Api";
import useScrollToTop from "../../utils/scroll";
import RequestBanner from "../../components/Banners/RequestBanner";

const ProductPage = () => {
  const { id } = useParams();
  useScrollToTop();

  const { data: car } = useQuery<ICar>(["car", id], async () => {
    const res = await api.get(`/cars/${id}`);
    console.log("car data", res.data);
    return res.data.result;
  });

  return (
    <div className="py-10">
      {car ? (
        <>
          <Row gutter={[20, 20]}>
            <Col xl={14}>
              <PhotoGallery item={mapCarDataToItem(car)} />
            </Col>
            <Col xl={10}>
              <ProductDetails item={mapCarDataToItem(car)} />
            </Col>
          </Row>
          <ProductDescription item={mapCarDataToItem(car)} />
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
