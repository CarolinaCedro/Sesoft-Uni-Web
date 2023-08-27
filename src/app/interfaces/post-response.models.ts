export class PostResponseModel {
  id?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  postId?: string | null;
  userId?: string;
  likesCount?: number;
  user?: {
    id: string;
    username: string;
    profile: {
      id: string;
      displayName: string;
    };
  };
  replies?: any[];
  userLiked?: boolean;
}

