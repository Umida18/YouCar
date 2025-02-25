import { ReactNode, useEffect, useState } from "react";
import Sidebar from "../Account/Sidebar";
import { Col, Row } from "antd";
import ProfilePage from "../Account/sidebarMobile";
import { useNavigate } from "react-router-dom";
// import MessagingPage from "../Account/Chat";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [activeSection, setActiveSection] = useState("favorites");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className=" flex py-5 min-h-[60vh] items-center w-full">
      <div className="w-full xl:block hidden">
        <Row gutter={[20, 20]} style={{ minWidth: "100%" }}>
          <Col xl={6} className="xl:w-auto w-full">
            <div className="">
              <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            </div>
          </Col>
          <Col xl={18} md={24} sm={24}>
            <div className="boxShadowC  rounded-xl py-7 xl:!px-7 px-4 h-full !min-w-full">
              {children}
            </div>
          </Col>
        </Row>
      </div>
      <div className="xl:hidden block w-full">
        <ProfilePage />
      </div>
    </div>
  );
};

export default Layout;
