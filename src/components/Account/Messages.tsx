"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io, type Socket } from "socket.io-client";
import axios from "axios";

interface Chat {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    status: "sent" | "seen";
  };
  unreadCount: number;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  status: "sent" | "seen";
  type: string;
}

export default function Messages() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("id");

  useEffect(() => {
    socketRef.current = io("https://api.youcarrf.ru", {
      transports: ["websocket"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to socket server");
      if (currentUserId) {
        socket.emit("join", currentUserId);
        console.log("Joined chat with userId:", currentUserId);
      }
    });

    socket.on("receive message", (newMessage: Message) => {
      console.log("Received new message:", newMessage);
      updateChatsWithNewMessage(newMessage);
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

  const updateChatsWithNewMessage = (newMessage: Message) => {
    setChats((prevChats) => {
      const otherUserId =
        newMessage.senderId === currentUserId
          ? newMessage.receiverId
          : newMessage.senderId;

      const existingChatIndex = prevChats.findIndex(
        (chat) => chat.user.id === otherUserId
      );

      if (existingChatIndex > -1) {
        const updatedChats = [...prevChats];
        const chat = updatedChats[existingChatIndex];

        updatedChats[existingChatIndex] = {
          ...chat,
          lastMessage: {
            text: newMessage.message,
            timestamp: newMessage.timestamp,
            status: newMessage.status,
          },
          unreadCount:
            newMessage.senderId !== currentUserId
              ? (chat.unreadCount || 0) + 1
              : chat.unreadCount,
        };

        updatedChats.unshift(...updatedChats.splice(existingChatIndex, 1));
        return updatedChats;
      } else {
        const newChat: Chat = {
          id: newMessage.id,
          user: {
            id: otherUserId,
            name: `User ${otherUserId}`,
          },
          lastMessage: {
            text: newMessage.message,
            timestamp: newMessage.timestamp,
            status: newMessage.status,
          },
          unreadCount: newMessage.senderId !== currentUserId ? 1 : 0,
        };
        return [newChat, ...prevChats];
      }
    });
  };

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
        } else if (response.status === 404) {
          setChats([]);
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      return format(date, "HH:mm");
    }
    return format(date, "dd.MM.yy");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
    <div className="flex flex-col h-screen bg-background">
      <div className="border-b p-4">
        <h1 className="text-2xl font-semibold">Сообщения</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y">
          {chats.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Нет сообщений
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-4 p-4 hover:bg-accent cursor-pointer transition-colors"
                onClick={() => navigate(`/messages/${chat.user.id}`)}
              >
                <Avatar className="h-12 w-12">
                  {chat.user.avatar ? (
                    <img
                      src={chat.user.avatar || "/placeholder.svg"}
                      alt={chat.user.name}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback>
                      {getInitials(chat.user.name)}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{chat.user.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {formatMessageTime(chat.lastMessage.timestamp)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.lastMessage.text}
                    </p>
                    <div className="flex items-center gap-2">
                      {chat.lastMessage.status === "seen" ? (
                        <CheckCheck className="h-4 w-4 text-primary" />
                      ) : (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                      {chat.unreadCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
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
