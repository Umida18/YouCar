import { ConfigProvider } from "antd";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import CatalogPage from "./pages/Catalog/CatalogPage";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import HeaderComponent from "./components/Header/Header";
import FooterComponent from "./components/Footer/Footer";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AccountPage from "./pages/Account/AccountPage";
import ProductPage from "./pages/Product/ProductPage";
import NewsPage from "./pages/News/NewsPage";
import SingleNews from "./pages/News/SingleNews";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
          <Header className="!p-0 bg-transparent h-full">
            <HeaderComponent />
          </Header>
          <Content className="xl:!px-14 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/productDetailsPage/:id" element={<ProductPage />} />
              <Route path="/singleNews/:id" element={<SingleNews />} />
              <Route path="/news" element={<NewsPage />} />
            </Routes>
          </Content>
          <Footer className="!p-0 bg-transparent">
            <FooterComponent />
          </Footer>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
