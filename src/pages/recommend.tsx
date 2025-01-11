import { useEffect, useState } from "react";
import Rollback from "@/assets/roll-back.svg?react";
import { getRecommend } from "@/services/recommend";
import { FoodType } from "@/constants/food-type";

interface RecommendResult {
  category: string;
  description: string[];
  menu: string;
  type: FoodType;
}

interface Response {
  white: RecommendResult[];
  black: RecommendResult[];
}

const Recommend = () => {
  const [data, setData] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const onClickReset = () => {
    setIsLoading(true);
    setIsError(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const fetchData = async () => {
    try {
      const res = await getRecommend();
      setData(res.data.result);
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  return isLoading ? (
    <main className="flex justify-center items-center font-hsBombaram text-xl">야식 추천 중!</main>
  ) : isError ? (
    <main className="flex justify-center items-center font-hsBombaram text-xl">
      메뉴 추천 중 에러가 발생했어요 :(
    </main>
  ) : (
    <main className="overflow-x-hidden overflow-hidden flex flex-col">
      <section className="space-y-7 flex flex-col pb-[35px] justify-center">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">오늘의 백색 요리</p>
            <p className="text-xl text-blue1 font-semibold">: {data?.white[0].menu}</p>
          </div>
          <button
            type="button"
            className="w-14 h-14 bg-blue1 rounded-full text-white font-semibold text-lg"
          >
            Pick!
          </button>
        </div>
        <ul className="list-disc ml-5 flex flex-col gap-2">
          {data?.white[0].description.map((item) => (
            <li key={item} className="text-md">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="-mx-4 px-4 space-y-7 bg-gray-900 text-white flex flex-col h-full pt-[38px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">오늘의 백색 요리</p>
            <p className="text-xl text-yellow1 font-semibold">: {data?.black[0].menu}</p>
          </div>
          <button
            type="button"
            className="w-14 h-14 bg-yellow1 rounded-full font-semibold text-lg text-black"
          >
            Pick!
          </button>
        </div>
        <ul className="list-disc ml-5 flex flex-col gap-2">
          {data?.black[0].description.map((item) => (
            <li key={item} className="text-md">
              {item}
            </li>
          ))}
        </ul>
        <button
          className="flex gap-2 text-md font-semibold py-2.5 px-4 bg-grey800 text-white w-max items-center rounded-lg mx-auto"
          onClick={onClickReset}
        >
          <Rollback color="white" />
          다시 추천
        </button>
      </section>
    </main>
  );
};

export default Recommend;
