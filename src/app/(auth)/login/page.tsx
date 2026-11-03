import { LoginForm } from "@/features/auth";

export const metadata = {
  title: "Đăng Nhập SSO & Quản Trị | Diễn Đàn Kinh Tế Di Sản",
  description: "Cổng xác thực SSO và đăng nhập quản trị hệ thống Diễn đàn Kinh tế Di sản (HEF)",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F5EFE5] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Heritage Motif Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
        >
          <circle cx="400" cy="400" r="300" stroke="#76232D" strokeWidth="2" fill="none" />
          <circle cx="400" cy="400" r="240" stroke="#C29B57" strokeWidth="1.5" fill="none" />
          <circle cx="400" cy="400" r="180" stroke="#76232D" strokeWidth="1" fill="none" />
          <circle cx="400" cy="400" r="100" stroke="#C29B57" strokeWidth="2" fill="none" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="400"
              y1="400"
              x2={400 + 350 * Math.cos((i * 30 * Math.PI) / 180)}
              y2={400 + 350 * Math.sin((i * 30 * Math.PI) / 180)}
              stroke="#C29B57"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-lg py-8">
        <LoginForm />
      </div>
    </div>
  );
}
