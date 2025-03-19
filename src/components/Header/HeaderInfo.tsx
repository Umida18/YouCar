import { CgMail } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { LiaTelegram } from "react-icons/lia";

const HeaderInfo = () => {
  return (
    <div className="my-4">
      <div className="flex  flex-col ">
        <p className="flex items-center gap-1 h-[40px]">
          <FiPhone style={{ color: "#989898", fontSize: 20 }} />
          <a href="tel:+7 968 053-14-77">+7 968 053-14-77</a>
        </p>
        <p className="flex items-center gap-1 h-[40px]">
          <CgMail style={{ color: "#989898", fontSize: 21 }} />
          <span className="text-[#989898]">info@mail.ru</span>
        </p>
      </div>
      <div className="flex items-center gap-3 h-[40px]">
        <a
          href="https://vk.com/youcarr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="w-[21px] h-[21px]" src="/vk.svg" alt="" />
        </a>
        <a href="https://wa.me/79680531477">
          <FaWhatsapp style={{ color: "#989898", fontSize: 21 }} />
        </a>
        <a
          href="https://t.me/+79680531477"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LiaTelegram style={{ color: "#989898", fontSize: 21 }} />
        </a>
      </div>
    </div>
  );
};

export default HeaderInfo;
