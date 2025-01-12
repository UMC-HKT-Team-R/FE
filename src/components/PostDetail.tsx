import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/profile.png";
import { getPostDetail, deletePost } from "@/services/post";
import { createComment } from "@/services/comment";

function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const [nickname, setNickname] = useState<string>("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [comments, setComments] = useState<
    Array<{
      commentId: number;
      nickname: string;
      content: string;
      date: string;
    }>
  >([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [commentBody, setCommentBody] = useState<string>("");

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        if (!postId) return;
        const response = await getPostDetail(Number(postId));
        const { nickname, date, title, body, imageUrl, comments } = response.result;
    
        setDate(formatDate(date)); 
        setNickname(nickname);
        setTitle(title);
        setBody(body);
        setImageUrl(imageUrl);
    
        const formattedComments = comments.map((comment) => ({
          ...comment,
          date: formatDate(comment.date), 
        }));
        setComments(formattedComments);
      } catch (error) {
        console.error("게시글 상세 정보 가져오기 실패:", error);
        alert("게시글 정보를 불러오는 데 실패했습니다.");
        navigate(-1);
      }
    };
    

    fetchPostDetail();
  }, [postId, navigate]);

  const formatDate = (isoString: string): string => {
    const dateObj = new Date(isoString);
    const year = dateObj.getFullYear().toString().slice(2); // 두 자리 연도
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 2자리 월
    const day = String(dateObj.getDate()).padStart(2, "0"); // 2자리 일
    const hours = String(dateObj.getHours()).padStart(2, "0"); // 2자리 시
    const minutes = String(dateObj.getMinutes()).padStart(2, "0"); // 2자리 분
    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
  };

  

  const handleCommentSubmit = async () => {
    if (!commentBody.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    try {
      const response = await createComment(Number(postId), { content: commentBody });
      if (response?.result?.commentId) {
        setComments((prev) => [
          ...prev,
          {
            commentId: response.result.commentId,
            nickname,
            content: commentBody,
            date: formatDate(new Date().toISOString()),          },
        ]);
        setCommentBody("");
      } else {
        alert("댓글 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
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
          onClick={() => setIsPostModalOpen(true)}
          className="text-[#FF3E3E] font-pretendard font-semibold text-[15px] leading-[20px]"
        >
          삭제
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-[80px] relative">
        <div className="flex items-center mb-[24px]">
          <img src={logo} alt="프로필" className="w-[44px] h-[44px] rounded-full" />
          <div className="ml-4">
            <span className="text-[#000] font-pretendard font-medium text-[15px] leading-[20px]">
              {nickname}
            </span>
            <div className="text-[#B3B5BC] font-pretendard text-[12px] leading-[16px] mt-[3px]">
              {date}
            </div>
          </div>
        </div>

        <h1 className="text-[#000] font-pretendard font-semibold text-[18px] leading-[24px] mb-[12px]">
          {title}
        </h1>

        <p className="text-[#000] font-pretendard text-[15px] leading-[20px] mb-[12px]">{body}</p>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="게시글 이미지"
            className="w-full aspect-square rounded-[6px] mb-[20px] object-cover"
          />
        )}

        <div className="w-full h-[12px] bg-[#F3F4F8] mb-5"></div>

        {comments.length === 0 && (
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="59"
              height="59"
              viewBox="0 0 59 59"
              fill="none"
              className="mx-auto mb-4"
            >
              <path
                d="M51.625 36.875C51.625 38.179 51.107 39.4296 50.1849 40.3516C49.2629 41.2737 48.0123 41.7917 46.7083 41.7917H17.2083L7.375 51.625V12.2917C7.375 10.9877 7.893 9.73711 8.81506 8.81506C9.73711 7.893 10.9877 7.375 12.2917 7.375H46.7083C48.0123 7.375 49.2629 7.893 50.1849 8.81506C51.107 9.73711 51.625 10.9877 51.625 12.2917V36.875Z"
                stroke="#D3D4DA"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[#B3B5BC] font-pretendard text-[15px] leading-[20px]">
              첫 댓글을 남겨주세요.
            </span>
          </div>
        )}

        {comments.length > 0 && (
          <div className="flex flex-col gap-5">
            {comments.map((comment) => (
              <div
                key={comment.commentId}
                className="flex flex-col gap-2 border-b border-grey100 pb-5"
              >
                <div className="flex gap-2 items-center">
                  <img src={logo} alt="프로필" className="w-10 h-10 rounded-full" />
                  <span className="text-[#000] font-pretendard font-medium text-[15px] leading-[20px]">
                    {comment.nickname}
                  </span>
                </div>
                <p className="text-[#000] font-pretendard text-[15px] leading-[20px] mt-[8px]">
                  {comment.content}
                </p>
                <div className="text-[#B3B5BC] font-pretendard text-[12px] leading-[16px] mt-[8px]">
                  {comment.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-[#F3F4F8]">
        <div className="flex items-center bg-[#F3F4F8] rounded-[8px] px-[12px]">
          <input
            type="text"
            value={commentBody}
            placeholder="댓글을 작성해보세요."
            onChange={(e) => setCommentBody(e.target.value)}
            className="flex-1 h-[32px] bg-transparent placeholder-[#B3B5BC] text-[#000] font-pretendard text-[15px] leading-[20px] outline-none"
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

      {isPostModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[328px] h-[160px] bg-white rounded-[12px] p-4 flex flex-col justify-between">
            <p className="text-[#000] font-pretendard text-center font-medium text-[15px] leading-[20px]">
              게시글을 삭제할까요?
            </p>
            <div className="flex justify-between mt-auto">
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="w-[144px] h-[40px] bg-[#F3F4F8] rounded-[8px] text-[#000] font-pretendard font-medium"
              >
                취소
              </button>
              <button
                onClick={confirmDeletePost}
                className="w-[144px] h-[40px] bg-[#FF3E3E] rounded-[8px] text-white font-pretendard font-medium"
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
