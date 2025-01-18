import { ICar } from "../../Type/Type";
import api from "../../Api/Api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import PhotoGallery from "../../components/Product/PhotoGallery";
import ProductDetails from "../../components/Product/ProductDetails";
import ProductDescription from "../../components/Product/ProductDescription";
import { mapCarDataToItem } from "../../utils/dataMapper";

const ProductPage = () => {
  const { id } = useParams();

  const { data: car } = useQuery<ICar>(["car"], async () => {
    const res = await api.get(`/cars/${id}`);
    console.log("car11111", res.data);

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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;
