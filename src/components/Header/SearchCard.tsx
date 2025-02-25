import { ICar } from "@/Type/Type";
import { Divider } from "antd";

const SearchCard = ({ searchValue }: { searchValue: ICar[] }) => {
  return (
    <div className=" absolute right-[26%] h-[65vh] overflow-y-auto boxShadowC bg-white z-50 xl:w-[400px]">
      {searchValue.map((i, index) => (
        <>
          <div key={index} className="p-4 flex gap-4">
            <div>
              <img
                className="w-[135px] h-[100px] object-cover rounded-xl"
                src={i?.image?.[0]}
                alt=""
              />
            </div>
            <div className="py-3">
              <p className="font-bold tetx-[#293843] text-xl">{`${i.model} ${i.year}`}</p>
              <p className="font-semibold tetx-[#293843] text-base">{i.cost}</p>
              <p className="font-medium tetx-[#989898] text-base">
                {i.country}
              </p>
            </div>
          </div>
          <Divider />
        </>
      ))}
    </div>
  );
};

export default SearchCard;
