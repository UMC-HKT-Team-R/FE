import { api } from "./api";

interface CreatePostRequest {
  title: string;
  body: string;
  image?: File;
}

interface CreatePostResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    postId: number;
  };
}

interface GetPostsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    posts: Array<{
      postId: number;
      title: string;
      body: string;
      date: string;
      imageUrl?: string;
      commentCount: number;
    }>;
  };
}

export interface GetPostDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    nickname: string;
    title: string;
    date: string;
    body: string;
    imageUrl?: string;
    comments: Array<{
      commentId: number;
      nickname: string;
      content: string;
      date: string;
    }>;
  };
}

export const getPosts = async (): Promise<GetPostsResponse> => {
  const response = await api.get<GetPostsResponse>("/api/post/all");
  return response.data;
};

export const getPostDetail = async (postId: number): Promise<GetPostDetailResponse> => {
  const response = await api.get<GetPostDetailResponse>(`/api/post/${postId}`);
  return response.data;
};

export const createPost = async (data: CreatePostRequest): Promise<CreatePostResponse> => {
  const formData = new FormData();

  const requestPayload = {
    title: data.title,
    body: data.body,
  };
  formData.append("request", JSON.stringify(requestPayload));

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await api.post<CreatePostResponse>("/api/post/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  console.log("Delete Request URL:", `/api/post/${postId}`);

  try {
    await api.delete(`/api/post/${postId}`);
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw error;
  }
};
