"use server";

import { loginSchema, registerSchema, LoginInput, RegisterInput } from "../schemas/auth-schema";
import type { ApiResponse } from "@/types";
import type { User } from "../types/auth";

export async function loginAction(values: LoginInput): Promise<ApiResponse<User>> {
  const validated = loginSchema.safeParse(values);
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0]?.message || "Dữ liệu không hợp lệ",
    };
  }

  // Placeholder server action logic
  const mockUser: User = {
    id: "usr_1",
    name: "Nguyễn Văn Hùng",
    email: values.email,
    role: "expert",
    organization: "Viện Nghiên cứu Di sản Văn hóa",
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    data: mockUser,
    message: "Đăng nhập thành công",
  };
}

export async function registerAction(values: RegisterInput): Promise<ApiResponse<User>> {
  const validated = registerSchema.safeParse(values);
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0]?.message || "Dữ liệu không hợp lệ",
    };
  }

  const newUser: User = {
    id: "usr_" + Math.random().toString(36).substring(2, 9),
    name: values.name,
    email: values.email,
    role: "user",
    organization: values.organization || "Thành viên cộng đồng",
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    data: newUser,
    message: "Đăng ký tài khoản thành công",
  };
}
