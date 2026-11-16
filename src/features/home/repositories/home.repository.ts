/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE HOME
 * Cung cấp dữ liệu chuẩn hóa cho Trang chủ: Hero, 5 Trụ cột, Sự kiện, Giải thưởng, Dự án, Tin tức, Đối tác
 */

import type {
  IHomeRepository,
  HomePageData,
  EventHighlight,
  FeaturedProject,
  NewsArticle,
} from "../types/home.types";
import { pageRepository } from "@/features/pages/repositories/page.repository";

const fallbackHomePageData: HomePageData = {
  hero: {
    title: "HERITAGE ECONOMY FORUM",
    vietnameseTitle: "DIỄN ĐÀN KINH TẾ DI SẢN",
    slogan: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
    description:
      "Diễn đàn kết nối tri thức, nguồn lực và sáng kiến để phát huy giá trị di sản, thúc đẩy kinh tế sáng tạo và phát triển bền vững.",
    primaryCta: {
      label: "Khám phá diễn đàn",
      href: "/forum",
    },
    secondaryCta: {
      label: "Đăng ký tham dự",
      href: "/contact?loai=tham-du#contact-form",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&h=750&q=85",
    imageAlt: "Quần thể di sản văn hóa Việt Nam - Di sản kiến tạo giá trị phát triển bền vững",
    badgeText: "NỀN TẢNG ĐỐI THOẠI & KẾT NỐI QUỐC GIA",
    videoUrl: "/videos/heritage-bg.mp4",
  },

  quickIntro: {
    content:
      "Diễn đàn Kinh tế Di sản là không gian đối thoại liên ngành giữa nhà khoa học, nhà quản lý, doanh nghiệp và cộng đồng. Thông qua nghiên cứu, trao đổi chính sách, kết nối hợp tác và triển khai mô hình thực tiễn, Diễn đàn góp phần chuyển hóa nguồn lực di sản thành giá trị kinh tế, văn hóa và xã hội có trách nhiệm.",
    subContent:
      "Lấy di sản làm nguồn lực sáng tạo, lấy cộng đồng bản địa làm chủ thể bảo tồn và hưởng lợi trực tiếp từ chuỗi giá trị tăng trưởng.",
  },

  pillars: [
    {
      id: "pillar_research",
      orderNumber: "01",
      title: "Nghiên cứu",
      subtitle: "Khảo sát & Dữ liệu",
      description:
        "Khảo sát, lượng hóa giá trị kinh tế của di sản, xây dựng cơ sở lý luận và chỉ số phát triển bền vững cho các địa phương.",
      iconName: "BookOpen",
    },
    {
      id: "pillar_dialogue",
      orderNumber: "02",
      title: "Đối thoại",
      subtitle: "Chính sách & Bàn tròn",
      description:
        "Tạo lập bàn tròn đối thoại cởi mở giữa cơ quan quản lý, viện nghiên cứu, doanh nghiệp và cộng đồng để tháo gỡ điểm nghẽn thể chế.",
      iconName: "MessageSquare",
    },
    {
      id: "pillar_connect",
      orderNumber: "03",
      title: "Kết nối",
      subtitle: "Mạng lưới & Nguồn lực",
      description:
        "Liên kết chuỗi giá trị công – tư (PPP), kết nối chuyên gia di sản quốc tế với các dự án thực địa và quỹ bảo trợ tài chính.",
      iconName: "Network",
    },
    {
      id: "pillar_recognize",
      orderNumber: "04",
      title: "Ghi nhận",
      subtitle: "Giải thưởng & Tôn vinh",
      description:
        "Tôn vinh các mô hình xuất sắc qua Giải thưởng Phát triển Bền vững Chủ động, lan tỏa chuẩn mực thực hành trách nhiệm.",
      iconName: "Award",
    },
    {
      id: "pillar_develop",
      orderNumber: "05",
      title: "Phát triển",
      subtitle: "Ươm tạo & Sinh kế",
      description:
        "Đồng hành ươm tạo các sáng kiến di sản, chuyển giao giải pháp chuyển đổi số và phát triển sinh kế bao trùm cho người dân.",
      iconName: "TrendingUp",
    },
  ],

  activeEvent: {
    id: "event_hef_2026",
    edition: "Kỳ Diễn Đàn Thường Niên 2026",
    statusBadge: "ĐANG MỞ ĐĂNG KÝ ĐẠI BIỂU",
    title: "Kinh Tế Di Sản Trong Kỷ Nguyên Số: Thể Chế, Nguồn Lực & Mô Hình Đột Phá",
    theme:
      "Tập trung nhận diện giá trị kinh tế của di sản kiến trúc đô thị, công nghiệp văn hóa và phương thức huy động vốn tư nhân vào bảo tồn thích ứng.",
    dates: "15 – 17 tháng 11 năm 2026",
    location: "Trung tâm Hội nghị Quốc tế & Hoàng thành Thăng Long, Thủ đô Hà Nội",
    description:
      "Kỳ Diễn đàn quy tụ hơn 500 đại biểu trong nước và quốc tế, gồm 1 Phiên toàn thể cấp cao, 4 Phiên chuyên đề song song, không gian triển lãm mô hình di sản và Lễ trao Giải thưởng thường niên.",
    bannerUrl:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&h=600&q=85",
    sessions: [
      {
        id: "sess_1",
        order: 1,
        time: "08:30 – 11:30",
        date: "Sáng 15/11/2026",
        title: "Chiến lược Quốc gia về Kinh tế Di sản: Thể chế & Cơ chế PPP",
        subTitle: "Phiên Toàn Thể Cấp Cao • Đại sảnh Thăng Long",
        description:
          "Báo cáo toàn cảnh Kinh tế Di sản Việt Nam 2026, hoàn thiện thể chế chính sách, tháo gỡ rào cản pháp lý và cơ chế thử nghiệm tài chính (Sandbox) để thu hút vốn tư nhân thông qua hợp tác công - tư (PPP).",
        room: "Đại sảnh Thăng Long (Hội trường A)",
        chairperson: "GS.TS. Trần Quốc Vượng & Lãnh đạo Bộ VHTTDL",
        speakers: [
          {
            id: "sp_vuong",
            name: "GS.TS. Trần Quốc Vượng",
            degree: "GS.TS",
            title: "Chủ tịch Hội đồng Diễn đàn",
            organization: "Hội Di sản Văn hóa Việt Nam / Nguyên Viện trưởng Viện Khảo cổ học",
            avatarUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=750&q=80",
            bio: "Nhà khoa học hàng đầu với hơn 40 năm nghiên cứu lịch sử văn hóa và khảo cổ học di sản Việt Nam.",
            sessionTitle: "Phiên Toàn Thể",
            topicSummary:
              "Chiến lược chuyển hóa nguồn lực di sản thành động lực tăng trưởng kinh tế bền vững.",
            slug: "gs-ts-tran-quoc-vuong",
          },
          {
            id: "sp_lam",
            name: "TS. Lê Hồng Lam",
            degree: "TS",
            title: "Phó Vụ trưởng Vụ Kế hoạch & Tài chính",
            organization: "Bộ Văn hóa, Thể thao và Du lịch",
            avatarUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=750&q=80",
            bio: "Chuyên gia tham mưu xây dựng cơ chế tài chính thử nghiệm và nguồn vốn xã hội hóa cho các dự án di tích.",
            sessionTitle: "Phiên Toàn Thể",
            topicSummary:
              "Cơ chế chính sách đột phá nhằm huy động nguồn vốn đầu tư công - tư vào trùng tu di tích.",
            slug: "ts-le-hong-lam",
          },
        ],
      },
      {
        id: "sess_2",
        order: 2,
        time: "14:00 – 17:00",
        date: "Chiều 15/11/2026",
        title: "Bảo tồn Thích ứng & Kinh tế Đô thị Di sản: Bài học từ Hà Nội & Hội An",
        subTitle: "Phiên Chuyên Đề 1 • Phòng Hội thảo Quốc tế",
        description:
          "Thực chứng các mô hình tái thiết không gian lịch sử, dung hòa áp lực phát triển đô thị với việc bảo tồn tính xác thực của di sản kiến trúc tại các trung tâm đô thị di sản tiêu biểu.",
        room: "Phòng Hội thảo Quốc tế (Phòng B1)",
        chairperson: "KTS. Hoàng Thúc Hào & Chuyên gia UNESCO",
        speakers: [
          {
            id: "sp_hao",
            name: "KTS. Hoàng Thúc Hào",
            degree: "KTS",
            title: "Phó Chủ tịch Hội Kiến trúc sư Việt Nam",
            organization: "Hội Kiến trúc sư Việt Nam / Văn phòng 1+1>2",
            avatarUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=750&q=80",
            bio: "Kiến trúc sư tiên phong phong trào 'Kiến trúc Hạnh phúc', nhận Giải thưởng Kiến trúc Quốc tế danh giá.",
            sessionTitle: "Phiên Chuyên Đề 1",
            topicSummary:
              "Bảo tồn thích ứng không gian đô thị di sản và tạo lập hệ sinh thái cộng đồng bền vững.",
            slug: "kts-hoang-thuc-hao",
          },
          {
            id: "sp_henderson",
            name: "Bà Elizabeth Henderson",
            degree: "ThS",
            title: "Chuyên gia Di sản Văn hóa & Bền vững",
            organization: "Văn phòng UNESCO khu vực Châu Á – Thái Bình Dương",
            avatarUrl:
              "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&h=750&q=80",
            bio: "Hơn 20 năm kinh nghiệm quốc tế về bảo tồn di sản thế giới và điều tiết rủi ro du lịch đại chúng.",
            sessionTitle: "Phiên Chuyên Đề 1",
            topicSummary:
              "Kinh nghiệm quốc tế cân bằng giữa tăng trưởng du lịch và bảo toàn hồn cốt di sản.",
            slug: "elizabeth-henderson",
          },
        ],
      },
      {
        id: "sess_3",
        order: 3,
        time: "08:30 – 11:30",
        date: "Sáng 16/11/2026",
        title: "Chuyển Đổi Số, Công Nghệ 3D & Thị Trường Tài Sản Di Sản Văn Hóa",
        subTitle: "Phiên Chuyên Đề 2 • Phòng Công Nghệ Số",
        description:
          "Ứng dụng thực tế của công nghệ quét 3D Laser, thực tế ảo (VR/AR), AI và công nghệ định danh số để bảo tồn nguyên vẹn tư liệu và thương mại hóa sản phẩm sáng tạo di sản.",
        room: "Phòng Công Nghệ Số (Phòng B2)",
        chairperson: "PGS.TS. Đặng Hoàng Lan & Đại diện Tech Corp",
        speakers: [
          {
            id: "sp_lan",
            name: "PGS.TS. Đặng Hoàng Lan",
            degree: "PGS.TS",
            title: "Phó Chủ tịch Hội đồng Phụ trách Khoa học",
            organization: "Trường Khoa học Liên ngành & Nghệ thuật, ĐHQGHN",
            avatarUrl:
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=80",
            bio: "Chuyên gia đầu ngành về quản lý văn hóa, kinh tế sáng tạo và các chuỗi giá trị di sản đương đại.",
            sessionTitle: "Phiên Chuyên Đề 2",
            topicSummary:
              "Chuyển đổi số dữ liệu di sản và phát triển công nghiệp văn hóa trong nền kinh tế số.",
            slug: "pgs-ts-dang-hoang-lan",
          },
          {
            id: "sp_thinh",
            name: "GS.TS. Nguyễn Văn Thịnh",
            degree: "GS.TS",
            title: "Chủ tịch Hội đồng Khoa học",
            organization: "Viện Nghiên cứu Kinh tế Di sản & Phát triển Bền vững",
            avatarUrl:
              "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&h=750&q=80",
            bio: "Chuyên gia hàng đầu trong phương pháp lượng hóa kinh tế học di sản và định giá tài sản văn hóa.",
            sessionTitle: "Phiên Chuyên Đề 2",
            topicSummary:
              "Định giá tài sản văn hóa phi vật thể và mô hình tài chính số hóa di sản.",
            slug: "gs-ts-nguyen-van-thinh",
          },
        ],
      },
      {
        id: "sess_4",
        order: 4,
        time: "14:00 – 17:00",
        date: "Chiều 16/11/2026",
        title: "Doanh Nghiệp & Cộng Đồng: Chuỗi Giá Trị Thủ Công Mỹ Nghệ & Sinh Kế Bản Địa",
        subTitle: "Phiên Bàn Tròn Doanh Nghiệp • Hội trường Đổi Mới",
        description:
          "Đối thoại công - tư về việc kết nối các làng nghề cổ truyền với chuỗi cung ứng toàn cầu, giải bài toán thương mại điện tử, bảo vệ sở hữu trí tuệ và nâng cao thu nhập cho nghệ nhân bản địa.",
        room: "Hội trường Bàn Tròn Đổi Mới (Phòng C)",
        chairperson: "TS. Nguyễn Thị Thu Hà & Lãnh đạo Hiệp hội Làng nghề",
        speakers: [
          {
            id: "sp_ha",
            name: "TS. Nguyễn Thị Thu Hà",
            degree: "TS",
            title: "Ủy viên Hội đồng Chuyên trách",
            organization: "Viện Văn hóa Nghệ thuật Quốc gia Việt Nam (VICAS)",
            avatarUrl:
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=750&q=80",
            bio: "Chủ nhiệm nhiều đề án cấp quốc gia về chính sách phát triển làng nghề thủ công và kinh tế sáng tạo.",
            sessionTitle: "Phiên Bàn Tròn",
            topicSummary:
              "Mô hình hợp tác xã nghệ nhân và chuỗi giá trị du lịch nông thôn bản địa.",
            slug: "ts-nguyen-thi-thu-ha",
          },
          {
            id: "sp_vinh",
            name: "ThS. Lê Quốc Vinh",
            degree: "ThS",
            title: "Ủy viên Hội đồng Phụ trách Truyền thông",
            organization: "Tập đoàn Truyền thông Lê Bros",
            avatarUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=750&q=80",
            bio: "Chuyên gia hàng đầu trong chiến lược thương hiệu, định vị và xúc tiến truyền thông di sản ra quốc tế.",
            sessionTitle: "Phiên Bàn Tròn",
            topicSummary:
              "Chiến lược định vị thương hiệu và truyền thông di sản văn hóa Việt Nam ra thế giới.",
            slug: "ths-le-quoc-vinh",
          },
        ],
      },
    ],
    attendeesExpected: 500,
    registrationDeadline: "05/11/2026",
    registrationUrl: "/contact?loai=tham-du#contact-form",
  },

  award: {
    badge: "GIẢI THƯỞNG THƯỜNG NIÊN HEF",
    awardName: "Giải Thưởng Phát Triển Bền Vững Chủ Động",
    subtitle: "Vinh danh những sáng kiến cân bằng di sản và kinh tế vì cộng đồng",
    description:
      "Giải thưởng quốc gia tôn vinh các tổ chức, doanh nghiệp, kiến trúc sư và cộng đồng địa phương có giải pháp bảo tồn nguyên bản kết hợp khai thác kinh tế sáng tạo, tạo sinh kế bền vững và giảm thiểu rủi ro thương mại hóa thô bạo.",
    criteria: [
      "Tính nguyên bản và đạo đức trong bảo tồn di sản",
      "Hiệu quả kinh tế tạo ra và tỷ lệ đóng góp quỹ trùng tu",
      "Tác động xã hội và việc làm bền vững cho người dân địa phương",
      "Tính đổi mới sáng tạo, chuyển đổi số và khả năng nhân rộng",
    ],
    nominationDeadline: "30/10/2026",
    regulationsUrl: "/awards",
    nominationUrl: "/contact?loai=giai-thuong#contact-form",
    bannerUrl:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&h=650&q=85",
  },

  featuredProjects: [
    {
      id: "proj_hanoi_citadel",
      name: "Tái cấu trúc Không gian Di sản Hoàng thành Thăng Long",
      slug: "hoang-thanh-thang-long",
      location: "Hà Nội",
      category: "Bảo tồn Thích ứng & Kinh tế Đêm",
      description:
        "Mô hình tour đêm 'Giải mã Hoàng thành Thăng Long' kết hợp công nghệ trình chiếu 3D mapping và nghệ thuật dân gian, tạo nguồn thu trực tiếp tái đầu tư khảo cổ.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&h=400&q=80",
      annualRevenue: "35 tỷ VNĐ/năm",
      jobsCreated: 240,
      conservationShare: "40% doanh thu tái đầu tư bảo tồn",
    },
    {
      id: "proj_hoian_ancient",
      name: "Quản trị Du lịch Di sản Bền vững Đô thị Cổ Hội An",
      slug: "do-thi-co-hoi-an",
      location: "Quảng Nam",
      category: "Sinh kế Bản địa & Du lịch Trách nhiệm",
      description:
        "Chia sẻ lợi ích trực tiếp cho các hộ dân giữ gìn nhà cổ, phân luồng khách tham quan thông minh và bảo tồn nghề truyền thống may đo, đèn lồng.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&h=400&q=80",
      annualRevenue: "120 tỷ VNĐ/năm",
      jobsCreated: 1850,
      conservationShare: "65% ngân sách trích lập quỹ bảo tồn",
    },
    {
      id: "proj_battrang_ceramic",
      name: "Làng gốm Bát Tràng: Chuỗi Giá trị Sáng tạo & Số hóa Lò Bầu Cổ",
      slug: "lang-gom-bat-trang",
      location: "Gia Lâm, Hà Nội",
      category: "Công nghiệp Văn hóa & Làng nghề",
      description:
        "Bảo tồn hệ thống lò bầu cổ thế kỷ XIX kết hợp trung tâm tinh hoa làng nghề, đưa sản phẩm gốm truyền thống lên sàn thương mại quốc tế.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&h=400&q=80",
      annualRevenue: "85 tỷ VNĐ/năm",
      jobsCreated: 920,
      conservationShare: "30% lợi nhuận vào quỹ nghệ nhân trẻ",
    },
  ],

  featuredNews: [
    {
      id: "news_feat_1",
      title:
        "Công bố Khung Hướng Dẫn Quốc Gia Về Đầu Tư Theo Phương Thức PPP Trong Bảo Tồn Di Sản Kiến Trúc",
      slug: "cong-bo-khung-huong-dan-ppp-di-san",
      category: "CHÍNH SÁCH & THỂ CHẾ",
      publishedAt: "04/11/2026 08:30:00",
      author: "Hội đồng Khoa học HEF",
      summary:
        "Văn kiện quan trọng tháo gỡ nút thắt về vốn và cơ chế chuyển nhượng quyền khai thác dịch vụ di sản có thời hạn, bảo đảm quyền giám sát của nhà nước và cộng đồng.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=500&q=80",
      isFeatured: true,
    },
  ],

  latestNews: [
    {
      id: "news_lat_1",
      title: "UNESCO Đánh Giá Cao Mô Hình Kinh Tế Sinh Kế Tại Quần Thể Danh Thắng Tràng An",
      slug: "unesco-danh-gia-cao-mo-hinh-trang-an",
      category: "QUỐC TẾ & LIÊN KẾT",
      publishedAt: "03/11/2026 14:15:00",
      author: "Ban Thư ký",
      summary:
        "Hơn 10.000 người dân vùng lõi di sản được đào tạo và làm việc trực tiếp trong ngành dịch vụ sinh thái.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=260&q=80",
    },
    {
      id: "news_lat_2",
      title: "Họp Báo Khởi Động Chuỗi Tọa Đàm 'Kinh Tế Sáng Tạo Từ Di Sản Thủ Công Mỹ Nghệ'",
      slug: "hop-bao-khoi-dong-toa-dam-thu-cong",
      category: "SỰ KIỆN & TỌA ĐÀM",
      publishedAt: "02/11/2026 10:00:00",
      author: "Nhóm Truyền thông",
      summary:
        "Quy tụ 20 nghệ nhân tiêu biểu và các nhà thiết kế trẻ đương đại cùng giải bài toán thương mại hóa bản sắc.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&h=260&q=80",
    },
    {
      id: "news_lat_3",
      title: "Ứng Dụng Bản Đồ Số Di Sản GIS Phục Vụ Quy Hoạch Và Thu Hút Đầu Tư Du Lịch",
      slug: "ung-dung-ban-do-so-gis-di-san",
      category: "CÔNG NGHỆ SỐ",
      publishedAt: "01/11/2026 16:45:00",
      author: "Nhóm Dự án",
      summary:
        "Số hóa hơn 3.000 điểm di tích xếp hạng cấp quốc gia trên nền tảng bản đồ số tương tác mở.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=400&h=260&q=80",
    },
    {
      id: "news_lat_4",
      title: "Chính Sách Khuyến Khích Doanh Nghiệp Tư Nhân Đầu Tư Vào Không Gian Di Sản",
      slug: "chinh-sach-khuyen-khich-doanh-nghiep-di-san",
      category: "CHÍNH SÁCH",
      publishedAt: "31/10/2026 09:30:00",
      author: "Hội đồng Khoa học",
      summary:
        "Hoàn thiện hành lang pháp lý về hợp tác công tư (PPP) trong bảo tồn và khai thác giá trị di tích lịch sử.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&h=260&q=80",
    },
  ],

  partners: [
    {
      id: "p_1",
      name: "Bộ Văn hóa, Thể thao và Du lịch",
      shortName: "BVHTTDL",
      category: "STEERING",
      categoryLabel: "Cơ quan Chỉ đạo",
      logoUrl: "/images/partners/bvhttdl.png",
      websiteUrl: "https://bvhttdl.gov.vn",
      order: 1,
    },
    {
      id: "p_2",
      name: "Hội Di sản Văn hóa Việt Nam",
      shortName: "VCHA",
      category: "HOSTING",
      categoryLabel: "Cơ quan Chủ trì",
      logoUrl: "/images/partners/vcha.png",
      websiteUrl: "https://hoidisan.vn",
      order: 2,
    },
    {
      id: "p_3",
      name: "Ủy ban Nhân dân Thành phố Hà Nội",
      shortName: "UBND TP Hà Nội",
      category: "HOSTING",
      categoryLabel: "Đồng Chủ trì & Đăng cai",
      logoUrl: "/images/partners/hanoi.png",
      websiteUrl: "https://hanoi.gov.vn",
      order: 3,
    },
    {
      id: "p_4",
      name: "Viện Nghiên cứu Kinh tế Di sản",
      shortName: "HEI",
      category: "ORGANIZING",
      categoryLabel: "Đơn vị Thường trực Tổ chức",
      logoUrl: "/images/partners/hei.png",
      websiteUrl: "https://hef.vn",
      order: 4,
    },
    {
      id: "p_5",
      name: "Đại học Quốc gia Hà Nội",
      shortName: "VNU",
      category: "COMPANION",
      categoryLabel: "Đối tác Học thuật & Phản biện",
      logoUrl: "/images/partners/vnu.png",
      websiteUrl: "https://vnu.edu.vn",
      order: 5,
    },
    {
      id: "p_6",
      name: "Tập đoàn Sovico",
      shortName: "Sovico Group",
      category: "STRATEGIC",
      categoryLabel: "Nhà Tài trợ Chiến lược",
      logoUrl: "/images/partners/sovico.png",
      websiteUrl: "https://sovicogroup.com",
      order: 6,
    },
    {
      id: "p_7",
      name: "Tập đoàn Vingroup",
      shortName: "Quỹ Thiện Tâm",
      category: "STRATEGIC",
      categoryLabel: "Nhà Tài trợ Chiến lược",
      logoUrl: "/images/partners/vingroup.png",
      websiteUrl: "https://vingroup.net",
      order: 7,
    },
    {
      id: "p_8",
      name: "Văn phòng UNESCO tại Hà Nội",
      shortName: "UNESCO Hanoi",
      category: "COMPANION",
      categoryLabel: "Đối tác Đồng hành Quốc tế",
      logoUrl: "/images/partners/unesco.png",
      websiteUrl: "https://unesco.org",
      order: 8,
    },
    {
      id: "p_9",
      name: "Đài Truyền hình Việt Nam",
      shortName: "VTV",
      category: "MEDIA",
      categoryLabel: "Bảo trợ Truyền hình",
      logoUrl: "/images/partners/vtv.png",
      websiteUrl: "https://vtv.vn",
      order: 9,
    },
    {
      id: "p_10",
      name: "Báo Nhân Dân",
      shortName: "Báo Nhân Dân",
      category: "MEDIA",
      categoryLabel: "Bảo trợ Báo chí Chính trị",
      logoUrl: "/images/partners/nhandan.png",
      websiteUrl: "https://nhandan.vn",
      order: 10,
    },
  ],

  lastUpdated: "04/11/2026 09:00:00",
};

export class HomeRepository implements IHomeRepository {
  async getHomePageData(): Promise<HomePageData> {
    try {
      const page = await pageRepository.findBySlug("home");
      if (page && page.sections && page.sections.length > 0) {
        // Tìm các Section theo type
        const heroSec = page.sections.find((s) => s.type === "HOME_HERO" || s.type === "HERO");
        const pillarsSec = page.sections.find((s) => s.type === "HOME_INTRO_PILLARS" || s.type === "PILLARS_5");
        const eventSec = page.sections.find((s) => s.type === "HOME_EVENT_HIGHLIGHT" || s.type === "EVENT_HIGHLIGHT");
        const awardsSec = page.sections.find((s) => s.type === "HOME_AWARDS_SHOWCASE" || s.type === "AWARDS_SHOWCASE");
        const projectsSec = page.sections.find((s) => s.type === "HOME_FEATURED_PROJECTS" || s.type === "PROJECT_GRID");
        const newsSec = page.sections.find((s) => s.type === "HOME_NEWS_FEED" || s.type === "NEWS_FEED");
        const partnersSec = page.sections.find((s) => s.type === "HOME_PARTNERS_SLIDER" || s.type === "PARTNERS_SLIDER");

        const heroProps = heroSec?.props as Record<string, unknown> | undefined;
        const pillarsProps = pillarsSec?.props as Record<string, unknown> | undefined;
        const eventProps = eventSec?.props as Record<string, unknown> | undefined;
        const awardsProps = awardsSec?.props as Record<string, unknown> | undefined;
        const projectsProps = projectsSec?.props as Record<string, unknown> | undefined;
        const newsProps = newsSec?.props as Record<string, unknown> | undefined;
        const partnersProps = partnersSec?.props as Record<string, unknown> | undefined;

        return {
          hero: (heroProps as unknown as HomePageData["hero"]) || fallbackHomePageData.hero,
          quickIntro:
            (pillarsProps?.quickIntro as unknown as HomePageData["quickIntro"]) ||
            fallbackHomePageData.quickIntro,
          pillars:
            (pillarsProps?.pillars as unknown as HomePageData["pillars"]) ||
            fallbackHomePageData.pillars,
          activeEvent:
            (eventProps as unknown as HomePageData["activeEvent"]) ||
            fallbackHomePageData.activeEvent,
          award:
            (awardsProps as unknown as HomePageData["award"]) ||
            fallbackHomePageData.award,
          featuredProjects:
            (projectsProps?.featuredProjects as unknown as HomePageData["featuredProjects"]) ||
            fallbackHomePageData.featuredProjects,
          featuredNews:
            (newsProps?.featuredNews as unknown as HomePageData["featuredNews"]) ||
            fallbackHomePageData.featuredNews,
          latestNews:
            (newsProps?.latestNews as unknown as HomePageData["latestNews"]) ||
            fallbackHomePageData.latestNews,
          partners:
            (partnersProps?.partners as unknown as HomePageData["partners"]) ||
            fallbackHomePageData.partners,
          lastUpdated: page.updatedAt || fallbackHomePageData.lastUpdated,
        };
      }
      return fallbackHomePageData;
    } catch (error) {
      console.warn("[HomeRepository] Fallback to in-memory home data:", error);
      return fallbackHomePageData;
    }
  }

  async getActiveEvent(): Promise<EventHighlight> {
    const data = await this.getHomePageData();
    return data.activeEvent || fallbackHomePageData.activeEvent;
  }

  async getFeaturedProjects(): Promise<FeaturedProject[]> {
    const data = await this.getHomePageData();
    return data.featuredProjects || fallbackHomePageData.featuredProjects;
  }

  async getNewsFeed(): Promise<{ featured: NewsArticle; latest: NewsArticle[] }> {
    const data = await this.getHomePageData();
    return {
      featured: data.featuredNews[0] || fallbackHomePageData.featuredNews[0],
      latest: data.latestNews || fallbackHomePageData.latestNews,
    };
  }
}

export const homeRepository = new HomeRepository();
