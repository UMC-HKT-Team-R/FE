import React from "react";
import R4 from "../assets/Rectangle 4.svg";
import R5 from "../assets/Rectangle 5.svg";
import R6 from "../assets/Rectangle 6.svg";
import R7 from "../assets/Rectangle 7.svg";

interface InfoItem {
  id: number;
  title: string;
  date: string;
  image: string;
}

interface InfoGridProps {
  onPostClick: (id: number) => void;
}

const InfoGrid: React.FC<InfoGridProps> = ({ onPostClick }) => {
  const infoItems: InfoItem[] = [
    {
      id: 1,
      title: "냉장고 파먹기! 남은 야식 처리법 5가지 추천",
      date: "2025.01.11",
      image: R4,
    },
    {
      id: 2,
      title: "서울 시내 24시간 심야 식당 소개 3선",
      date: "2025.01.11",
      image: R5,
    },
    {
      id: 3,
      title: "늦은 밤 부담없이 즐기는 대파 방울토마토 구이 레시피",
      date: "2025.01.11",
      image: R6,
    },
    {
      id: 4,
      title: "역류성 식도염을 부르는 야식, 예방법은?",
      date: "2025.01.11",
      image: R7,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {infoItems.map((item) => (
        <div
          key={item.id}
          className="rounded-lg overflow-hidden bg-white cursor-pointer"
          onClick={() => onPostClick(item.id)}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-36 object-cover rounded-lg"
          />
          <div className="p-2 flex flex-col justify-start">
            <h3
              className="text-lg font-pretendard mt-0 break-words overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2, // 최대 줄 수 제한
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.title}
            </h3>
            <p className="text-md font-pretendard text-gray-500">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoGrid;
