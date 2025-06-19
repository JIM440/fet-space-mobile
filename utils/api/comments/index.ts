import { api } from "@/constants/appBaseUrl";

export interface Comment {
  comment_id: number;
  content: string;
  created_at: string;
  user: {
    user_id: number;
    name: string;
    email: string;
    role: 'Student' | 'Teacher' | 'Admin' | 'SuperAdmin';
  };
}

export interface FetchCommentsParams {
  type: 'courseAnnouncement' | 'generalAnnouncement';
  targetId: number;
  page?: number;
  limit?: number;
}

export interface CreateCommentInput {
  type: 'courseAnnouncement' | 'generalAnnouncement';
  targetId: number;
  content: string;
}

export interface CreateCommentResponse {
  message: string;
  comment: Comment;
}

export const getComments = async ({
  type,
  targetId,
  page = 1,
  limit = 10,
}: FetchCommentsParams): Promise<{ comments: Comment[]; total: number; page: number; limit: number }> => {
  try {
    const response = await api.get('/comments', {
      params: { type, targetId, page, limit },
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch comments:', error);
    throw error;
  }
};

export const createComment = async (data: CreateCommentInput): Promise<CreateCommentResponse> => {
  try {
    const response = await api.post('/comments', data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to create comment:', error);
    throw error;
  }
};