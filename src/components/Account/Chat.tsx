import { useState, useEffect, useRef } from "react";
import { ChevronLeft, MoreVertical, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "antd";
import { io, type Socket } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";

interface Message {
  chat_id: string;
  message: string;
  senderId: number;
  receiverId: number;
  status: "sent" | "seen";
  timestamp: string;
  type?: string;
}

interface SellerData {
  id: string;
  name: string;
  avatar: string;
}

interface IData {
  chat_id: string;
  chat_user_id: number;
  create_at: string;
  mute_type: false;
  user_id: number;
}

export default function MessagingPage() {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [seller, __] = useState<SellerData | null>(null);
  const currentUserId = localStorage.getItem("id");
  const [connected, setConnected] = useState(false);
  const [data, setdata] = useState<IData | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("data", data);
  console.log("messages", messages);
  console.log("message", message);

  // Function to initialize the chat session
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
    // Initialize the chat session
    initializeChatSession();

    // Set up the socket connection
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
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
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
  }, [data?.chat_user_id, data?.user_id]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      message.trim() &&
      connected &&
      socketRef.current &&
      data?.chat_user_id &&
      data?.user_id
    ) {
      const newMessage: Message = {
        chat_id: data?.chat_id,
        senderId: data?.chat_user_id,
        receiverId: data?.user_id,
        message: message.trim(),
        type: "text",
        status: "sent",
        timestamp: new Date().toISOString(),
      };

      console.log("Sending message:", newMessage);
      socketRef.current.emit("send message", newMessage);

      // Xabarni local state'ga qo‘shmaymiz, server javobini kutamiz
      setMessage(""); // Inputni tozalash
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

  useEffect(() => {
    if (!socketRef.current || !data?.user_id) return;

    messages.forEach((msg) => {
      if (msg.status === "sent" && msg.senderId === data?.chat_user_id) {
        socketRef.current?.emit("message seen", {
          messageId: msg.chat_id,
          receiverId: data.user_id,
        });
      }
    });
  }, [messages]);

  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] bg-background">
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            {seller?.avatar || seller?.name?.charAt(0)}
          </div>
          <div>
            <h2 className="font-medium">{seller?.name || "Loading..."}</h2>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="ml-auto">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-muted-foreground">No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg.chat_id || index}
              className={`flex ${
                msg.senderId === data?.chat_user_id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  msg.senderId === data?.chat_user_id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{msg.message}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {msg.senderId === data?.chat_user_id && (
                    <span className="text-xs opacity-70">
                      {msg.status === "seen" ? "✓✓" : "✓"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={sendMessage}
        className="p-4 border-t flex items-center gap-2"
      >
        <Button type="button" variant="ghost" size="icon">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите сообщение"
          className="rounded-full"
        />
        <Button type="submit" size="icon" disabled={!message.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
