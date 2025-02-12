import { useQuery } from "@tanstack/react-query";
import api from "../../Api/Api";
import { INews } from "../../Type/Type";
import { Col, Row } from "antd";
import NewsCard from "../Cards/NewsCard";

const News = ({ limit }: { limit?: number }) => {
  const { data: news } = useQuery<INews[]>(["news"], async () => {
    const res = await api.get("/news");
    console.log("news:", res);
    return res.data;
  });

  const newsChan = limit ? news?.slice(0, limit) : news;

  return (
    <div className="  mb-4 py-2">
      <h1 className="text-3xl font-bold mb-14">Новости</h1>
      <Row gutter={[16, 16]}>
        {newsChan?.map((item) => (
          <Col key={item.id} xs={24} md={12} lg={8}>
            <NewsCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
