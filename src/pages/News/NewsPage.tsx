import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import News from "../../components/News/News";

const NewsPage = () => {
  const breadcrumbItems = [{ label: "Новости", path: "/news" }];
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <News />
    </>
  );
};

export default NewsPage;
