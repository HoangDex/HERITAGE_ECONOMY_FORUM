/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE GIẢI THƯỞNG
 * Dữ liệu 8 hạng mục tham khảo, 7 bước quy trình và tiêu chí theo Đề án Mục 08
 */

import type { AwardsPageData, IAwardsRepository } from "../types/awards.types";

const MOCK_AWARDS_DATA: AwardsPageData = {
  title: "Giải thưởng Phát triển Bền vững Chủ động",
  englishTitle: "Proactive Sustainable Development Awards",
  slogan: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
  philosophy:
    "Giải thưởng Phát triển Bền vững Chủ động định hướng ghi nhận và tôn vinh các cá nhân, tổ chức, doanh nghiệp, cộng đồng và sáng kiến có đóng góp tiêu biểu trong việc chủ động kiến tạo giá trị phát triển bền vững, hài hòa giữa kinh tế, văn hóa, xã hội và môi trường.",
  rulesVersion: "Quy chế số 01/2026/QC-HEF (Bản dự thảo thẩm định)",
  categories: [
    {
      id: "cat-1",
      order: 1,
      title: "Sáng kiến Phát triển Bền vững Chủ động",
      subtitle: "Giải pháp tiên phong giải quyết thách thức kép bảo tồn và tăng trưởng",
      description:
        "Trao tặng cho sáng kiến có tính đột phá, ứng dụng hiệu quả giải pháp mới trong quản lý và bảo vệ tài nguyên văn hóa.",
      iconName: "Sparkles",
      targetAudience: "Tổ chức nghiên cứu, viện, trường đại học, nhóm tác giả",
    },
    {
      id: "cat-2",
      order: 2,
      title: "Mô hình Kinh tế Di sản Kiểu mẫu",
      subtitle: "Hiện thực hóa chuỗi giá trị thương mại hóa có trách nhiệm",
      description:
        "Tôn vinh các mô hình doanh nghiệp, hợp tác xã khai thác nguồn lực di sản gắn liền với phát triển sản phẩm du lịch sáng tạo.",
      iconName: "Landmark",
      targetAudience: "Doanh nghiệp du lịch, hợp tác xã làng nghề truyền thống",
    },
    {
      id: "cat-3",
      order: 3,
      title: "Đổi mới Sáng tạo vì Phát triển Bền vững",
      subtitle: "Ứng dụng khoa học công nghệ và kinh tế số trong bảo tồn",
      description:
        "Ghi nhận các dự án số hóa 3D, AR/VR, nền tảng lưu trữ dữ liệu di sản phục vụ cộng đồng và phát triển du lịch thông minh.",
      iconName: "Cpu",
      targetAudience: "Doanh nghiệp công nghệ, Startup sáng tạo văn hóa số",
    },
    {
      id: "cat-4",
      order: 4,
      title: "Doanh nghiệp Kiến tạo Giá trị",
      subtitle: "Chiến lược ESG và trách nhiệm xã hội gắn kết di sản",
      description:
        "Dành cho các doanh nghiệp có đóng góp bền bỉ, trích nguồn lực hỗ trợ bảo tồn di tích và kiến tạo sinh kế địa phương.",
      iconName: "Building2",
      targetAudience: "Tập đoàn kinh tế, ngân hàng, doanh nghiệp có trách nhiệm xã hội",
    },
    {
      id: "cat-5",
      order: 5,
      title: "Dự án Tác động Cộng đồng",
      subtitle: "Lấy người dân bản địa làm trung tâm thụ hưởng và gìn giữ",
      description:
        "Trao tặng cho các chương trình phát triển cộng đồng nâng cao thu nhập, bình đẳng giới và khơi dậy niềm tự hào văn hóa.",
      iconName: "Users",
      targetAudience: "Cộng đồng cư dân di sản, tổ chức phi chính phủ (NGOs)",
    },
    {
      id: "cat-6",
      order: 6,
      title: "Bảo tồn & Phát huy Di sản",
      subtitle: "Cứu vãn và hồi sinh các di sản văn hóa đứng trước nguy cơ mai một",
      description:
        "Công trình phục dựng, tu bổ di tích vật thể hoặc trao truyền, sưu tầm di sản văn hóa phi vật thể xuất sắc.",
      iconName: "Shield",
      targetAudience: "Nhà bảo tồn, cơ quan quản lý di tích, ban quản lý di sản",
    },
    {
      id: "cat-7",
      order: 7,
      title: "Cá nhân Cống hiến",
      subtitle: "Nghệ nhân, nhà nghiên cứu và người giữ lửa văn hóa tiêu biểu",
      description:
        "Tôn vinh hành trình cống hiến trọn đời hoặc những phát hiện quan trọng đóng góp cho kho tàng di sản dân tộc.",
      iconName: "Award",
      targetAudience: "Nghệ nhân nhân dân, nghệ nhân ưu tú, nhà khoa học",
    },
    {
      id: "cat-8",
      order: 8,
      title: "Thành tựu Phụng sự Vị nhân sinh",
      subtitle: "Hạng mục danh dự cao nhất trao tặng cho công trình đặc biệt xuất sắc",
      description:
        "Tôn vinh biểu tượng văn hóa có sức lan tỏa quốc tế và tạo ra giá trị trường tồn cho các thế hệ tương lai.",
      iconName: "HeartHandshake",
      targetAudience: "Công trình, tập thể có dấu ấn đặc biệt cấp quốc gia",
    },
  ],
  criteriaList: [
    {
      id: "crit-1",
      title: "Tính Xác Thực & Tôn Trọng Bản Sắc Di Sản",
      weightPercent: 30,
      description:
        "Hồ sơ chứng minh các hoạt động không làm tổn hại đến tính nguyên gốc, giá trị lịch sử và tính toàn vẹn của di sản.",
      evidenceRequirements: [
        "Văn bản thẩm định của cơ quan chuyên môn văn hóa",
        "Tư liệu hình ảnh đối chiếu trước và sau can thiệp",
      ],
    },
    {
      id: "crit-2",
      title: "Hiệu Quả Kinh Tế & Tính Bền Vững Tài Chính",
      weightPercent: 25,
      description:
        "Khả năng tự cân đối tài chính, tạo nguồn thu tái đầu tư cho bảo tồn và đóng góp thiết thực cho ngân sách địa phương.",
      evidenceRequirements: [
        "Báo cáo tài chính hoặc bảng kê doanh thu minh bạch",
        "Tỷ lệ trích quỹ tái đầu tư bảo tồn tối thiểu 15%",
      ],
    },
    {
      id: "crit-3",
      title: "Tác Động Xã Hội & Thụ Hưởng Của Cộng Đồng",
      weightPercent: 25,
      description:
        "Số lượng việc làm tạo mới cho cư dân địa phương, chia sẻ công bằng lợi ích kinh tế và nâng cao chất lượng sống.",
      evidenceRequirements: [
        "Thống kê số lượng lao động địa phương có hợp đồng",
        "Khảo sát mức độ hài lòng của cộng đồng bản địa",
      ],
    },
    {
      id: "crit-4",
      title: "Tính Đổi Mới Sáng Tạo & Khả Năng Nhân Rộng",
      weightPercent: 20,
      description:
        "Phương pháp tiếp cận mới, ứng dụng khoa học kỹ thuật và tiềm năng nhân rộng mô hình tại các địa phương khác.",
      evidenceRequirements: [
        "Bằng chứng ứng dụng công nghệ (web, app, VR/AR nếu có)",
        "Tài liệu chuyển giao quy trình hoặc sổ tay hướng dẫn thực hành",
      ],
    },
  ],
  processSteps: [
    {
      step: 1,
      title: "Mở Tiếp Nhận Hồ Sơ Đề Cử",
      timeframe: "01/06 – 31/08/2026",
      description:
        "Các tổ chức, cá nhân nộp hồ sơ trực tuyến qua cổng điện tử hoặc gửi chuyển phát về Ban Thư ký.",
    },
    {
      step: 2,
      title: "Kiểm Tra Tính Hợp Lệ Hồ Sơ",
      timeframe: "01/09 – 15/09/2026",
      description:
        "Ban Thư ký đối chiếu điều kiện tham gia, tính đầy đủ của tài liệu minh chứng và sự đồng thuận của chủ thể di sản.",
    },
    {
      step: 3,
      title: "Thẩm Định Chuyên Môn Sơ Tuyển",
      timeframe: "16/09 – 30/09/2026",
      description:
        "Hội đồng Chuyên gia chấm điểm độc lập trên bộ tiêu chí lượng hóa; chọn ra Top 3 hồ sơ tiêu biểu mỗi hạng mục.",
    },
    {
      step: 4,
      title: "Xác Minh & Đánh Giá Thực Địa",
      timeframe: "01/10 – 20/10/2026",
      description:
        "Đoàn công tác chuyên ngành khảo sát trực tiếp tại dự án, tiếp xúc cộng đồng và phỏng vấn các bên liên quan.",
    },
    {
      step: 5,
      title: "Hội Đồng Chung Khảo Họp Bỏ Phiếu",
      timeframe: "25/10/2026",
      description:
        "Phiên họp toàn thể Hội đồng Giám khảo; tranh biện và bỏ phiếu kín quyết định danh sách vinh danh chính thức.",
    },
    {
      step: 6,
      title: "Phê Duyệt & Công Bố Quyết Định",
      timeframe: "05/11/2026",
      description:
        "Chủ tịch Hội đồng Diễn đàn ký quyết định phê duyệt; gửi thông báo chính thức đến các đơn vị, cá nhân đạt giải.",
    },
    {
      step: 7,
      title: "Lễ Tôn Vinh & Trao Cúp Biểu Trưng",
      timeframe: "19/11/2026",
      description:
        "Truyền hình trực tiếp tại Phiên 4 Diễn đàn Kinh tế Di sản 2026, Hoàng thành Thăng Long, Hà Nội.",
    },
  ],
  judges: [
    {
      id: "j-1",
      name: "GS.TS. Nguyễn Văn Thịnh",
      title: "Chủ tịch Hội đồng Khoa học",
      organization: "Viện Nghiên cứu Kinh tế Di sản Văn hóa",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=750&q=80",
      role: "Chủ tịch Hội đồng",
    },
    {
      id: "j-2",
      name: "TS. Lê Hồng Lam",
      title: "Phó Vụ trưởng Vụ Kế hoạch & Tài chính",
      organization: "Bộ Văn hóa, Thể thao và Du lịch",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=750&q=80",
      role: "Phó Chủ tịch",
    },
    {
      id: "j-3",
      name: "Bà Elizabeth Henderson",
      title: "Cố vấn Cấp cao Phát triển Bền vững",
      organization: "UNESCO Châu Á – Thái Bình Dương",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=80",
      role: "Thành viên Thường trực",
    },
  ],
};

export class AwardsRepository implements IAwardsRepository {
  async getAwardsPageData(): Promise<AwardsPageData> {
    return MOCK_AWARDS_DATA;
  }
}

export const awardsRepository = new AwardsRepository();
