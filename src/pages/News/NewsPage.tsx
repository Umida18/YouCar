import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import News from "../../components/News/News";
import SEO from "@/components/Seo/Seo";

const NewsPage = () => {
  const breadcrumbItems = [{ label: "Новости", path: "/news" }];
  return (
    <>
      <SEO
        title="Новости в мире автомобилей | YouCar"
        description="Читайте свежие новости о последних тенденциях и событиях в мире автомобилей на YouCar. Узнавайте первыми о новых моделях, тест-драйвах и новинках автопрома!"
      />
      <Breadcrumb items={breadcrumbItems} />
      <News />
    </>
  );
};

export default NewsPage;
