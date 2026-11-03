"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
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
import { registerAction } from "../actions/auth-actions";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const organization = formData.get("organization") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    startTransition(async () => {
      const result = await registerAction({
        name,
        email,
        organization,
        password,
        confirmPassword,
      });

      if (!result.success) {
        setErrorMessage(result.error || "Đăng ký thất bại");
      } else {
        setSuccessMessage("Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
      }
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-center">
          Đăng ký tài khoản
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Tham gia cộng đồng chuyên gia và doanh nghiệp phát triển kinh tế di sản
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {errorMessage && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-3 text-sm text-emerald-700 bg-emerald-50 rounded-md border border-emerald-200">
              {successMessage}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="name">
              Họ và tên
            </label>
            <Input id="name" name="name" placeholder="Nguyễn Văn A" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">
              Email
            </label>
            <Input id="email" name="email" type="email" placeholder="example@disan.vn" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="organization">
              Cơ quan / Doanh nghiệp (tùy chọn)
            </label>
            <Input
              id="organization"
              name="organization"
              placeholder="VD: Sở VHTTDL, Công ty CP Du lịch Di sản..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="password">
              Mật khẩu
            </label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="confirmPassword">
              Xác nhận mật khẩu
            </label>
            <Input id="confirmPassword" name="confirmPassword" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Đang tạo tài khoản..." : "Đăng ký"}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link href="/login" className="font-semibold text-primary underline underline-offset-4">
              Đăng nhập
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
