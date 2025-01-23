"use client";

import { Card } from "antd";

interface CarBrand {
  name: string;
  logo: string;
}

const carBrands: CarBrand[] = [
  {
    name: "Acura",
    logo: "/55.svg",
  },
  { name: "Honda", logo: "/5.svg" },
  { name: "Hyundai", logo: "/8.svg" },
  { name: "Infiniti", logo: "/6.svg" },
  { name: "Lexus", logo: "/11.svg" },
  { name: "Mazda", logo: "/1.svg" },
  { name: "Mitsubishi", logo: "/3.svg" },
  { name: "Nissan", logo: "/88.svg" },
  { name: "Subaru", logo: "/99.svg" },
  { name: "KIA", logo: "/2.svg" },
  { name: "Genesis", logo: "/7.svg" },
  { name: "SsangYong", logo: "/4.svg" },
  {
    name: "Renault Korea Samsung",
    logo: "/9.svg",
  },
  { name: "Chevrolet", logo: "/44.svg" },
  { name: "BMW", logo: "/66.svg" },
  { name: "Mercedes", logo: "/77.svg" },
  { name: "Audi", logo: "/22.svg" },
];

export default function CarBrands() {
  return (
    <div className=" flex !justify-center items-center py-10">
      <div className=" w-[100%]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
          {carBrands.map((brand) => (
            <Card
              key={brand.name}
              className="transition-shadow duration-300 rounded-none cursor-pointer"
              // styles.body={{ padding: "1rem" }}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-16 h-16">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="object-contain"
                  />
                </div>
                <span className="text-center text-sm font-medium">
                  {brand.name}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
