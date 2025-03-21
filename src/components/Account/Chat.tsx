import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, Paperclip } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Button, Dropdown, Input, Modal } from "antd";
import { io, type Socket } from "socket.io-client";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { SendHorizontal } from "lucide-react";
import axios from "axios";
import type { IData, IUser, Message, SendMessage } from "@/Type/Type";
import { MoreOutlined } from "@ant-design/icons";
import { GoBellSlash } from "react-icons/go";
// import { MdBlockFlipped } from "react-icons/md";
// import { FaRegTrashAlt } from "react-icons/fa";

import { ScrollArea } from "@/components/ui/scroll-area";
import useScrollToTop from "@/utils/scroll";

export default function MessagingPage() {
  useScrollToTop();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const currentUserId = localStorage.getItem("id");
  const [connected, setConnected] = useState(false);
  const [data, setdata] = useState<IData | null>(null);
  const [userName, setUserName] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log("currentUserId", currentUserId);
  // console.log("data`11111111111111111111111111111", data);

  const [mutedNotifications, setMutedNotifications] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const location = useLocation();
  const [autoMessage] = useState(location.state?.autoMessage || null);

  const [autoMessageSent, setAutoMessageSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // console.log("autoMessage", autoMessage);

  useEffect(() => {
    if (
      autoMessage &&
      data?.chat_user_id &&
      socketRef.current &&
      connected &&
      !autoMessageSent
    ) {
      sendAutoMessage(autoMessage);
      setAutoMessageSent(true);
    }
  }, [autoMessage, data?.chat_user_id, connected, autoMessageSent]);

  const sendAutoMessage = useCallback(
    (messageText: string) => {
      if (socketRef.current && data?.chat_user_id && data?.user_id) {
        const newMessage = {
          chat_id: data?.chat_id,
          senderId: Number(currentUserId),
          receiverId: Number(id),
          message: messageText,
          type: "text",
          status: "sent",
          timestamp: new Date().toISOString(),
        };

        socketRef.current.emit("send message", newMessage);
        setAutoMessageSent(true);
        navigate(location.pathname, { replace: true, state: {} });
      }
    },
    [data, currentUserId, id, navigate, location.pathname]
  );

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Сегодня";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Вчера";
    } else {
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      });
    }
  };
  // console.log("data?.chat_user_id", data?.chat_user_id);

  const handleMuteNotifications = useCallback(async () => {
    try {
      if (!data?.user_id || !currentUserId) return;

      const response = await axios.post(
        "https://api.youcarrf.ru/chat/edit/mute",
        {
          user_id: Number(id),
          chat_user_id: Number(currentUserId),
          mute_type: !mutedNotifications,
        }
      );

      if (response.data.status === "Success") {
        setMutedNotifications(!mutedNotifications);
        Modal.success({
          title: !mutedNotifications
            ? "Уведомления отключены"
            : "Уведомления включены",
          content: !mutedNotifications
            ? "Уведомления для этого чата теперь отключены"
            : "Уведомления для этого чата теперь включены",
        });
      }
    } catch (error) {
      console.error("Error toggling notifications:", error);
      Modal.error({
        title: "Ошибка",
        content: "Не удалось изменить настройки уведомлений",
      });
    }
  }, [currentUserId, id, mutedNotifications]);

  // const messageContainerRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
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

        const newData = await response.json();
        if (JSON.stringify(newData.data) !== JSON.stringify(data)) {
          setdata(newData.data); // Use the renamed setData
        }
      } catch (error) {
        console.error("Error initializing chat session:", error);
      }
    };

    fetchData();
  }, [setdata]);

  useEffect(() => {
    setLoading(true);
    // initializeChatSession();

    socketRef.current = io("wss://api.youcarrf.ru", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000, // 2 sekund
      // pingInterval: 25000, // Har 25 sekundda ping jo‘natadi
      // pingTimeout: 60000, // 60 sekund javob kutadi
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      // console.log("Connected to server with socket id:", socket.id);
      setConnected(true);

      if (data?.chat_user_id && data?.user_id) {
        socket.emit("join", data?.chat_user_id);
        // console.log("Joined chat with userId:", data?.chat_user_id);

        socket.emit("fetch messages", {
          userId: data?.chat_user_id,
          otherUserId: data?.user_id,
        });
      }
    });

    socket.on("old messages", (oldMessages: Message[]) => {
      // console.log("Received old messages:", oldMessages);
      setMessages(
        oldMessages.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        )
      );
      setMessagesLoading(false);
    });

    socket.on("receive message", (newMessage: Message) => {
      // console.log("Received new message:", newMessage);
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
    setLoading(false);

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
  }, [data]);

  // console.log("data?.user_id", data?.user_id);
  // console.log("id", id);

  const sendMessage = useCallback(
    (e: React.FormEvent) => {
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

        socketRef.current.emit("send message", newMessage);
        setMessage("");
        setTimeout(scrollToBottom, 100);
      }
    },
    [message, connected, data, currentUserId, id, scrollToBottom]
  );

  const markMessageAsSeen = (messageId: string) => {
    if (socketRef.current && data?.user_id) {
      socketRef.current.emit("message seen", {
        messageId,
        receiverId: data.user_id,
      });
    }
  };

  const messageObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Initialize the intersection observer
    messageObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute("data-message-id");
            if (messageId) {
              markMessageAsSeen(messageId);
              // Unobserve after marking as seen
              messageObserverRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.5 } // Message is considered "seen" when 50% visible
    );

    return () => {
      // Clean up observer on unmount
      if (messageObserverRef.current) {
        messageObserverRef.current.disconnect();
      }
    };
  }, []);
  // console.log("data.user_id", data?.user_id);

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
    const fetchUser = async () => {
      const res = await axios.get(`https://api.youcarrf.ru/user-find/${id}`);
      // console.log("res", res);

      setUserName(res.data);
    };
    fetchUser();
  }, [id]);

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://api.youcarrf.ru/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (
          response.data.filePath &&
          socketRef.current &&
          data?.chat_user_id &&
          data?.user_id
        ) {
          const fileMessage: SendMessage = {
            chat_id: data?.chat_id,
            senderId: Number(currentUserId),
            receiverId: Number(id),
            message: response.data.filePath,
            type: "file",
            status: "sent",
            timestamp: new Date().toISOString(),
          };

          socketRef.current.emit("send message", fileMessage);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    [data, currentUserId, id]
  );

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        // ref={messageContainerRef}
        className="flex flex-col  xl:h-[600px] h-[500px] w-full  xl:!bg-white !bg-[#fffcfc]    xl:mt-0 mt-4 bg-background"
      >
        <div className="flex items-center  justify-between  gap-3 py-4 rounded-b-2xl xl:shadow-sm shadow-md px-3 z-10 bg-white ">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className="min-h-5 min-w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div
                className={`xl:h-12 xl:w-12 h-8 w-8 text-lg rounded-full bg-muted flex items-center justify-center text-muted-foreground`}
              >
                <p>{userName?.name.charAt(0)}</p>
              </div>
              <div>
                <p className="font-bold text-[#474747] xl:text-[20px] text-[16px]">
                  {userName?.name || "Загрузка..."}
                </p>
              </div>
            </div>
          </div>
          <img src="/placeholder.svg" alt="" />
          {/* <Button variant="ghost" size="icon" className="ml-auto">
            <MoreVertical className="h-5 w-5" />
          </Button> */}
          <Dropdown
            // className="flex flex-col !gap-3"
            menu={{
              items: [
                // {
                //   key: "1",
                //   label: "Перейти в профиль",
                //   icon: (
                //     <div
                //       className={`h-6 w-6 text-lg rounded-full relative -left-1 !m-0 bg-muted flex items-center justify-center text-muted-foreground`}
                //     >
                //       {userName?.name.charAt(0)}
                //     </div>
                //   ),
                // },
                {
                  key: "2",
                  label: mutedNotifications
                    ? "Включить уведомления"
                    : "Отключить уведомления",
                  icon: <GoBellSlash />,
                  onClick: handleMuteNotifications,
                },
                // {
                //   key: "3",
                //   label: isBlocked ? "Разблокировать" : "Заблокировать",
                //   icon: <MdBlockFlipped />,
                //   onClick: handleBlockUser,
                // },
                // {
                //   key: "4",
                //   label: "Удалить диалог",
                //   icon: <FaRegTrashAlt />,
                //   onClick: handleDeleteConversation,
                // },
              ],
            }}
            placement="bottomRight"
          >
            <Button
              className="bg-white"
              type="text"
              icon={<MoreOutlined className=" !text-[20px]" />}
            />
          </Dropdown>
        </div>
        <ScrollArea ref={scrollAreaRef} className="h-[430px]">
          <div className="flex-1 xl:!bg-white !bg-[#fffcfc] px-6 py-4 space-y-4">
            {messagesLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : messages.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Сообщений пока нет
              </p>
            ) : (
              messages.reduce((acc: JSX.Element[], msg, index) => {
                const currentDate = new Date(msg.updatedAt);
                const prevDate =
                  index > 0 ? new Date(messages[index - 1].updatedAt) : null;

                if (
                  !prevDate ||
                  currentDate.toDateString() !== prevDate.toDateString()
                ) {
                  acc.push(
                    <div
                      key={`${msg.chat_id || msg.updatedAt}-${index}`}
                      className="flex items-center justify-center my-4"
                    >
                      <div className="h-[1px] flex-1 bg-[#E5E7EB]" />
                      <span className="px-4 text-sm text-gray-500">
                        {formatDate(currentDate)}
                      </span>
                      <div className="h-[1px] flex-1 bg-[#E5E7EB]" />
                    </div>
                  );
                }

                acc.push(
                  <div
                    key={`${msg.chat_id}${msg.updatedAt}-${index}`}
                    data-message-id={msg.chat_id}
                    ref={(el) => {
                      // Only observe messages that are received by the current user and not yet seen
                      if (
                        el &&
                        msg.receiver_id === Number(currentUserId) &&
                        msg.status !== "seen" &&
                        messageObserverRef.current
                      ) {
                        messageObserverRef.current.observe(el);
                      }
                    }}
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
                        {msg.type === "file" ? (
                          <a
                            href={msg.message}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[16px] break-words underline"
                          >
                            Attached File
                          </a>
                        ) : msg.type === "audio" ? (
                          <audio controls className="max-w-full">
                            <source src={msg.message} type="audio/webm" />
                            Your browser does not support the audio element.
                          </audio>
                        ) : (
                          <p className="text-[16px] break-words">
                            {msg.message}
                          </p>
                        )}
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
                      </div>
                    </div>
                  </div>
                );

                return acc;
              }, [])
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <form
          onSubmit={sendMessage}
          className="py-4  flex items-center xl:gap-2 gap-1"
        >
          {/* <Button type="button" variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button> */}
          <Input
            suffix={
              <>
                <label htmlFor="file-upload">
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <button>
                    <span>
                      <Paperclip className="min-h-5 min-w-5 text-[#C1C0C8]" />
                    </span>
                  </button>
                </label>
                {/* <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  {isRecording ? (
                    <Square className="min-h-5 min-w-5 text-red-500" />
                  ) : (
                    <Mic className="min-h-5 min-w-5 text-[#C1C0C8]" />
                  )}
                </Button> */}
              </>
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите сообщение"
            className="h-[50px] bg-[#F2F3F6] border-0 xl:w-full w-[95%] hover:!bg-[#F2F3F6] "
          />
          <button
            className="h-[50px] xl:w-[7%] w-[15%] flex items-center justify-center rounded-md"
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
