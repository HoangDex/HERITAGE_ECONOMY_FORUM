/**
 * DỮ LIỆU SECTIONS MẶC ĐỊNH CHO CÁC TRANG CÒN LẠI (FORUM, AWARDS, PROJECTS, NEWS, CONTACT)
 * Tuân thủ JSON-backed Dynamic Sections CMS và lưu trữ Props tĩnh chuyên sâu.
 */

import type { PageSection } from "../../types/page.types";

// ========================================================
// 1. TRANG DIỄN ĐÀN (FORUM - /forum)
// ========================================================
export const DEFAULT_FORUM_SECTIONS: PageSection[] = [
  {
    id: "sec_forum_hero",
    type: "FORUM_HERO",
    title: "Kỳ Diễn Đàn Kinh Tế Di Sản 2026",
    subtitle: "Chương trình nghị sự chính thức, 04 phiên làm việc và trục thời gian",
    order: 1,
    isVisible: true,
    props: {
      editionYear: 2026,
      badgeText: "Kỳ 2026 • Kế hoạch Trọng điểm",
      title: "KỲ DIỄN ĐÀN KINH TẾ DI SẢN 2026",
      theme: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
      description:
        "Quy tụ hơn 500 nhà hoạch định chính sách, học giả, doanh nhân và cộng đồng trong và ngoài nước nhằm nhận diện tài nguyên, thúc đẩy các mô hình đối thoại và chính sách kinh tế di sản thực tiễn.",
      startDate: "2026-11-18T08:00:00.000+07:00",
      endDate: "2026-11-20T17:30:00.000+07:00",
      datesText: "18 – 20 Tháng 11, 2026",
      venueName: "Trung tâm Bảo tồn Di sản Hoàng thành Thăng Long",
      venueAddress: "19C Hoàng Diệu, Phường Điện Biên, Quận Ba Đình, TP. Hà Nội",
      attendeesExpected: "500+ Đại biểu chính thức",
      organizer: "Hội Di sản Văn hóa Việt Nam & Viện Nghiên cứu Kinh tế Di sản (HEI)",
      isDateConfirmed: true,
      registrationDeadline: "10/11/2026",
      registrationUrl: "/contact?loai=tham-du#contact-form",
    },
  },
  {
    id: "sec_forum_sessions",
    type: "FORUM_SESSIONS",
    title: "04 Phiên Nghị Sự Chuyên Đề Trọng Tâm",
    subtitle: "Nội dung học thuật và thảo luận bàn tròn cấp cao",
    order: 2,
    isVisible: true,
    props: {
      heading: "CHƯƠNG TRÌNH 04 PHIÊN LÀM VIỆC CHUYÊN SÂU",
      sessions: [
        {
          sessionNumber: 1,
          title: "Phiên 1: Thể Chế, Chính Sách & Khơi Thông Nguồn Lực Kinh Tế Di Sản",
          time: "08:30 – 11:30 | Ngày 18/11/2026",
          room: "Hội trường Thăng Long (Tầng 2)",
          chairperson: "GS.TS. Trần Quốc Vượng",
          summary:
            "Đánh giá khung pháp lý hiện hành, cơ chế tài chính công - tư và giải pháp khơi thông nguồn lực đầu tư bảo tồn thích ứng di sản văn hóa.",
        },
        {
          sessionNumber: 2,
          title: "Phiên 2: Mô Hình Hợp Tác Công – Tư (PPP) & Thực Tiễn Đầu Tư Di Sản",
          time: "14:00 – 17:00 | Ngày 18/11/2026",
          room: "Hội trường Đại La (Tầng 1)",
          chairperson: "TS. Nguyễn Thị Bích Liên",
          summary:
            "Phân tích các bài học kinh nghiệm quốc tế và đề xuất cơ chế chia sẻ rủi ro, phân bổ lợi ích hài hòa giữa Nhà nước, Doanh nghiệp và Cộng đồng.",
        },
        {
          sessionNumber: 3,
          title: "Phiên 3: Kinh Tế Sáng Tạo, Công Nghệ Số & Hệ Sinh Thái Di Sản Đô Thị",
          time: "08:30 – 11:30 | Ngày 19/11/2026",
          room: "Hội trường Thăng Long (Tầng 2)",
          chairperson: "KTS. Lê Hoàng Phương",
          summary:
            "Ứng dụng thực tế ảo, số hóa 3D, trí tuệ nhân tạo và kinh tế ban đêm trong việc hồi sinh các di sản kiến trúc đô thị lịch sử.",
        },
        {
          sessionNumber: 4,
          title: "Phiên 4: Du Lịch Di Sản Bền Vững & Chuỗi Sinh Kế Cộng Đồng Bản Địa",
          time: "14:00 – 17:00 | Ngày 19/11/2026",
          room: "Hội trường Đại La (Tầng 1)",
          chairperson: "Bà Phạm Mai Hương",
          summary:
            "Phát triển du lịch có trách nhiệm, giữ gìn tính nguyên bản văn hóa và nâng cao năng lực tự chủ kinh tế cho các hợp tác xã, làng nghề.",
        },
      ],
    },
  },
  {
    id: "sec_forum_timeline",
    type: "TIMELINE",
    title: "Trục Thời Gian Lịch Trình Chi Tiết",
    subtitle: "Lịch trình toàn khóa diễn ra trong 03 ngày làm việc",
    order: 3,
    isVisible: true,
    props: {
      title: "LỊCH TRÌNH DIỄN ĐÀN TOÀN KHÓA 2026",
      days: [
        {
          dayNumber: 1,
          date: "18/11/2026",
          title: "Ngày Khai Mạc & Đối Thoại Chính Sách Cấp Cao",
          activities: [
            "08:00 - 08:30: Đón tiếp đại biểu và phát tài liệu",
            "08:30 - 09:15: Phiên Khai mạc trọng thể và phát biểu chỉ đạo",
            "09:30 - 11:30: Phiên 1 - Thể chế và chính sách kinh tế di sản",
            "14:00 - 17:00: Phiên 2 - Hợp tác công tư và đầu tư bảo tồn",
            "18:30 - 20:30: Tiệc chào mừng đại biểu chính thức",
          ],
        },
        {
          dayNumber: 2,
          date: "19/11/2026",
          title: "Chuyên Đề Công Nghệ, Du Lịch & Bế Mạc",
          activities: [
            "08:30 - 11:30: Phiên 3 - Kinh tế sáng tạo và chuyển đổi số",
            "14:00 - 16:30: Phiên 4 - Du lịch di sản và sinh kế cộng đồng",
            "16:30 - 17:30: Phiên Bế mạc & Công bố Thông điệp Diễn đàn 2026",
          ],
        },
        {
          dayNumber: 3,
          date: "20/11/2026",
          title: "Khảo Sát Thực Địa & Tọa Đàm Bàn Tròn",
          activities: [
            "08:00 - 12:00: Khảo sát thực địa mô hình bảo tồn tại Làng cổ Đường Lâm",
            "14:00 - 16:30: Tọa đàm bàn tròn chuyên gia quốc tế và địa phương",
          ],
        },
      ],
    },
  },
  {
    id: "sec_forum_resources",
    type: "FORUM_RESOURCES",
    title: "Kỷ Yếu Khoa Học & Tài Liệu Diễn Đàn",
    subtitle: "Thư viện tư liệu, tham luận và ấn phẩm xuất bản",
    order: 4,
    isVisible: true,
    props: {
      title: "TÀI LIỆU KHOA HỌC & KỶ YẾU CHÍNH THỨC",
      resources: [
        {
          title: "Kỷ yếu Toàn văn Diễn đàn Kinh tế Di sản 2026 (PDF)",
          size: "42.5 MB",
          format: "PDF",
          downloadUrl: "#",
          pages: 380,
        },
        {
          title: "Báo cáo Tổng hợp Khuyến nghị Chính sách Kinh tế Di sản (2026)",
          size: "8.2 MB",
          format: "PDF",
          downloadUrl: "#",
          pages: 64,
        },
        {
          title: "Khung hướng dẫn Mô hình Đối tác Công Tư (PPP) trong Di sản",
          size: "14.1 MB",
          format: "PDF",
          downloadUrl: "#",
          pages: 112,
        },
      ],
    },
  },
  {
    id: "sec_forum_faq",
    type: "FORUM_FAQ",
    title: "Hỏi Đáp Thường Gặp (FAQ)",
    subtitle: "Giải đáp thắc mắc dành cho đại biểu và khách mời",
    order: 5,
    isVisible: true,
    props: {
      title: "CÂU HỎI THƯỜNG GẶP DÀNH CHO ĐẠI BIỂU",
      items: [
        {
          q: "Làm thế nào để nhận được Thư mời chính thức tham dự Diễn đàn?",
          a: "Đại biểu đăng ký qua cổng trực tuyến hoặc nhận đề cử từ các cơ quan phối hợp. Ban Thư ký sẽ gửi Thẻ đại biểu điện tử có mã QR qua email sau khi hoàn tất xét duyệt.",
        },
        {
          q: "Diễn đàn có thu phí tham dự đối với đại biểu hay không?",
          a: "Diễn đàn Kinh tế Di sản hoạt động phi lợi nhuận. Đại biểu được mời chính thức không phải đóng phí tham dự. Các chi phí ăn nghỉ, đi lại do đơn vị cử đại biểu chi trả.",
        },
        {
          q: "Tôi có thể đăng ký phát biểu tham luận tại các phiên chuyên đề không?",
          a: "Ban Khoa học tiếp nhận tóm tắt tham luận trước ngày 20/10/2026. Các bài viết đạt chuẩn phản biện sẽ được xếp vào chương trình nghị sự và in trong kỷ yếu.",
        },
      ],
    },
  },
];

