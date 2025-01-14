import { Avatar } from "antd";
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
  return (
    <div className="flex gap-3 h-[60vh] py-4">
      <div className="shadow-lg w-[40%] ">
        <div className="flex">
          <Avatar>{userName?.charAt(0)}</Avatar>
          <div>Imon</div>
        </div>
        <div></div>
      </div>
      <div className="shadow-lg w-[60%]">hhhhh</div>
    </div>
  );
};

export default AccountPage;
