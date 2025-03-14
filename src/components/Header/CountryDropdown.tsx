import api from "@/Api/Api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Country {
  id: number;
  name: string;
  image: string;
  description: string;
}

export function CountryDropdown({
  isOpen,
  onClose,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  type?: string;
}) {
  const [cCountry, setCCountry] = useState<number | null>(null);
  const navigate = useNavigate();

  const { data: countries } = useQuery<Country[]>(["countries"], async () => {
    const res = await api.get("/country");
    return res.data;
  });

  if (!isOpen) return null;

  /// ,
  const handleCountryFilter = async (name: string) => {
    try {
      let endpoint = "";
      let selectedTab = "";

      if (type === "cars") {
        endpoint = `/country-cars?name=${name}`;
      } else if (type === "commerceCars") {
        selectedTab = "commerce";
      } else if (type === "motobykes") {
        selectedTab = "moto";
      }

      if (type === "cars") {
        endpoint = `/country-cars?name=${name}`;
      } else if (type === "commerceCars") {
        endpoint = `/country-commerce?name=${name}`;
      } else if (type === "motobykes") {
        endpoint = `/country-moto?name=${name}`;
      }

      // const res = await api.get(endpoint);
      navigate(`/catalog?country=${name}&selectedTab=${selectedTab}`);

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute !top-20  left-0 w-[600px] bg-white boxShadowC rounded-lg p-4 z-50">
      <div className="grid grid-cols-3 gap-2">
        {countries?.map((country, index) => (
          <div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-md h-[45px] w-[180px]"
            onClick={() => handleCountryFilter(country.name)}
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
                  cCountry === index && country.description !== "Авто из Кореи"
                    ? " !text-white"
                    : "!text-black"
                } text-md  font-semibold`}
              >
                {country.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
