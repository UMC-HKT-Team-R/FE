import React, { useEffect, useState } from "react";
import InfoGrid from "../components/InfoGrid";
import WhiteRankingList from "../components/WhiteRankingList";
import BlackRankingList from "../components/BlackRankingList";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [ratio, setRatio] = useState(0); // 비율 값

  // 로그인 상태 확인 및 닉네임, 비율 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setNickname(data.nickname);
          setRatio(data.ratio); // 비율 가져오기
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserInfo();
  }, []);

  // 등급 계산 함수
  const getGourmetRank = (ratio: number): number => {
    if (ratio <= 20) return 1;
    if (ratio <= 40) return 2;
    if (ratio <= 60) return 3;
    if (ratio <= 80) return 4;
    return 5;
  };

  const gourmetRank = getGourmetRank(ratio);

  return (
    <>
      {/* 메인 콘텐츠 */}
      <main className="bg-gray-100 flex flex-col overflow-auto p-4 space-y-6">
        {/* 로그인 상태에 따른 내용 */}
        <section className="flex justify-center items-center">
          {isLoggedIn ? (
            <span className="text-xl font-hsBombaram text-gray-700">
              {gourmetRank}등 미식가, {nickname}님
            </span>
          ) : (
            <div className="w-full max-w-max-size">
              <button
                className="bg-yellow1 font-pretendard text-black w-full px-4 py-3 my-2 rounded-md flex items-center justify-center text-md"
                onClick={() => (window.location.href = "/login")}
              >
                <img
                  src="/src/assets/Kakao.svg"
                  alt="카카오"
                  className="w-5 h-5 mr-2"
                />
                카카오로 로그인하기
              </button>
            </div>
          )}
        </section>

        {/* 섹션 1: 백색 야식 랭킹 */}
        <section>
          <WhiteRankingList />
        </section>

        {/* 섹션 2: 흑색 야식 랭킹 */}
        <section>
          <BlackRankingList />
        </section>

        {/* 섹션 3: 시크릿 야식 정보 */}
        <section>
          <h2 className="text-xl font-hsBombaram mb-2">흑백 야식가를 위한</h2>
          <h2
            className="text-xl font-hsBombaram mb-2"
            style={{ color: "#422A2A" }}
          >
            시크릿 야식 정보
          </h2>

          <InfoGrid />
        </section>
      </main>
    </>
  );
}

export default Home;
