import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Tiêu đề thảo luận phải có ít nhất 10 ký tự" })
    .max(200, { message: "Tiêu đề không được vượt quá 200 ký tự" }),
  category: z.string().min(1, { message: "Vui lòng chọn danh mục phù hợp" }),
  content: z.string().min(30, { message: "Nội dung thảo luận chi tiết tối thiểu 30 ký tự" }),
  tags: z.array(z.string()).default([]),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
