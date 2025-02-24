import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io, type Socket } from "socket.io-client";
import axios from "axios";
import { Check } from "lucide-react";
import { Avatar, Spin } from "antd";
import { MdOutlineArrowBackIos } from "react-icons/md";

interface Chat {
  chat_id: string;
  chat_user_id: number;
  chat_user_name: string;
  mute_type: boolean;
  create_at: string;
  unread_messages_count: string;
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
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socketRef.current = io("wss://api.youcarrf.ru", {
      transports: ["websocket"],
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
        } else {
          throw new Error(response.data.message || "Failed to fetch chats");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        setError("Failed to load chats. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [currentUserId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />{" "}
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

      <ScrollArea className="flex-1">
        <div className="">
          {chats.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Нет сообщений
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.chat_id}
                className="flex items-center xl:gap-4 gap-1 xl:p-4 py-4 px-2 my-2 rounded-md !border-0 bg-[#F6F6F6] cursor-pointer transition-colors"
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

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium ">{chat.chat_user_name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {new Date(chat.create_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground truncate">
                      {Number.parseInt(chat.unread_messages_count) > 0
                        ? `${chat.unread_messages_count} new messages`
                        : "No new messages"}
                    </p>
                    <Check
                      className={`h-4 w-4 ${
                        messages.find((m) => m.chat_id === chat.chat_id)
                          ?.status === "seen"
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
