/**
 * DỮ LIỆU PROPS MẶC ĐỊNH CHO CÁC TRANG CÒN LẠI (FORUM, AWARDS, PROJECTS, NEWS, CONTACT)
 * - Các trang chỉ hiển thị vài mục chọn lọc từ schema khác (Forum, Awards) lưu mảng `ids: string[]`.
 * - Các trang hiển thị toàn bộ danh sách có phân trang (/projects, /news) KHÔNG lưu `ids` trong props
 *   mà gọi API lấy danh sách có phân trang (/api/projects, /api/news).
 */

import {
  pagePropsToSections,
  type PagePropsMap,
  type PageSection,
} from "../../types/page.types";

// ========================================================
// 1. TRANG DIỄN ĐÀN (FORUM - /forum)
// ========================================================
export const DEFAULT_FORUM_PROPS: PagePropsMap = {
  hero: {
    badge: "Kỳ 2026 • Kế hoạch Trọng điểm",
    subBadge: "HERITAGE ECONOMY FORUM 2026",
    title: "KỲ DIỄN ĐÀN KINH TẾ DI SẢN 2026",
    quote: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
    description:
      "Quy tụ hơn 500 nhà hoạch định chính sách, học giả, doanh nhân và cộng đồng trong và ngoài nước nhằm nhận diện tài nguyên, thúc đẩy các mô hình đối thoại và chính sách kinh tế di sản thực tiễn.",
    ids: ["hef-edition-2026"],
    stats: [
      { label: "THỜI GIAN", value: "18 – 20 Tháng 11, 2026" },
      { label: "ĐỊA ĐIỂM", value: "Trung tâm Bảo tồn Di sản Hoàng thành Thăng Long" },
      { label: "ĐỊA CHỈ", value: "19C Hoàng Diệu, Phường Điện Biên, Quận Ba Đình, TP. Hà Nội" },
      { label: "QUY MÔ", value: "500+ Đại biểu chính thức" },
    ],
    actions: [
      { label: "Đăng ký tham dự", href: "/contact?loai=tham-du#contact-form" },
    ],
  },
  sessions: {
    badge: "CHƯƠNG TRÌNH NGHỊ SỰ",
    title: "04 Phiên Nghị Sự Chuyên Đề Trọng Tâm",
    subtitle: "Nội dung học thuật và thảo luận bàn tròn cấp cao",
    ids: ["hef-edition-2026"],
    cards: [
      {
        badge: "Phiên 1",
        subtitle: "08:30 – 11:30 | Ngày 18/11/2026",
        subBadge: "Hội trường Thăng Long (Tầng 2)",
        title: "Phiên 1: Thể Chế, Chính Sách & Khơi Thông Nguồn Lực Kinh Tế Di Sản",
        description:
          "Đánh giá khung pháp lý hiện hành, cơ chế tài chính công - tư và giải pháp khơi thông nguồn lực đầu tư bảo tồn thích ứng di sản văn hóa.",
        note: "GS.TS. Trần Quốc Vượng",
      },
      {
        badge: "Phiên 2",
        subtitle: "14:00 – 17:00 | Ngày 18/11/2026",
        subBadge: "Hội trường Đại La (Tầng 1)",
        title: "Phiên 2: Mô Hình Hợp Tác Công – Tư (PPP) & Thực Tiễn Đầu Tư Di Sản",
        description:
          "Phân tích các bài học kinh nghiệm quốc tế và đề xuất cơ chế chia sẻ rủi ro, phân bổ lợi ích hài hòa giữa Nhà nước, Doanh nghiệp và Cộng đồng.",
        note: "TS. Nguyễn Thị Bích Liên",
      },
      {
        badge: "Phiên 3",
        subtitle: "08:30 – 11:30 | Ngày 19/11/2026",
        subBadge: "Hội trường Thăng Long (Tầng 2)",
        title: "Phiên 3: Kinh Tế Sáng Tạo, Công Nghệ Số & Hệ Sinh Thái Di Sản Đô Thị",
        description:
          "Ứng dụng thực tế ảo, số hóa 3D, trí tuệ nhân tạo và kinh tế ban đêm trong việc hồi sinh các di sản kiến trúc đô thị lịch sử.",
        note: "KTS. Lê Hoàng Phương",
      },
      {
        badge: "Phiên 4",
        subtitle: "14:00 – 17:00 | Ngày 19/11/2026",
        subBadge: "Hội trường Đại La (Tầng 1)",
        title: "Phiên 4: Du Lịch Di Sản Bền Vững & Chuỗi Sinh Kế Cộng Đồng Bản Địa",
        description:
          "Phát triển du lịch có trách nhiệm, giữ gìn tính nguyên bản văn hóa và nâng cao năng lực tự chủ kinh tế cho các hợp tác xã, làng nghề.",
        note: "Bà Phạm Mai Hương",
      },
    ],
  },
  timeline: {
    badge: "LỊCH TRÌNH TOÀN KHÓA",
    title: "Trục Thời Gian Lịch Trình Chi Tiết",
    subtitle: "Lịch trình toàn khóa diễn ra trong 03 ngày làm việc",
    groups: [
      {
        badge: "18/11/2026",
        title: "Ngày Khai Mạc & Đối Thoại Chính Sách Cấp Cao",
        cards: [
          { subtitle: "08:00 - 08:30", title: "Đón tiếp đại biểu và phát tài liệu" },
          { subtitle: "08:30 - 09:15", title: "Phiên Khai mạc trọng thể và phát biểu chỉ đạo" },
          { subtitle: "09:30 - 11:30", title: "Phiên 1 - Thể chế và chính sách kinh tế di sản" },
          { subtitle: "14:00 - 17:00", title: "Phiên 2 - Hợp tác công tư và đầu tư bảo tồn" },
        ],
      },
      {
        badge: "19/11/2026",
        title: "Chuyên Đề Công Nghệ, Du Lịch & Bế Mạc",
        cards: [
          { subtitle: "08:30 - 11:30", title: "Phiên 3 - Kinh tế sáng tạo và chuyển đổi số" },
          { subtitle: "14:00 - 16:30", title: "Phiên 4 - Du lịch di sản và sinh kế cộng đồng" },
          { subtitle: "16:30 - 17:30", title: "Phiên Bế mạc & Công bố Thông điệp Diễn đàn 2026" },
        ],
      },
    ],
  },
  speakers: {
    badge: "DIỄN GIẢ & CHUYÊN GIA",
    title: "Diễn Giả & Chủ Tọa Các Phiên",
    subtitle: "Các học giả, nhà quản lý và chuyên gia quốc tế tham gia tham luận",
    ids: ["spk_1", "spk_2", "spk_3"],
  },
  resources: {
    badge: "THƯ VIỆN TƯ LIỆU",
    title: "Kỷ Yếu Khoa Học & Tài Liệu Diễn Đàn",
    subtitle: "Thư viện tư liệu, tham luận và ấn phẩm xuất bản",
    cards: [
      {
        badge: "PDF",
        subBadge: "42.5 MB",
        title: "Kỷ yếu Toàn văn Diễn đàn Kinh tế Di sản 2026 (PDF)",
        note: "380 trang",
        href: "#tai-lieu-ky-yeu",
      },
      {
        badge: "PDF",
        subBadge: "8.2 MB",
        title: "Báo cáo Tổng hợp Khuyến nghị Chính sách Kinh tế Di sản (2026)",
        note: "64 trang",
        href: "#tai-lieu-bao-cao",
      },
      {
        badge: "PDF",
        subBadge: "14.1 MB",
        title: "Khung hướng dẫn Mô hình Đối tác Công Tư (PPP) trong Di sản",
        note: "112 trang",
        href: "#tai-lieu-tham-luan",
      },
    ],
  },
  faq: {
    badge: "HỎI ĐÁP THƯỜNG GẶP",
    title: "Câu Hỏi Thường Gặp Dành Cho Đại Biểu",
    subtitle: "Giải đáp thắc mắc dành cho đại biểu và khách mời",
    cards: [
      {
        title: "Làm thế nào để nhận được Thư mời chính thức tham dự Diễn đàn?",
        description:
          "Đại biểu đăng ký qua cổng trực tuyến hoặc nhận đề cử từ các cơ quan phối hợp. Ban Thư ký sẽ gửi Thẻ đại biểu điện tử có mã QR qua email sau khi hoàn tất xét duyệt.",
      },
      {
        title: "Diễn đàn có thu phí tham dự đối với đại biểu hay không?",
        description:
          "Diễn đàn Kinh tế Di sản hoạt động phi lợi nhuận. Đại biểu được mời chính thức không phải đóng phí tham dự. Các chi phí ăn nghỉ, đi lại do đơn vị cử đại biểu chi trả.",
      },
      {
        title: "Tôi có thể đăng ký phát biểu tham luận tại các phiên chuyên đề không?",
        description:
          "Ban Khoa học tiếp nhận tóm tắt tham luận trước ngày 20/10/2026. Các bài viết đạt chuẩn phản biện sẽ được xếp vào chương trình nghị sự và in trong kỷ yếu.",
      },
    ],
  },
};

