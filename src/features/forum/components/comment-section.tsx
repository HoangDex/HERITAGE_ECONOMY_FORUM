"use client";

import { useState, useTransition } from "react";
import { MessageSquare, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Comment } from "../types/post";
import { addCommentAction } from "../actions/post-actions";

interface CommentSectionProps {
  postId: string;
  initialComments?: Comment[];
}

export function CommentSection({ postId, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setError(null);

    startTransition(async () => {
      const res = await addCommentAction(postId, content);
      if (!res.success) {
        setError(res.error || "Gửi bình luận thất bại");
      } else if (res.data) {
        setComments((prev) => [...prev, res.data!]);
        setContent("");
      }
    });
  };

  return (
    <Card className="mt-8 border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <span>Ý kiến trao đổi ({comments.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="p-2.5 text-xs text-destructive bg-destructive/10 rounded-md">
              {error}
            </div>
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Viết góc nhìn, tham vấn chính sách hoặc phản hồi chuyên môn..."
            rows={3}
            className="w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-ring"
            required
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={isPending || !content.trim()}
              className="gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              {isPending ? "Đang gửi..." : "Gửi ý kiến"}
            </Button>
          </div>
        </form>

        {/* Comment List */}
        <div className="space-y-4 pt-2 border-t">
          {comments.length === 0 ? (
            <p className="text-center text-xs text-muted-foreground py-4">
              Chưa có ý kiến nào. Hãy là người đầu tiên tham gia thảo luận!
            </p>
          ) : (
            comments.map((cmt) => (
              <div key={cmt.id} className="flex gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-foreground">{cmt.author.name}</span>
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(cmt.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  {cmt.author.organization && (
                    <span className="text-[11px] text-muted-foreground block">
                      {cmt.author.organization}
                    </span>
                  )}
                  <p className="text-muted-foreground text-xs leading-relaxed pt-1">
                    {cmt.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
