import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import type { ICar } from "../../Type/Type";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

interface PropsCar {
  item: ICar;
}

const PhotoGallery: React.FC<PropsCar> = ({ item }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const carouselRef = React.useRef<any>();
  const VISIBLE_THUMBNAILS = 4;

  const endIndex = thumbnailStartIndex + VISIBLE_THUMBNAILS;
  const hasNextImages = endIndex < item.image.length;
  const hasPrevImages = thumbnailStartIndex > 0;

  useEffect(() => {
    if (currentSlide < thumbnailStartIndex) {
      setThumbnailStartIndex(
        Math.floor(currentSlide / VISIBLE_THUMBNAILS) * VISIBLE_THUMBNAILS
      );
    } else if (currentSlide >= endIndex) {
      setThumbnailStartIndex(
        Math.floor(currentSlide / VISIBLE_THUMBNAILS) * VISIBLE_THUMBNAILS
      );
    }
  }, [currentSlide, thumbnailStartIndex, endIndex]);

  const showNextThumbnails = () => {
    const newStartIndex = endIndex;
    setThumbnailStartIndex(newStartIndex);
    carouselRef.current?.goTo(newStartIndex);
  };

  const showPrevThumbnails = () => {
    const newStartIndex = Math.max(0, thumbnailStartIndex - VISIBLE_THUMBNAILS);
    setThumbnailStartIndex(newStartIndex);
    carouselRef.current?.goTo(newStartIndex);
  };

  return (
    <div className="rounded-xl">
      <div className="relative mb-4">
        <Carousel
          dots={false}
          draggable={true}
          ref={carouselRef}
          beforeChange={(_, to) => setCurrentSlide(to)}
        >
          {item.image.map((i) => (
            <div key={i} className="aspect-[16/9]">
              <img
                src={i || "/placeholder.svg"}
                alt={`Car view ${item.model}`}
                className="w-full h-full object-cover object-center rounded-lg xl:h-[530px]"
              />
            </div>
          ))}
        </Carousel>

        <button
          onClick={() => carouselRef.current?.prev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-white"
        >
          <IoIosArrowRoundBack className="text-xl" />
        </button>
        <button
          onClick={() => carouselRef.current?.next()}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-white"
        >
          <IoIosArrowRoundForward className="text-xl" />
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Oldingi rasmlar mavjud bo'lsa ko'rsatish */}
        {hasPrevImages && (
          <button
            onClick={showPrevThumbnails}
            className="relative aspect-[4/3] overflow-hidden rounded-lg w-[150px] h-[150px]"
          >
            <img
              src={item.image[thumbnailStartIndex - 1] || "/placeholder.svg"}
              alt={`Previous thumbnail`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-white font-medium">
                +{thumbnailStartIndex} фото
              </div>
            </div>
          </button>
        )}

        {/* Joriy ko'rinib turgan thumbnaillar */}
        {item.image.slice(thumbnailStartIndex, endIndex).map((image, index) => {
          const actualIndex = thumbnailStartIndex + index;
          return (
            <button
              key={actualIndex}
              onClick={() => carouselRef.current?.goTo(actualIndex)}
              className={`relative aspect-[4/3] rounded-lg w-[150px] h-[150px] ${
                currentSlide === actualIndex ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${actualIndex + 1}`}
                className="w-[150px] h-[150px] object-cover rounded-lg "
              />
            </button>
          );
        })}

        {/* Keyingi rasmlar mavjud bo'lsa ko'rsatish */}
        {hasNextImages && (
          <button
            onClick={showNextThumbnails}
            className="relative aspect-[4/3] overflow-hidden rounded-lg w-[150px] h-[150px]"
          >
            <img
              src={item.image[endIndex] || "/placeholder.svg"}
              alt={`Next thumbnail`}
              className=" object-cover w-[150px] h-[150px]"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-white font-medium">
                +{item.image.length - endIndex} фото
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