export const DEFAULT_FORUM_SECTIONS: PageSection[] = pagePropsToSections(DEFAULT_FORUM_PROPS);

// ========================================================
// 2. TRANG GIẢI THƯỞNG (AWARDS - /awards)
// ========================================================
export const DEFAULT_AWARDS_PROPS: PagePropsMap = {
  hero: {
    title: "GIẢI THƯỞNG PHÁT TRIỂN BỀN VỮNG CHỦ ĐỘNG",
    subtitle: "ACTIVE SUSTAINABLE HERITAGE AWARDS (ASHA 2026)",
    quote: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
    description:
      "Tôn vinh những tổ chức, doanh nghiệp, cộng đồng và cá nhân có đóng góp xuất sắc trong việc chuyển hóa tài nguyên di sản văn hóa thành động lực phát triển kinh tế - xã hội bền vững, bảo vệ tính nguyên vẹn của di sản và mang lại sinh kế lâu dài cho người dân.",
    actions: [
      { label: "Nộp Hồ Sơ Đề Cử Trực Tuyến", href: "/contact?loai=giai-thuong#contact-form" },
      { label: "Tải Bản Quy Chế Xét Chọn (PDF)", href: "#quy-che" },
    ],
  },
  categories: {
    title: "08 Hạng Mục Xét Chọn Tham Khảo",
    description:
      "Bao quát toàn diện các khía cạnh từ sáng kiến khoa học, mô hình kinh doanh di sản, ứng dụng công nghệ, đóng góp cộng đồng cho tới thành tựu cống hiến trọn đời.",
    awards: [],
  },
  criteria: {
    title: "Khung Đánh Giá Định Lượng",
    description:
      "Bộ tiêu chí 4 trụ cột với tỷ trọng đánh giá minh bạch, được Hội đồng Khoa học phê duyệt.",
    action: {
      label: "Tải Toàn Văn Quy chế ban hành kèm Quyết định số 18/QĐ-HEF/2026 của Hội đồng Diễn đàn",
      href: "/awards/the-le-giai-thuong-2026.pdf",
    },
    items: [
      {
        title: "Tính Nguyên Bản & Tôn Trọng Di Sản",
        weight: "30%",
        description:
          "Dự án tuân thủ nghiêm ngặt các công ước quốc tế và quy định pháp luật về bảo tồn, bảo vệ tối đa tính xác thực và không gian cảnh quan lịch sử.",
        evidences: [
          "Văn bản thẩm định của cơ quan chuyên môn văn hóa",
          "Tư liệu hình ảnh đối chiếu trước và sau can thiệp",
        ],
      },
      {
        title: "Hiệu Quả Kinh Tế & Sinh Kế Bản Địa",
        weight: "25%",
        description:
          "Tạo việc làm ổn định, chia sẻ lợi ích công bằng với người dân địa phương, đóng góp vào ngân sách tái đầu tư bảo tồn di sản.",
        evidences: [
          "Báo cáo tài chính hoặc bảng kê doanh thu minh bạch",
          "Tỷ lệ trích quỹ tái đầu tư bảo tồn tối thiểu 15%",
        ],
      },
      {
        title: "Đổi Mới Sáng Tạo & Thích Ứng Công Nghệ",
        weight: "25%",
        description:
          "Ứng dụng chuyển đổi số, thiết kế sáng tạo, phương pháp tiếp cận mới trong quản lý và trải nghiệm di sản văn hóa.",
        evidences: [
          "Bằng chứng ứng dụng công nghệ (web, app, VR/AR nếu có)",
          "Tài liệu chuyển giao quy trình hoặc sổ tay hướng dẫn thực hành",
        ],
      },
      {
        title: "Quản Trị Bền Vững & Trách Nhiệm Xã Hội",
        weight: "20%",
        description:
          "Có kế hoạch quản lý môi trường, cơ chế giám sát cộng đồng và chiến lược phát triển ổn định dài hạn.",
        evidences: [
          "Kế hoạch quản lý rủi ro và tác động môi trường",
          "Biên bản cam kết và đánh giá định kỳ từ cộng đồng cư dân",
        ],
      },
    ],
  },
  process: {
    title: "Sơ Đồ 07 Bước Đánh Giá Minh Bạch",
    description:
      "Quy trình khép kín đảm bảo tính độc lập, khách quan từ khâu tiếp nhận hồ sơ, thẩm định chuyên ngành, khảo sát thực tế đến công bố vinh danh.",
    steps: [
      {
        time: "Tháng 06 – 15/10/2026",
        title: "Phát Động & Tiếp Nhận",
        description: "Mở cổng nhận hồ sơ đề cử trực tuyến và hồ sơ gửi trực tiếp.",
      },
      {
        time: "16/10 – 22/10/2026",
        title: "Thẩm Tra Tính Hợp Lệ",
        description: "Ban Thư ký đối chiếu điều kiện tiêu chuẩn hồ sơ theo quy chế.",
      },
      {
        time: "23/10 – 02/11/2026",
        title: "Thẩm Định Thực Địa",
        description: "Đoàn chuyên gia khảo sát, phỏng vấn độc lập tại công trình/dự án.",
      },
      {
        time: "01/11 – 08/11/2026",
        title: "Bình Chọn Trực Tuyến",
        description: "Công chúng tham gia bình chọn trên cổng thông tin chính thức.",
      },
      {
        time: "09/11 – 11/11/2026",
        title: "Hội Đồng Chung Khảo",
        description: "Hội đồng gồm 11 chuyên gia bỏ phiếu kín chọn công trình xuất sắc.",
      },
      {
        time: "14/11/2026",
        title: "Công Bố Kết Quả",
        description: "Niêm yết danh sách đạt giải trên cổng thông tin và thông cáo báo chí.",
      },
      {
        time: "19/11/2026",
        title: "Lễ Trao Giải Trọng Thể",
        description: "Vinh danh truyền hình trực tiếp tại Phiên Toàn thể Diễn đàn.",
      },
    ],
  },
  council: {
    title: "Hội Đồng Thẩm Định Giải Thưởng",
    description:
      "Hội đồng giám khảo độc lập quy tụ các nhà khoa học, chuyên gia bảo tồn hàng đầu và đại diện tổ chức quốc tế uy tín, bảo đảm tính khách quan, khoa học và minh bạch cao nhất.",
    members: [],
  },
};

