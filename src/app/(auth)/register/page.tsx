import { RegisterForm } from "@/features/auth";

export const metadata = {
  title: "Đăng ký",
  description: "Đăng ký tài khoản Diễn đàn Kinh tế Di sản",
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-14rem)]">
      <RegisterForm />
    </div>
  );
}
