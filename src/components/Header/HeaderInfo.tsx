import { CgMail } from "react-icons/cg";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { SlSocialVkontakte } from "react-icons/sl";

const HeaderInfo = () => {
  return (
    <div className="my-4">
      <div className="flex  flex-col ">
        <p className="flex items-center gap-1 h-[40px]">
          <FiPhone style={{ color: "#989898", fontSize: 20 }} />
          <span className="text-[#989898]">+7 (777) 777-77-77</span>
        </p>
        <p className="flex items-center gap-1 h-[40px]">
          <CgMail style={{ color: "#989898", fontSize: 21 }} />
          <span className="text-[#989898]">info@mail.ru</span>
        </p>
      </div>
      <div className="flex items-center gap-3 h-[40px]">
        <SlSocialVkontakte style={{ color: "#989898", fontSize: 21 }} />
        <FaWhatsapp style={{ color: "#989898", fontSize: 21 }} />
        <FaInstagram style={{ color: "#989898", fontSize: 21 }} />
      </div>
    </div>
  );
};

export default HeaderInfo;
