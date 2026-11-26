/**
 * DỮ LIỆU PROPS MẶC ĐỊNH CHO TRANG GIỚI THIỆU (ABOUT - 5 SECTIONS)
 * Chia thành 5 section có tên ngắn gọn: banner, vision, council, executive, partners.
 * Các nhân sự Hội đồng/Diễn giả và Tổ chức Đối tác tham chiếu qua mảng `ids: string[]`.
 */

import {
  pagePropsToSections,
  type PagePropsMap,
  type PageSection,
} from "../../types/page.types";

export const DEFAULT_ABOUT_PROPS: PagePropsMap = {
  // 1. Banner Giới thiệu
  banner: {
    badge: "VỀ DIỄN ĐÀN KINH TẾ DI SẢN",
    subBadge: "VIETNAM HERITAGE ECONOMY FORUM (HEF)",
    title: "VỀ DIỄN ĐÀN KINH TẾ DI SẢN",
    quote: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
    description:
      "Quy tụ các nhà khoa học, chuyên gia bảo tồn, doanh nghiệp và cộng đồng địa phương cùng kiến tạo chuỗi giá trị có trách nhiệm, lấy di sản làm nguồn lực sáng tạo và cộng đồng làm chủ thể phát triển.",
    note: "Trang chủ / Giới thiệu",
  },

  // 2. Tôn chỉ, Tầm nhìn & Sứ mệnh
  vision: {
    badge: "ĐỊNH HƯỚNG CHIẾN LƯỢC",
    title: "Tôn Chỉ, Tầm Nhìn & Sứ Mệnh",
    subtitle: "Định hướng chiến lược dài hạn và 05 giá trị cốt lõi",
    description:
      "Diễn đàn Kinh tế Di sản là nền tảng kết nối liên ngành nhằm nghiên cứu, nhận diện và phát huy các giá trị di sản trong phát triển kinh tế, văn hóa và xã hội. Diễn đàn thúc đẩy đối thoại, hợp tác và các mô hình thực hành có trách nhiệm, lấy di sản làm nguồn lực sáng tạo và cộng đồng làm chủ thể phát triển.",
    quote: "Trở thành nền tảng đối thoại và kết nối có uy tín về kinh tế di sản tại Việt Nam.",
    note: "Kết nối tri thức và nguồn lực để phát huy giá trị di sản một cách bền vững.",
    cards: [
      {
        badge: "GIÁ TRỊ CỐT LÕI",
        title: "Tôn trọng di sản",
        description:
          "Bảo tồn tính nguyên bản, tôn vinh chiều sâu lịch sử và giá trị văn hóa dân tộc.",
        icon: "ShieldCheck",
      },
      {
        badge: "GIÁ TRỊ CỐT LÕI",
        title: "Liên ngành",
        description:
          "Quy tụ các nhà hoạch định chính sách, học giả, doanh nhân, kiến trúc sư và cộng đồng.",
        icon: "Layers",
      },
      {
        badge: "GIÁ TRỊ CỐT LÕI",
        title: "Đổi mới",
        description:
          "Ứng dụng chuyển đổi số, công nghệ và tư duy kinh tế sáng tạo vào không gian di sản.",
        icon: "Lightbulb",
      },
      {
        badge: "GIÁ TRỊ CỐT LÕI",
        title: "Hợp tác",
        description:
          "Liên kết chuỗi giá trị công – tư – cộng đồng (PPP), mở rộng mạng lưới quốc tế.",
        icon: "Handshake",
      },
      {
        badge: "GIÁ TRỊ CỐT LÕI",
        title: "Phụng sự cộng đồng",
        description:
          "Lấy người dân bản địa làm chủ thể gìn giữ, hưởng lợi trực tiếp từ kinh tế di sản.",
        icon: "HeartHandshake",
      },
    ],
  },

  // 3. Hội Đồng Diễn Đàn (tham chiếu Speaker IDs + cards mở rộng)
  council: {
    badge: "HỘI ĐỒNG KHOA HỌC & CỐ VẤN",
    title: "Hội Đồng Diễn Đàn",
    subtitle: "Chủ tịch, các Phó Chủ tịch và Hội đồng Cố vấn Khoa học",
    ids: ["spk_1", "spk_2", "spk_3"],
  },

  // 4. Ban Điều Hành Chuyên Trách
  executive: {
    badge: "CƠ CẤU VẬN HÀNH",
    title: "Ban Điều Hành Chuyên Trách",
    subtitle: "Cơ cấu chuyên trách điều phối và triển khai các chương trình",
    ids: ["spk_2"],
    cards: [
      {
        badge: "ACADEMIC",
        title: "Nhóm Nội dung – Học thuật",
        description:
          "Biên soạn tài liệu hội thảo, thẩm định báo cáo chuyên môn, điều phối ấn phẩm Kỷ yếu và xây dựng bộ chỉ số kinh tế di sản.",
        note: "academic@hef.vn • (+84) 24 3823 4567 (ext. 101)",
      },
      {
        badge: "OPERATIONS",
        title: "Nhóm Tổ chức – Vận hành",
        description:
          "Hậu cần, điều phối địa điểm, lễ tân khánh tiết, điều phối phiên họp, an ninh và trải nghiệm đại biểu tham dự.",
        note: "operations@hef.vn • (+84) 24 3823 4567 (ext. 102)",
      },
      {
        badge: "EXTERNAL_AFFAIRS",
        title: "Nhóm Đối ngoại – Hợp tác",
        description:
          "Kết nối các tổ chức quốc tế (UNESCO, ICOMOS), các bộ ngành trung ương, địa phương và vận động các quỹ tài trợ bảo tồn.",
        note: "external@hef.vn • (+84) 24 3823 4567 (ext. 103)",
      },
      {
        badge: "COMMUNICATIONS",
        title: "Nhóm Truyền thông – Báo chí",
        description:
          "Quản lý thông cáo báo chí, sản xuất nội dung số, điều phối các cơ quan bảo trợ truyền thông và duy trì tương tác cộng đồng.",
        note: "media@hef.vn • (+84) 24 3823 4567 (ext. 104)",
      },
      {
        badge: "PROJECTS",
        title: "Nhóm Dự án – Phát triển",
        description:
          "Theo dõi và ươm tạo các sáng kiến di sản, điều phối mạng lưới nghệ nhân, doanh nghiệp bản địa và chuyển giao mô hình số hóa.",
        note: "projects@hef.vn • (+84) 24 3823 4567 (ext. 105)",
      },
      {
        badge: "SECRETARIAT",
        title: "Ban Thư ký Tổng hợp",
        description:
          "Tổng hợp chương trình nghị sự, quản lý cơ sở dữ liệu đại biểu, quản trị văn thư hành chính và theo dõi kết luận các kỳ họp.",
        note: "secretariat@hef.vn • (+84) 24 3823 4567 (ext. 100)",
      },
    ],
  },

  // 5. Mạng lưới Đối tác Đồng hành (tham chiếu Organization IDs)
  partners: {
    badge: "MẠNG LƯỚI ĐỒNG HÀNH",
    title: "Mạng Lưới Đối Tác Đồng Hành",
    subtitle: "Các cơ quan chỉ đạo, cơ quan chủ trì, đơn vị thường trực và đối tác chiến lược",
    ids: ["p_1", "p_2", "p_3", "p_4", "p_5", "p_7", "p_8", "p_9", "p_11", "p_12"],
  },
};

export const DEFAULT_ABOUT_SECTIONS: PageSection[] = pagePropsToSections(DEFAULT_ABOUT_PROPS);
