import api from "@/Api/Api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Country {
  id: number;
  name: string;
  image: string;
}

export function CountryDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  type?: "cars" | "commerceCars" | "motobykes";
}) {
  const [cCountry, setCCountry] = useState<number | null>(null);

  const { data: countries } = useQuery<Country[]>(["countries"], async () => {
    const res = await api.get("/country");
    return res.data;
  });

  if (!isOpen) return null;

  return (
    <div className="absolute !top-20  left-0 w-[600px] bg-white boxShadowC rounded-lg p-4 z-50">
      <div className="grid grid-cols-3 gap-2">
        {countries?.map((country, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-md h-[45px] w-[180px]"
            onClick={onClose}
            onMouseEnter={() => setCCountry(index)}
            onMouseLeave={() => setCCountry(null)}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
                cCountry === index ? "opacity-100 !text-white" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${country.image})`,
              }}
            />

            <div className="relative h-full flex items-center justify-center  z-10">
              <span
                className={`${
                  cCountry === index && country.name !== "Авто из Кореи"
                    ? " !text-white"
                    : "!text-black"
                } text-md  font-semibold`}
              >
                {country.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
