import { useQuery } from "@tanstack/react-query";
import api from "../../Api/Api";
import { INews } from "../../Type/Type";
import { Col, Row } from "antd";

const News = () => {
  const { data: news } = useQuery<INews[]>(["news"], async () => {
    const res = await api.get("/news");
    console.log("news:", res);
    return res.data;
  });

  return (
    <div className="xl:min-h-[90vh] my-4 py-4">
      <h1 className="text-3xl font-bold mb-14">Новости</h1>
      <Row gutter={[16, 16]}>
        {news?.slice(0, 3).map((item) => (
          <Col xs={24} md={12} lg={8}>
            <article key={item.id} className="group shadow-lg rounded-2xl">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[300px] object-cover "
                />
              </div>
              <div className="mt-4 space-y-3 p-4 py-5">
                <h2 className="text-xl font-semibold line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 line-clamp-2 max-w-96">
                  {item.content}
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2">
                  Подробнее
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </article>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
