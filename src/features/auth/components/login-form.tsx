"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { BrandLogo } from "@/components/icons/brand-logo";
import { HefIcon } from "@/components/icons/hef-icon";
import { loginAction } from "../actions/auth-actions";

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [ssoPending, setSsoPending] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSsoLogin = (provider: string) => {
    setSsoPending(provider);
    setErrorMessage(null);
    // Kiến trúc chuẩn bị sẵn sàng cho SSO: Redirect tới Identity Provider OAuth2/OIDC
    setTimeout(() => {
      setSuccessMessage(`Đang chuyển hướng tới cổng xác thực SSO ${provider}...`);
      setSsoPending(null);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      const result = await loginAction({ email, password });
      if (!result.success) {
        setErrorMessage(result.error || "Đăng nhập thất bại");
      } else {
        setSuccessMessage("Đăng nhập thành công! Đang chuyển hướng vào hệ thống...");
        router.push("/admin/dashboard");
      }
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border border-[#C29B57]/30 bg-white/95 backdrop-blur-xs">
      <CardHeader className="space-y-3 text-center pb-6 border-b border-[#C29B57]/15">
        <div className="flex justify-center">
          <BrandLogo size="lg" />
        </div>
        <div>
          <CardTitle className="text-2xl font-serif font-bold tracking-tight text-[#76232D]">
            Cổng Đăng Nhập Hệ Thống
          </CardTitle>
          <CardDescription className="text-xs text-[#5c554b] mt-1 max-w-sm mx-auto">
            Dành cho Đại biểu, Cơ quan quản lý, Chuyên gia và Ban thư ký Diễn đàn Kinh tế Di sản
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {errorMessage && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 flex items-center gap-2">
            <HefIcon name="AlertCircle" size="sm" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="p-3 text-sm text-emerald-800 bg-emerald-50 rounded-md border border-emerald-300 flex items-center gap-2">
            <HefIcon name="CheckCircle2" size="sm" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Khối Đăng Nhập SSO Bắt Buộc Theo Đề Án */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#76232D] flex items-center gap-2">
            <HefIcon name="ShieldCheck" size="xs" variant="crimson" />
            <span>Xác thực Đơn Điểm SSO (Khuyến nghị)</span>
          </div>

          {/* VNeID / Cổng Quốc Gia */}
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between h-12 border-[#C29B57]/40 hover:bg-[#F5EFE5] hover:border-[#C29B57] text-[#292929] transition-all font-medium"
            onClick={() => handleSsoLogin("VNeID")}
            disabled={ssoPending !== null}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-[#76232D] text-[#C29B57] flex items-center justify-center font-bold text-xs">
                VN
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#76232D]">
                  VNeID / Dịch Vụ Công Quốc Gia
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Định danh cấp đại biểu & cán bộ
                </div>
              </div>
            </div>
            <HefIcon name="ChevronRight" size="xs" className="text-muted-foreground" />
          </Button>

          {/* Cổng SSO Cơ Quan Nhà Nước / Bộ Ngành */}
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between h-12 border-[#C29B57]/40 hover:bg-[#F5EFE5] hover:border-[#C29B57] text-[#292929] transition-all font-medium"
            onClick={() => handleSsoLogin("Cơ quan Nhà nước")}
            disabled={ssoPending !== null}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-[#C29B57] text-white flex items-center justify-center font-bold text-xs">
                GOV
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#292929]">
                  SSO Cơ Quan Nhà Nước & Đối Tác
                </div>
                <div className="text-[10px] text-muted-foreground">
                  OIDC / SAML 2.0 cơ quan chính quyền
                </div>
              </div>
            </div>
            <HefIcon name="ChevronRight" size="xs" className="text-muted-foreground" />
          </Button>

          {/* Enterprise / Microsoft / Google SSO */}
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between h-12 border-[#C29B57]/40 hover:bg-[#F5EFE5] hover:border-[#C29B57] text-[#292929] transition-all font-medium"
            onClick={() => handleSsoLogin("Doanh nghiệp / Microsoft Entra")}
            disabled={ssoPending !== null}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                MS
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#292929]">
                  Microsoft Entra ID / Google Workspace
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Dành cho tập đoàn kinh tế & chuyên gia
                </div>
              </div>
            </div>
            <HefIcon name="ChevronRight" size="xs" className="text-muted-foreground" />
          </Button>
        </div>

        {/* Phân tách giữa SSO và Mật khẩu truyền thống */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#C29B57]/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-muted-foreground font-semibold">
              Hoặc quản trị viên CMS nội bộ
            </span>
          </div>
        </div>

        {/* Form Đăng Nhập Email Quản Trị Viên */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-xs font-semibold text-[#292929] flex items-center gap-1.5"
              htmlFor="email"
            >
              <HefIcon name="Mail" size="xs" />
              Email Tài Khoản
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@disan.vn"
              required
              className="border-[#C29B57]/30 focus-visible:ring-[#76232D]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                className="text-xs font-semibold text-[#292929] flex items-center gap-1.5"
                htmlFor="password"
              >
                <HefIcon name="Lock" size="xs" />
                Mật Khẩu
              </label>
              <Link href="#" className="text-[11px] text-[#76232D] hover:underline">
                Quên mật khẩu?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="border-[#C29B57]/30 focus-visible:ring-[#76232D]"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-[#76232D] hover:bg-[#5e1c24] text-[#F5EFE5] font-semibold transition-all shadow-xs"
            disabled={isPending}
          >
            {isPending ? "Đang xác thực bảo mật..." : "Đăng Nhập Quản Trị CMS"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t border-[#C29B57]/15 bg-[#F5EFE5]/30 pt-4">
        <p className="text-xs text-center text-muted-foreground">
          Cần hỗ trợ truy cập định danh hoặc đăng ký tham gia?{" "}
          <Link
            href="/lien-he"
            className="font-semibold text-[#76232D] underline underline-offset-4"
          >
            Liên hệ Ban Tổ Chức
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
