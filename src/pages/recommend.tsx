import { useEffect } from "react";
import Rollback from "@/assets/roll-back.svg?react";

const Recommend = () => {
  useEffect(() => {
    // 스크롤 비활성화
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main className="overflow-x-hidden flex flex-col">
      <section className="space-y-7 flex flex-col pb-[35px] justify-center">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">오늘의 백색 요리</p>
            <p className="text-xl text-blue1 font-semibold">: 대파 방울토마토 구이</p>
          </div>
          <button
            type="button"
            className="w-14 h-14 bg-blue1 rounded-full text-white font-semibold text-lg"
          >
            Pick!
          </button>
        </div>
        <ul className="list-disc ml-5 flex flex-col gap-2">
          <li className="text-md">방울토마토의 라이코펜은 강력한 항산화제</li>
          <li className="text-md">방울토마토의 라이코펜은 강력한 항산화제</li>
          <li className="text-md">방울토마토의 라이코펜은 강력한 항산화제</li>
        </ul>
      </section>
      <section className="-mx-4 px-4 space-y-7 bg-gray-900 text-white flex flex-col h-full pt-[38px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">오늘의 백색 요리</p>
            <p className="text-xl text-yellow1 font-semibold">: 대파 방울토마토 구이</p>
          </div>
          <button
            type="button"
            className="w-14 h-14 bg-yellow1 rounded-full font-semibold text-lg text-black"
          >
            Pick!
          </button>
        </div>
        <ul className="list-disc ml-5 flex flex-col gap-2">
          <li className="text-md">방울토마토의 라이코펜은 강력한 항산화제</li>
          <li className="text-md">방울토마토의 라이코펜은 강력한 항산화제</li>
          <li className="text-md">방울토마토의 라이코펜은 강력한 항산화제</li>
        </ul>
        <button className="flex gap-2 text-md font-semibold py-2.5 px-4 bg-grey800 text-white w-max items-center rounded-lg mx-auto">
          <Rollback color="white" />
          다시 추천
        </button>
      </section>
    </main>
  );
};

export default Recommend;
