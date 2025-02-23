import type React from "react";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, MoreVertical, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "antd";
import { io, type Socket } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { SendHorizontal } from "lucide-react";
import axios from "axios";
import { IData, IUser, Message, SendMessage } from "@/Type/Type";

export default function MessagingPage() {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const currentUserId = localStorage.getItem("id");
  const [connected, setConnected] = useState(false);
  const [data, setdata] = useState<IData | null>(null);
  const [userName, setUserName] = useState<IUser | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("data", data);
  console.log("messages", messages);
  console.log("message", message);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // useEffect(() => {}, [currentUserId]);

  const initializeChatSession = async () => {
    if (currentUserId && id) {
      try {
        const response = await fetch("https://api.youcarrf.ru/chat/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: currentUserId,
            receiverId: id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to initialize chat session");
        }

        const data = await response.json();
        console.log("Chat session initialized:", data);
        setdata(data.data);
      } catch (error) {
        console.error("Error initializing chat session:", error);
      }
    }
  };

  useEffect(() => {
    initializeChatSession();

    socketRef.current = io("wss://api.youcarrf.ru", {
      transports: ["websocket"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to server with socket id:", socket.id);
      setConnected(true);

      if (data?.chat_user_id && data?.user_id) {
        socket.emit("join", data?.chat_user_id);
        console.log("Joined chat with userId:", data?.chat_user_id);

        // Fetch messages after the chat session is initialized
        socket.emit("fetch messages", {
          userId: data?.chat_user_id,
          otherUserId: data?.user_id,
        });
      }
    });

    socket.on("old messages", (oldMessages: Message[]) => {
      console.log("Received old messages:", oldMessages);
      setMessages(
        oldMessages.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        )
      );
    });

    socket.on("receive message", (newMessage: Message) => {
      console.log("Received new message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("message seen", (updatedMessage: Message) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.chat_id === updatedMessage.chat_id
            ? { ...msg, status: "seen" }
            : msg
        )
      );
    });

    socket.on("connect_error", (error: Error) => {
      console.error("Connection error:", error);
    });

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("old messages");
        socket.off("receive message");
        socket.off("message seen");
        socket.off("connect_error");
        socket.disconnect();
      }
    };
  }, [connected, data?.chat_user_id, data?.user_id]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      message.trim() &&
      connected &&
      socketRef.current &&
      data?.chat_user_id &&
      data?.user_id
    ) {
      const newMessage: SendMessage = {
        chat_id: data?.chat_id,
        senderId: Number(currentUserId),
        receiverId: Number(id),
        message: message.trim(),
        type: "text",
        status: "sent",
        timestamp: new Date().toISOString(),
      };

      console.log("Sending message:", newMessage);
      socketRef.current.emit("send message", newMessage);
      setMessage("");
      setTimeout(scrollToBottom, 100);
    }
  };

  // const markMessageAsSeen = (messageId: string) => {
  //   if (socketRef.current && data?.user_id) {
  //     socketRef.current.emit("message seen", {
  //       messageId,
  //       receiverId: data.user_id,
  //     });
  //   }
  // };
  console.log("data.user_id", data?.user_id);

  useEffect(() => {
    if (!socketRef.current || !currentUserId) return;

    messages.forEach((msg) => {
      if (msg.status !== "seen" && msg.receiver_id === Number(currentUserId)) {
        socketRef.current?.emit("message seen", {
          messageId: msg.chat_id,
          receiverId: msg.sender_id,
        });
      }
    });
  }, [messages, currentUserId]);

  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);
  console.log("data?.user_id", data?.user_id);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://api.youcarrf.ru/user-find/${id}`);
      console.log("res", res);

      setUserName(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="  w-full">
      <div className="flex flex-col h-[600px] w-full xl:mt-0 mt-12 bg-background">
        <div className="flex items-center gap-3 py-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div
              className={`h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground`}
            >
              {userName?.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-[#474747] text-[20px]">
                {userName?.name || "Loading..."}
              </p>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="ml-auto">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        <div
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
        >
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground">No messages yet</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={msg.chat_id || index}
                className={`flex ${
                  msg.sender_id === Number(currentUserId)
                    ? "justify-end"
                    : "justify-start"
                } w-full`}
              >
                <div className="max-w-[55%]">
                  <div
                    className={`${
                      msg.sender_id === Number(id)
                        ? "rounded-t-2xl rounded-r-2xl"
                        : "rounded-t-2xl rounded-l-2xl"
                    } py-2 px-4 ${
                      msg.sender_id === Number(currentUserId)
                        ? "bg-[#166AFF] text-primary-foreground"
                        : "bg-[#F2F3F6]"
                    }`}
                  >
                    <p className="text-[16px] break-words">{msg.message}</p>
                  </div>
                  <div className="flex items-center mt-1 gap-1">
                    <span className="text-xs text-gray-500">
                      {new Date(msg.updatedAt).getTime()
                        ? new Date(msg.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Invalid Date"}
                    </span>
                    {/* {msg.sender_id === Number(currentUserId) && (
                      <span className="text-xs text-gray-500">
                        {msg.status === "seen" ? "✓✓" : "✓"}
                      </span>
                    )} */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form
          onSubmit={sendMessage}
          className="py-4 border-t flex items-center gap-2"
        >
          {/* <Button type="button" variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button> */}
          <Input
            suffix={
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="min-h-5 min-w-5 text-[#C1C0C8]" />
              </Button>
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите сообщение"
            className=" h-[50px] bg-[#F2F3F6] border-0"
          />
          <button
            className="h-[50px] w-[7%] flex items-center justify-center rounded-md"
            style={{ backgroundColor: "#F2F3F6" }}
            type="submit"
            disabled={!message.trim()}
          >
            <SendHorizontal className="min-h-8 min-w-8 size-5 !text-[#2684E5]" />
          </button>
        </form>
      </div>
    </div>
  );
}