export const DEFAULT_AWARDS_SECTIONS: PageSection[] = pagePropsToSections(DEFAULT_AWARDS_PROPS);

// ========================================================
// 3. TRANG MÔ HÌNH & DỰ ÁN (PROJECTS - /projects)
// Trang danh sách đầy đủ: KHÔNG lưu `ids`, gọi API `/api/projects` (hoặc `/api/heritage`) có phân trang.
// ========================================================
export const DEFAULT_PROJECTS_PROPS: PagePropsMap = {
  hero: {
    badge: "Cơ Sở Dữ Liệu Quốc Gia",
    title: "DANH MỤC DỰ ÁN & MÔ HÌNH KINH TẾ DI SẢN",
    description:
      "Không gian giới thiệu các mô hình điển hình về phục hồi, trùng tu thích ứng di sản gắn với chuỗi giá trị du lịch, thủ công mỹ nghệ và kinh tế sáng tạo, sẵn sàng kêu gọi hợp tác đầu tư công - tư (PPP).",
    stats: [
      { label: "Mô hình thực hành tiêu biểu", value: "30+" },
      { label: "Tổng vốn đầu tư xã hội hóa", value: "2.500+ Tỷ" },
      { label: "Việc làm bản địa tạo ra", value: "12.000+" },
    ],
  },
  directory: {
    badge: "DANH MỤC ĐẦY ĐỦ CÓ PHÂN TRANG",
    title: "Bộ Lọc Dự Án Theo Phân Loại & Vùng Miền",
    subtitle: "Dữ liệu dự án được tải trực tiếp từ API danh mục dự án có phân trang (/api/projects)",
    note: "12",
  },
  cta: {
    badge: "ĐỀ XUẤT MÔ HÌNH MỚI",
    title: "Giới Thiệu Dự Án & Sáng Kiến Di Sản Của Quý Vị",
    description:
      "Kết nối dự án bảo tồn và phát triển sinh kế bản địa với mạng lưới chuyên gia và quỹ đầu tư của Diễn đàn.",
    actions: [
      { label: "Gửi hồ sơ giới thiệu dự án", href: "/contact?loai=du-an#contact-form" },
    ],
  },
};

