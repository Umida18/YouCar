import BottomHeader from "./BottomHeader";
import TopHeader from "./TopHeader";

const HeaderComponent = () => {
  return (
    <div className="bg-white flex flex-col h-full">
      <TopHeader />
      <BottomHeader />
    </div>
  );
};

export default HeaderComponent;
