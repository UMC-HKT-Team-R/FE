import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import sampleImage from "../assets/banner2.png";
import FloatingWriteButton from "@/components/FloatingWriteButton";

function Post() {
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    navigate(`/post-detail/${postId}`);
  };

  const handleWriteClick = () => {
    navigate("/post-write");
  };

  const banners = [
    {
      image: banner1,
      topText: "한밤 중에도 건강하고 깔끔하게!",
      bottomText: "메가샐러드",
    },
    {
      image: banner2,
      topText: "스트레스를 한방에 날려줄",
      bottomText: "맥도날드 상하이 치킨 버거",
    },
    {
      image: banner3,
      topText: "쌀 튀김옷으로 부담없는 야식",
      bottomText: "교촌치킨 살살 치킨",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);

  const posts = [
    {
      postId: 1,
      title: "야메추 부탁해요",
      body: "아까 점심은 서브웨이 먹었는데 야식으로 좀 안 느끼한 거 먹고 싶어요 되도록 일식 중에서 추천 부탁드립니다.",
      date: "25. 01. 11. 12:13",
      comments: 3,
      image: sampleImage,
    },
    {
      postId: 2,
      title: "비빔 참치 우동 후기",
      body: "이거 진짜 미친놈임 성시경 레시피라고 인터넷에 검색하면 나오는데 진짜 미친 맛이다",
      date: "25. 01. 03. 12:13",
      comments: 5,
    },
    {
      postId: 3,
      title: "야식 먹다 체한 거 같은데 소화제 뭐가 좋나요",
      body: "원래 야식 잘 안 먹는데 괜히 스트레스 풀려고 먹다가 체한 거 같아요...",
      date: "24. 12. 31. 12:13",
      comments: 2,
      image: sampleImage,
    },
    {
      postId: 4,
      title: "야식 먹다 체한 거 같은데 소화제 뭐가 좋나요",
      body: "원래 야식 잘 안 먹는데 괜히 스트레스 풀려고 먹다가 체한 거 같아요...",
      date: "24. 12. 31. 12:13",
      comments: 2,
      image: sampleImage,
    },
    {
      postId: 5,
      title: "야식 먹다 체한 거 같은데 소화제 뭐가 좋나요",
      body: "원래 야식 잘 안 먹는데 괜히 스트레스 풀려고 먹다가 체한 거 같아요...",
      date: "24. 12. 31. 12:13",
      comments: 2,
      image: sampleImage,
    },
    {
      postId: 6,
      title: "야식 먹다 체한 거 같은데 소화제 뭐가 좋나요",
      body: "원래 야식 잘 안 먹는데 괜히 스트레스 풀려고 먹다가 체한 거 같아요...",
      date: "24. 12. 31. 12:13",
      comments: 2,
      image: sampleImage,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (startX === null) return;

    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - clientX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }

    setStartX(null);
  };

  return (
    <div className="flex flex-col h-screen ">
      <main
        className="relative w-full h-[80px] flex-shrink-0 mt-[78.5px]"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div className="absolute inset-0">
          <img
            src={banners[currentIndex].image}
            alt={`배너 ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-[18px] left-[21px] z-20">
          <p
            className="text-white font-medium text-[15px] leading-[20px]"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 500,
            }}
          >
            {banners[currentIndex].topText}
          </p>
          <p
            className="text-white font-semibold text-[18px] leading-[24px] mt-1"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 600,
            }}
          >
            {banners[currentIndex].bottomText}
          </p>
        </div>

        <div className="absolute inset-0 bg-[#000000] bg-opacity-50 z-10"></div>

        <div
          className="absolute right-[8px] bottom-[8px] flex items-center justify-center h-[16px] px-[6px] bg-white bg-opacity-70 z-20 rounded-[16px]"
          style={{
            fontFamily: "Pretendard",
            fontSize: "9px",
            fontWeight: 600,
            lineHeight: "12px",
            color: "#000",
          }}
        >
          {currentIndex + 1}/{banners.length}
        </div>
      </main>

      <div className="flex-1 overflow-y-auto px-4 mt-[20px] mb-[80px]">
        {posts.map((post, index) => (
          <div
            key={index}
            className="flex flex-col w-full mb-6 cursor-pointer"
            onClick={() => handlePostClick(post.postId)}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-[#000] font-pretendard font-medium text-[15px] leading-[20px] mb-[4px]">
                  {post.title}
                </h3>
                <p className="text-[#5B5D6A] font-pretendard text-[12px] leading-[16px] overflow-hidden text-ellipsis">
                  {post.body}
                </p>
                <div className="flex font-pretendard items-center mt-[8px] text-[12px] leading-[16px]">
                  <span className="text-[#B3B5BC]">{post.date}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="ml-2"
                  >
                    <path
                      d="M10.5 7.5C10.5 7.76522 10.3946 8.01957 10.2071 8.20711C10.0196 8.39464 9.76522 8.5 9.5 8.5H3.5L1.5 10.5V2.5C1.5 2.23478 1.60536 1.98043 1.79289 1.79289C1.98043 1.60536 2.23478 1.5 2.5 1.5H9.5C9.76522 1.5 10.0196 1.60536 10.2071 1.79289C10.3946 1.98043 10.5 2.23478 10.5 2.5V7.5Z"
                      stroke="#0051FF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="ml-[3px] text-[#0051FF]"
                    style={{ fontFamily: "Pretendard", fontWeight: 400 }}
                  >
                    {post.comments}
                  </span>
                </div>
              </div>

              {/* 이미지 섹션 */}
              {post.image && (
                <div className="ml-4 flex-shrink-0">
                  <img
                    src={post.image}
                    alt="게시글 이미지"
                    className="w-[80px] h-[80px] object-cover rounded-[6px]"
                  />
                </div>
              )}
            </div>

            {/* 구분선 */}
            {index < posts.length - 1 && (
              <div className="w-full h-0 border-t border-[#F3F4F8] mt-4"></div>
            )}
          </div>
        ))}
      </div>
      <FloatingWriteButton onClick={handleWriteClick} />
    </div>
  );
}

export default Post;
