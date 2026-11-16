import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Portal | HEF CMS",
};

export default function AdminRootPage() {
  redirect("/admin/dashboard");
}
