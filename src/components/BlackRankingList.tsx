import 피자 from "../assets/pizza.svg";
import 찜닭 from "../assets/jjimdak.svg";
import 햄버거 from "../assets/hamburger.svg";
import 라면 from "../assets/ramyeon.svg";
import 짜장면 from "../assets/jjajang.svg";

const BlackRankingList = () => {
  const items = [
    { id: 1, name: "피자", count: 121, image: 피자 },
    { id: 2, name: "찜닭", count: 101, image: 찜닭 },
    { id: 3, name: "햄버거", count: 87, image: 햄버거 },
    { id: 4, name: "라면", count: 64, image: 라면 },
    { id: 5, name: "짜장면", count: 33, image: 짜장면 },
  ];

  return (
    <div className="border-2 border-black rounded-lg p-4 bg-black">
      {/* 타이틀과 날짜 */}
      <div className="flex justify-between items-center mb-4 text-white">
        <h2 className="text-lg font-bold font-pretendard">흑색 야식 랭킹</h2>
        <span className="text-sm font-bold text-white">25. 01. 11.</span>
      </div>

      {/* 리스트 */}
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center">
            {/* 순번 */}
            <div className="text-xl font-hsBombaram w-8 text-center text-white">{item.id}</div>

            {/* 이미지 */}
            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full mr-4" />

            {/* 이름 */}
            <div className="flex-1">
              <p className="text-md font-pretendard text-white">{item.name}</p>
            </div>

            {/* 참여 인원 */}
            <div className="text-md font-pretendard text-white">{item.count} 명</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlackRankingList;
