/**
 * LAYER 6B: PRESENTATION LAYER (Interactive Form Component)
 * Form tạo mới dự án tích hợp shadcn/ui và gọi Server Action
 */

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
import { createHeritageProjectAction } from "../actions/heritage.actions";

interface CreateHeritageDialogProps {
  onSuccess?: () => void;
}

export function CreateHeritageDialog({ onSuccess }: CreateHeritageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const rawHighlights = (formData.get("highlights") as string) || "";
    const highlights = rawHighlights
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      category: formData.get("category") as string,
      status: (formData.get("status") as "Đang vận hành") || "Đang vận hành",
      description: formData.get("description") as string,
      annualRevenue: formData.get("annualRevenue") as string,
      jobsCreated: Number(formData.get("jobsCreated")) || 0,
      conservationFundShare: formData.get("conservationFundShare") as string,
      highlights: highlights.length > 0 ? highlights : ["Mô hình bảo tồn thích ứng"],
    };

    startTransition(async () => {
      const result = await createHeritageProjectAction(payload);
      if (!result.success) {
        setErrorMessage(result.error || "Không thể tạo dự án");
      } else {
        setIsOpen(false);
        if (onSuccess) onSuccess();
      }
    });
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="gap-2">
        <PlusCircle className="w-4 h-4" />
        Đề xuất Mô hình Di sản
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Đề xuất Mô hình Kinh tế Di sản</CardTitle>
          <CardDescription>
            Đăng ký sáng kiến hoặc dự án bảo tồn thích ứng tạo giá trị kinh tế cộng đồng.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {errorMessage && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Tên dự án / Sáng kiến
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="VD: Không gian Lụa tơ tằm Nam Cao"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="location">
                  Địa danh / Tỉnh thành
                </label>
                <Input id="location" name="location" placeholder="VD: Thái Bình" required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="category">
                  Loại hình di sản
                </label>
                <Input
                  id="category"
                  name="category"
                  placeholder="VD: Làng nghề Thủ công, Đô thị Di sản"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="status">
                  Trạng thái
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue="Đang vận hành"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-ring"
                >
                  <option value="Đang vận hành">Đang vận hành</option>
                  <option value="Mở rộng đầu tư">Mở rộng đầu tư</option>
                  <option value="Đang nghiên cứu">Đang nghiên cứu</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="description">
                Mô tả chi tiết mô hình
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Trình bày giải pháp khai thác, cân bằng giữa bảo tồn và sinh kế..."
                className="w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium" htmlFor="annualRevenue">
                  Doanh thu ước tính
                </label>
                <Input
                  id="annualRevenue"
                  name="annualRevenue"
                  placeholder="VD: 50 tỷ VNĐ"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium" htmlFor="jobsCreated">
                  Việc làm tạo ra
                </label>
                <Input
                  id="jobsCreated"
                  name="jobsCreated"
                  type="number"
                  placeholder="VD: 350"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium" htmlFor="conservationFundShare">
                  Tỷ lệ quỹ bảo tồn
                </label>
                <Input
                  id="conservationFundShare"
                  name="conservationFundShare"
                  placeholder="VD: 10%"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="highlights">
                Điểm nổi bật (mỗi dòng 1 ý)
              </label>
              <textarea
                id="highlights"
                name="highlights"
                rows={2}
                placeholder="Chuỗi giá trị khép kín từ nguyên liệu đến thành phẩm&#10;100% nghệ nhân lớn tuổi tham gia truyền nghề"
                className="w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-ring"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Đang xử lý..." : "Lưu dự án"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
