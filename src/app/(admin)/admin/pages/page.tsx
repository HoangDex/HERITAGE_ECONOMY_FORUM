import { redirect } from "next/navigation";

export const metadata = {
  title: "Quản Lý Trang | HEF Admin CMS",
  description: "Trung tâm quản trị nội dung website HEF CMS",
};

export default function AdminPagesPage() {
  redirect("/admin/pages/page_home");
}
