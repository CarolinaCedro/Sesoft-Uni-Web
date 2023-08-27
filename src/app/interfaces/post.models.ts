export class Post {

  id?: string;
  content?: string;
  createdAt?: string;
  postId?: string;
  userId?: string;
  likesCount?: number;


  constructor(id: string, content: string, createdAt: string, postId: string, userId: string, likesCount: number) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.postId = postId;
    this.userId = userId;
    this.likesCount = likesCount;
  }
}
