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
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = React.useRef<any>();

  const VISIBLE_THUMBNAILS = isMobile ? 2 : 4;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  }, [currentSlide, thumbnailStartIndex, endIndex, VISIBLE_THUMBNAILS]);

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

  const calculateVisibleThumbnails = () => {
    if (!isMobile) return VISIBLE_THUMBNAILS;

    if (hasPrevImages && hasNextImages) {
      return 2;
    } else if (hasPrevImages || hasNextImages) {
      return 3;
    } else {
      return 4;
    }
  };

  const visibleThumbnails = calculateVisibleThumbnails();

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
                className="xl:w-full min-w-[285px] w-full h-full object-cover object-center rounded-lg xl:h-[530px]"
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

      <div className="flex xl:gap-3 xl:justify-start gap-2">
        {/* Previous images button */}
        {hasPrevImages && (
          <button
            onClick={showPrevThumbnails}
            className="relative aspect-[4/3] overflow-hidden rounded-lg xl:!min-w-[150px] xl:!min-h-[150px] w-[78px] h-[77px]"
          >
            <img
              src={item.image[thumbnailStartIndex - 1] || "/placeholder.svg"}
              alt={`Previous thumbnail`}
              className="xl:!min-w-[150px] xl:!min-h-[150px] w-[78px] h-[77px] object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-white font-medium">
                +{thumbnailStartIndex} фото
              </div>
            </div>
          </button>
        )}

        {/* Current visible thumbnails */}
        {item.image
          .slice(thumbnailStartIndex, thumbnailStartIndex + visibleThumbnails)
          .map((image, index) => {
            const actualIndex = thumbnailStartIndex + index;
            return (
              <button
                key={actualIndex}
                onClick={() => carouselRef.current?.goTo(actualIndex)}
                className={`relative aspect-[4/3] rounded-lg xl:min-w-[150px] xl:min-h-[150px] w-[78px] h-[77px] ${
                  currentSlide === actualIndex ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${actualIndex + 1}`}
                  className="xl:!min-w-[150px] xl:!min-h-[150px] w-[78px] h-[77px] object-cover rounded-lg"
                />
              </button>
            );
          })}

        {/* Next images button */}
        {hasNextImages && (
          <button
            onClick={showNextThumbnails}
            className="relative aspect-[4/3] overflow-hidden rounded-lg xl:!min-w-[150px] xl:!min-h-[150px] w-[78px] h-[77px]"
          >
            <img
              src={item.image[endIndex] || "/placeholder.svg"}
              alt={`Next thumbnail`}
              className="object-cover xl:!min-w-[150px] xl:!min-h-[150px] w-[78px] h-[77px]"
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
