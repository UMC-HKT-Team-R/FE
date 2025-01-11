import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sample from "../assets/banner1.png";

const comments = [
  {
    id: 1,
    username: "낭만고양이",
    profile: "/path/to/logo1.png",
    content: "점심 깔끔한 거 먹었으면 야식은 좀 무겁게 먹어야죠 라면 추천드립니다 ㅋㅋㅋㅋㅋ",
    date: "24. 12. 31. 12:13",
  },
  {
    id: 2,
    username: "카리나 사랑해",
    profile: "/path/to/logo2.png",
    content: "야식 드시지 마세요 몸에 안 좋아요",
    date: "24. 12. 31. 12:13",
  },
];

function PostDetail() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  const handleDeleteComment = (id: number) => {
    setSelectedCommentId(id);
    setIsModalOpen(true);
  };

  const handlePostDelete = () => {
    setIsPostModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting comment with ID:", selectedCommentId);
    setIsModalOpen(false);
  };

  const confirmDeletePost = () => {
    setIsPostModalOpen(false);
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen">
  <header className="flex items-center w-full h-[68px] px-4 bg-white z-10 sticky top-0">
  <button className="mr-auto" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
          >
            <path
              d="M9 17L1 9L9 1"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={handlePostDelete}
          className="text-[#FF3E3E] font-pretendard font-semibold text-[15px] leading-[20px]"
        >
          삭제
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-[80px]">
        <div className="flex items-center mb-[24px]">
          <img src="/path/to/logo.png" alt="로고" className="w-[40px] h-[40px] rounded-full" />
          <div className="ml-4">
            <span className="text-[#000] font-pretendard font-medium text-[15px] leading-[20px]">
              유저 이름
            </span>
            <div className="text-[#B3B5BC] font-pretendard text-[12px] leading-[16px] mt-[3px]">
              2025.01.11 12:13
            </div>
          </div>
        </div>

        <h1 className="text-[#000] font-pretendard font-semibold text-[18px] leading-[24px] mb-[12px]">
          게시글 제목
        </h1>

        <p className="text-[#000] font-pretendard text-[15px] leading-[20px] overflow-hidden text-ellipsis mb-[12px]">
          게시글 내용
        </p>

        <img
          src={sample}
          alt="게시글 이미지"
          className="w-full h-[328px] rounded-[6px] mb-[20px]"
        />

        <div className="w-full h-[12px] bg-[#F3F4F8] mb-[20px]"></div>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex mb-[6px]">
                <img
                  src={comment.profile}
                  alt="프로필"
                  className="w-[40px] h-[40px] rounded-full flex-shrink-0"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <span className="text-[#000] font-pretendard font-medium text-[15px] leading-[20px]">
                      {comment.username}
                    </span>
                    <button onClick={() => handleDeleteComment(comment.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M21 7L7 21"
                          stroke="#FF3E3E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 7L21 21"
                          stroke="#FF3E3E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-[#000] font-pretendard text-[15px] leading-[20px] mt-[8px]">
                    {comment.content}
                  </p>
                  <div className="text-[#B3B5BC] font-pretendard text-[12px] leading-[16px] mt-[8px]">
                    {comment.date}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-[#000] font-pretendard text-[15px] leading-[20px] mt-[4px]">
              첫 댓글을 남겨주세요.
            </span>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-[#F3F4F8]">
        <div className="flex items-center bg-[#F3F4F8] rounded-[8px] px-[12px]">
          <input
            type="text"
            placeholder="댓글을 작성해보세요."
            className="flex-1 h-[32px] bg-transparent placeholder-[#B3B5BC] text-[#000] font-pretendard text-[15px] leading-[20px] outline-none"
          />
          <button className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M2.5 9.1665L18.3333 1.6665L10.8333 17.4998L9.16667 10.8332L2.5 9.1665Z"
                stroke="#0051FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div
            style={{
              width: "328px",
              height: "160px",
              borderRadius: "12px",
              background: "#FFF",
            }}
            className="flex flex-col justify-between pt-[52px] px-[17px] pb-[12px]"
          >
            <p className="text-[#000] font-pretendard text-center font-medium text-[15px] leading-[20px] ">
              댓글을 삭제할까요?
            </p>
            <div className="flex justify-between mt-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  width: "144px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "#F3F4F8",
                }}
                className="text-[#000] font-pretendard text-[15px] font-medium"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  width: "144px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "#FF3E3E",
                }}
                className="text-white font-pretendard text-[15px] font-medium"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {isPostModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            style={{
              width: "328px",
              height: "160px",
              borderRadius: "12px",
              background: "#FFF",
            }}
            className="flex flex-col justify-between pt-[52px] px-[17px] pb-[12px]"
          >
            <p className="text-[#000] font-pretendard text-center font-medium text-[15px] leading-[20px] ">
              게시글을 삭제할까요?
            </p>
            <div className="flex justify-between mt-auto">
              <button
                onClick={() => setIsPostModalOpen(false)}
                style={{
                  width: "144px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "#F3F4F8",
                }}
                className="text-[#000] font-pretendard text-[15px] font-medium"
              >
                취소
              </button>
              <button
                onClick={confirmDeletePost}
                style={{
                  width: "144px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "#FF3E3E",
                }}
                className="text-white font-pretendard text-[15px] font-medium"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
