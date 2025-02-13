import {
  Star,
  MessageCircle,
  PlusSquare,
  // Zap,
  Settings,
  ChevronDown,
  ChevronUp,
  FileText,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/Type/Type";
import api from "@/Api/Api";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = useQuery<IUser>(
    ["user"],
    async () => {
      try {
        const res = await api.get("/user-dashboard");
        return res.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem("id");
          localStorage.removeItem("token");
        }
        throw error;
      }
    },
    {
      onError: (error: any) => {
        console.log(error);
      },
    }
  );

  return (
    <div className="max-w-2xl mx-auto py-4 space-y-6">
      <div className="boxShadowC rounded-md py-2 px-4">
        <div className="flex items-start gap-4 mb-5">
          <div>
            <Avatar className="!h-[50px] !w-[50px] text-xl">
              {user?.userData.name?.charAt(0)}
            </Avatar>
          </div>
          <div className="space-y-1">
            <h1 className="text-[16px] font-semibold text-[#293843]">
              {user?.userData.name}
            </h1>
            {/* <div className="flex items-center gap-1">
            <span>Рейтинг</span>
            <span className="font-medium">5.0</span>
          </div> */}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-[#5A5A5A]">E-mail</div>
          <a
            href={`mailto:${user?.userData.email}`}
            className="text-blue-600 hover:underline"
          >
            {user?.userData.email}
          </a>
        </div>
      </div>

      <div className="space-y-4">
        {/* <div className="space-y-2">
          <div className="text-sm text-gray-500">E-mail</div>
          <a
            href={`mailto:${user?.userData.email}`}
            className="text-blue-600 hover:underline"
          >
            {user?.userData.email}
          </a>
        </div> */}
        {/* 
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Тариф</div>
          <div className="flex items-center gap-1">
            <div className="text-blue-600">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M12 8v8M8 12h8" strokeWidth="2" />
              </svg>
            </div>
            <span>Базовый тариф</span>
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          // variant="outline"
          onClick={() => navigate("/account/favorites")}
          className="h-24 flex flex-col items-start gap-2 bg-white text-[#293843] hover:bg-white boxShadowC"
        >
          <Star className="h-6 w-6 text-blue-600" />
          <span>Избранное</span>
        </Button>

        <Button
          onClick={() => navigate("/account/messages")}
          // variant="outline"
          className="h-24 flex flex-col items-start gap-2 bg-white text-[#293843] hover:bg-white boxShadowC"
        >
          <MessageCircle className="h-6 w-6 text-blue-600" />
          <span>Сообщения</span>
        </Button>
        <div className="w-full">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="h-24 flex flex-col w-full items-start gap-2 bg-white text-[#293843] hover:bg-white shadow-md transition-all duration-300"
          >
            <PlusSquare className="h-6 w-6 text-[#1c80e7]" />
            <div className="flex items-center gap-1 justify-between w-full">
              <span>
                Разместить <br className="sm:hidden block" /> объявление
              </span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </Button>

          {isOpen && (
            <div className="mt-2 space-y-2 transition-all duration-300 ease-in-out">
              <Button
                className="w-full min-w-[200px] bg-[#fff] text-[#293843] hover:bg-[#f0f0f0] boxShadowC flex items-center justify-start gap-2 h-16"
                onClick={() => navigate("/account/postsUser")}
              >
                <FileText className="h-5 w-5 text-[#1c80e7]" />
                Мои объявления
              </Button>
              <Button
                className="w-full min-w-[200px] bg-[#fff] text-[#293843] hover:bg-[#f0f0f0] boxShadowC flex items-center justify-start gap-2 h-16"
                onClick={() => navigate("/newPost")}
              >
                <Plus className="h-5 w-5 text-[#1c80e7]" />
                Новое объявление
              </Button>
            </div>
          )}
        </div>

        {/* <Button
          variant="outline"
          className="h-24 flex flex-col items-center justify-center gap-2"
        >
          <Zap className="h-6 w-6 text-blue-600" />
          <span>Тариф</span>
        </Button> */}

        <Button
          onClick={() => navigate("/account/settings")}
          // variant="outline"
          className="h-24 flex flex-col items-start gap-2 bg-white text-[#293843] hover:bg-white boxShadowC"
        >
          <Settings className="h-6 w-6 text-blue-600" />
          <span>
            Настройки <br className="sm:hidden block" /> аккаунта
          </span>
        </Button>
      </div>
    </div>
  );
}
