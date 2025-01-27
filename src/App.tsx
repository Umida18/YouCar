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
import Favorites from "./components/Account/Favorites";
import Messages from "./components/Account/Messages";
import Post from "./components/Account/Post";
import Settings from "./components/Account/Settings";
import Tariff from "./components/Account/Tariff";
import Contact from "./pages/Contact/Contact";
import CarsPage from "./pages/Cars/Cars";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
          <Header className="!p-0 bg-transparent h-full">
            <HeaderComponent />
          </Header>
          <Content>
            <div className="xl:!px-14 flex container mx-auto flex-col  px-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cars" element={<CarsPage />} />
                <Route path="/account" element={<AccountPage />}>
                  <Route index element={<Favorites />} />
                  <Route path="/account/favorites" element={<Favorites />} />
                  <Route path="/account/messages" element={<Messages />} />
                  <Route path="/account/post" element={<Post />} />
                  <Route path="/account/tariff" element={<Settings />} />
                  <Route path="/account/settings" element={<Tariff />} />
                </Route>
                <Route
                  path="/productDetailsPage/:id"
                  element={<ProductPage />}
                />
                <Route path="/singleNews/:id" element={<SingleNews />} />
                <Route path="/news" element={<NewsPage />} />
              </Routes>
            </div>
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
