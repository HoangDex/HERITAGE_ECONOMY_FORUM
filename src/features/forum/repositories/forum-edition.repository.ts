/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO KỲ DIỄN ĐÀN (FORUM EDITIONS)
 * Cung cấp dữ liệu chuẩn mực theo Đề án Mục 07. DIỄN ĐÀN – FORUM
 */

import type { ForumEdition, IForumRepository } from "../types/forum-edition.types";
import { pageRepository } from "@/features/pages/repositories/page.repository";
import { masterDataRepository } from "@/features/pages/repositories/master-data.repository";

export const HEF_2026_EDITION: ForumEdition = {
  id: "hef-edition-2026",
  slug: "2026",
  year: 2026,
  title: "Diễn đàn Kinh tế Di sản 2026",
  theme: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
  datesText: "18 – 20 tháng 11 năm 2026",
  startDateIso: "2026-11-18T08:00:00+07:00",
  endDateIso: "2026-11-20T17:30:00+07:00",
  isDateConfirmed: false, // Kế hoạch trao đổi gần đây, cần xác nhận chính thức
  venueName: "Trung tâm Bảo tồn Di sản Thăng Long – Hà Nội",
  venueAddress: "19C Hoàng Diệu, Quán Thánh, Ba Đình, Hà Nội",
  scaleDescription: "Dự kiến 800+ đại biểu trong nước và quốc tế, 40+ diễn giả đầu ngành",
  organizer: "Hội đồng Diễn đàn Kinh tế Di sản & Mạng lưới Đối tác Chiến lược",
  status: "upcoming",
  sessions: [
    {
      id: "session-1",
      order: 1,
      title: "Khai mạc – Công bố và Định hướng",
      subTitle: "Chiến lược chuyển hóa nguồn lực di sản văn hóa thành động lực phát triển kinh tế",
      description:
        "Báo cáo toàn cảnh kinh tế di sản Việt Nam 2026; Định hướng chính sách của cơ quan quản lý và phương pháp luận đo lường giá trị gia tăng từ di sản bền vững.",
      date: "18/11/2026",
      timeRange: "08:30 – 11:30",
      room: "Đại sảnh Thăng Long (Hội trường A)",
      speakers: [
        {
          id: "sp-1",
          name: "GS.TS. Nguyễn Văn Thịnh",
          degree: "GS.TS",
          title: "Chủ tịch Hội đồng Khoa học",
          organization: "Viện Nghiên cứu Kinh tế Di sản Văn hóa",
          avatarUrl:
            "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&h=750&q=80",
          bio: "Chuyên gia đầu ngành với hơn 30 năm nghiên cứu kinh tế văn hóa và bảo tồn di sản thích ứng.",
          sessionTitle: "Phiên 1: Khai mạc",
          topicSummary: "Đo lường đóng góp kinh tế của di sản trong GDP quốc gia.",
          slug: "gs-ts-nguyen-van-thinh",
        },
        {
          id: "sp-2",
          name: "TS. Lê Hồng Lam",
          degree: "TS",
          title: "Phó Vụ trưởng Vụ Kế hoạch & Tài chính",
          organization: "Bộ Văn hóa, Thể thao và Du lịch",
          avatarUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=750&q=80",
          bio: "Chủ trì xây dựng các đề án cơ chế thử nghiệm tài chính cho bảo tồn di tích văn hóa.",
          sessionTitle: "Phiên 1: Khai mạc",
          topicSummary: "Cơ chế chính sách đột phá nhằm huy động nguồn lực xã hội hóa cho di sản.",
          slug: "ts-le-hong-lam",
        },
      ],
    },
    {
      id: "session-2",
      order: 2,
      title: "Tham luận Chuyên đề và Giới thiệu Mô hình",
      subTitle: "Thực tiễn bảo tồn thích ứng và mô hình kinh tế sáng tạo tại các đô thị di sản",
      description:
        "Trình bày các case-study điển hình: Hoàng thành Thăng Long, Đô thị cổ Hội An, Quần thể danh thắng Tràng An và các bài học quốc tế về quản lý du lịch văn hóa có trách nhiệm.",
      date: "18/11/2026",
      timeRange: "14:00 – 17:00",
      room: "Phòng Hội thảo Quốc tế (Phòng B1)",
      speakers: [
        {
          id: "sp-3",
          name: "PGS.TS. Trần Đình Quang",
          degree: "PGS.TS",
          title: "Giám đốc Trung tâm Kinh tế Du lịch Sáng tạo",
          organization: "Đại học Quốc gia Hà Nội",
          avatarUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=750&q=80",
          bio: "Cố vấn chiến lược tái tạo kinh tế du lịch di sản tại các tỉnh miền Trung.",
          sessionTitle: "Phiên 2: Tham luận chuyên đề",
          topicSummary: "Mô hình chuỗi giá trị du lịch gắn kết sinh kế cộng đồng bản địa.",
          slug: "pgs-ts-tran-dinh-quang",
        },
        {
          id: "sp-4",
          name: "Bà Elizabeth Henderson",
          degree: "ThS",
          title: "Chuyên gia Di sản Văn hóa & Phát triển Bền vững",
          organization: "Văn phòng UNESCO khu vực Châu Á – Thái Bình Dương",
          avatarUrl:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=80",
          bio: "Kinh nghiệm tư vấn quản lý rủi ro và đầu tư bền vững cho hơn 20 di sản thế giới.",
          sessionTitle: "Phiên 2: Tham luận chuyên đề",
          topicSummary: "Kinh nghiệm quốc tế về cân bằng giữa thương mại hóa và bảo toàn tính xác thực.",
          slug: "elizabeth-henderson",
        },
      ],
    },
    {
      id: "session-3",
      order: 3,
      title: "Đối thoại và Thảo luận Mở",
      subTitle: "Hợp tác công – tư (PPP), chuyển đổi số và công nghệ thực tế ảo trong di sản",
      description:
        "Bàn tròn tương tác giữa cơ quan quản lý, quỹ đầu tư, tập đoàn công nghệ và nghệ nhân làng nghề; tháo gỡ vướng mắc trong chia sẻ lợi ích và sở hữu trí tuệ di sản phi vật thể.",
      date: "19/11/2026",
      timeRange: "09:00 – 11:30",
      room: "Đại sảnh Thăng Long (Hội trường A)",
      speakers: [
        {
          id: "sp-5",
          name: "Ông Hoàng Minh Đức",
          title: "Tổng Giám đốc",
          organization: "Tập đoàn Giải pháp Công nghệ Di sản Số Việt Nam",
          avatarUrl:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=750&q=80",
          bio: "Tiên phong ứng dụng AR/VR và bảo tàng số 3D tại hơn 50 di tích quốc gia đặc biệt.",
          sessionTitle: "Phiên 3: Đối thoại mở",
          topicSummary: "Chuyển đổi số di sản: Thương mại hóa dữ liệu và quyền thụ hưởng văn hóa đại chúng.",
          slug: "hoang-minh-duc",
        },
      ],
    },
    {
      id: "session-4",
      order: 4,
      title: "Dấu ấn – Thành tựu – Kết nối và Tổng kết",
      subTitle: "Công bố Tuyên bố chung Hà Nội về Kinh tế Di sản & Lễ Vinh danh Thành tựu",
      description:
        "Ký kết các biên bản ghi nhớ hợp tác chiến lược đầu tư; Công bố danh sách đề cử Giải thưởng Phát triển Bền vững Chủ động và bế mạc kỳ Diễn đàn 2026.",
      date: "19/11/2026",
      timeRange: "14:30 – 17:30",
      room: "Đại sảnh Thăng Long (Hội trường A)",
      speakers: [
        {
          id: "sp-6",
          name: "TS. Phạm Thanh Nga",
          degree: "TS",
          title: "Trưởng Ban Điều hành Diễn đàn",
          organization: "Heritage Economy Forum Secretariat",
          avatarUrl:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=750&q=80",
          bio: "Điều phối mạng lưới kết nối 120+ tổ chức và doanh nghiệp thành viên diễn đàn.",
          sessionTitle: "Phiên 4: Dấu ấn & Tổng kết",
          topicSummary: "Kế hoạch hành động 2026-2030: Hiện thực hóa cam kết và dự án đối tác.",
          slug: "ts-pham-thanh-nga",
        },
      ],
    },
  ],
  timeline: [
    {
      id: "tl-1",
      period: "morning",
      time: "08:00 – 08:30",
      title: "Đón tiếp Đại biểu, Khách mời & Check-in",
      speakerOrChair: "Ban Thư ký Diễn đàn",
      room: "Sảnh đón tiếp Nhà A",
      sessionOrder: 1,
    },
    {
      id: "tl-2",
      period: "morning",
      time: "08:30 – 09:15",
      title: "Lễ Khai mạc Trọng thể & Phát biểu Chỉ đạo",
      speakerOrChair: "Lãnh đạo Bộ VHTTDL & UBND TP Hà Nội",
      room: "Đại sảnh Thăng Long",
      sessionOrder: 1,
    },
    {
      id: "tl-3",
      period: "morning",
      time: "09:15 – 10:30",
      title: "Báo cáo Toàn cảnh: Kinh tế Di sản Việt Nam 2026",
      speakerOrChair: "GS.TS. Nguyễn Văn Thịnh",
      room: "Đại sảnh Thăng Long",
      sessionOrder: 1,
    },
    {
      id: "tl-4",
      period: "morning",
      time: "10:45 – 11:30",
      title: "Công bố Khung Chỉ số Tác động Di sản (HEI Index)",
      speakerOrChair: "Hội đồng Khoa học HEF",
      room: "Đại sảnh Thăng Long",
      sessionOrder: 1,
    },
    {
      id: "tl-5",
      period: "afternoon",
      time: "14:00 – 15:30",
      title: "Trình bày 04 Mô hình Thực hành Kinh tế Di sản",
      speakerOrChair: "Đại diện Hội An, Tràng An, Huế & Bát Tràng",
      room: "Phòng B1 – Thảo luận",
      sessionOrder: 2,
    },
    {
      id: "tl-6",
      period: "afternoon",
      time: "15:45 – 17:00",
      title: "Kinh nghiệm Quốc tế về Quản lý Sức chứa Di sản",
      speakerOrChair: "Bà Elizabeth Henderson (UNESCO)",
      room: "Phòng B1 – Thảo luận",
      sessionOrder: 2,
    },
  ],
  speakers: [
    {
      id: "sp-1",
      name: "GS.TS. Nguyễn Văn Thịnh",
      degree: "GS.TS",
      title: "Chủ tịch Hội đồng Khoa học",
      organization: "Viện Nghiên cứu Kinh tế Di sản",
      avatarUrl:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&h=750&q=80",
      bio: "Hơn 30 năm nghiên cứu bảo tồn di sản thích ứng và thể chế kinh tế văn hóa.",
      sessionTitle: "Phiên 1: Khai mạc",
      topicSummary: "Đo lường đóng góp kinh tế của di sản trong GDP quốc gia.",
      slug: "gs-ts-nguyen-van-thinh",
    },
    {
      id: "sp-2",
      name: "TS. Lê Hồng Lam",
      degree: "TS",
      title: "Phó Vụ trưởng Vụ KH&TC",
      organization: "Bộ Văn hóa, Thể thao và Du lịch",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=750&q=80",
      bio: "Chủ trì nghiên cứu cơ chế tài chính đặc thù cho công tác tu bổ, phục dựng di tích.",
      sessionTitle: "Phiên 1: Khai mạc",
      topicSummary: "Cơ chế chính sách đột phá nhằm huy động nguồn lực xã hội hóa.",
      slug: "ts-le-hong-lam",
    },
    {
      id: "sp-3",
      name: "PGS.TS. Trần Đình Quang",
      degree: "PGS.TS",
      title: "Giám đốc TT Kinh tế Du lịch",
      organization: "Đại học Quốc gia Hà Nội",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=750&q=80",
      bio: "Cố vấn phát triển kinh tế du lịch di sản tại các tỉnh miền Trung.",
      sessionTitle: "Phiên 2: Tham luận",
      topicSummary: "Mô hình chuỗi giá trị du lịch gắn kết sinh kế cộng đồng.",
      slug: "pgs-ts-tran-dinh-quang",
    },
    {
      id: "sp-4",
      name: "Bà Elizabeth Henderson",
      degree: "ThS",
      title: "Chuyên gia Di sản Văn hóa",
      organization: "Văn phòng UNESCO Bangkok",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=80",
      bio: "Tư vấn quản lý rủi ro và đầu tư bền vững cho hơn 20 di sản thế giới.",
      sessionTitle: "Phiên 2: Tham luận",
      topicSummary: "Cân bằng giữa khai thác thương mại và bảo tồn tính xác thực.",
      slug: "elizabeth-henderson",
    },
    {
      id: "sp-5",
      name: "Ông Hoàng Minh Đức",
      title: "Tổng Giám đốc",
      organization: "Tập đoàn Di sản Số Việt Nam",
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=750&q=80",
      bio: "Tiên phong ứng dụng AR/VR và số hóa 3D tại các di tích quốc gia.",
      sessionTitle: "Phiên 3: Đối thoại mở",
      topicSummary: "Chuyển đổi số di sản và quyền thụ hưởng văn hóa đại chúng.",
      slug: "hoang-minh-duc",
    },
    {
      id: "sp-6",
      name: "TS. Phạm Thanh Nga",
      degree: "TS",
      title: "Trưởng Ban Điều hành",
      organization: "Heritage Economy Forum",
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=750&q=80",
      bio: "Điều phối mạng lưới kết nối hơn 120 tổ chức và doanh nghiệp thành viên.",
      sessionTitle: "Phiên 4: Tổng kết",
      topicSummary: "Kế hoạch hành động 2026-2030: Hiện thực hóa cam kết đối tác.",
      slug: "ts-pham-thanh-nga",
    },
  ],
  resources: [
    {
      id: "res-1",
      title: "Chương trình Nghị sự Chính thức Diễn đàn 2026 (PDF)",
      type: "pdf",
      fileSize: "2.4 MB",
      downloadUrl: "#tai-lieu-chuong-trinh",
      category: "chuong-trinh",
    },
    {
      id: "res-2",
      title: "Báo cáo Đề dẫn: Kinh tế Di sản trong Mô hình Tăng trưởng Mới",
      type: "pdf",
      fileSize: "8.1 MB",
      downloadUrl: "#tai-lieu-bao-cao",
      category: "bao-cao",
    },
    {
      id: "res-3",
      title: "Tuyển tập Kỷ yếu Khoa học Diễn đàn 2026 (ISBN)",
      type: "pdf",
      fileSize: "18.5 MB",
      downloadUrl: "#tai-lieu-ky-yeu",
      category: "ky-yeu",
    },
    {
      id: "res-4",
      title: "Tóm tắt Tham luận Chuyên đề: Đối tác Công – Tư (PPP) Di sản",
      type: "doc",
      fileSize: "1.2 MB",
      downloadUrl: "#tai-lieu-tham-luan",
      category: "tham-luan",
    },
  ],
  gallery: [
    {
      id: "gal-1",
      type: "photo",
      title: "Không gian Hoàng thành Thăng Long chuẩn bị cho Diễn đàn",
      url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&h=500&q=80",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&h=260&q=80",
    },
    {
      id: "gal-2",
      type: "photo",
      title: "Phòng hội thảo chuyên đề quốc tế",
      url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&h=500&q=80",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&h=260&q=80",
    },
  ],
};

