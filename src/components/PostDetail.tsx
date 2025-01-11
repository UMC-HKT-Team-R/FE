import React, { useEffect, useState } from "react";

interface PostDetailProps {
  postId: number;
  onBack: () => void;
}

interface PostData {
  nickname: string;
  date: string;
  title: string;
  body: string;
  image_url: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onBack }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostDetail = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      if (!response.ok) {
        throw new Error("게시글을 불러오는 데 실패했습니다.");
      }
      const data = await response.json();
      setPost(data.data); // 게시글 데이터 설정
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-blue-500 hover:underline"
      >
        &larr; 뒤로 가기
      </button>
      <img
        src={post?.image_url}
        alt={post?.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{post?.title}</h2>
      <p className="text-sm text-gray-500 mb-2">{post?.date}</p>
      <p className="text-md text-gray-700 mb-2">{post?.body}</p>
      <p className="text-sm text-gray-500">작성자: {post?.nickname}</p>
    </div>
  );
};

export default PostDetail;