// ========================================================
// 2. TRANG GIẢI THƯỞNG (AWARDS - /awards)
// ========================================================
export const DEFAULT_AWARDS_SECTIONS: PageSection[] = [
  {
    id: "sec_awards_hero",
    type: "AWARDS_HERO",
    title: "Giải Thưởng Phát Triển Bền Vững Chủ Động 2026",
    subtitle: "Hệ thống giải thưởng tôn vinh các sáng kiến kinh tế di sản tiêu biểu",
    order: 1,
    isVisible: true,
    props: {
      badgeText: "Hệ Thống Giải Thưởng Quốc Gia 2026",
      title: "GIẢI THƯỞNG PHÁT TRIỂN BỀN VỮNG CHỦ ĐỘNG",
      englishTitle: "ACTIVE SUSTAINABLE HERITAGE AWARDS (ASHA 2026)",
      slogan: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
      philosophy:
        "Tôn vinh những tổ chức, doanh nghiệp, cộng đồng và cá nhân có đóng góp xuất sắc trong việc chuyển hóa tài nguyên di sản văn hóa thành động lực phát triển kinh tế - xã hội bền vững, bảo vệ tính nguyên vẹn của di sản và mang lại sinh kế lâu dài cho người dân.",
      nominationDeadline: "15/10/2026",
      nominationUrl: "/contact?loai=giai-thuong#contact-form",
      regulationsUrl: "#",
    },
  },
  {
    id: "sec_awards_criteria",
    type: "AWARDS_CRITERIA",
    title: "Bộ Tiêu Chí Bình Chọn & Đánh Giá Định Lượng",
    subtitle: "Khung thẩm định độc lập gồm 04 nhóm tiêu chuẩn cốt lõi",
    order: 2,
    isVisible: true,
    props: {
      heading: "BỘ TIÊU CHÍ ĐÁNH GIÁ 4 TRỌNG TÂM",
      rulesVersion: "Quy chế ban hành kèm Quyết định số 18/QĐ-HEF/2026 của Hội đồng Diễn đàn",
      criteriaList: [
        {
          id: "crit-1",
          order: 1,
          weightPercent: 30,
          weight: "30%",
          title: "Tính Nguyên Bản & Tôn Trọng Di Sản",
          description:
            "Dự án tuân thủ nghiêm ngặt các công ước quốc tế và quy định pháp luật về bảo tồn, bảo vệ tối đa tính xác thực và không gian cảnh quan lịch sử.",
          evidenceRequirements: [
            "Văn bản thẩm định của cơ quan chuyên môn văn hóa",
            "Tư liệu hình ảnh đối chiếu trước và sau can thiệp",
          ],
        },
        {
          id: "crit-2",
          order: 2,
          weightPercent: 25,
          weight: "25%",
          title: "Hiệu Quả Kinh Tế & Sinh Kế Bản Địa",
          description:
            "Tạo việc làm ổn định, chia sẻ lợi ích công bằng với người dân địa phương, đóng góp vào ngân sách tái đầu tư bảo tồn di sản.",
          evidenceRequirements: [
            "Báo cáo tài chính hoặc bảng kê doanh thu minh bạch",
            "Tỷ lệ trích quỹ tái đầu tư bảo tồn tối thiểu 15%",
          ],
        },
        {
          id: "crit-3",
          order: 3,
          weightPercent: 25,
          weight: "25%",
          title: "Đổi Mới Sáng Tạo & Thích Ứng Công Nghệ",
          description:
            "Ứng dụng chuyển đổi số, thiết kế sáng tạo, phương pháp tiếp cận mới trong quản lý và trải nghiệm di sản văn hóa.",
          evidenceRequirements: [
            "Bằng chứng ứng dụng công nghệ (web, app, VR/AR nếu có)",
            "Tài liệu chuyển giao quy trình hoặc sổ tay hướng dẫn thực hành",
          ],
        },
        {
          id: "crit-4",
          order: 4,
          weightPercent: 20,
          weight: "20%",
          title: "Quản Trị Bền Vững & Trách Nhiệm Xã Hội",
          description:
            "Có kế hoạch quản lý môi trường, cơ chế giám sát cộng đồng và chiến lược phát triển ổn định dài hạn.",
          evidenceRequirements: [
            "Kế hoạch quản lý rủi ro và tác động môi trường",
            "Biên bản cam kết và đánh giá định kỳ từ cộng đồng cư dân",
          ],
        },
      ],
    },
  },
  {
    id: "sec_awards_process",
    type: "AWARDS_PROCESS",
    title: "Quy Trình 07 Bước Xét Chọn Vinh Danh",
    subtitle: "Quy trình bình chọn minh bạch, độc lập và khách quan",
    order: 3,
    isVisible: true,
    props: {
      heading: "LỘ TRÌNH 7 BƯỚC TỪ NỘP HỒ SƠ ĐẾN VINH DANH",
      steps: [
        { step: 1, title: "Phát Động & Tiếp Nhận", name: "Phát Động & Tiếp Nhận", timeframe: "Tháng 06 – 15/10/2026", time: "Tháng 06 – 15/10/2026", description: "Mở cổng nhận hồ sơ đề cử trực tuyến và hồ sơ gửi trực tiếp.", desc: "Mở cổng nhận hồ sơ đề cử trực tuyến và hồ sơ gửi trực tiếp." },
        { step: 2, title: "Thẩm Tra Tính Hợp Lệ", name: "Thẩm Tra Tính Hợp Lệ", timeframe: "16/10 – 22/10/2026", time: "16/10 – 22/10/2026", description: "Ban Thư ký đối chiếu điều kiện tiêu chuẩn hồ sơ theo quy chế.", desc: "Ban Thư ký đối chiếu điều kiện tiêu chuẩn hồ sơ theo quy chế." },
        { step: 3, title: "Thẩm Định Thực Địa", name: "Thẩm Định Thực Địa", timeframe: "23/10 – 02/11/2026", time: "23/10 – 02/11/2026", description: "Đoàn chuyên gia khảo sát, phỏng vấn độc lập tại công trình/dự án.", desc: "Đoàn chuyên gia khảo sát, phỏng vấn độc lập tại công trình/dự án." },
        { step: 4, title: "Bình Chọn Trực Tuyến", name: "Bình Chọn Trực Tuyến", timeframe: "01/11 – 08/11/2026", time: "01/11 – 08/11/2026", description: "Công chúng tham gia bình chọn trên cổng thông tin chính thức.", desc: "Công chúng tham gia bình chọn trên cổng thông tin chính thức." },
        { step: 5, title: "Hội Đồng Chung Khảo", name: "Hội Đồng Chung Khảo", timeframe: "09/11 – 11/11/2026", time: "09/11 – 11/11/2026", description: "Hội đồng gồm 11 chuyên gia bỏ phiếu kín chọn công trình xuất sắc.", desc: "Hội đồng gồm 11 chuyên gia bỏ phiếu kín chọn công trình xuất sắc." },
        { step: 6, title: "Công Bố Kết Quả", name: "Công Bố Kết Quả", timeframe: "14/11/2026", time: "14/11/2026", description: "Niêm yết danh sách đạt giải trên cổng thông tin và thông cáo báo chí.", desc: "Niêm yết danh sách đạt giải trên cổng thông tin và thông cáo báo chí." },
        { step: 7, title: "Lễ Trao Giải Trọng Thể", name: "Lễ Trao Giải Trọng Thể", timeframe: "19/11/2026", time: "19/11/2026", description: "Vinh danh truyền hình trực tiếp tại Phiên Toàn thể Diễn đàn.", desc: "Vinh danh truyền hình trực tiếp tại Phiên Toàn thể Diễn đàn." },
      ],
    },
  },
  {
    id: "sec_awards_submission_cta",
    type: "AWARDS_SUBMISSION_CTA",
    title: "Hướng Dẫn Nộp Hồ Sơ Đề Cử Trực Tuyến",
    subtitle: "Mẫu đơn, quy chuẩn tài liệu và thông tin hỗ trợ tiếp nhận",
    order: 4,
    isVisible: true,
    props: {
      title: "GỬI ĐỀ CỬ CÔNG TRÌNH / DỰ ÁN CỦA QUÝ VỊ",
      description:
        "Ban Tổ chức chào đón tất cả các công trình kiến trúc bảo tồn, mô hình sinh kế di sản, hợp tác xã văn hóa và giải pháp chuyển đổi số từ mọi miền đất nước.",
      ctaText: "Nộp Hồ Sơ Đề Cử Ngay",
      ctaUrl: "/contact?loai=giai-thuong#contact-form",
      downloadTemplateUrl: "#",
      hotline: "+84 (0) 24 3823 6688",
    },
  },
];

