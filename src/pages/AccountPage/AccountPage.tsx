import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [_, setIsRegistered] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  // const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const registered = () => {
      const name = localStorage.getItem("name");
      if (token) {
        setIsRegistered(true);
        setUserName(name);
      } else {
        setIsRegistered(false);
      }
    };

    registered();
  }, [token]);
  return <Layout />;
};

export default AccountPage;
