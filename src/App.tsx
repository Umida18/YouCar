import { ConfigProvider } from "antd";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage/CatalogPage";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/category" element={<CatalogPage />} />
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