// ========================================================
// 3. TRANG MÔ HÌNH & DỰ ÁN (PROJECTS - /projects)
// ========================================================
export const DEFAULT_PROJECTS_SECTIONS: PageSection[] = [
  {
    id: "sec_projects_hero",
    type: "PROJECTS_HERO",
    title: "Cơ Sở Dữ Liệu Dự Án & Sáng Kiến Di Sản",
    subtitle: "Nền tảng kết nối các mô hình thực hành bảo tồn thích ứng trên cả nước",
    order: 1,
    isVisible: true,
    props: {
      badgeText: "Cơ Sở Dữ Liệu Quốc Gia",
      title: "DANH MỤC DỰ ÁN & MÔ HÌNH KINH TẾ DI SẢN",
      description:
        "Không gian giới thiệu các mô hình điển hình về phục hồi, trùng tu thích ứng di sản gắn với chuỗi giá trị du lịch, thủ công mỹ nghệ và kinh tế sáng tạo, sẵn sàng kêu gọi hợp tác đầu tư công - tư (PPP).",
      stats: [
        { label: "Mô hình thực hành tiêu biểu", value: "30+" },
        { label: "Tổng vốn đầu tư xã hội hóa", value: "2.500+ Tỷ" },
        { label: "Việc làm bản địa tạo ra", value: "12.000+" },
      ],
    },
  },
  {
    id: "sec_projects_grid_config",
    type: "PROJECT_GRID",
    title: "Cấu Hình Hiển Thị Danh Mục Dự Án",
    subtitle: "Bộ lọc chuyên đề và chế độ xem danh sách dự án",
    order: 2,
    isVisible: true,
    props: {
      heading: "BỘ LỌC DỰ ÁN THEO PHÂN LOẠI & VÙNG MIỀN",
      categories: [
        "Tất cả",
        "Bảo tồn Thích ứng",
        "Du lịch Di sản",
        "Làng nghề Truyền thống",
        "Công nghệ & Số hóa",
      ],
      defaultCategory: "Tất cả",
      itemsPerPage: 12,
      showEconomicMetrics: true,
    },
  },
];