export const DEFAULT_PROJECTS_SECTIONS: PageSection[] = pagePropsToSections(DEFAULT_PROJECTS_PROPS);

// ========================================================
// 4. TRANG TIN TỨC & BÁO CHÍ (NEWS - /news)
// Lưu: hero, featured_news (1 ID bài tiêu điểm), filter.categories (các nhóm ID Category)
// ========================================================
export const DEFAULT_NEWS_PROPS: PagePropsMap = {
  hero: {
    badge: "Trung Tâm Tri Thức & Truyền Thông",
    title: "Tin Tức, Nghiên Cứu & Góc Nhìn Chuyên Gia",
    description:
      "Cập nhật hoạt động, nghiên cứu, quan điểm chuyên gia và những mô hình thực tiễn góp phần làm rõ vai trò của di sản trong phát triển kinh tế, văn hóa và xã hội.",
  },
  featured_news: "news_1" as unknown as PagePropsMap[string],
  filter: {
    categories: [
      {
        title: "Hoạt động & Chính sách",
        ids: [1, 2],
      },
      {
        title: "Mô hình & Thực tiễn",
        ids: [3],
      },
    ],
  },
};

export const DEFAULT_NEWS_SECTIONS: PageSection[] = pagePropsToSections(DEFAULT_NEWS_PROPS);

