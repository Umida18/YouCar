import { INews, ISingleNews } from "../../Type/Type";
import api from "../../Api/Api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Divider, Row } from "antd";
import { MdArrowForwardIos } from "react-icons/md";
import useScrollToTop from "../../utils/scroll";
import RequestBanner from "../../components/Banners/RequestBanner";
import { formatDate } from "../../utils/formatDate";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { GoArrowUpRight } from "react-icons/go";

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
    return res.data;
  });

  const filteredNews = id ? news?.filter((n) => n.id !== Number(id)) : news;

  const handleNews = (id: number) => {
    navigate(`/singleNews/${id}`);
  };

  const breadcrumbItems = [
    {
      label: `${singleNews?.title}`,
      path: "/singleNews/:id",
    },
  ];

  return (
    <div className="py-2">
      <Breadcrumb items={breadcrumbItems} />
      <p className="font-bold text-[26px]">{singleNews?.title}</p>
      <p className="text-[#989898] text-[14px] my-3">
        {formatDate(singleNews?.createdAt as string)}
      </p>
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
            <p className="font-bold text-[20px] text-[#202020]">
              Читайте другие статьи <br /> в нашем блоге:
            </p>
            <div className="mt-6">
              {filteredNews?.slice(0, 3).map((i) => (
                <div className="flex items-center flex-col">
                  <Button
                    onClick={() => handleNews(i.id)}
                    className="flex justify-between border-0 shadow-none w-full items-center p-0 text-[#5A5A5A]"
                  >
                    <p>{i.title}</p>
                    <MdArrowForwardIos className="text-[#5A5A5A]" />
                  </Button>
                  <Divider style={{ marginBlock: 12 }} />
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/news")}
              className="flex text-[#202020] text-[14px] gap-1 mt-5"
            >
              Читать больше новостей
              <GoArrowUpRight className="text-xl mt-1 text-[#202020]" />
            </button>
          </Card>
        </Col>
      </Row>
      <RequestBanner />
    </div>
  );
};

export default SingleNews;