// ========================================================
// 4. TRANG TIN TỨC & BÁO CHÍ (NEWS - /news)
// ========================================================
export const DEFAULT_NEWS_SECTIONS: PageSection[] = [
  {
    id: "sec_news_hero",
    type: "NEWS_HERO",
    title: "Trung Tâm Thông Tin, Nghiên Cứu & Báo Chí",
    subtitle: "Tiếng nói chuyên gia, phóng sự thực địa và tư liệu di sản",
    order: 1,
    isVisible: true,
    props: {
      badgeText: "Trung Tâm Tri Thức & Truyền Thông",
      title: "TIN TỨC, NGHIÊN CỨU & GÓC NHÌN CHUYÊN GIA",
      description:
        "Cập nhật đa chiều hoạt động của Diễn đàn, các công trình nghiên cứu chuyên sâu, bình luận chính sách và những mô hình thực tiễn hồi sinh di sản trong dòng chảy kinh tế đương đại.",
    },
  },
  {
    id: "sec_news_feed_config",
    type: "NEWS_FEED",
    title: "Cấu Hình Phân Loại Bài Viết & Tin Tức",
    subtitle: "Danh mục tin và quy cách bố cục bài viết tiêu điểm",
    order: 2,
    isVisible: true,
    props: {
      categories: [
        "Tất cả",
        "Thời sự Diễn đàn",
        "Nghiên cứu & Tham luận",
        "Chính sách & Pháp luật",
        "Thực tiễn Quốc tế",
        "Câu chuyện Di sản",
      ],
      defaultCategory: "Tất cả",
      showTopStorySection: true,
      itemsPerPage: 9,
    },
  },
];

