import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { Divider } from "antd";
// import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const MobileNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const currentUserId = localStorage.getItem("id");
  console.log("notifications", notifications);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("messages");

  const [isRegistered, setIsRegistered] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsRegistered(false);
    } else {
      setIsRegistered(true);
    }
  }, [token]);

  //   useEffect(() => {
  //     if (!isRegistered || !userId) return;

  //     const socket = io("wss://api.youcarrf.ru");

  //     socket.emit("join", userId);

  //     socket.on("notifications", (data) => {
  //       setNotifications(data);
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, [isRegistered, userId]);

  // const formatTimeAgo = (timestamp: any) => {
  //   const now = new Date();
  //   const messageTime = new Date(timestamp);
  //   const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));

  //   if (diffInMinutes < 60) {
  //     return `${diffInMinutes} минут назад`;
  //   } else if (diffInMinutes < 24 * 60) {
  //     const hours = Math.floor(diffInMinutes / 60);
  //     return `${hours} ${
  //       hours === 1 ? "час" : hours < 5 ? "часа" : "часов"
  //     } назад`;
  //   } else {
  //     const days = Math.floor(diffInMinutes / (60 * 24));
  //     return `${days} ${days === 1 ? "день" : days < 5 ? "дня" : "дней"} назад`;
  //   }
  // };

  const handleMessageClick = (chat_id: any, chat_user_id: number) => {
    const socket = io("wss://api.youcarrf.ru");
    socket.emit("message seen", {
      messageId: chat_id,
      receiverId: chat_user_id,
    });
    navigate(`/account/messagingPage/${chat_user_id}`);
  };

  useEffect(() => {
    const f = async () => {
      const res = await axios.post(`https://api.youcarrf.ru/notify`, {
        userId: currentUserId,
      });
      console.log("res", res);

      setNotifications(res.data.notifications);
    };
    f();
  }, []);

  return (
    <div>
      <div className="relative ">
        {/* <button
          onClick={() => setIsOpenBell(!isOpenBell)}
          className={`${
            isOpenBell ? "bg-[#EEEEEE]  !rounded-full" : ""
          }  w-[35px] h-[35px] flex justify-center items-center`}
        >
          <LuBell
            size={22}
            className="hover:text-[#2684E5] transition-colors"
          />
        </button> */}

        {/* {isOpenBell && ( */}
        <div className="flex justify-center mt-6 mb-3">
          <p className="text-2xl font-bold ">Уведомления</p>
        </div>
        <div className="bg-white z-50">
          <div className="flex ">
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-1 py-3 px-4 text-sm font-medium ${
                activeTab === "messages"
                  ? "border-b-2 border-[#2684E5] text-[#2684E5]"
                  : "text-gray-500 border-b-2 border-gray-300 hover:text-gray-700"
              }`}
            >
              Сообщения
            </button>
            <button
              onClick={() => setActiveTab("support")}
              className={`flex-1 py-3 px-4 text-sm font-medium ${
                activeTab === "support"
                  ? "border-b-2 border-[#2684E5] text-[#2684E5]"
                  : "text-gray-500 border-b-2 border-gray-300 hover:text-gray-700"
              }`}
            >
              Тех.Поддержка
            </button>
          </div>

          {!isRegistered ? (
            <div className="p-4">
              <p className="text-sm text-gray-500 text-center">
                Уведомления будут доступны после{" "}
                <Link to={"/register"} className="text-[#2684E5]">
                  регистрации
                </Link>
              </p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4">
              <p className="text-sm text-gray-500 text-center">
                У вас нет уведомлений
              </p>
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto p-3">
              {notifications
                // .filter((note: any) =>
                //   activeTab === "messages"
                //     ? note.type !== "support"
                //     : note.type === "support"
                // )
                .map((notification: any, index: any) => (
                  <div key={notification.id || index}>
                    <div
                      className="p-2 flex gap-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        handleMessageClick(
                          notification.chat_id,
                          notification.chat_user_id
                        )
                      }
                    >
                      <div className="flex items-center justify-center">
                        <MdOutlineMailOutline className="!text-[24px]" />
                      </div>
                      <div className="flex text-sm flex-col w-full justify-start items-start">
                        <div className="flex items-center justify-between w-full">
                          <p className="text-[#293843] font-semibold">
                            {notification.chat_user_name}
                          </p>
                          {/* <p className="text-[#989898]">
                            {notification.created_at
                              ? formatTimeAgo(notification.created_at)
                              : "2 часа назад"}
                          </p> */}
                        </div>
                        <div>
                          <p className="text-[#989898] font-medium mt-1">
                            {
                              notification.unread_messages_texts[
                                notification.unread_messages_texts.length - 1
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    {index < notifications.length - 1 && (
                      <Divider style={{ marginBlock: 10 }} />
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default MobileNotifications;
