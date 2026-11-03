export interface Author {
  id: string;
  name: string;
  organization?: string;
  avatarUrl?: string;
  role?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  author: Author;
  upvotes: number;
  commentsCount: number;
  views: number;
  isPinned?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: Author;
  content: string;
  createdAt: string;
}

export interface PostFilters {
  category?: string;
  tag?: string;
  search?: string;
  sortBy?: "latest" | "popular" | "unanswered";
}
