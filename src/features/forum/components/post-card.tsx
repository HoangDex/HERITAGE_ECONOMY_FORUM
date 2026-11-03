"use client";

import { useTransition, useState } from "react";
import Link from "next/link";
import { MessageSquare, ThumbsUp, Eye, Pin, Building } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Post } from "../types/post";
import { upvotePostAction } from "../actions/post-actions";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUpvote = () => {
    if (hasVoted || isPending) return;
    setHasVoted(true);
    setUpvotes((prev) => prev + 1);

    startTransition(async () => {
      const res = await upvotePostAction(post.id);
      if (!res.success) {
        setUpvotes((prev) => prev - 1);
        setHasVoted(false);
      }
    });
  };

  return (
    <Card className="hover:border-primary/50 transition-colors shadow-sm">
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {post.isPinned && (
              <Badge
                variant="secondary"
                className="gap-1 bg-amber-100 text-amber-800 border-amber-200"
              >
                <Pin className="w-3 h-3" /> Ghim đầu trang
              </Badge>
            )}
            <Badge variant="outline" className="capitalize text-xs font-medium">
              {post.category}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString("vi-VN")}
          </span>
        </div>
        <CardTitle className="text-lg leading-snug">
          <Link
            href={`/forum/${post.slug || post.id}`}
            className="hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{post.author.name}</span>
          {post.author.organization && (
            <span className="hidden sm:inline-flex items-center gap-1 text-muted-foreground">
              <Building className="w-3 h-3" /> {post.author.organization}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUpvote}
            disabled={hasVoted || isPending}
            className={`h-7 px-2 gap-1 text-xs ${hasVoted ? "text-primary font-bold" : ""}`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{upvotes}</span>
          </Button>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{post.commentsCount}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{post.views}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
