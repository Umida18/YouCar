import { useState, useEffect, useRef } from "react";
import { ChevronLeft, MoreVertical, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "antd";
import { io, type Socket } from "socket.io-client";
import { useParams } from "react-router-dom";

interface Message {
  id: string;
  message: string; // text o'rniga message ishlatiladi
  senderId: string; // sender_id o'rniga senderId
  receiverId: string; // receiver_id o'rniga receiverId
  status: "sent" | "seen";
  timestamp: string;
  type?: string;
}

interface SellerData {
  id: string;
  name: string;
  avatar: string;
}

export default function MessagingPage() {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [seller, __] = useState<SellerData | null>(null);
  const currentUserId = localStorage.getItem("id");
  const [connected, setConnected] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // Socket ni bir marta yaratamiz
    socketRef.current = io("https://api.youcarrf.ru", {
      transports: ["websocket"],
      // cors: {
      //   origin: "https://api.youcarrf.ru",
      // },
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to server");
      setConnected(true);
    });

    socket.on("receive message", (savedMessage) => {
      console.log("Received message:", savedMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: savedMessage.id || Date.now().toString(),
          message: savedMessage.message,
          senderId: savedMessage.senderId,
          receiverId: savedMessage.receiverId,
          status: savedMessage.status || "sent",
          timestamp: savedMessage.timestamp || new Date().toISOString(),
          type: savedMessage.type,
        },
      ]);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("receive message");
        socket.off("connect_error");
        socket.disconnect();
      }
    };
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (message.trim() && connected && socketRef.current) {
      const newMessage = {
        senderId: currentUserId,
        receiverId: id,
        message: message,
        type: "text",
      };

      console.log("Sending message:", newMessage);
      socketRef.current.emit("send message", newMessage);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            {seller?.avatar}
          </div>
          <div>
            <h2 className="font-medium">{seller?.name}</h2>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="ml-auto">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            className={`flex ${
              msg.senderId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                msg.senderId === currentUserId
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
                {msg.senderId === currentUserId && (
                  <span className="text-xs opacity-70">
                    {msg.status === "seen" ? "✓✓" : "✓"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
          placeholder="Введите сообщение"
          className="rounded-full"
        />
        <Button size="icon" onClick={sendMessage}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
