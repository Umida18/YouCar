import { useLocation, useParams } from "react-router-dom";
import { Col, Row, Spin } from "antd";
import PhotoGallery from "../../components/Product/PhotoGallery";
import ProductDetails from "../../components/Product/ProductDetails";
import ProductDescription from "../../components/Product/ProductDescription";
import { mapCarDataToItem } from "../../utils/dataMapper";
import CatalogCards from "../../components/CatalogCards/CatalogCards";
import useScrollToTop from "../../utils/scroll";
import RequestBanner from "../../components/Banners/RequestBanner";
import { useQuery } from "@tanstack/react-query";
import api from "@/Api/Api";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeCars = queryParams.get("type");

  useScrollToTop();

  const { data: car, isLoading } = useQuery(["carsId", id], async () => {
    let endpoint = "";
    if (typeCars === "car") {
      endpoint = "/cars";
    } else if (typeCars === "commerce") {
      endpoint = "/commerce-cars";
    } else if (typeCars === "moto") {
      endpoint = "/motorcycles";
    }
    const res = await api.get(`${endpoint}/${id}`);

    return res.data;
  });

  const { data: markId } = useQuery(
    ["markId", car?.result?.mark_id],
    async () => {
      if (typeof car?.result?.mark_id === "number") {
        const res = await api.get(`/marks/${car?.result?.mark_id}`);
        return res.data;
      }
      return null;
    },
    {
      enabled: typeof car?.result?.mark_id === "number",
    }
  );

  const breadcrumbItems = [
    {
      label: `${markId} ${car?.result.model} ${car?.result.year}`,
      path: "/productDetailsPage/:id",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  return (
    <div className="py-2">
      <Breadcrumb items={breadcrumbItems} />
      {car ? (
        <>
          <Row gutter={[20, 20]}>
            <Col xl={14}>
              <PhotoGallery item={mapCarDataToItem(car?.result)} />
            </Col>
            <Col xl={10}>
              <ProductDetails
                item={mapCarDataToItem(car?.result)}
                userData={car.userData}
              />
            </Col>
          </Row>
          <ProductDescription
            item={mapCarDataToItem(car?.result)}
            userData={car.userData}
          />
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
