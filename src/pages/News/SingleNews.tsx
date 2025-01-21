import { INews, ISingleNews } from "../../Type/Type";
import api from "../../Api/Api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Divider, Row } from "antd";
import { MdArrowOutward } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import useScrollToTop from "../../utils/scroll";
import RequestBanner from "../../components/Banners/RequestBanner";

const SingleNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useScrollToTop();

  const { data: singleNews } = useQuery<ISingleNews>(
    ["singleNews", id],
    async () => {
      const res = await api.get(`/news/${id}`);
      console.log("news", singleNews);
      return res.data;
    }
  );

  const { data: news } = useQuery<INews[]>(["news"], async () => {
    const res = await api.get("/news");
    console.log("news:", res);
    return res.data;
  });

  const filteredNews = id ? news?.filter((n) => n.id !== Number(id)) : news;

  const handleNews = (id: number) => {
    navigate(`/singleNews/${id}`);
  };

  return (
    <div className="py-12">
      <p className="font-bold text-[26px]">{singleNews?.title}</p>
      <p className="text-[#989898] text-[14px] my-5">{singleNews?.createdAt}</p>
      <Row gutter={[36, 36]}>
        <Col sm={24} lg={24} xl={17}>
          <div className="my-4">
            <img
              className="rounded-2xl mb-5 w-full"
              src={singleNews?.image}
              alt=""
            />
            <p className="text-[#989898] text-[16px]">{singleNews?.content}</p>
          </div>
        </Col>
        <Col sm={24} lg={24} xl={7}>
          <Card className="my-4">
            <p className="font-bold text-[20px]">
              Читайте другие статьи в нашем блоге:
            </p>
            <div className="mt-6">
              {filteredNews?.slice(0, 3).map((i) => (
                <div className="flex items-center flex-col">
                  <Button
                    onClick={() => handleNews(i.id)}
                    className="flex justify-between border-0 shadow-none w-full items-center p-0"
                  >
                    <p>{i.title}</p>
                    <MdArrowForwardIos />
                  </Button>
                  <Divider />
                </div>
              ))}
            </div>

            <Button
              onClick={() => navigate("/news")}
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
                padding: 0,
                marginTop: 10,
              }}
            >
              Читать больше новостей
              <MdArrowOutward className="text-xl " />
            </Button>
          </Card>
        </Col>
      </Row>
      <RequestBanner />
    </div>
  );
};

export default SingleNews;