export const HEF_2025_EDITION: ForumEdition = {
  id: "hef-edition-2025",
  slug: "2025",
  year: 2025,
  title: "Diễn đàn Kinh tế Di sản 2025",
  theme: "Khơi nguồn Vốn Văn hóa – Phát triển Kinh tế Bền vững",
  datesText: "20 – 22 tháng 11 năm 2025",
  startDateIso: "2025-11-20T08:00:00+07:00",
  endDateIso: "2025-11-22T17:30:00+07:00",
  isDateConfirmed: true,
  venueName: "Trung tâm Hội nghị Quốc tế Hà Nội",
  venueAddress: "11 Lê Hồng Phong, Ba Đình, Hà Nội",
  scaleDescription: "Hơn 650 đại biểu chính thức, 35 diễn giả, 150 cơ quan báo chí",
  organizer: "Hội đồng Diễn đàn Kinh tế Di sản",
  status: "concluded",
  outcomesSummary:
    "Kỳ 2025 đã thông qua Tuyên bố chung Hà Nội về Kinh tế Di sản; ký kết 12 biên bản ghi nhớ hợp tác công – tư (PPP) với tổng quy mô cam kết 450 tỷ VNĐ; chính thức công bố Bộ chỉ tiêu Đo lường Tác động Kinh tế Di sản (HEI Index).",
  sessions: [
    {
      id: "session-2025-1",
      order: 1,
      title: "Tổng kết & Tuyên bố Chung 2025",
      subTitle: "Đánh giá kết quả triển khai Đề án và cam kết liên minh hành động",
      description: "Tổng hợp các kiến nghị gửi Thủ tướng Chính phủ và Ban Kinh tế Trung ương.",
      date: "22/11/2025",
      timeRange: "14:00 – 17:00",
      room: "Hội trường Hoa Sen",
      speakers: [],
    },
  ],
  timeline: [
    {
      id: "tl-2025-1",
      period: "morning",
      time: "08:30 – 11:30",
      title: "Phiên Tổng kết & Ký kết Hợp tác Chiến lược",
      speakerOrChair: "Ban Thường trực Diễn đàn",
      room: "Hội trường Hoa Sen",
      sessionOrder: 1,
    },
  ],
  speakers: [
    {
      id: "sp-2025-1",
      name: "GS.TS. Nguyễn Văn Thịnh",
      degree: "GS.TS",
      title: "Chủ tịch Hội đồng Khoa học",
      organization: "Viện Nghiên cứu Kinh tế Di sản",
      avatarUrl:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&h=750&q=80",
      bio: "Báo cáo tổng kết kỳ 2025 và định hướng chiến lược 2026-2030.",
      sessionTitle: "Phiên Tổng kết",
      topicSummary: "Kết quả và bài học sau 1 năm triển khai liên minh.",
      slug: "gs-ts-nguyen-van-thinh",
    },
  ],
  resources: [
    {
      id: "res-2025-1",
      title: "Báo cáo Kết quả Kỳ Diễn đàn 2025 & Tuyên bố chung Hà Nội",
      type: "report",
      fileSize: "4.5 MB",
      downloadUrl: "#bao-cao-2025",
      category: "bao-cao",
    },
    {
      id: "res-2025-2",
      title: "Kỷ yếu Khoa học Toàn văn Kỳ Diễn đàn 2025 (ISBN: 978-604-0-12345-6)",
      type: "pdf",
      fileSize: "22.0 MB",
      downloadUrl: "#ky-yeu-2025",
      category: "ky-yeu",
    },
  ],
  gallery: [
    {
      id: "gal-2025-1",
      type: "photo",
      title: "Toàn cảnh Lễ Bế mạc Kỳ Diễn đàn 2025",
      url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&h=500&q=80",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&h=260&q=80",
    },
  ],
};

