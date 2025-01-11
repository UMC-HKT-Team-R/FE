import 샐러드 from "../assets/salad.svg";
import 블루치즈 from "../assets/blueCheese.svg";
import 아몬드 from "../assets/almond.svg";
import 고등어구이 from "../assets/fish.svg";
import 삶은계란 from "../assets/egg.svg";

const WhiteRankingList = () => {
  const items = [
    { id: 1, name: "샐러드", count: 151, image: 샐러드 },
    { id: 2, name: "블루 치즈", count: 104, image: 블루치즈 },
    { id: 3, name: "아몬드", count: 56, image: 아몬드 },
    { id: 4, name: "고등어 구이", count: 23, image: 고등어구이 },
    { id: 5, name: "삶은 계란", count: 8, image: 삶은계란 },
  ];

  return (
    <div className="border-2 border-black rounded-lg p-4 bg-white">
      {/* 리스트 */}
      <ul className="space-y-4">
        {/* 타이틀과 날짜 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold font-pretendard">백색 야식 랭킹</h2>
          <span className="text-sm font-bold text-black">25. 01. 11.</span>
        </div>
        {items.map((item) => (
          <li key={item.id} className="flex items-center">
            {/* 순번 */}
            <div className="text-xl font-hsBombaram w-8 text-center mr-2">{item.id}</div>

            {/* 이미지 */}
            <img
              src={item.image}
              alt={item.name}
              className="w-10 h-10 rounded-full mr-4"
            />

            {/* 이름 */}
            <div className="flex-1">
              <p className="text-md font-pretendard text-md">{item.name}</p>
            </div>

            {/* 참여 인원 */}
            <div className="text-md font-pretendard text-black">{item.count} 명</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhiteRankingList;


