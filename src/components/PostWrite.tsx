import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "@/services/post";

function PostWrite() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(); // null 대신 undefined 사용
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !body) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await createPost({
        title,
        body,
        image: selectedImage,
      });

      if (response.isSuccess) {
        alert("게시글이 성공적으로 작성되었습니다!");
        navigate(`/post-detail/${response.result.postId}`);
      } else {
        alert(`오류가 발생했습니다: ${response.message}`);
      }
    } catch (error) {
      console.error("게시글 작성 중 오류가 발생했습니다:", error);
      alert("게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#FFF]">
      <header className="flex items-center w-full h-[68px] px-4">
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
          onClick={handleSubmit}
          className="text-[#0051FF] font-pretendard font-semibold text-[15px] leading-[20px]"
        >
          게시
        </button>
      </header>

      <div className="flex flex-col px-4 mt-4">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-[#000] placeholder-[#B3B5BC] font-pretendard text-[18px] font-semibold leading-[24px] mb-4 focus:outline-none"
          style={{ fontFamily: "Pretendard" }}
        />
        <div className="w-full border-t border-[#F3F4F8] mb-4"></div>
        <textarea
          placeholder="야식에 대해 자유롭게 이야기를 나눠보세요."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full text-[#000] placeholder-[#B3B5BC] font-pretendard text-[15px] font-normal leading-[20px] resize-none focus:outline-none"
          style={{
            fontFamily: "Pretendard",
            height: "auto",
            maxHeight: "120px",
            overflowY: "auto",
          }}
          rows={1}
        ></textarea>
      </div>

      <div className="flex flex-col h-full items-center px-4">
        {selectedImage ? (
          <div className="flex flex-col items-center mt-[40px]">
            <div className="relative w-[328px] h-[328px]">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="첨부된 이미지"
                className="w-full h-full rounded-[6px] object-cover"
              />
              <button
                onClick={() => setSelectedImage(undefined)} // null 대신 undefined
                className="absolute mt-[12px] right-2 text-[#000] underline font-pretendard text-[15px] font-normal leading-[20px]"
                style={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "solid",
                }}
              >
                다시 선택
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center fixed bottom-[90px]">
            <label className="flex gap-[8px] items-center justify-center w-[122px] h-[38px] bg-[#000] rounded-[8px] text-[#FFF] font-pretendard text-[15px] font-semibold leading-[20px] cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M17 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V3C19 1.89543 18.1046 1 17 1Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 8 7.32843 8 6.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 13L14 8L3 19"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              사진 첨부
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostWrite;
