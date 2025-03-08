import api from "@/Api/Api";
import { IMarks } from "@/Type/Type";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

export default function CarBrands() {
  const navigate = useNavigate();

  const { data: marks } = useQuery<IMarks[]>(["marksBrand"], async () => {
    const res = await api.get("/marks");
    return res.data;
  });

  return (
    <div className=" flex !justify-center items-center py-10">
      <div className=" w-[100%]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
          {marks?.map((brand) => (
            <Card
              hoverable
              onClick={() =>
                navigate(`/brand?markId=${brand.id}&mark=${brand.mark_name}`)
              }
              key={brand.id}
              className="transition-shadow duration-300 rounded-none cursor-pointer hover:z-10 outline outline-transparent hover:outline hover:outline-2  [&_.ant-card-body]:p-2 flex flex-col justify-center items-center xl:h-[168px] h-[130px] overflow-hidden"
            >
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={brand.image}
                  alt={`${brand.mark_name} logo`}
                  className="object-contain w-[130px]"
                />
                <span className="text-center text-sm font-medium">
                  {brand.mark_name}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
