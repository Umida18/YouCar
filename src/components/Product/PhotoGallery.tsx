import React, { useState } from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ICar } from "../../Type/Type";

interface PropsCar {
  item: ICar;
}

const PhotoGallery: React.FC<PropsCar> = ({ item }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = React.useRef<any>();

  const caruselRef = React.useRef<any>();
  return (
    <div className="boxShadowC rounded-xl">
      <div className="relative mb-4 ">
        <Carousel
          ref={carouselRef}
          beforeChange={(_, to) => setCurrentSlide(to)}
        >
          {item.image.map((i) => (
            <div key={i} className="aspect-[16/9]">
              <img
                src={i || "/placeholder.svg"}
                alt={`Car view ${item.model}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </Carousel>

        <button
          onClick={() => carouselRef.current?.prev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
        >
          <LeftOutlined className="text-xl" />
        </button>
        <button
          onClick={() => carouselRef.current?.next()}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
        >
          <RightOutlined className="text-xl" />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {item?.image.map((image, index) => (
          <button
            key={index}
            onClick={() => carouselRef.current?.goTo(index)}
            className={`relative aspect-[4/3] overflow-hidden rounded-lg ${
              currentSlide === index ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>{" "}
      <Carousel ref={caruselRef}></Carousel>
    </div>
  );
};

export default PhotoGallery;
