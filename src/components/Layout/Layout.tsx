import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Favorites from "../Favorites/Favorites";
import Messages from "../Messages/Messages";
import Post from "../Post/Post";
import Settings from "../Settings/Settings";
import Tariff from "../Tariff/Tariff";
import { Col, Row } from "antd";

const Layout = () => {
  const [activeSection, setActiveSection] = useState("favorites");

  return (
    <div className=" flex py-5 min-h-[60vh] items-center w-full">
      <div className="w-full">
        <Row gutter={[36, 30]}>
          <Col xl={6}>
            <Sidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </Col>
          <Col xl={18} className="boxShadowC rounded-xl py-7 !px-7">
            {activeSection === "favorites" && <Favorites />}
            {activeSection === "messages" && <Messages />}
            {activeSection === "post" && <Post />}
            {activeSection === "settings" && <Settings />}
            {activeSection === "tariff" && <Tariff />}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Layout;
