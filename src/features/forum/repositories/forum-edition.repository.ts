/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO KỲ DIỄN ĐÀN (FORUM EDITIONS)
 * Cung cấp dữ liệu đã được xác nhận theo Đề án Mục 07
 */

import type { ForumEdition, IForumRepository } from "../types/forum-edition.types";

const HEF_2026_EDITION: ForumEdition = {
  id: "hef-edition-2026",
  slug: "2026",
  year: 2026,
  title: "Diễn đàn Kinh tế Di sản 2026 | Heritage Economy Forum 2026",
  theme: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
  datesText: "18 – 20 tháng 11 năm 2026",
  venueName: "Trung tâm Bảo tồn Di sản Thăng Long – Hà Nội",
  venueAddress: "19C Hoàng Diệu, Quán Thánh, Ba Đình, Hà Nội",
  scaleDescription: "Dự kiến 800+ đại biểu trong nước và quốc tế, 40+ diễn giả đầu ngành",
  organizer: "Hội đồng Diễn đàn Kinh tế Di sản & Mạng lưới Đối tác Chiến lược",
  status: "upcoming",
  sessions: [
    {
      id: "session-1",
      order: 1,
      title: "Phiên 1: Khai mạc – Công bố và Định hướng",
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
          topicSummary:
            "Báo cáo thường niên: Đo lường đóng góp kinh tế của di sản trong GDP quốc gia.",
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
      title: "Phiên 2: Tham luận chuyên đề & Giới thiệu mô hình",
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
          topicSummary:
            "Kinh nghiệm quốc tế về cân bằng giữa thương mại hóa và bảo toàn tính xác thực.",
          slug: "elizabeth-henderson",
        },
      ],
    },
    {
      id: "session-3",
      order: 3,
      title: "Phiên 3: Đối thoại & Thảo luận mở",
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
          topicSummary:
            "Chuyển đổi số di sản: Thương mại hóa dữ liệu và quyền thụ hưởng văn hóa đại chúng.",
          slug: "hoang-minh-duc",
        },
      ],
    },
    {
      id: "session-4",
      order: 4,
      title: "Phiên 4: Dấu ấn – Thành tựu – Kết nối và Tổng kết",
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
      room: "Sảnh đón tiếp chính",
      sessionOrder: 1,
    },
    {
      id: "tl-2",
      period: "morning",
      time: "08:30 – 09:30",
      title: "Nghi lễ Khai mạc & Phát biểu Chỉ đạo",
      speakerOrChair: "Đại diện Lãnh đạo Cơ quan Chỉ đạo & Ban Tổ chức",
      room: "Hội trường A",
      sessionOrder: 1,
    },
    {
      id: "tl-3",
      period: "morning",
      time: "09:45 – 11:30",
      title: "Báo cáo Đề dẫn & Định hướng Chiến lược Kinh tế Di sản",
      speakerOrChair: "GS.TS. Nguyễn Văn Thịnh",
      room: "Hội trường A",
      sessionOrder: 1,
    },
    {
      id: "tl-4",
      period: "afternoon",
      time: "14:00 – 15:30",
      title: "Tham luận: Các mô hình bảo tồn thích ứng kiểu mẫu tại Việt Nam",
      speakerOrChair: "PGS.TS. Trần Đình Quang",
      room: "Phòng B1",
      sessionOrder: 2,
    },
    {
      id: "tl-5",
      period: "afternoon",
      time: "15:45 – 17:00",
      title: "Báo cáo chuyên sâu: Kinh nghiệm quốc tế của UNESCO trong quản trị di sản",
      speakerOrChair: "Bà Elizabeth Henderson (UNESCO)",
      room: "Phòng B1",
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
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=750&q=80",
      bio: "Chuyên gia đầu ngành về kinh tế văn hóa với hơn 30 năm nghiên cứu.",
      sessionTitle: "Phiên 1: Khai mạc",
      topicSummary: "Báo cáo thường niên: Đo lường đóng góp kinh tế của di sản trong GDP.",
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
      bio: "Chủ trì xây dựng các đề án cơ chế thử nghiệm tài chính cho bảo tồn di tích.",
      sessionTitle: "Phiên 1: Khai mạc",
      topicSummary: "Cơ chế chính sách đột phá nhằm huy động nguồn lực xã hội hóa.",
      slug: "ts-le-hong-lam",
    },
    {
      id: "sp-3",
      name: "PGS.TS. Trần Đình Quang",
      degree: "PGS.TS",
      title: "Giám đốc Trung tâm Kinh tế Du lịch",
      organization: "Đại học Quốc gia Hà Nội",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=750&q=80",
      bio: "Cố vấn chiến lược tái tạo kinh tế du lịch di sản tại các tỉnh miền Trung.",
      sessionTitle: "Phiên 2: Tham luận",
      topicSummary: "Mô hình chuỗi giá trị du lịch gắn kết sinh kế cộng đồng.",
      slug: "pgs-ts-tran-dinh-quang",
    },
    {
      id: "sp-4",
      name: "Bà Elizabeth Henderson",
      degree: "ThS",
      title: "Chuyên gia Di sản Văn hóa",
      organization: "UNESCO Bangkok",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=80",
      bio: "Tư vấn quản lý rủi ro và đầu tư bền vững cho hơn 20 di sản thế giới.",
      sessionTitle: "Phiên 2: Tham luận",
      topicSummary: "Kinh nghiệm quốc tế về cân bằng giữa thương mại hóa và bảo tồn.",
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
      bio: "Điều phối mạng lưới kết nối 120+ tổ chức và doanh nghiệp thành viên.",
      sessionTitle: "Phiên 4: Tổng kết",
      topicSummary: "Kế hoạch hành động 2026-2030: Hiện thực hóa cam kết đối tác.",
      slug: "ts-pham-thanh-nga",
    },
  ],
  resources: [
    {
      id: "res-1",
      title: "Chương trình Nghị sự Chính thức Diễn đàn 2026 (Bản PDF)",
      type: "pdf",
      fileSize: "2.4 MB",
      downloadUrl: "#tai-lieu-chuong-trinh",
      category: "chuong-trinh",
    },
    {
      id: "res-2",
      title: "Báo cáo Đề dẫn: Kinh tế Di sản trong bối cảnh Đổi mới Mô hình Tăng trưởng",
      type: "pdf",
      fileSize: "8.1 MB",
      downloadUrl: "#tai-lieu-bao-cao",
      category: "bao-cao",
    },
    {
      id: "res-3",
      title: "Tuyển tập Kỷ yếu Khoa học Diễn đàn Kinh tế Di sản 2026",
      type: "pdf",
      fileSize: "18.5 MB",
      downloadUrl: "#tai-lieu-ky-yeu",
      category: "ky-yeu",
    },
    {
      id: "res-4",
      title: "Tóm tắt Tham luận Chuyên đề: Khung Quản trị Đối tác Công – Tư (PPP) Di sản",
      type: "doc",
      fileSize: "1.2 MB",
      downloadUrl: "#tai-lieu-tham-luan",
      category: "tham-luan",
    },
  ],
};

export class ForumEditionRepository implements IForumRepository {
  async getEditionByYear(year: number): Promise<ForumEdition | null> {
    if (year === 2026) return HEF_2026_EDITION;
    return null;
  }

  async getAllEditions(): Promise<ForumEdition[]> {
    return [HEF_2026_EDITION];
  }
}

export const forumEditionRepository = new ForumEditionRepository();
