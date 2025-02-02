"use client";

import api from "@/Api/Api";
import { IMarks } from "@/Type/Type";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";

export default function CarBrands() {
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
              key={brand.id}
              className="transition-shadow duration-300 rounded-none cursor-pointer"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-16 h-16">
                  <img
                    src={brand.image}
                    alt={`${brand.mark_name} logo`}
                    className="object-contain"
                  />
                </div>
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
