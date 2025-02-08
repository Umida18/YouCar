import { useState } from "react";
import Sidebar from "../Account/Sidebar";
import Favorites from "../Account/Favorites";
import Messages from "../Account/Messages";
import Post from "../Account/Post";
import Settings from "../Account/Settings";
import Tariff from "../Account/Tariff";
import { Col, Row } from "antd";
import PostsUser from "../Account/Post";

const Layout = () => {
  const [activeSection, setActiveSection] = useState("favorites");

  return (
    <div className=" flex py-5 min-h-[60vh] items-center w-full">
      <div className="w-full">
        <Row gutter={[20, 20]}>
          <Col xl={6}>
            <div className="">
              <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            </div>
          </Col>
          <Col xl={18} className="min-h-full">
            <div className="boxShadowC rounded-xl py-7 !px-7 h-full">
              {activeSection === "favorites" && <Favorites />}
              {activeSection === "messages" && <Messages />}
              {activeSection === "post" && <Post />}
              {activeSection === "settings" && <Settings />}
              {activeSection === "tariff" && <Tariff />}
              {activeSection === "postsUser" && <PostsUser />}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Layout;