export class ForumEditionRepository implements IForumRepository {
  async getEditionByYear(year: number): Promise<ForumEdition | null> {
    if (year === 2025) return HEF_2025_EDITION;
    if (year === 2026) {
      try {
        const page = await pageRepository.findBySlug("forum");
        const props = page?.props || {};
        const heroSec = props.hero || {};
        const speakerIds = Array.isArray(props.speakers?.ids) ? props.speakers.ids : [];

        const masterSpeakers =
          speakerIds.length > 0
            ? await masterDataRepository.getSpeakersByIds(speakerIds)
            : await masterDataRepository.getSpeakers();

        let speakers = HEF_2026_EDITION.speakers;
        if (masterSpeakers.length > 0) {
          speakers = masterSpeakers.map((sp) => ({
            id: sp.id,
            name: sp.name,
            degree: sp.degree || undefined,
            title: sp.title,
            organization: sp.organization,
            avatarUrl: sp.avatarUrl,
            bio: sp.bio || "",
            sessionTitle: "Phiên Chuyên Đề",
            topicSummary: "Kinh tế Di sản và Phát triển bền vững",
            slug: sp.slug,
          }));
        }

        const heroStats = Array.isArray(heroSec.stats) ? heroSec.stats : [];

        return {
          ...HEF_2026_EDITION,
          title: heroSec.title || HEF_2026_EDITION.title,
          theme: heroSec.quote || heroSec.subtitle || HEF_2026_EDITION.theme,
          datesText: heroStats[0]?.value || HEF_2026_EDITION.datesText,
          venueName: heroStats[1]?.value || HEF_2026_EDITION.venueName,
          venueAddress: heroStats[2]?.value || HEF_2026_EDITION.venueAddress,
          scaleDescription: heroStats[3]?.value || HEF_2026_EDITION.scaleDescription,
          speakers,
        };
      } catch {
        // Fallback
      }
      return HEF_2026_EDITION;
    }
    return null;
  }

  async getAllEditions(): Promise<ForumEdition[]> {
    return [HEF_2026_EDITION, HEF_2025_EDITION];
  }
}

export const forumEditionRepository = new ForumEditionRepository();
