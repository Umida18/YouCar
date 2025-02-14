import { ReactNode, useState } from "react";
import Sidebar from "../Account/Sidebar";
import { Col, Row } from "antd";
// import MessagingPage from "../Account/Chat";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
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
          <Col xl={18} className="min-h-full w-full">
            <div className="boxShadowC rounded-xl py-7 xl:!px-7 px-4 h-full">
              {children}
              {/* {activeSection === "favorites" && <Favorites />}
              {activeSection === "messages" && <Messages />}
              {activeSection === "post" && <Post />}
              {activeSection === "settings" && <Settings />}
              {activeSection === "tariff" && <Tariff />}
              {activeSection === "postsUser" && <PostsUser />} */}
              {/* {activeSection === "messagingPage/:id" && <MessagingPage />} */}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Layout;