// ========================================================
// 5. TRANG LIÊN HỆ & HỢP TÁC (CONTACT - /contact)
// ========================================================
export const DEFAULT_CONTACT_PROPS: PagePropsMap = {
  hero: {
    badge: "Cổng Tiếp Nhận Thông Tin",
    title: "Kết nối cùng Diễn đàn",
    quote: "Chia sẻ tri thức, nguồn lực và sáng kiến phát triển kinh tế di sản",
    description:
      "Diễn đàn Kinh tế Di sản chào đón các tổ chức nghiên cứu, chuyên gia, doanh nghiệp, cộng đồng và đối tác cùng đồng hành để chuyển hóa nguồn lực di sản thành giá trị kinh tế, văn hóa và xã hội bền vững.",
  },
  info: {
    title: "Văn phòng Thường trực Ban Thư ký Diễn đàn Kinh tế Di sản",
    address: "Trung tâm Bảo tồn Di sản Thăng Long, 19C Hoàng Diệu, Ba Đình, Hà Nội",
    hotline: "+84 (024) 3823 4567",
    email: "contact@heritageeconomy.vn",
    workingHours: "Thứ Hai – Thứ Sáu: 08:30 – 17:30 (GMT+7)",
  },
  faq: {
    title: "Giải Đáp Thường Gặp (FAQ)",
    questions: [
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
  },
  form: {
    title: "Biểu Mẫu Tiếp Nhận Chính Thức",
    description:
      "Vui lòng chọn đúng nhóm nhu cầu để Ban Thư ký phân công chuyên viên phụ trách phù hợp.",
    consentText:
      "Tôi xác nhận đồng ý để Diễn đàn lưu trữ và xử lý thông tin liên hệ cho mục đích điều phối công vụ theo Quy định bảo vệ dữ liệu cá nhân.",
    submitLabel: "Gửi yêu cầu chính thức",
    fields: {
      type: {
        label: "Nhóm Yêu Cầu *",
        options: [
          "Đăng ký tham dự Đại biểu",
          "Hợp tác Chiến lược & Phát triển",
          "Tài trợ & Đồng hành Diễn đàn",
          "Đề xuất Dự án / Mô hình Di sản",
          "Giải thưởng Phát triển Bền vững",
          "Yêu cầu / Ý kiến khác",
        ],
      },
      fullName: {
        label: "Họ và tên *",
        placeholder: "Nguyễn Văn A",
      },
      organization: {
        label: "Đơn vị / Cơ quan *",
        placeholder: "Tên viện, trường, doanh nghiệp...",
      },
      position: {
        label: "Chức danh / Học vị",
        placeholder: "Chuyên viên, Giám đốc, PGS.TS...",
      },
      phone: {
        label: "Số điện thoại liên hệ *",
        placeholder: "09xx xxx xxx",
      },
      email: {
        label: "Email công vụ / cá nhân *",
        placeholder: "email@example.com",
      },
      message: {
        label: "Nội dung yêu cầu / Ghi chú trao đổi *",
        placeholder:
          "Mô tả tóm tắt nội dung Quý vị muốn trao đổi cùng Ban Thư ký Diễn đàn...",
      },
    },
  },
};

export const DEFAULT_CONTACT_SECTIONS: PageSection[] = pagePropsToSections(DEFAULT_CONTACT_PROPS);
