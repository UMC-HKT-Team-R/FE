import React, { useEffect, useState } from "react";
import InfoGrid from "../components/InfoGrid";
import WhiteRankingList from "../components/WhiteRankingList";
import BlackRankingList from "../components/BlackRankingList";
import PostDetail from "../components/PostDetail";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [ratio, setRatio] = useState(0); // 비율 값
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null); // 선택된 게시글 ID

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setNickname(data.nickname);
          setRatio(data.ratio);
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

  const getGourmetRank = (ratio: number): number => {
    if (ratio <= 20) return 1;
    if (ratio <= 40) return 2;
    if (ratio <= 60) return 3;
    if (ratio <= 80) return 4;
    return 5;
  };

  const gourmetRank = getGourmetRank(ratio);

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
  };

  const handleBack = () => {
    setSelectedPostId(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="bg-white flex-1 overflow-auto p-4 space-y-6">
        {selectedPostId ? (
          <PostDetail postId={selectedPostId} onBack={handleBack} />
        ) : (
          <>
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

            <section>
              <WhiteRankingList />
            </section>

            <section>
              <BlackRankingList />
            </section>

            <section>
              <h2 className="text-xl font-hsBombaram mb-2">흑백 야식가를 위한</h2>
              <h2
                className="text-xl font-hsBombaram mb-2"
                style={{ color: "#422A2A" }}
              >
                시크릿 야식 정보
              </h2>
              <InfoGrid onPostClick={handlePostClick} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
