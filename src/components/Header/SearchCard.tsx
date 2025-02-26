import { ICar } from "@/Type/Type";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const SearchCard = ({ searchValue }: { searchValue: ICar[] }) => {
  const navigate = useNavigate();

  return (
    <div className=" absolute xl:right-[26%] rounded-md py-2 h-[65vh]  boxShadowC bg-white z-50 xl:w-[400px] ">
      <ScrollArea className="h-[60vh] ">
        {searchValue.map((i, index) => (
          <>
            <div
              onClick={() =>
                navigate(
                  `/productDetailsPage/${i?.id}?mark=${encodeURIComponent(
                    i?.mark_id || ""
                  )}&model=${encodeURIComponent(i?.model || "")}&type=${i.type}`
                )
              }
              key={index}
              className="p-4 flex gap-4"
            >
              <div>
                <img
                  className="w-[135px] h-[100px] object-cover rounded-md"
                  src={i?.image?.[0]}
                  alt=""
                />
              </div>
              <div className="py-3">
                <p className="font-bold tetx-[#293843] text-xl">{`${i.model} ${i.year}`}</p>
                <p className="font-semibold tetx-[#293843] text-base">
                  {i.cost}
                </p>
                <p className="font-medium tetx-[#989898] text-base">
                  {i.country}
                </p>
              </div>
            </div>
            <Divider style={{ marginBlock: 3 }} />
          </>
        ))}
      </ScrollArea>
    </div>
  );
};

export default SearchCard;
