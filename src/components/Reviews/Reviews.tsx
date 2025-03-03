import { Rate } from "antd";
import { GoLinkExternal } from "react-icons/go";

interface Review {
  name: string;
  date: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Александра",
    date: "Апрель 2024",
    text: "Я очень доволен покупкой машины в данном автосалоне. Все сотрудники были приветливые и готовы помочь на каждом этапе выбора и приобретения авто. Мне предоставили отличные условия по кредитованию, а также сделали хорошую скидку на машину. Все документы оформили быстро и без лишних хлопот",
    rating: 5,
  },
  {
    name: "Александра",
    date: "Апрель 2024",
    text: "Я очень доволен покупкой машины в данном автосалоне. Все сотрудники были приветливые и готовы помочь на каждом этапе выбора и приобретения авто. Мне предоставили отличные условия по кредитованию, а также сделали хорошую скидку на машину. Все документы оформили быстро и без лишних хлопот",
    rating: 5,
  },
  {
    name: "Александра",
    date: "Апрель 2024",
    text: "Я очень доволен покупкой машины в данном автосалоне. Все сотрудники были приветливые и готовы помочь на каждом этапе выбора и приобретения авто. Мне предоставили отличные условия по кредитованию, а также сделали хорошую скидку на машину. Все документы оформили быстро и без лишних хлопот",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <div className=" mx-auto  py-12">
      <h2 className="text-3xl font-bold mb-8">Отзывы</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white rounded-lg boxShadowC p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 relative mr-4">
                  <div className="absolute inset-0 bg-[#FF4B4B] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    Я
                  </div>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-[#8C8C8C]">
                    Яндекс <GoLinkExternal className="mt-1" />
                  </p>
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium mr-2">{review.name}</h3>
                  </div>
                  <p className="text-[#8C8C8C] text-sm">{review.date}</p>
                </div>
              </div>
              <div>
                <Rate
                  disabled
                  defaultValue={review.rating}
                  className="mb-4 text-[#F5AB30]"
                />
              </div>
            </div>
            <p className="text-[#414141] text-sm leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
