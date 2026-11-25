/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE LIÊN HỆ
 */

import type { ContactPageData, IContactRepository } from "../types/contact.types";
import { pageRepository } from "@/features/pages/repositories/page.repository";

const MOCK_CONTACT_DATA: ContactPageData = {
  title: "Kết nối cùng Diễn đàn",
  slogan: "Chia sẻ tri thức, nguồn lực và sáng kiến phát triển kinh tế di sản",
  description:
    "Diễn đàn Kinh tế Di sản chào đón các tổ chức nghiên cứu, chuyên gia, doanh nghiệp, cộng đồng và đối tác cùng đồng hành để chuyển hóa nguồn lực di sản thành giá trị kinh tế, văn hóa và xã hội bền vững.",
  info: {
    secretariatTitle: "Văn phòng Thường trực Ban Thư ký Diễn đàn Kinh tế Di sản",
    address: "Trung tâm Bảo tồn Di sản Thăng Long, 19C Hoàng Diệu, Ba Đình, Hà Nội",
    hotline: "+84 (024) 3823 4567",
    email: "contact@heritageeconomy.vn",
    workingHours: "Thứ Hai – Thứ Sáu: 08:30 – 17:30 (GMT+7)",
  },
  faqs: [
    {
      question: "Đối tượng nào có thể đăng ký tham dự Diễn đàn Kinh tế Di sản 2026?",
      answer:
        "Diễn đàn mở cửa cho các nhà quản lý, nhà nghiên cứu, lãnh đạo doanh nghiệp, đại diện làng nghề, nghệ nhân và cơ quan thông tấn báo chí. Ban Tổ chức sẽ gửi thư mời và thẻ đại biểu điện tử qua email sau khi xét duyệt đăng ký.",
    },
    {
      question: "Quy trình đề xuất hợp tác hoặc tài trợ diễn đàn như thế nào?",
      answer:
        "Quý đơn vị vui lòng chọn nhóm yêu cầu 'Hợp tác chiến lược' hoặc 'Tài trợ'. Ban Thư ký Đối ngoại sẽ liên hệ và gửi hồ sơ tài trợ, quyền lợi truyền thông trong vòng 24 giờ làm việc.",
    },
    {
      question: "Hồ sơ gửi tham luận chuyên đề cần tuân thủ định dạng nào?",
      answer:
        "Tóm tắt tham luận tối đa 500 từ kèm lý lịch khoa học của diễn giả. Toàn văn bài viết đạt chuẩn học thuật sẽ được thẩm định để in trong Kỷ yếu Diễn đàn có chỉ số ISBN.",
    },
  ],
};

export class ContactRepository implements IContactRepository {
  async getContactPageData(): Promise<ContactPageData> {
    try {
      const page = await pageRepository.findBySlug("contact");
      if (page && page.sections && page.sections.length > 0) {
        const bannerSec = page.sections.find((s) => s.type === "CONTACT_BANNER");
        const infoSec = page.sections.find((s) => s.type === "CONTACT_INFO");

        const bProps = bannerSec?.props as Record<string, unknown> | undefined;
        const iProps = infoSec?.props as Record<string, unknown> | undefined;

        let faqs = MOCK_CONTACT_DATA.faqs;
        if (Array.isArray(iProps?.faqs) && iProps.faqs.length > 0) {
          faqs = (iProps.faqs as Array<{ question?: string; answer?: string; q?: string; a?: string }>).map((f) => ({
            question: f.question || f.q || "",
            answer: f.answer || f.a || "",
          }));
        }

        return {
          title: (bProps?.title as string) || MOCK_CONTACT_DATA.title,
          slogan: (bProps?.slogan as string) || MOCK_CONTACT_DATA.slogan,
          description: (bProps?.description as string) || MOCK_CONTACT_DATA.description,
          info: {
            secretariatTitle:
              (iProps?.organizationName as string) ||
              (iProps?.secretariatTitle as string) ||
              MOCK_CONTACT_DATA.info.secretariatTitle,
            address: (iProps?.address as string) || MOCK_CONTACT_DATA.info.address,
            hotline: (iProps?.hotline as string) || MOCK_CONTACT_DATA.info.hotline,
            email: (iProps?.email as string) || MOCK_CONTACT_DATA.info.email,
            workingHours: (iProps?.workingHours as string) || MOCK_CONTACT_DATA.info.workingHours,
          },
          faqs,
        };
      }
    } catch {
      // Fallback
    }
    return MOCK_CONTACT_DATA;
  }
}

export const contactRepository = new ContactRepository();
