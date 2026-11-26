/**
 * DỮ LIỆU PROPS MẶC ĐỊNH CHO TRANG CHỦ (HOME - 7 SECTIONS)
 * Chia thành 7 section có tên ngắn gọn: hero, pillars, event, showcase, news, partners, cta.
 * Các mục chọn lọc từ schema khác (ForumEdition, Award, HeritageProject, News, Organization)
 * được lưu dưới dạng mảng `ids: string[]` để khi hiển thị sẽ truy vấn theo các ID đó.
 */

import {
  pagePropsToSections,
  type PagePropsMap,
  type PageSection,
} from "../../types/page.types";

export const DEFAULT_HOME_PROPS: PagePropsMap = {
  // 1. Khối Hero mở đầu
  hero: {
    badge: "NỀN TẢNG ĐỐI THOẠI & KẾT NỐI QUỐC GIA",
    subBadge: "HERITAGE ECONOMY FORUM",
    title: "DIỄN ĐÀN KINH TẾ DI SẢN",
    quote: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
    description:
      "Diễn đàn kết nối tri thức, nguồn lực và sáng kiến để phát huy giá trị di sản, thúc đẩy kinh tế sáng tạo và phát triển bền vững.",
    imageUrl:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&h=750&q=85",
    imageAlt: "Quần thể di sản văn hóa Việt Nam - Di sản kiến tạo giá trị phát triển bền vững",
    videoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/be/Ha_Long_Bay%2C_Vietnam_-_Dec_2024.webm/Ha_Long_Bay%2C_Vietnam_-_Dec_2024.webm.1080p.vp9.webm",
    videoTitle: "Video nền: Non nước Di sản",
    actions: [
      { label: "Khám phá diễn đàn", href: "/forum", icon: "Compass" },
      { label: "Đăng ký tham dự", href: "/contact?loai=tham-du#contact-form", icon: "Calendar" },
    ],
    stats: [
      { value: "500+", label: "Đại biểu dự kiến" },
      { value: "04", label: "Phiên chuyên đề" },
      { value: "30+", label: "Mô hình di sản" },
    ],
    cards: [
      {
        badge: "ĐỊA ĐIỂM CHÍNH THỨC",
        subBadge: "Kỳ 2026",
        title: "Hoàng thành Thăng Long, Hà Nội",
        imageUrl:
          "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&h=750&q=85",
        imageAlt: "Hoàng thành Thăng Long, Hà Nội",
      },
    ],
  },

  // 2. Khối Định vị & Trụ cột chiến lược
  pillars: {
    badge: "ĐỊNH VỊ DIỄN ĐÀN",
    title: "Không Gian Đối Thoại & Chuyển Hóa Nguồn Lực Di Sản",
    description:
      "Diễn đàn Kinh tế Di sản là không gian đối thoại liên ngành giữa nhà khoa học, nhà quản lý, doanh nghiệp và cộng đồng. Thông qua nghiên cứu, trao đổi chính sách, kết nối hợp tác và triển khai mô hình thực tiễn, Diễn đàn góp phần chuyển hóa nguồn lực di sản thành giá trị kinh tế, văn hóa và xã hội có trách nhiệm.",
    quote:
      "Lấy di sản làm nguồn lực sáng tạo, lấy cộng đồng bản địa làm chủ thể bảo tồn và hưởng lợi trực tiếp từ chuỗi giá trị tăng trưởng.",
    actions: [{ label: "Tìm hiểu tôn chỉ & cơ cấu tổ chức", href: "/about" }],
    subBadge: "NỀN TẢNG HÀNH ĐỘNG",
    subtitle: "05 Trụ Cột Chiến Lược",
    cards: [
      {
        badge: "TRỤ CỘT 01",
        icon: "BookOpen",
        title: "Nghiên cứu",
        subtitle: "Khảo sát & Dữ liệu",
        description:
          "Khảo sát, lượng hóa giá trị kinh tế của di sản, xây dựng cơ sở lý luận và chỉ số phát triển bền vững cho các địa phương.",
      },
      {
        badge: "TRỤ CỘT 02",
        icon: "MessageSquare",
        title: "Đối thoại",
        subtitle: "Chính sách & Bàn tròn",
        description:
          "Tạo lập bàn tròn đối thoại cởi mở giữa cơ quan quản lý, viện nghiên cứu, doanh nghiệp và cộng đồng để tháo gỡ điểm nghẽn thể chế.",
      },
      {
        badge: "TRỤ CỘT 03",
        icon: "Network",
        title: "Kết nối",
        subtitle: "Mạng lưới & Nguồn lực",
        description:
          "Liên kết chuỗi giá trị công – tư (PPP), kết nối chuyên gia di sản quốc tế với các dự án thực địa và quỹ bảo trợ tài chính.",
      },
      {
        badge: "TRỤ CỘT 04",
        icon: "Award",
        title: "Ghi nhận",
        subtitle: "Giải thưởng & Tôn vinh",
        description:
          "Tôn vinh các mô hình xuất sắc qua Giải thưởng Phát triển Bền vững Chủ động, lan tỏa chuẩn mực thực hành trách nhiệm.",
      },
      {
        badge: "TRỤ CỘT 05",
        icon: "TrendingUp",
        title: "Phát triển",
        subtitle: "Ươm tạo & Sinh kế",
        description:
          "Đồng hành ươm tạo các sáng kiến di sản, chuyển giao giải pháp chuyển đổi số và phát triển sinh kế bao trùm cho người dân.",
      },
    ],
  },

  // 3. Khối Kỳ Diễn Đàn Nổi Bật (tham chiếu ForumEdition qua ids)
  event: {
    badge: "KỲ DIỄN ĐÀN THƯỜNG NIÊN 2026",
    title: "Kỳ Diễn Đàn Nổi Bật 2026",
    subtitle: "Không gian hội tụ các nhà khoa học, nhà quản lý và doanh nghiệp",
    subBadge: "ĐANG MỞ ĐĂNG KÝ ĐẠI BIỂU",
    ids: ["hef-edition-2026"],
    groups: [
      {
        badge: "CHỦ ĐỀ NGHỊ SỰ TOÀN THỂ",
        title: "Kinh Tế Di Sản Trong Kỷ Nguyên Số: Thể Chế, Nguồn Lực & Mô Hình Đột Phá",
        description:
          "Quy tụ hơn 500 đại biểu là lãnh đạo các bộ ban ngành, đại sứ quán, tổ chức quốc tế (UNESCO, ICOMOS), chuyên gia kinh tế, các nhà nghiên cứu và lãnh đạo hiệp hội doanh nghiệp toàn quốc.",
        imageUrl:
          "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&h=650&q=80",
        subBadge: "KỲ DIỄN ĐÀN THƯỜNG NIÊN 2026",
        quote:
          "Tập trung nhận diện giá trị kinh tế của di sản kiến trúc đô thị, công nghiệp văn hóa và phương thức huy động vốn tư nhân vào bảo tồn thích ứng.",
        stats: [
          { label: "THỜI GIAN DIỄN RA", value: "15 – 17 tháng 11 năm 2026", icon: "Calendar" },
          {
            label: "ĐỊA ĐIỂM TỔ CHỨC",
            value: "Trung tâm Hội nghị Quốc tế & Hoàng thành Thăng Long, Thủ đô Hà Nội",
            icon: "MapPin",
          },
          { label: "QUY MÔ ĐẠI BIỂU", value: "500+ Đại biểu", icon: "Users" },
          { label: "HẠN CHÓT ĐĂNG KÝ", value: "Trước ngày 10/11/2026", icon: "Clock" },
        ],
      },
      {
        title: "Chương Trình Các Phiên Nghị Sự",
        subtitle: "Lịch trình đối thoại khoa học, thảo luận chính sách và danh sách diễn giả tham luận chính thức.",
        badge: "04 Phiên Chuyên Đề Chính Thức",
        cards: [
          {
            badge: "Phiên 1",
            subtitle: "08:00 - 11:30 | 15/11/2026",
            subBadge: "Đại sảnh Hội nghị Thăng Long",
            title: "Phiên Toàn Thể: Định Vị Kinh Tế Di Sản Trong Chiến Lược Quốc Gia",
            description:
              "Công bố báo cáo thường niên về đóng góp kinh tế của di sản văn hóa vào GDP và đề xuất khung chính sách đặc thù.",
            note: "Chủ trì phiên: GS.TS. Trần Quốc Vượng",
          },
          {
            badge: "Phiên 2",
            subtitle: "13:30 - 17:00 | 15/11/2026",
            subBadge: "Phòng Hội thảo Quốc tế A",
            title: "Chuyên Đề 1: Đối Tác Công Tư (PPP) Trong Bảo Tồn Thích Ứng",
            description:
              "Kinh nghiệm quốc tế và giải pháp tháo gỡ cơ chế đầu tư tư nhân vào hạ tầng di tích và công nghiệp văn hóa sáng tạo.",
            note: "Chủ trì phiên: PGS.TS. Đặng Hoàng Lan",
          },
          {
            badge: "Phiên 3",
            subtitle: "08:30 - 12:00 | 16/11/2026",
            subBadge: "Phòng Hội thảo B",
            title: "Chuyên Đề 2: Chuyển Đổi Số & Số Hóa 3D/VR Di Sản",
            description:
              "Ứng dụng công nghệ bản sao số (Digital Twin), trí tuệ nhân tạo và bảo tàng ảo trong nâng cao trải nghiệm giáo dục và du lịch.",
            note: "Chủ trì phiên: KTS. Lê Hoàng Phương",
          },
          {
            badge: "Phiên 4",
            subtitle: "14:00 - 17:30 | 16/11/2026",
            subBadge: "Phòng Hội thảo C",
            title: "Chuyên Đề 3: Sinh Kế Cộng Đồng & Kinh Tế Làng Nghề Truyền Thống",
            description:
              "Xây dựng chuỗi giá trị bền vững cho nghệ nhân, doanh nghiệp bản địa và bảo vệ bản quyền tri thức bản địa.",
            note: "Chủ trì phiên: TS. Nguyễn Thị Bích Liên",
          },
        ],
      },
    ],
    note: "Miễn phí tham dự phiên toàn thể cho các nhà khoa học, đại diện hiệp hội & sinh viên",
    actions: [
      { label: "Đăng ký tham dự đại biểu", href: "/contact?loai=tham-du#contact-form" },
      { label: "Xem kỷ yếu chi tiết", href: "/forum" },
    ],
  },

  // 4. Khối Giải Thưởng & Mô Hình Dự Án Tiêu Biểu (lưu mảng ids của Award và HeritageProject)
  showcase: {
    badge: "GIẢI THƯỞNG & MÔ HÌNH TIÊU BIỂU",
    title: "Giải Thưởng Phát Triển Bền Vững & Dự Án Kinh Tế Di Sản",
    subtitle: "Tôn vinh các sáng kiến xuất sắc và trưng bày mô hình kinh tế di sản thực địa",
    ids: ["her_1", "her_3", "her_4"],
    groups: [
      {
        badge: "GIẢI THƯỞNG QUỐC GIA 2026",
        subBadge: "Hạn đề cử: 15/10/2026",
        title: "Giải Thưởng Phát Triển Bền Vững Chủ Động",
        quote: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
        description:
          "Hệ thống giải thưởng tôn vinh các tổ chức, doanh nghiệp, cộng đồng và cá nhân có sáng kiến xuất sắc trong bảo tồn di sản gắn liền phát triển kinh tế tuần hoàn, tạo sinh kế công bằng và bảo vệ môi trường.",
        note: "04 TIÊU CHÍ ĐÁNH GIÁ TRỌNG TÂM:",
        ids: ["award_2026"],
        cards: [
          { title: "Tính xác thực, tôn trọng nguyên bản và chiều sâu lịch sử văn hóa" },
          { title: "Hiệu quả kinh tế tuần hoàn và năng lực tự chủ tài chính cho công tác duy tu" },
          { title: "Mức độ tạo sinh kế và hưởng lợi trực tiếp của cộng đồng người dân sở tại" },
          { title: "Ứng dụng sáng tạo chuyển đổi số, vật liệu thân thiện và giải pháp xanh" },
        ],
        actions: [
          { label: "Nộp hồ sơ đề cử", href: "/contact?loai=giai-thuong#contact-form", icon: "Send" },
          { label: "Xem quy chế giải thưởng", href: "/awards", icon: "FileText" },
        ],
      },
      {
        badge: "MÔ HÌNH THỰC TIỄN",
        title: "Dự Án Kinh Tế Di Sản Tiêu Biểu",
        actions: [{ label: "Khám phá dự án", href: "/projects" }],
        ids: ["her_1", "her_3", "her_4"],
      },
    ],
  },

  // 5. Khối Tin Tức & Phân Tích Chuyên Sâu (lưu mảng ids của News: phần tử đầu là tiêu điểm, các phần tử sau là bài mới)
  news: {
    badge: "GÓC NHÌN HỌC THUẬT & HOẠT ĐỘNG",
    title: "Tin Tức & Phân Tích Chuyên Sâu",
    subtitle: "Cập nhật thông tin chính sách, kết quả nghiên cứu và góc nhìn đa chiều từ các chuyên gia hàng đầu.",
    actions: [{ label: "Xem tất cả tin tức & bài viết", href: "/news" }],
    subBadge: "BÀI VIẾT MỚI NHẤT",
    note: "Cập nhật liên tục",
    ids: ["news_feat_1", "news_lat_1", "news_lat_2", "news_lat_3"],
  },

  // 6. Khối Đối Tác & Cơ Quan Đồng Hành (lưu mảng ids của Organization theo từng nhóm)
  partners: {
    badge: "MẠNG LƯỚI ĐỐI TÁC ĐỒNG HÀNH",
    title: "Đơn Vị Chỉ Đạo, Chủ Trì & Đối Tác Chiến Lược",
    subtitle: "Sự gắn kết liên ngành giữa cơ quan quản lý, học thuật và doanh nghiệp",
    ids: [
      "p_1",
      "p_2",
      "p_3",
      "p_4",
      "p_5",
      "p_6",
      "p_7",
      "p_8",
      "p_9",
      "p_10",
      "p_11",
      "p_12",
      "p_13",
    ],
    groups: [
      {
        title: "BAN TỔ CHỨC & CƠ QUAN CHỦ TRÌ",
        ids: ["p_1", "p_2", "p_3", "p_4", "p_5", "p_6", "p_7", "p_8"],
      },
      {
        title: "ĐƠN VỊ TÀI TRỢ & ĐỒNG HÀNH",
        ids: ["p_9", "p_10", "p_11", "p_12", "p_13"],
      },
    ],
  },

  // 7. Khối Kêu Gọi Hành Động & Bản Tin (CTA)
  cta: {
    badge: "THAM GIA CÙNG DIỄN ĐÀN",
    title: "Cùng Kiến Tạo Giá Trị Di Sản",
    description:
      "Mỗi sáng kiến, tham luận và nguồn lực của quý vị đều góp phần hồi sinh và phát huy bền vững kho tàng văn hóa di sản của dân tộc.",
    cards: [
      {
        icon: "Calendar",
        badge: "TUYẾN 01 – ĐẠI BIỂU",
        title: "Đăng Ký Tham Dự Phiên Toàn Thể",
        description:
          "Trở thành đại biểu chính thức, kết nối cùng các chuyên gia hàng đầu và tiếp cận các báo cáo độc quyền.",
        actionLabel: "Đăng ký tham dự",
        href: "/contact?loai=tham-du#contact-form",
      },
      {
        icon: "Award",
        badge: "TUYẾN 02 – VINH DANH",
        title: "Nộp Hồ Sơ Đề Cử Giải Thưởng",
        description:
          "Gửi đề cử công trình kiến trúc, mô hình du lịch hoặc sáng kiến bảo tồn di sản xuất sắc vì cộng đồng.",
        actionLabel: "Nộp hồ sơ đề cử",
        href: "/contact?loai=giai-thuong#contact-form",
      },
      {
        icon: "Handshake",
        badge: "TUYẾN 03 – ĐỒNG HÀNH",
        title: "Đối Tác Chiến Lược & Tài Trợ",
        description:
          "Cùng xây dựng các dự án bảo tồn thực địa, tài trợ chuỗi nghiên cứu khoa học hoặc đăng cai tổ chức tại địa phương.",
        actionLabel: "Liên hệ hợp tác",
        href: "/contact?loai=hop-tac#contact-form",
      },
    ],
    groups: [
      {
        badge: "BẢN TIN DIỄN ĐÀN & KỶ YẾU KHOA HỌC",
        title: "Đăng Ký Nhận Báo Cáo Nghiên Cứu Định Kỳ",
        description:
          "Cập nhật sớm nhất tài liệu diễn đàn, kết quả thẩm định giải thưởng và cơ hội hợp tác kinh tế di sản.",
        note: "Nhập địa chỉ email của bạn...",
        actions: [{ label: "Nhận tin", href: "/contact#newsletter", icon: "Send" }],
      },
    ],
  },
};

export const DEFAULT_HOME_SECTIONS: PageSection[] = pagePropsToSections(DEFAULT_HOME_PROPS);
