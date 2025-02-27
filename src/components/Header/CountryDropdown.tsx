"use client";

import api from "@/Api/Api";
import { useQuery } from "@tanstack/react-query";

interface Country {
  id: number;
  name: string;
  image: string;
}

export function CountryDropdown({
  isOpen,
  onClose,
  type = "cars",
}: {
  isOpen: boolean;
  onClose: () => void;
  type?: "cars" | "commerceCars" | "motobykes";
}) {
  const { data: countries } = useQuery<Country[]>(["countries"], async () => {
    const res = await api.get("/country");
    return res.data;
  });

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-[350px] bg-white shadow-lg rounded-lg p-4 z-50">
      <div className="grid grid-cols-2 gap-4">
        {countries?.map((country, index) => (
          <a
            key={index}
            href={`/${type}/${country.id}`}
            className="relative overflow-hidden rounded-lg h-[45px] group"
            onClick={onClose}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110"
              style={{
                backgroundImage: `url(${country.image})`,
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            />
            <div className="relative h-full flex items-center justify-center">
              <span className="text-white text-md font-medium">
                {country.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
