"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function ProjectProposalForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [formData, setFormData] = useState({
    orgName: "",
    representative: "",
    email: "",
    phone: "",
    projectName: "",
    category: "Di sản & Nghệ thuật",
    location: "",
    objectives: "",
    economicImpact: "",
    needsCooperation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectName || !formData.orgName || !formData.email) {
      alert("Vui lòng điền đầy đủ các trường thông tin bắt buộc!");
      return;
    }

    const genId = `HEF-PRJ-${Math.floor(1000 + Math.random() * 9000)}`;
    setRequestId(genId);
    setIsSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-8 max-w-4xl space-y-8">
        <Link
          href="/du-an"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#76232D] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại Danh mục Dự án
        </Link>

        <div className="space-y-3">
          <Badge className="bg-[#76232D] text-white">Cổng Tiếp Nhận Dự Án</Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
            Gửi Đề Xuất Mô Hình & Dự Án Kinh Tế Di Sản
          </h1>
          <p className="text-sm sm:text-base text-[#5c554b] leading-relaxed">
            Diễn đàn Kinh tế Di sản chào đón các tổ chức, viện nghiên cứu, doanh nghiệp và cộng đồng
            làng nghề gửi hồ sơ sáng kiến để được thẩm định, kết nối nhà đầu tư và tham gia chuỗi
            hoạt động ghi nhận.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 bg-white rounded-3xl border border-[#dfd7c8] shadow-sm text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#76232D]/10 text-[#76232D] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#292929]">Tiếp Nhận Đề Xuất Thành Công!</h2>
            <div className="inline-block p-3 bg-[#F5EFE5] rounded-xl border border-[#dfd7c8] text-sm font-mono text-[#76232D]">
              Mã theo dõi hồ sơ: <strong>{requestId}</strong>
            </div>
            <p className="text-sm text-[#5c554b] max-w-md mx-auto leading-relaxed">
              Ban Thư ký Diễn đàn sẽ đối chiếu điều kiện hợp lệ và liên hệ với Quý đơn vị trong vòng
              03 ngày làm việc qua email: <strong>{formData.email}</strong>.
            </p>
            <div className="pt-4">
              <Link href="/du-an">
                <Button className="bg-[#76232D] text-white hover:bg-[#76232D]/90">
                  Về Trang Danh Mục Dự Án
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 bg-white rounded-3xl border border-[#dfd7c8] shadow-sm space-y-6"
          >
            <div className="space-y-4 pb-6 border-b border-[#dfd7c8]">
              <h3 className="text-base font-bold text-[#292929] uppercase tracking-wider text-[#76232D]">
                1. Thông tin Chủ thể / Đơn vị thực hiện
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#292929]">
                    Tên tổ chức / Đơn vị *
                  </label>
                  <Input
                    required
                    placeholder="VD: Trung tâm Bảo tồn Di sản..."
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    className="border-[#dfd7c8] text-xs h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#292929]">
                    Người đại diện / Điều phối viên
                  </label>
                  <Input
                    placeholder="Họ và tên..."
                    value={formData.representative}
                    onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
                    className="border-[#dfd7c8] text-xs h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#292929]">Email liên hệ *</label>
                  <Input
                    type="email"
                    required
                    placeholder="email@domain.vn"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-[#dfd7c8] text-xs h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#292929]">Số điện thoại</label>
                  <Input
                    placeholder="09xx xxx xxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-[#dfd7c8] text-xs h-9"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pb-6 border-b border-[#dfd7c8]">
              <h3 className="text-base font-bold text-[#292929] uppercase tracking-wider text-[#76232D]">
                2. Nội dung Mô hình / Dự án Di sản
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-[#292929]">
                    Tên chính thức của dự án *
                  </label>
                  <Input
                    required
                    placeholder="VD: Không gian Văn hóa Sáng tạo..."
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="border-[#dfd7c8] text-xs h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#292929]">Nhóm lĩnh vực</label>
                  <select
                    className="w-full text-xs h-9 px-3 rounded-md border border-[#dfd7c8] bg-white text-[#292929]"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Di sản & Nghệ thuật">Di sản & Nghệ thuật</option>
                    <option value="Kinh tế & Cộng đồng">Kinh tế & Cộng đồng</option>
                    <option value="Di sản số">Di sản số (AR/VR/3D)</option>
                    <option value="Không gian Di sản">Không gian Di sản</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#292929]">Địa bàn triển khai</label>
                  <Input
                    placeholder="Tỉnh / Thành phố..."
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="border-[#dfd7c8] text-xs h-9"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-[#292929]">
                    Mục tiêu & Giải pháp thực hiện
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả tóm tắt giải pháp bảo tồn thích ứng và phương thức khai thác giá trị kinh tế..."
                    value={formData.objectives}
                    onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                    className="w-full text-xs p-3 rounded-md border border-[#dfd7c8] bg-white text-[#292929]"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-[#292929]">
                    Tác động kinh tế & cộng đồng (nếu có)
                  </label>
                  <Input
                    placeholder="Doanh thu, số hộ dân thụ hưởng, việc làm tạo mới..."
                    value={formData.economicImpact}
                    onChange={(e) => setFormData({ ...formData, economicImpact: e.target.value })}
                    className="border-[#dfd7c8] text-xs h-9"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#5c554b]">
              <ShieldCheck className="w-4 h-4 text-[#76232D] shrink-0" />
              <span>
                Tôi cam kết thông tin và dữ liệu minh chứng gửi kèm là chính xác và cho phép Diễn
                đàn xác minh thực tế.
              </span>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                className="bg-[#76232D] hover:bg-[#76232D]/90 text-white w-full sm:w-auto gap-2 font-medium"
              >
                <Send className="w-4 h-4" />
                Gửi Hồ Sơ Đề Xuất Dự Án
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
