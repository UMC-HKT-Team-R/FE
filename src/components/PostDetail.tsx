import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sample from "../assets/banner1.png";
import logo from "../assets/profile.png";
import profile1 from "../assets/mainlogo.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import profile5 from "../assets/profile.png";
import { deletePost } from "@/services/post";
import { createComment, deleteComment } from "@/services/comment";
import { getMypageData } from "@/services/my";

function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [commentBody, setCommentBody] = useState<string>("");
  const [commentList, setCommentList] = useState<
    {
      id: number;
      username: string;
      type: string;
      profile: string;
      content: string;
      date: string;
    }[]
  >([]);
  const [userNickname, setUserNickname] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>(profile5);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 100)}px`;
    }
  };

  const getGourmetInfo = (categories: number): { type: string; image: string } => {
    if (categories <= 10) return { type: "절제 미식가", image: profile1 };
    if (categories <= 30) return { type: "노력하는 미식가", image: profile2 };
    if (categories <= 50) return { type: "갈대같은 미식가", image: profile3 };
    if (categories <= 80) return { type: "충동적인 미식가", image: profile4 };
    return { type: "자극 중독 미식가", image: profile5 };
  };

  useEffect(() => {
    adjustHeight();
  }, [commentBody]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMypageData();
        const { nickname, categories } = response.result;
        const { type, image } = getGourmetInfo(categories);
        setUserNickname(nickname);
        setUserType(type);
        setProfileImage(image);
      } catch (error) {
        console.error("사용자 데이터 가져오기 실패:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleCommentSubmit = async () => {
    if (!commentBody.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    try {
      const response = await createComment(Number(postId), { content: commentBody });

      if (response?.result?.commentId) {
        setCommentList((prev) => [
          ...prev,
          {
            id: response.result.commentId,
            username: userNickname || "익명",
            type: userType,
            profile: profileImage,
            content: commentBody,
            date: new Date().toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" }),
          },
        ]);
        setCommentBody("");
      } else {
        alert("댓글 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeleteComment = (id: number) => {
    setSelectedCommentId(id);
    setIsModalOpen(true);
  };

  const handlePostDelete = () => {
    setIsPostModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCommentId === null) {
      alert("삭제할 댓글을 선택해주세요.");
      return;
    }

    try {
      const response = await deleteComment(selectedCommentId);
      console.log("댓글 삭제 성공:", response);
      alert(response.message);

      setCommentList((prev) => prev.filter((comment) => comment.id !== selectedCommentId));
      setIsModalOpen(false);
      setSelectedCommentId(null);
    } catch (error) {
      alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const confirmDeletePost = async () => {
    try {
      await deletePost(Number(postId));
      setIsPostModalOpen(false);
      navigate("/post");
    } catch (error) {
      alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
    }
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
          <img src={logo} alt="로고" className="w-[44px] h-[44px] rounded-full" />
          <div className="ml-4">
            <span className="text-[#000] font-pretendard font-medium text-[15px] leading-[20px]">
              이한비 · 자극 중독 야식가
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

        {sample ? (
          <img
            src={sample}
            alt="게시글 이미지"
            className="w-full h-[328px] rounded-[6px] mb-[20px]"
          />
        ) : (
          <div className="w-full h-[328px] flex items-center justify-center bg-[#F3F4F8] rounded-[6px] mb-[20px]">
            <span className="text-[#B3B5BC] font-pretendard text-[15px] leading-[20px]">
              이미지가 없습니다.
            </span>
          </div>
        )}

        <div className="w-full h-[12px] bg-[#F3F4F8] mb-[20px]"></div>

        {commentList.length > 0 ? (
          commentList.map((comment) => (
            <div key={comment.id} className="mb-6">
              <div className="flex items-center mb-2">
                <img
                  src={comment.profile}
                  alt="프로필"
                  className="w-[28px]  h-[28px] rounded-full flex-shrink-0"
                />
                <div className="ml-2">
                  <span className="text-[#000] font-pretendard  font-medium text-[15px] leading-[20px]">
                    {comment.username}
                  </span>
                  <span className="text-[#777986] font-pretendard  text-[15px] font-medium leading-[20px] ml-1">
                    · {comment.type}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[#000] font-pretendard text-[15px] leading-[20px] mb-1">
                  {comment.content}
                </p>
                <div className="text-[#B3B5BC] font-pretendard  text-[12px] leading-[16px]">
                  {comment.date}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="59"
              height="59"
              viewBox="0 0 59 59"
              fill="none"
            >
              <path
                d="M51.625 36.875C51.625 38.179 51.107 39.4296 50.1849 40.3516C49.2629 41.2737 48.0123 41.7917 46.7083 41.7917H17.2083L7.375 51.625V12.2917C7.375 10.9877 7.893 9.73711 8.81506 8.81506C9.73711 7.893 10.9877 7.375 12.2917 7.375H46.7083C48.0123 7.375 49.2629 7.893 50.1849 8.81506C51.107 9.73711 51.625 10.9877 51.625 12.2917V36.875Z"
                stroke="#D3D4DA"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[#B3B5BC] font-pretendard text-[15px] leading-[20px] mt-[4px]">
              첫 댓글을 남겨주세요.
            </span>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-[#F3F4F8]">
        <div className="flex py-[6px] items-center bg-[#F3F4F8] rounded-[8px] px-[12px]">
          <textarea
            ref={textAreaRef}
            value={commentBody}
            placeholder="댓글을 작성해보세요."
            onChange={(e) => setCommentBody(e.target.value)}
            className="flex-1 bg-transparent placeholder-[#B3B5BC] text-[#000] font-pretendard text-[15px] leading-[20px] outline-none resize-none"
            style={{
              maxHeight: "100px",
              overflowY: "auto",
            }}
            rows={1}
          />
          <button className="ml-2" onClick={handleCommentSubmit}>
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
