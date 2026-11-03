import { SectionHeading } from "@/components/common/section-heading";
import { PostList } from "@/features/forum";
import { INITIAL_POSTS } from "@/lib/mock-data";

export const metadata = {
  title: "Diễn đàn Thảo luận",
  description: "Không gian đối thoại chuyên môn về chính sách và kinh tế di sản văn hóa.",
};

export default function ForumPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-10 space-y-8">
      <div className="border-b pb-6">
        <SectionHeading
          badge="Diễn đàn"
          title="Diễn đàn Thảo luận Kinh tế Di sản"
          description="Tham gia trao đổi ý kiến, đề xuất giải pháp chính sách, công nghệ và huy động vốn cùng các chuyên gia hàng đầu."
        />
      </div>

      <PostList initialPosts={INITIAL_POSTS} />
    </div>
  );
}
