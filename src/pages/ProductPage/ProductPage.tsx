import { ICar } from "../../Type/Type";
import api from "../../Api/Api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";
import ProductDetails from "../../components/ProductDetails/ProductDetails";

const ProductPage = () => {
  const { id } = useParams();

  const { data: car } = useQuery<ICar>(["car"], async () => {
    const res = await api.get(`/cars/${id}`);
    console.log("car11111", res.data);

    return res.data.result;
  });

  return (
    <div className="py-10">
      <Row gutter={[20, 20]}>
        <Col xl={14}>
          <PhotoGallery car={car} />
        </Col>
        <Col xl={10}>
          <ProductDetails car={car} />
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
