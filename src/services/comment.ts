import { api } from "./api";

interface CreateCommentRequest {
  content: string;
}

interface CreateCommentResponse {
  status: number;
  message: string;
  result: {
    commentId: number;
  };
}

interface DeleteCommentResponse {
  status: number;
  message: string;
}

export const createComment = async (
  postId: number,
  data: CreateCommentRequest
): Promise<CreateCommentResponse> => {
  try {
    const response = await api.post<CreateCommentResponse>(`/api/post/${postId}/comment`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: number): Promise<DeleteCommentResponse> => {
  try {
    const response = await api.delete<DeleteCommentResponse>(`/api/post/comment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete comment:", error);
    throw error;
  }
};
