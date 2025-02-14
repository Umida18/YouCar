import { Outlet } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const AccountPage = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default AccountPage;
