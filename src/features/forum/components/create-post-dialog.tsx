"use client";

import { useState, useTransition } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FORUM_CATEGORIES } from "@/lib/constants";
import { createPostAction } from "../actions/post-actions";

export function CreatePostDialog({ onCreated }: { onCreated?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const rawTags = (formData.get("tags") as string) || "";
    const tags = rawTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    startTransition(async () => {
      const res = await createPostAction({
        title,
        category,
        content,
        tags,
      });

      if (!res.success) {
        setError(res.error || "Không thể tạo bài thảo luận");
      } else {
        setIsOpen(false);
        if (onCreated) onCreated();
      }
    });
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="gap-2">
        <PlusCircle className="w-4 h-4" />
        Tạo chủ đề mới
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <Card className="w-full max-w-xl shadow-xl bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Bắt đầu phiên thảo luận mới</CardTitle>
          <CardDescription>
            Chia sẻ ý kiến, đặt câu hỏi hoặc đề xuất giải pháp kinh tế di sản
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="title">
                Tiêu đề
              </label>
              <Input
                id="title"
                name="title"
                placeholder="VD: Kinh nghiệm triển khai vé điện tử và số hóa bảo tàng..."
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="category">
                Chuyên mục
              </label>
              <select
                id="category"
                name="category"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-ring"
                required
                defaultValue="tourism"
              >
                {FORUM_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="content">
                Nội dung chi tiết
              </label>
              <textarea
                id="content"
                name="content"
                rows={4}
                placeholder="Trình bày bối cảnh, vấn đề thực tiễn, số liệu hoặc câu hỏi cần tham vấn ý kiến..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="tags">
                Tags (cách nhau bởi dấu phẩy)
              </label>
              <Input id="tags" name="tags" placeholder="Du lịch Di sản, Chuyển đổi số, Huế" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Hủy bỏ
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Đang gửi..." : "Đăng thảo luận"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
