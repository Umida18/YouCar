import { SlSocialVkontakte } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { CgMail } from "react-icons/cg";

const TopHeader = () => {
  return (
    <div className="bg-[#F6F6F6]">
      <div className="xl:h-[48px] xl:flex container flex-wrap items-center justify-between xl:!px-14 px-4 hidden mx-auto">
        <div className="flex flex-wrap items-center gap-12 text-sm sm:text-base flex-1">
          <a href="/" className="hover:underline">
            Главная
          </a>
          <a href="/catalog" className="hover:underline">
            Каталог
          </a>
          <a href="/#about" className="hover:underline">
            О нас
          </a>
          <a href="/news" className="hover:underline">
            Новости
          </a>
          <a href="/contact" className="hover:underline">
            Контакты
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-16 flex-1 justify-end text-sm sm:text-base">
          <div className="flex items-center gap-3">
            <SlSocialVkontakte style={{ color: "#989898", fontSize: 21 }} />
            <FaWhatsapp style={{ color: "#989898", fontSize: 21 }} />
            <FaInstagram style={{ color: "#989898", fontSize: 21 }} />
          </div>

          <div className="flex flex-wrap items-center gap-7">
            <p className="flex items-center gap-1">
              <FiPhone style={{ color: "#989898", fontSize: 20 }} />
              <span className="text-[#989898]">+7 968 053-14-77</span>
            </p>
            <p className="flex items-center gap-1">
              <CgMail style={{ color: "#989898", fontSize: 21 }} />
              <span className="text-[#989898]">info@mail.ru</span>
            </p>
          </div>

          <select className="bg-transparent text-sm sm:text-base outline-none cursor-pointer">
            <option>RU</option>
            <option>EN</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
