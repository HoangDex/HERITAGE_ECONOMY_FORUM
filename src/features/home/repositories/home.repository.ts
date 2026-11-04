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
      href: "/lien-he?loai=tham-du",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&h=750&q=85",
    imageAlt: "Quần thể di sản văn hóa Việt Nam - Di sản kiến tạo giá trị phát triển bền vững",
    badgeText: "NỀN TẢNG ĐỐI THOẠI & KẾT NỐI QUỐC GIA",
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
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&h=600&q=85",
    sessions: [
      {
        id: "sess_1",
        time: "Phiên Toàn Thể • Sáng 15/11",
        title: "Chiến lược Quốc gia về Kinh tế Di sản: Thể chế & Cơ chế PPP",
        chairperson: "GS.TS. Trần Quốc Vượng & Lãnh đạo Bộ VHTTDL",
      },
      {
        id: "sess_2",
        time: "Phiên Chuyên Đề 1 • Chiều 15/11",
        title: "Bảo tồn Thích ứng & Kinh tế Đô thị Di sản: Bài học từ Hà Nội & Hội An",
        chairperson: "KTS. Hoàng Thúc Hào & Chuyên gia UNESCO",
      },
      {
        id: "sess_3",
        time: "Phiên Chuyên Đề 2 • Sáng 16/11",
        title: "Chuyển Đổi Số, Công Nghệ 3D & Thị Trường Tài Sản Di Sản Văn Hóa",
        chairperson: "PGS.TS. Đặng Hoàng Lan & Đại diện Tech Corp",
      },
      {
        id: "sess_4",
        time: "Phiên Bàn Tròn • Chiều 16/11",
        title: "Doanh Nghiệp & Cộng Đồng: Chuỗi Giá Trị Thủ Công Mỹ Nghệ & Sinh Kế Bản Địa",
        chairperson: "TS. Nguyễn Thị Thu Hà & Lãnh đạo Hiệp hội Làng nghề",
      },
    ],
    attendeesExpected: 500,
    registrationDeadline: "05/11/2026",
    registrationUrl: "/lien-he?loai=tham-du",
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
    regulationsUrl: "/giai-thuong",
    nominationUrl: "/giai-thuong#de-cu",
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
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&h=400&q=80",
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
  ],

  partners: [
    {
      id: "p_1",
      name: "Bộ Văn hóa, Thể thao và Du lịch",
      category: "STEERING",
      categoryLabel: "Cơ quan Chỉ đạo",
      logoUrl: "/images/partners/bvhttdl.svg",
      websiteUrl: "https://bvhttdl.gov.vn",
      order: 1,
    },
    {
      id: "p_2",
      name: "Hội Di sản Văn hóa Việt Nam",
      category: "HOSTING",
      categoryLabel: "Cơ quan Chủ trì",
      logoUrl: "/images/partners/vcha.svg",
      websiteUrl: "https://hoidisan.vn",
      order: 2,
    },
    {
      id: "p_3",
      name: "Viện Nghiên cứu Kinh tế Di sản",
      category: "ORGANIZING",
      categoryLabel: "Đơn vị Tổ chức",
      logoUrl: "/images/partners/hei.svg",
      websiteUrl: "https://hef.vn",
      order: 3,
    },
    {
      id: "p_4",
      name: "Văn phòng UNESCO tại Hà Nội",
      category: "COMPANION",
      categoryLabel: "Đối tác Đồng hành",
      logoUrl: "/images/partners/unesco.svg",
      websiteUrl: "https://unesco.org",
      order: 4,
    },
    {
      id: "p_5",
      name: "Tập đoàn Sovico",
      category: "STRATEGIC",
      categoryLabel: "Đối tác Chiến lược",
      logoUrl: "/images/partners/sovico.svg",
      websiteUrl: "https://sovicogroup.com",
      order: 5,
    },
    {
      id: "p_6",
      name: "Đài Truyền hình Việt Nam (VTV)",
      category: "MEDIA",
      categoryLabel: "Bảo trợ Truyền thông",
      logoUrl: "/images/partners/vtv.svg",
      websiteUrl: "https://vtv.vn",
      order: 6,
    },
  ],

  lastUpdated: "04/11/2026 09:00:00",
};

export class HomeRepository implements IHomeRepository {
  async getHomePageData(): Promise<HomePageData> {
    try {
      return fallbackHomePageData;
    } catch (error) {
      console.warn("[HomeRepository] Fallback to in-memory home data:", error);
      return fallbackHomePageData;
    }
  }

  async getActiveEvent(): Promise<EventHighlight> {
    return fallbackHomePageData.activeEvent;
  }

  async getFeaturedProjects(): Promise<FeaturedProject[]> {
    return fallbackHomePageData.featuredProjects;
  }

  async getNewsFeed(): Promise<{ featured: NewsArticle; latest: NewsArticle[] }> {
    return {
      featured: fallbackHomePageData.featuredNews[0],
      latest: fallbackHomePageData.latestNews,
    };
  }
}

export const homeRepository = new HomeRepository();
