/**
 * DỮ LIỆU SECTIONS MẶC ĐỊNH CHO TRANG CHỦ (HOME - 8 SECTIONS)
 * Tách biệt thành file riêng để đảm bảo tính module và rõ ràng nghiệp vụ.
 */

import type { AnyHomeSectionDTO } from "../../schemas/sections/home-sections.schema";

export const DEFAULT_HOME_SECTIONS: AnyHomeSectionDTO[] = [
  {
    id: "sec_home_hero",
    type: "HOME_HERO",
    title: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
    subtitle: "HERITAGE ECONOMY FORUM",
    order: 1,
    isVisible: true,
    props: {
      title: "HERITAGE ECONOMY FORUM",
      vietnameseTitle: "DIỄN ĐÀN KINH TẾ DI SẢN",
      slogan: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
      description:
        "Diễn đàn kết nối tri thức, nguồn lực và sáng kiến để phát huy giá trị di sản, thúc đẩy kinh tế sáng tạo và phát triển bền vững.",
      primaryCta: {
        label: "Khám phá diễn đàn",
        href: "/dien-dan",
      },
      secondaryCta: {
        label: "Đăng ký tham dự",
        href: "/lien-he?loai=tham-du#contact-form",
      },
      imageUrl:
        "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&h=750&q=85",
      imageAlt: "Quần thể di sản văn hóa Việt Nam - Di sản kiến tạo giá trị phát triển bền vững",
      badgeText: "NỀN TẢNG ĐỐI THOẠI & KẾT NỐI QUỐC GIA",
      videoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/be/Ha_Long_Bay%2C_Vietnam_-_Dec_2024.webm/Ha_Long_Bay%2C_Vietnam_-_Dec_2024.webm.1080p.vp9.webm",
      videoTitle: "Video nền: Non nước Di sản",
      locationBadge: "Hoàng thành Thăng Long, Hà Nội",
      editionBadge: "Kỳ 2026",
      metrics: [
        { value: 500, suffix: "+", label: "Đại biểu dự kiến" },
        { value: 4, prefix: "0", label: "Phiên chuyên đề" },
        { value: 30, suffix: "+", label: "Mô hình di sản" },
      ],
    },
  },
  {
    id: "sec_home_pillars",
    type: "HOME_INTRO_PILLARS",
    title: "05 Trụ Cột Hoạt Động & Giới Thiệu Nhanh",
    subtitle: "Định hướng chiến lược dài hạn của Diễn đàn",
    order: 2,
    isVisible: true,
    props: {
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
    },
  },
  {
    id: "sec_home_event",
    type: "HOME_EVENT_HIGHLIGHT",
    title: "Kỳ Diễn Đàn Nổi Bật 2026",
    subtitle: "Không gian hội tụ các nhà khoa học, nhà quản lý và doanh nghiệp",
    order: 3,
    isVisible: true,
    props: {
      id: "event_hef_2026",
      edition: "Kỳ Diễn Đàn Thường Niên 2026",
      statusBadge: "ĐANG MỞ ĐĂNG KÝ ĐẠI BIỂU",
      title: "Kinh Tế Di Sản Trong Kỷ Nguyên Số: Thể Chế, Nguồn Lực & Mô Hình Đột Phá",
      theme:
        "Tập trung nhận diện giá trị kinh tế của di sản kiến trúc đô thị, công nghiệp văn hóa và phương thức huy động vốn tư nhân vào bảo tồn thích ứng.",
      dates: "15 – 17 tháng 11 năm 2026",
      location: "Trung tâm Hội nghị Quốc tế & Hoàng thành Thăng Long, Thủ đô Hà Nội",
      description:
        "Quy tụ hơn 500 đại biểu là lãnh đạo các bộ ban ngành, đại sứ quán, tổ chức quốc tế (UNESCO, ICOMOS), chuyên gia kinh tế, các nhà nghiên cứu và lãnh đạo hiệp hội doanh nghiệp toàn quốc.",
      bannerUrl:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&h=650&q=80",
      attendeesExpected: 500,
      registrationDeadline: "10/11/2026",
      registrationUrl: "/contact?loai=tham-du#contact-form",
      sessions: [
        {
          id: "ses_plenary",
          order: 1,
          time: "08:00 - 11:30 | 15/11/2026",
          title: "Phiên Toàn Thể: Định Vị Kinh Tế Di Sản Trong Chiến Lược Quốc Gia",
          description:
            "Công bố báo cáo thường niên về đóng góp kinh tế của di sản văn hóa vào GDP và đề xuất khung chính sách đặc thù.",
          room: "Đại sảnh Hội nghị Thăng Long",
          chairperson: "GS.TS. Trần Quốc Vượng",
          imageUrl:
            "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80",
        },
        {
          id: "ses_topic_1",
          order: 2,
          time: "13:30 - 17:00 | 15/11/2026",
          title: "Chuyên Đề 1: Đối Tác Công Tư (PPP) Trong Bảo Tồn Thích Ứng",
          description:
            "Kinh nghiệm quốc tế và giải pháp tháo gỡ cơ chế đầu tư tư nhân vào hạ tầng di tích và công nghiệp văn hóa sáng tạo.",
          room: "Phòng Hội thảo Quốc tế A",
          chairperson: "PGS.TS. Đặng Hoàng Lan",
          imageUrl:
            "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
        },
        {
          id: "ses_topic_2",
          order: 3,
          time: "08:30 - 12:00 | 16/11/2026",
          title: "Chuyên Đề 2: Chuyển Đổi Số & Số Hóa 3D/VR Di Sản",
          description:
            "Ứng dụng công nghệ bản sao số (Digital Twin), trí tuệ nhân tạo và bảo tàng ảo trong nâng cao trải nghiệm giáo dục và du lịch.",
          room: "Phòng Hội thảo B",
          chairperson: "KTS. Lê Hoàng Phương",
          imageUrl:
            "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
        },
        {
          id: "ses_topic_3",
          order: 4,
          time: "14:00 - 17:30 | 16/11/2026",
          title: "Chuyên Đề 3: Sinh Kế Cộng Đồng & Kinh Tế Làng Nghề Truyền Thống",
          description:
            "Xây dựng chuỗi giá trị bền vững cho nghệ nhân, doanh nghiệp bản địa và bảo vệ bản quyền tri thức bản địa.",
          room: "Phòng Hội thảo C",
          chairperson: "TS. Nguyễn Thị Bích Liên",
          imageUrl:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    },
  },
  {
    id: "sec_home_awards",
    type: "HOME_AWARDS_SHOWCASE",
    title: "Giải Thưởng Phát Triển Bền Vững Chủ Động",
    subtitle: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
    order: 4,
    isVisible: true,
    props: {
      badge: "GIẢI THƯỞNG QUỐC GIA 2026",
      awardName: "Giải Thưởng Phát Triển Bền Vững Chủ Động",
      subtitle: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
      description:
        "Hệ thống giải thưởng tôn vinh các tổ chức, doanh nghiệp, cộng đồng và cá nhân có sáng kiến xuất sắc trong bảo tồn di sản gắn liền phát triển kinh tế tuần hoàn, tạo sinh kế công bằng và bảo vệ môi trường.",
      criteria: [
        "Tính xác thực, tôn trọng nguyên bản và chiều sâu lịch sử văn hóa",
        "Hiệu quả kinh tế tuần hoàn và năng lực tự chủ tài chính cho công tác duy tu",
        "Mức độ tạo sinh kế và hưởng lợi trực tiếp của cộng đồng người dân sở tại",
        "Ứng dụng sáng tạo chuyển đổi số, vật liệu thân thiện và giải pháp xanh",
      ],
      nominationDeadline: "15/10/2026",
      regulationsUrl: "/giai-thuong",
      nominationUrl: "/lien-he?loai=giai-thuong#contact-form",
      bannerUrl:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&h=650&q=80",
    },
  },
  {
    id: "sec_home_projects",
    type: "HOME_FEATURED_PROJECTS",
    title: "Mô Hình & Sáng Kiến Điển Hình",
    subtitle: "Các dự án cân bằng giữa giữ gìn bản sắc và tạo sinh kế cộng đồng",
    order: 5,
    isVisible: true,
    props: {
      title: "Mô Hình & Sáng Kiến Điển Hình",
      subtitle: "Các dự án cân bằng giữa giữ gìn bản sắc và tạo sinh kế cộng đồng",
      projects: [
        {
          id: "proj_pho_co_hoi_an",
          name: "Bảo Tồn Thích Ứng Kiến Trúc Gỗ Phố Cổ Hội An",
          slug: "bao-ton-thich-ung-kien-truc-go-pho-co-hoi-an",
          location: "Thành phố Hội An, Tỉnh Quảng Nam",
          category: "Di sản Kiến trúc Đô thị",
          description:
            "Mô hình đối tác công tư kết hợp cộng đồng trong việc trùng tu nhà cổ, khai thác du lịch trải nghiệm cao cấp và chia sẻ lợi ích với gia chủ.",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&h=520&q=80",
          annualRevenue: "48,5 tỷ VNĐ",
          jobsCreated: 320,
          conservationShare: "15% doanh thu vé",
        },
        {
          id: "proj_trang_an_ninh_binh",
          name: "Mô Hình Sinh Kế Cộng Đồng Quần Thể Tràng An",
          slug: "mo-hinh-sinh-ke-cong-dong-quan-the-trang-an",
          location: "Tỉnh Ninh Bình",
          category: "Di sản Kép (Thiên nhiên & Văn hóa)",
          description:
            "Chuyển đổi nghề nghiệp cho hơn 2.000 nông dân thành người chèo đò di sản kiêm đại sứ văn hóa, tạo chuỗi giá trị dịch vụ sinh thái bền vững.",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&h=520&q=80",
          annualRevenue: "180 tỷ VNĐ",
          jobsCreated: 2400,
          conservationShare: "Tài trợ 100% tái tạo cảnh quan",
        },
        {
          id: "proj_lang_nghe_bat_trang",
          name: "Số Hóa & Chuỗi Cung Ứng Làng Gốm Bát Tràng",
          slug: "so-hoa-va-chuoi-cung-ung-lang-gom-bat-trang",
          location: "Gia Lâm, Hà Nội",
          category: "Di sản Làng nghề Thủ công",
          description:
            "Ứng dụng thương mại điện tử xuyên biên giới, bảo tàng số tương tác và chuẩn hóa quy trình xuất khẩu cho các nghệ nhân gốm truyền thống.",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&h=520&q=80",
          annualRevenue: "92 tỷ VNĐ",
          jobsCreated: 850,
          conservationShare: "Thành lập Quỹ ươm mầm nghệ nhân",
        },
      ],
      viewAllLink: "/du-an",
    },
  },
  {
    id: "sec_home_news",
    type: "HOME_NEWS_FEED",
    title: "Tin Tức & Góc Chuyên Gia",
    subtitle: "Thông tin hoạt động, nghiên cứu và quan điểm chính sách",
    order: 6,
    isVisible: true,
    props: {
      title: "Tin Tức & Góc Chuyên Gia",
      subtitle: "Thông tin hoạt động, nghiên cứu và quan điểm chính sách",
      featuredNews: {
        id: "news_1",
        title:
          "Khung Thể Chế Đối Tác Công Tư (PPP) Trong Bảo Tồn Di Sản: Cơ Hội Cho Doanh Nghiệp Trách Nhiệm",
        slug: "khung-the-che-doi-tac-cong-tu-ppp-trong-bao-ton-di-san",
        category: "Chính Sách & Thể Chế",
        publishedAt: "02/11/2026",
        author: "GS.TS. Trần Quốc Vượng",
        summary:
          "Bảo tồn di sản không thể chỉ dựa vào ngân sách nhà nước hạn hẹp. Cần một hành lang pháp lý minh bạch cho các hợp đồng PPP để doanh nghiệp yên tâm đầu tư dài hạn.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=500&q=80",
        isFeatured: true,
      },
      latestNews: [
        {
          id: "news_2",
          title: "Công Bố Báo Cáo Kinh Tế Di Sản Việt Nam 2026: Đóng Góp 3,8% GDP Toàn Quốc",
          slug: "cong-bo-bao-cao-kinh-te-di-san-viet-nam-2026",
          category: "Nghiên Cứu & Dữ Liệu",
          publishedAt: "30/10/2026",
          author: "Ban Nội dung HEF",
          summary:
            "Lần đầu tiên một bộ chỉ số toàn diện lượng hóa doanh thu từ dịch vụ phụ trợ di sản, bất động sản văn hóa và sản phẩm sáng tạo được công bố.",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400&q=80",
        },
        {
          id: "news_3",
          title: "Kinh Nghiệm Phục Hồi Đô Thị Di Sản Từ Kyoto: Bài Học Thực Tiễn Cho Phố Cổ Hà Nội",
          slug: "kinh-nghiem-phuc-hoi-do-thi-di-san-kyoto-va-ha-noi",
          category: "Kinh Nghiệm Quốc Tế",
          publishedAt: "28/10/2026",
          author: "KTS. Lê Hoàng Phương",
          summary:
            "Phân tích cơ chế ưu đãi thuế chuyển nhượng quyền phát triển (TDR) giúp duy trì những dãy nhà cổ mà không kìm hãm sự năng động của thị trường.",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&h=400&q=80",
        },
        {
          id: "news_4",
          title: "Phát Động Giải Thưởng Phát Triển Bền Vững Chủ Động: Nhận Hồ Sơ Đến Hết 15/10",
          slug: "phat-dong-giai-thuong-phat-trien-ben-vung-chu-dong-2026",
          category: "Giải Thưởng",
          publishedAt: "25/10/2026",
          author: "Hội đồng Bình chọn",
          summary:
            "Mở cổng tiếp nhận hồ sơ trực tuyến cho 4 hạng mục: Di sản Kiến trúc, Di sản Phi vật thể, Làng nghề và Giải pháp Chuyển đổi số.",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=600&h=400&q=80",
        },
      ],
      viewAllLink: "/news",
    },
  },
  {
    id: "sec_home_partners",
    type: "HOME_PARTNERS_SLIDER",
    title: "Mạng Lưới Đối Tác Đồng Hành",
    subtitle: "Đơn vị Chỉ đạo, Chủ trì, Tổ chức và Đối tác Chiến lược",
    order: 7,
    isVisible: true,
    props: {
      title: "Mạng Lưới Đối Tác Đồng Hành",
      subtitle: "Đơn vị Chỉ đạo, Chủ trì, Tổ chức và Đối tác Chiến lược",
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
          name: "Ủy ban Quốc gia UNESCO Việt Nam",
          shortName: "UNESCO VN",
          category: "STEERING",
          categoryLabel: "Cơ quan Đồng hành Quốc tế",
          logoUrl: "/images/partners/unesco.png",
          websiteUrl: "https://unesco.org.vn",
          order: 2,
        },
        {
          id: "p_3",
          name: "Hội Di sản Văn hóa Việt Nam",
          shortName: "VCHA",
          category: "HOSTING",
          categoryLabel: "Cơ quan Chủ trì Học thuật",
          logoUrl: "/images/partners/vcha.png",
          websiteUrl: "https://hoidisan.vn",
          order: 3,
        },
        {
          id: "p_4",
          name: "Ủy ban Nhân dân Thành phố Hà Nội",
          shortName: "UBND TP Hà Nội",
          category: "HOSTING",
          categoryLabel: "Cơ quan Đồng chủ trì & Đăng cai",
          logoUrl: "/images/partners/hanoi.png",
          websiteUrl: "https://hanoi.gov.vn",
          order: 4,
        },
        {
          id: "p_5",
          name: "Đại học Quốc gia Hà Nội",
          shortName: "VNU",
          category: "HOSTING",
          categoryLabel: "Đối tác Nghiên cứu & Đào tạo",
          logoUrl: "/images/partners/vnu.png",
          websiteUrl: "https://vnu.edu.vn",
          order: 5,
        },
        {
          id: "p_6",
          name: "Viện Nghiên cứu Kinh tế Di sản",
          shortName: "HEI",
          category: "ORGANIZING",
          categoryLabel: "Đơn vị Thường trực Tổ chức",
          logoUrl: "/images/partners/hei.png",
          websiteUrl: "https://hef.vn",
          order: 6,
        },
        {
          id: "p_7",
          name: "Trung tâm Bảo tồn Di sản Thăng Long – Hà Nội",
          shortName: "TL-HN",
          category: "ORGANIZING",
          categoryLabel: "Đơn vị Phối hợp Tổ chức",
          logoUrl: "/images/partners/thanglong.png",
          websiteUrl: "https://hoangthanhthanglong.vn",
          order: 7,
        },
        {
          id: "p_8",
          name: "Trung tâm Bảo tồn Di tích Cố đô Huế",
          shortName: "HMCC",
          category: "ORGANIZING",
          categoryLabel: "Đơn vị Phối hợp Thực địa",
          logoUrl: "/images/partners/hue.png",
          websiteUrl: "https://hueworldheritage.org.vn",
          order: 8,
        },
        {
          id: "p_9",
          name: "Tập đoàn Sovico",
          shortName: "Sovico Group",
          category: "STRATEGIC",
          categoryLabel: "Nhà Tài trợ Chiến lược",
          logoUrl: "/images/partners/sovico.png",
          websiteUrl: "https://sovicogroup.com",
          order: 9,
        },
        {
          id: "p_10",
          name: "Tập đoàn Vingroup",
          shortName: "Quỹ Thiện Tâm",
          category: "STRATEGIC",
          categoryLabel: "Nhà Tài trợ Chiến lược",
          logoUrl: "/images/partners/vingroup.png",
          websiteUrl: "https://vingroup.net",
          order: 10,
        },
        {
          id: "p_11",
          name: "Ngân hàng TMCP Ngoại thương Việt Nam",
          shortName: "Vietcombank",
          category: "STRATEGIC",
          categoryLabel: "Đối tác Tài chính Di sản",
          logoUrl: "/images/partners/vietcombank.png",
          websiteUrl: "https://vietcombank.com.vn",
          order: 11,
        },
        {
          id: "p_12",
          name: "Đài Truyền hình Việt Nam",
          shortName: "VTV",
          category: "MEDIA",
          categoryLabel: "Bảo trợ Truyền hình",
          logoUrl: "/images/partners/vtv.png",
          websiteUrl: "https://vtv.vn",
          order: 12,
        },
        {
          id: "p_13",
          name: "Báo Nhân Dân",
          shortName: "Báo Nhân Dân",
          category: "MEDIA",
          categoryLabel: "Bảo trợ Báo chí Chính trị",
          logoUrl: "/images/partners/nhandan.png",
          websiteUrl: "https://nhandan.vn",
          order: 13,
        },
      ],
    },
  },
  {
    id: "sec_home_cta",
    type: "HOME_CONVERSION_CTA",
    title: "Cùng Kiến Tạo Giá Trị Di Sản",
    subtitle: "Đồng hành cùng Diễn đàn trong các hoạt động nghiên cứu, đề cử giải thưởng và hợp tác dự án",
    order: 8,
    isVisible: true,
    props: {
      title: "Cùng Kiến Tạo Giá Trị Di Sản",
      subtitle:
        "Đồng hành cùng Diễn đàn trong các hoạt động nghiên cứu, đề cử giải thưởng và hợp tác dự án",
      cards: [
        {
          title: "Đăng ký tham dự",
          description: "Tham dự các phiên nghị sự, đối thoại chính sách và kết nối chuyên gia.",
          ctaText: "Đăng ký ngay",
          ctaLink: "/lien-he?loai=tham-du#contact-form",
        },
        {
          title: "Đề cử giải thưởng",
          description: "Gửi hồ sơ tham gia Giải thưởng Phát triển Bền vững Chủ động 2026.",
          ctaText: "Nộp hồ sơ đề cử",
          ctaLink: "/lien-he?loai=giai-thuong#contact-form",
        },
        {
          title: "Hợp tác chiến lược",
          description: "Kết nối tài trợ, đồng hành học thuật và bảo trợ truyền thông.",
          ctaText: "Liên hệ hợp tác",
          ctaLink: "/lien-he?loai=hop-tac#contact-form",
        },
      ],
    },
  },
];
