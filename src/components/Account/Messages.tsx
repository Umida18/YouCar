import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io, type Socket } from "socket.io-client";
import axios from "axios";
// import { Check } from "lucide-react";
import { Avatar } from "antd";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { GoBellSlash } from "react-icons/go";

interface Chat {
  chat_id: string;
  chat_user_id: number;
  chat_user_name: string;
  create_at: string;
  last_message: any;
  last_message_time: any;
  mute_type: boolean;
  unread_messages_count: string;
  last_message_status: string;
}

interface Message {
  chat_id: string;
  sender_id: number;
  status: "sent" | "seen";
  updatedAt: string;
}

export default function Messages() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("id");
  const [_, setMessages] = useState<Message[]>([]);
  console.log("chat11111s", chats);

  useEffect(() => {
    socketRef.current = io("wss://api.youcarrf.ru", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 5000,
    });

    const socket = socketRef.current;

    socket.on("connection", () => {
      console.log("Connected to socket server");
      if (currentUserId) {
        socket.emit("join", currentUserId);
      }
    });

    socket.on("receive message", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setError("Failed to connect to chat server. Please try again later.");
    });

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("receive message");
        socket.off("connect_error");
        socket.disconnect();
      }
    };
  }, [currentUserId]);

  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUserId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.youcarrf.ru/chat/users/${currentUserId}`
        );

        if (response.status === 200 && response.data.status === "Success") {
          setChats(response.data.data);
          setError(null);
          console.log("chats", response.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch chats");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        setError(
          "Не удалось загрузить чаты. Пожалуйста, повторите попытку позже."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [currentUserId]);

  const formatTime = (timeString: string): string => {
    return new Date(timeString).toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background xl:mt-0 mt-1">
      <div className="flex justify-start items-center gap-3">
        <button
          className="xl:hidden block"
          onClick={() => navigate("/mobileSider")}
        >
          <MdOutlineArrowBackIos className="text-[24px]" />
        </button>
        <p className="xl:text-[30px] text-[24px] font-bold xl:mb-2 mb-4 xl:mt-0 mt-4">
          Сообщения
        </p>
      </div>

      <ScrollArea className="flex-1" style={{ width: "100%" }}>
        <div className="!w-[100%]">
          {chats.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Нет сообщений
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.chat_id}
                className="flex items-center w-full xl:gap-4 gap-1 xl:p-4 py-4 px-2 my-2 rounded-md !border-0 bg-[#F6F6F6] cursor-pointer transition-colors"
                onClick={() => {
                  const basePath =
                    window.innerWidth > 1024
                      ? "/account/messagingPage"
                      : "/messagingPage";
                  navigate(`${basePath}/${chat.chat_user_id}`);
                }}
              >
                <Avatar className="h-12 w-12">
                  {chat.chat_user_name.charAt(0)}
                </Avatar>

                <div className="flex-1 ">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium ">{chat.chat_user_name}</h3>
                    <div className="flex gap-2 items-center">
                      {chat.mute_type ? <GoBellSlash /> : null}

                      <span className="text-md text-muted-foreground">
                        {/* {new Date(chat.create_at).toLocaleDateString()} */}
                        {formatTime(chat.last_message_time)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-muted-foreground truncate">
                      {/* {Number.parseInt(chat.unread_messages_count) > 0
                        ? `${chat.unread_messages_count} new messages`
                        : "No new messages"} */}
                      {chat.last_message}
                    </p>
                    <IoCheckmarkDoneOutline
                      className={`h-4 w-4 ${
                        chat.last_message_status === "seen"
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