// ========================================================
// 5. TRANG LIÊN HỆ & HỢP TÁC (CONTACT - /contact)
// ========================================================
export const DEFAULT_CONTACT_SECTIONS: PageSection[] = [
  {
    id: "sec_contact_banner",
    type: "CONTACT_BANNER",
    title: "Cổng Tiếp Nhận Thông Tin & Hợp Tác",
    subtitle: "Thông điệp kết nối và hướng dẫn gửi yêu cầu tới Ban Thư ký",
    order: 1,
    isVisible: true,
    props: {
      badgeText: "Cổng Tiếp Nhận Thông Tin & Hợp Tác",
      title: "LIÊN HỆ VỚI BAN THƯ KÝ DIỄN ĐÀN",
      slogan: "Kết nối cùng kiến tạo giá trị di sản bền vững",
      description:
        "Ban Thư ký Diễn đàn Kinh tế Di sản tiếp nhận đăng ký tham dự, hồ sơ giải thưởng, đề xuất tài trợ - hợp tác đồng hành và giải đáp thông tin từ các cơ quan thông tấn báo chí.",
    },
  },
  {
    id: "sec_contact_info",
    type: "CONTACT_INFO",
    title: "Thông Tin Ban Thư Ký & Câu Hỏi Thường Gặp",
    subtitle: "Địa chỉ trụ sở, đường dây nóng và kênh liên hệ chính thức",
    order: 2,
    isVisible: true,
    props: {
      organizationName: "Văn phòng Thường trực Ban Thư ký Diễn đàn Kinh tế Di sản",
      address: "Trung tâm Bảo tồn Di sản Hoàng thành Thăng Long, 19C Hoàng Diệu, Phường Điện Biên, Quận Ba Đình, TP. Hà Nội",
      hotline: "+84 (0) 24 3823 6688",
      email: "contact@heritageeconomy.vn",
      pressEmail: "press@heritageeconomy.vn",
      workingHours: "08:00 – 17:30 (Thứ Hai – Thứ Sáu, trừ ngày lễ theo quy định)",
      faqs: [
        {
          q: "Thủ tục đăng ký tham dự Diễn đàn với tư cách đại biểu như thế nào?",
          a: "Quý đại biểu điền trực tiếp thông tin tại biểu mẫu bên cạnh, chọn mục 'Đăng ký tham dự'. Ban Thư ký sẽ liên hệ phản hồi xác nhận và gửi thư mời trong vòng 48 giờ làm việc.",
        },
        {
          q: "Hạn chót tiếp nhận hồ sơ đề cử Giải thưởng ASHA 2026 là khi nào?",
          a: "Cổng tiếp nhận hồ sơ trực tuyến đóng lại vào lúc 23:59 ngày 15/10/2026.",
        },
        {
          q: "Doanh nghiệp muốn đồng hành tài trợ có các gói quyền lợi nào?",
          a: "Vui lòng chọn loại hình 'Đối tác & Tài trợ' trên biểu mẫu, Ban Đối ngoại sẽ gửi Bộ tài liệu quyền lợi đối tác chi tiết.",
        },
      ],
    },
  },
  {
    id: "sec_contact_form_config",
    type: "CONTACT_FORM",
    title: "Cấu Hình Biểu Mẫu Trực Tuyến",
    subtitle: "Các phân loại yêu cầu tiếp nhận trên hệ thống",
    order: 3,
    isVisible: true,
    props: {
      channels: [
        { id: "tham-du", label: "Đăng Ký Tham Dự Diễn Đàn (Đại biểu)", defaultSelected: true },
        { id: "giai-thuong", label: "Nộp Hồ Sơ Đề Cử Giải Thưởng ASHA 2026" },
        { id: "hop-tac", label: "Đối Tác Chiến Lược & Tài Trợ Đồng Hành" },
        { id: "bao-chi", label: "Báo Chí & Truyền Thông Tác Nghiệp" },
        { id: "khac", label: "Ý Kiến Đóng Góp & Hợp Tác Khác" },
      ],
      noticeText:
        "Thông tin của Quý vị được bảo mật tuyệt đối theo Quy chuẩn bảo vệ dữ liệu cá nhân của HEF.",
    },
  },
];
