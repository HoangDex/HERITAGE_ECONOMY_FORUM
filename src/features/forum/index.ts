/**
 * BARREL EXPORT CHO MODULE FORUM (DIỄN ĐÀN & KỲ DIỄN ĐÀN)
 * Tuân thủ Clean Architecture: Chỉ công khai Service, Actions, Types, Hooks và Presentation Components
 * Ranh giới nội bộ Data Access được bảo vệ khép kín
 */

// Layer 1: Types & Entities
export type {
  ForumEdition,
  ForumSession,
  Speaker,
  ForumTimelineSlot,
  ForumResource,
  IForumService,
} from "./types/forum-edition.types";

export type { Post, Comment, Author, PostFilters } from "./types/post";

// Layer 2: Schemas
export { createPostSchema, postFilterSchema } from "./schemas/post-schema";

// Layer 4: Service
export { forumService } from "./services/forum.service";

// Layer 5A: Server Actions
export { createPostAction, upvotePostAction, addCommentAction } from "./actions/post-actions";

// Layer 6A: React Client Hook
export { usePosts } from "./hooks/use-posts";

// Layer 6B: Presentation Components
export { PostCard } from "./components/post-card";
export { PostList } from "./components/post-list";
export { ForumFilters } from "./components/forum-filters";
export { CommentSection } from "./components/comment-section";
export { CreatePostDialog } from "./components/create-post-dialog";
export { ForumHero } from "./components/forum-hero";
export { ForumStickyNav } from "./components/forum-sticky-nav";
export { ForumSessionsSection } from "./components/forum-sessions-section";
export { ForumTimelineSection } from "./components/forum-timeline-section";
export { ForumSpeakersSection } from "./components/forum-speakers-section";
export { ForumResourcesSection } from "./components/forum-resources-section";
export { ForumPageView } from "./components/forum-page-view";
