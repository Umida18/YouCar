import type React from "react";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Paperclip } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Button, Dropdown, Input, Modal, Spin } from "antd";
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

export default function MessagingPage() {
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

  const [mutedNotifications, setMutedNotifications] = useState(false);
  // const [isBlocked, setIsBlocked] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const location = useLocation();
  console.log("Location state:", location.state);

  const autoMessage = location.state?.autoMessage || null;

  useEffect(() => {
    if (autoMessage && data?.chat_user_id && socketRef.current && connected) {
      sendAutoMessage(autoMessage);
    }
  }, [data, connected]);

  useEffect(() => {
    if (autoMessage) {
      console.log("Auto message is ready to be sent:", autoMessage);
    }
  }, [autoMessage]);

  const sendAutoMessage = (message: string) => {
    if (socketRef.current && data?.chat_user_id && data?.user_id) {
      const newMessage = {
        chat_id: data?.chat_id,
        senderId: Number(currentUserId),
        receiverId: Number(id),
        message: message,
        type: "text",
        status: "sent",
        timestamp: new Date().toISOString(),
      };

      console.log("Sending Auto Message:", newMessage);
      socketRef.current.emit("send message", newMessage);
      // setAutoMessageSent(true);
    } else {
      console.log("Cannot send auto message - socket or data not ready");
    }
  };

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

  const handleMuteNotifications = async () => {
    try {
      if (!data?.chat_user_id || !currentUserId) return;

      const response = await axios.post(
        "https://api.youcarrf.ru/chat/edit/mute",
        {
          user_id: currentUserId,
          chat_user_id: data?.chat_user_id,
          mute_type: mutedNotifications ? "unmute" : "mute",
        }
      );

      if (response.data.status === "Success") {
        setMutedNotifications(!mutedNotifications);
        Modal.success({
          title: mutedNotifications
            ? "Уведомления включены"
            : "Уведомления отключены",
          content: mutedNotifications
            ? "Уведомления для этого чата теперь включены"
            : "Уведомления для этого чата теперь отключены",
        });
      }
    } catch (error) {
      console.error("Error toggling notifications:", error);
      Modal.error({
        title: "Ошибка",
        content: "Не удалось изменить настройки уведомлений",
      });
    }
  };

  // const handleBlockUser = async () => {
  //   try {
  //     if (!id || !currentUserId) return;

  //     Modal.confirm({
  //       title: isBlocked
  //         ? "Разблокировать пользователя?"
  //         : "Заблокировать пользователя?",
  //       content: isBlocked
  //         ? "Вы снова сможете получать сообщения от этого пользователя"
  //         : "Вы больше не будете получать сообщения от этого пользователя",
  //       onOk: async () => {
  //         try {
  //           const response = await axios.post(
  //             "https://api.youcarrf.ru/user/block",
  //             {
  //               userId: currentUserId,
  //               blockedUserId: id,
  //               action: isBlocked ? "unblock" : "block",
  //             }
  //           );

  //           if (response.data.status === "Success") {
  //             setIsBlocked(!isBlocked);
  //             Modal.success({
  //               title: isBlocked
  //                 ? "Пользователь разблокирован"
  //                 : "Пользователь заблокирован",
  //               content: isBlocked
  //                 ? "Вы снова можете получать сообщения от этого пользователя"
  //                 : "Вы больше не будете получать сообщения от этого пользователя",
  //             });
  //           }
  //         } catch (error) {
  //           console.error("Error blocking/unblocking user:", error);
  //           Modal.error({
  //             title: "Ошибка",
  //             content: "Не удалось изменить статус блокировки",
  //           });
  //         }
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error with block user modal:", error);
  //   }
  // };

  // const handleDeleteConversation = () => {
  //   if (!id || !currentUserId || !data?.chat_id) return;

  //   Modal.confirm({
  //     title: "Удалить диалог?",
  //     content:
  //       "Вы уверены, что хотите удалить этот диалог? Это действие нельзя отменить.",
  //     onOk: async () => {
  //       try {
  //         const response = await axios.delete(
  //           `https://api.youcarrf.ru/chat/delete/${data.chat_id}`
  //         );

  //         if (response.data.status === "Success") {
  //           Modal.success({
  //             title: "Диалог удален",
  //             content: "Диалог был успешно удален",
  //           });
  //           navigate(-1);
  //         }
  //       } catch (error) {
  //         console.error("Error deleting conversation:", error);
  //         Modal.error({
  //           title: "Ошибка",
  //           content: "Не удалось удалить диалог",
  //         });
  //       }
  //     },
  //   });
  // };

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Add these state variables after other useState declarations
  // const [isRecording, setIsRecording] = useState(false);
  // const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  // const [audioRecorder, setAudioRecorder] = useState<MediaRecorder | null>(
  //   null
  // );
  // const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  // console.log("data", data);
  // console.log("messages", messages);
  // console.log("message", message);

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
    setLoading(true);
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
      setMessagesLoading(false);
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
  }, [data?.chat_user_id, data?.user_id, id]);

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
  }, [id]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  // Add these functions before the return statement
  // const startRecording = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     setAudioStream(stream);

  //     const recorder = new MediaRecorder(stream);
  //     setAudioRecorder(recorder);

  //     const chunks: Blob[] = [];
  //     recorder.ondataavailable = (e) => {
  //       if (e.data.size > 0) {
  //         chunks.push(e.data);
  //       }
  //     };

  //     recorder.onstop = async () => {
  //       const audioBlob = new Blob(chunks, { type: "audio/webm" });
  //       const formData = new FormData();
  //       formData.append("file", audioBlob, "voice-message.webm");

  //       try {
  //         const response = await axios.post(
  //           "https://api.youcarrf.ru/upload",
  //           formData,
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //           }
  //         );

  //         if (
  //           response.data.filePath &&
  //           socketRef.current &&
  //           data?.chat_user_id &&
  //           data?.user_id
  //         ) {
  //           const audioMessage: SendMessage = {
  //             chat_id: data?.chat_id,
  //             senderId: Number(currentUserId),
  //             receiverId: Number(id),
  //             message: response.data.filePath,
  //             type: "audio",
  //             status: "sent",
  //             timestamp: new Date().toISOString(),
  //           };

  //           socketRef.current.emit("send message", audioMessage);
  //         }
  //       } catch (error) {
  //         console.error("Error uploading audio:", error);
  //       }

  //       setAudioChunks([]);
  //     };

  //     recorder.start();
  //     setIsRecording(true);
  //   } catch (err) {
  //     console.error("Error accessing microphone:", err);
  //   }
  // };

  // const stopRecording = () => {
  //   if (audioRecorder && audioRecorder.state !== "inactive") {
  //     audioRecorder.stop();
  //     audioStream?.getTracks().forEach((track) => track.stop());
  //     setIsRecording(false);
  //   }
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  return (
    <div className="  w-full">
      <div className="flex flex-col  xl:h-[600px] h-[500px] w-full  xl:!bg-white !bg-[#fffcfc]    xl:mt-0 mt-4 bg-background">
        <div className="flex items-center  justify-between  gap-3 py-4 rounded-b-2xl xl:shadow-sm shadow-md px-3 z-50 bg-white ">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className="min-h-5 min-w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 text-lg rounded-full bg-muted flex items-center justify-center text-muted-foreground`}
              >
                {userName?.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-[#474747] text-[20px]">
                  {userName?.name || "Loading..."}
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
        <ScrollArea>
          <div
            ref={messageContainerRef}
            className="flex-1   xl:!bg-white !bg-[#fffcfc] px-6 py-4 space-y-4"
          >
            {messagesLoading ? (
              <div className="h-full flex items-center justify-center">
                <Spin size="large" />
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
                      key={`date-${msg.updatedAt}`}
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
