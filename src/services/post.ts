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

  console.log("Request URL:", import.meta.env.VITE_BASE_URL + "/api/post");
  console.log("FormData:", formData);

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