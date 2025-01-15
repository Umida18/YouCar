import { ConfigProvider } from "antd";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import HeaderComponent from "./components/Header/Header";
import FooterComponent from "./components/Footer/Footer";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import AccountPage from "./pages/AccountPage/AccountPage";

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
