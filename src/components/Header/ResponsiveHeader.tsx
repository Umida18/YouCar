import { LuBell } from "react-icons/lu";
import HeaderCallapse from "../HeaderCallapse/HeaderCallapse";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import { Button } from "antd";

const ResponsiveHeader = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="">
      {isOpen && (
        <div className="px-14 !min-h-[100%] xl:hidden">
          <div className="flex justify-between">
            <div className="flex flex-wrap  flex-col gap-4 text-sm sm:text-base flex-1">
              <a href="/" className="hover:underline">
                Главная
              </a>
              <a href="/category" className="hover:underline">
                Каталог
              </a>
              <a href="/about" className="hover:underline">
                О нас
              </a>
              <a href="/news" className="hover:underline">
                Новости
              </a>
              <a href="/contact" className="hover:underline">
                Контакты
              </a>
            </div>
            <div className="flex justify-center items-start gap-5">
              <LuBell style={{ fontSize: "22px" }} />
              <select className="bg-transparent text-sm sm:text-base outline-none cursor-pointer">
                <option>RU</option>
                <option>EN</option>
              </select>
            </div>
          </div>
          <HeaderCallapse />
          <HeaderInfo />
          <div className="flex flex-col w-full gap-2">
            <Button
              style={{
                border: 0,
                backgroundColor: "#EEEEEE",
                boxShadow: "none",
                fontSize: "16px",
                height: "56px",
                borderRadius: 0,
              }}
            >
              Войти
            </Button>

            <Button
              style={{
                border: 0,
                backgroundColor: "#2684E5",
                borderRadius: 0,
                color: "white",
                height: "56px",
                fontSize: "16px",
              }}
            >
              Регистрация
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveHeader;
