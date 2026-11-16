import { redirect } from "next/navigation";

export default function ProjectProposalPage() {
  redirect("/contact?loai=du-an#contact-form");
}
