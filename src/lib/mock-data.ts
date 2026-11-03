import type { Post } from "@/features/forum/types/post";
import type { HeritageProject } from "@/features/heritage/types/heritage";

export const INITIAL_POSTS: Post[] = [
  {
    id: "post_1",
    title: "Mô hình kinh tế chia sẻ trong việc bảo tồn nhà rường và di tích Huế",
    slug: "mo-hinh-kinh-te-chia-se-bao-ton-nha-ruong-hue",
    content:
      "Làm thế nào để các hộ gia đình sở hữu nhà vườn, nhà rường tại Cố đô Huế có thể tham gia vào chuỗi giá trị du lịch trải nghiệm di sản mà không làm tổn hại cấu trúc kiến trúc gốc? Đề xuất cơ chế hợp tác công tư (PPP) cấp địa phương...",
    category: "investment",
    tags: ["Huế", "Bảo tồn thích ứng", "UNESCO", "Khởi nghiệp Di sản"],
    author: {
      id: "auth_1",
      name: "TS. Lê Quang Đạt",
      organization: "Hội Kiến trúc sư Di sản",
      role: "expert",
    },
    upvotes: 42,
    commentsCount: 18,
    views: 1250,
    isPinned: true,
    createdAt: "2026-10-28T08:30:00.000Z",
    updatedAt: "2026-10-28T08:30:00.000Z",
  },
  {
    id: "post_2",
    title: "Ứng dụng Digital Twin và VR/AR trong thương mại hóa di sản phi vật thể",
    slug: "ung-dung-digital-twin-vr-ar-di-san-phi-vat-the",
    content:
      "Chia sẻ kinh nghiệm số hóa 3D các điệu múa Chăm và nghề gốm Bàu Trúc. Doanh thu từ trải nghiệm số hóa và bán vật phẩm phái sinh NFT/Metadata bản quyền đã đóng góp 30% ngân sách bảo tồn nghệ nhân...",
    category: "technology",
    tags: ["Chuyển đổi số", "Gốm Bàu Trúc", "Công nghệ số & Di sản"],
    author: {
      id: "auth_2",
      name: "Trần Minh Thảo",
      organization: "Trung tâm Đổi mới Sáng tạo Văn hóa",
      role: "expert",
    },
    upvotes: 35,
    commentsCount: 9,
    views: 890,
    isPinned: false,
    createdAt: "2026-10-30T14:15:00.000Z",
    updatedAt: "2026-10-30T14:15:00.000Z",
  },
  {
    id: "post_3",
    title:
      "Chính sách thuế và ưu đãi tín dụng xanh cho doanh nghiệp đầu tư vào làng nghề truyền thống",
    slug: "chinh-sach-thue-tin-dung-xanh-lang-nghe-truyen-thong",
    content:
      "Phân tích dự thảo quy định hỗ trợ lãi suất cho các cơ sở sản xuất lụa Vạn Phúc, gốm Bát Tràng và sơn mài Hạ Thái khi chuyển đổi công nghệ thân thiện môi trường kết hợp du lịch trải nghiệm...",
    category: "policy",
    tags: ["Chính sách & Pháp luật", "Làng nghề & Thủ công", "Phát triển Bền vững"],
    author: {
      id: "auth_3",
      name: "Bà Nguyễn Thu Trang",
      organization: "Viện Nghiên cứu Quản lý Kinh tế Trung ương",
      role: "policymaker",
    },
    upvotes: 28,
    commentsCount: 12,
    views: 740,
    isPinned: false,
    createdAt: "2026-11-01T10:00:00.000Z",
    updatedAt: "2026-11-01T10:00:00.000Z",
  },
];

export const INITIAL_HERITAGE_PROJECTS: HeritageProject[] = [
  {
    id: "her_1",
    name: "Kinh tế Đêm Phố cổ Hội An",
    slug: "kinh-te-dem-pho-co-hoi-an",
    location: "Quảng Nam",
    category: "Đô thị Di sản",
    status: "Đang vận hành",
    economicMetrics: {
      annualRevenue: "350 tỷ VNĐ",
      jobsCreated: 2400,
      conservationFundShare: "12%",
    },
    description:
      "Mô hình tích hợp văn hóa đường phố, ẩm thực truyền thống và show diễn nghệ thuật vào kinh tế đêm, tạo nguồn thu trực tiếp cho quỹ tái thiết di sản.",
    highlights: [
      "100% người dân bản địa tham gia chuỗi cung ứng",
      "Quỹ bảo tồn trùng tu 150+ ngôi nhà cổ",
    ],
  },
  {
    id: "her_2",
    name: "Hồi sinh Làng Lụa Vạn Phúc",
    slug: "hoi-sinh-lang-lua-van-phuc",
    location: "Hà Nội",
    category: "Làng nghề Thủ công",
    status: "Mở rộng đầu tư",
    economicMetrics: {
      annualRevenue: "120 tỷ VNĐ",
      jobsCreated: 850,
      conservationFundShare: "8%",
    },
    description:
      "Kết hợp xưởng dệt lụa tương tác, phố đi bộ cuối tuần và nền tảng thương mại điện tử xuất khẩu sản phẩm thủ công cao cấp sang châu Âu.",
    highlights: [
      "Chuẩn hóa mã truy xuất nguồn gốc lụa tơ tằm",
      "Thu hút hơn 500.000 lượt khách tham quan mỗi năm",
    ],
  },
  {
    id: "her_3",
    name: "Hợp tác xã Du lịch Sinh thái Tràng An",
    slug: "hop-tac-xa-du-lich-sinh-thai-trang-an",
    location: "Ninh Bình",
    category: "Di sản Kép UNESCO",
    status: "Đang vận hành",
    economicMetrics: {
      annualRevenue: "600 tỷ VNĐ",
      jobsCreated: 5000,
      conservationFundShare: "15%",
    },
    description:
      "Mô hình người lái đò kiêm tuyên truyền viên bảo tồn di sản thiên nhiên và văn hóa, cân bằng giữa phát triển kinh tế du lịch và giữ gìn môi trường.",
    highlights: [
      "Mô hình kiểu mẫu được UNESCO ghi nhận",
      "Bảo hiểm và quỹ hưu trí cho cộng đồng chèo thuyền",
    ],
  },
];
