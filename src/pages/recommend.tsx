import Rollback from "@/assets/roll-back.svg?react";

const Recommend = () => {
  return (
    <main className="overflow-y-auto">
      <h1 className="font-hsBombaram text-xl">오늘의 야식을 Pick! 해보세요</h1>
      <div className="flex justify-between  mt-7">
        <div>
          <h2 className="text-lg font-semibold">오늘의 백색 요리</h2>
          <h2 className="text-xl text-blue1 font-semibold">: 대파 방울토마토 구이</h2>
        </div>
        <button
          type="button"
          className="w-14 h-14 bg-blue1 rounded-full text-white font-semibold text-lg"
        >
          Pick!
        </button>
      </div>
      <ul className="list-disc ml-5 flex flex-col gap-2 mt-7 mb-9">
        <li className="text-lg">방울토마토의 라이코펜은 강력한 항산화제</li>
        <li className="text-lg">방울토마토의 라이코펜은 강력한 항산화제</li>
        <li className="text-lg">방울토마토의 라이코펜은 강력한 항산화제</li>
        <li className="text-lg">방울토마토의 라이코펜은 강력한 항산화제</li>
      </ul>
      <div className="bg-gray-900 -mx-4 px-4 h-full min-h-[328px]">
        <div className="flex justify-between  mt-7">
          <div>
            <h2 className="text-lg font-semibold text-white">오늘의 흑색 요리</h2>
            <h2 className="text-xl text-yellow1 font-semibold">: 대파 방울토마토 구이</h2>
          </div>
          <button
            type="button"
            className="w-14 h-14 bg-yellow1 rounded-full text-black font-semibold text-lg"
          >
            Pick!
          </button>
        </div>
        <ul className="list-disc ml-5 flex flex-col gap-2 mt-7 mb-9">
          <li className="text-white text-lg">방울토마토의 라이코펜은 강력한 항산화제</li>
          <li className="text-white text-lg">방울토마토의 라이코펜은 강력한 항산화제</li>
          <li className="text-white text-lg">방울토마토의 라이코펜은 강력한 항산화제</li>
          <li className="text-white text-lg">방울토마토의 라이코펜은 강력한 항산화제</li>
        </ul>
        <div className="px-1">
          <button className="h-11 w-full bg-white flex justify-center items-center gap-2 text-center rounded-lg">
            <Rollback />
            다시추천
          </button>
        </div>
      </div>
    </main>
  );
};

export default Recommend;
