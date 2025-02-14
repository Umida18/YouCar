import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Paperclip, MoreVertical, ArrowLeft, Send } from "lucide-react";
// import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOnline?: boolean;
  isSeen: boolean;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Александр Петров",
    content: "Здравствуйте, цена окончательная?",
    timestamp: "10:38 AM",
    isOnline: true,
    isSeen: true,
  },
  {
    id: 2,
    sender: "Сергей Иванович",
    content: "Хорошо!",
    timestamp: "10:35 AM",
    isOnline: false,
    isSeen: true,
  },
  {
    id: 3,
    sender: "Сергей Иванович",
    content: "Здравствуйте",
    timestamp: "10:33 AM",
    isOnline: true,
    isSeen: false,
  },
];

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState("");
  // const navigate = useNavigate();

  if (selectedChat) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="flex items-center p-4 border-b bg-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedChat(null)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="w-8 h-8 mx-3">
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm">АА</span>
            </div>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-sm font-medium">{selectedChat.sender}</h2>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-2xl py-2 px-4 max-w-[80%]">
                {selectedChat.content}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl py-2 px-4 max-w-[80%] shadow-sm">
                Здравствуйте, да
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 bg-white border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-1"
            />
            <Button size="icon" className="text-blue-500">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen ">
      <div className="mb-6 bg-white">
        <p className="text-[30px] font-semibold text-[#293843] font-['Golos_Text']">
          Сообщения
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-140px)] gap-3">
        {mockMessages.map((message) => (
          <div
            key={message.id}
            className="flex items-center p-4 hover:bg-gray-100 cursor-pointer bg-[#F6F6F6] my-2 rounded-lg"
            // onClick={() =>  navigate(`/account/messagingPage/${userData?.id}`)}
          >
            <Avatar className="w-14 h-14">
              <div className="w-full h-full bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <span className="text-sm">АА</span>
              </div>
            </Avatar>
            {message.isOnline ? (
              <div className="w-3 h-3 bg-green-500 rounded-full relative -bottom-4 -left-3 border-white border-2" />
            ) : (
              <div className="w-3 h-3 bg-[#989898] rounded-full relative -bottom-4 -left-3 border-white border-2" />
            )}
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm">{message.sender}</h3>
                <span className="text-xs text-gray-500">
                  {message.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
