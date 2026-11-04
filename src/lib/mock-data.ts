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
    imageUrl:
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&h=750&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&h=500&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&h=500&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&h=500&q=80",
    ],
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
      "Phân luồng du khách văn minh bảo vệ môi trường phố cổ",
    ],
  },
  {
    id: "her_2",
    name: "Hồi sinh Làng Lụa Vạn Phúc",
    slug: "hoi-sinh-lang-lua-van-phuc",
    location: "Hà Đông, Hà Nội",
    category: "Làng nghề Thủ công",
    status: "Mở rộng đầu tư",
    imageUrl:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&h=750&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&h=500&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&h=500&q=80",
    ],
    economicMetrics: {
      annualRevenue: "120 tỷ VNĐ",
      jobsCreated: 850,
      conservationFundShare: "8%",
    },
    description:
      "Kết hợp xưởng dệt lụa tương tác, phố đi bộ cuối tuần và nền tảng thương mại điện tử xuất khẩu sản phẩm thủ công cao cấp sang châu Âu.",
    highlights: [
      "Chuẩn hóa mã truy xuất nguồn gốc lụa tơ tằm cổ truyền",
      "Thu hút hơn 500.000 lượt khách tham quan mỗi năm",
      "Bảo tồn kỹ thuật dệt vân tơ tằm quý hiếm",
    ],
  },
  {
    id: "her_3",
    name: "Hợp tác xã Du lịch Sinh thái Tràng An",
    slug: "hop-tac-xa-du-lich-sinh-thai-trang-an",
    location: "Ninh Bình",
    category: "Di sản Kép UNESCO",
    status: "Đang vận hành",
    imageUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&h=750&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&h=500&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&h=500&q=80",
    ],
    economicMetrics: {
      annualRevenue: "600 tỷ VNĐ",
      jobsCreated: 5000,
      conservationFundShare: "15%",
    },
    description:
      "Mô hình người lái đò kiêm tuyên truyền viên bảo tồn di sản thiên nhiên và văn hóa, cân bằng giữa phát triển kinh tế du lịch và giữ gìn môi trường.",
    highlights: [
      "Mô hình kiểu mẫu quản trị di sản bền vững được UNESCO ghi nhận",
      "Bảo hiểm xã hội và quỹ phúc lợi cho cộng đồng chèo thuyền",
      "Kiểm soát chặt chẽ tải trọng môi trường vùng lõi di sản",
    ],
  },
  {
    id: "her_4",
    name: "Chuỗi Giá trị Sáng tạo Gốm Bát Tràng",
    slug: "chuoi-gia-tri-sang-tao-gom-bat-trang",
    location: "Gia Lâm, Hà Nội",
    category: "Làng nghề & Thủ công",
    status: "Đang vận hành",
    imageUrl:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&h=750&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&h=500&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&h=500&q=80",
    ],
    economicMetrics: {
      annualRevenue: "180 tỷ VNĐ",
      jobsCreated: 1200,
      conservationFundShare: "10%",
    },
    description:
      "Bảo tồn nghệ thuật làm gốm thủ công, số hóa hệ thống lò bầu cổ thế kỷ XIX và xây dựng trung tâm tinh hoa làng nghề kết hợp du lịch trải nghiệm sáng tạo.",
    highlights: [
      "Trung tâm Tinh hoa Làng nghề đón 600.000 lượt khách/năm",
      "Đào tạo nghề gốm cho thế hệ trẻ gìn giữ men lam cổ truyền",
      "Xuất khẩu gốm mỹ nghệ sang thị trường Nhật Bản và EU",
    ],
  },
  {
    id: "her_5",
    name: "Bảo tồn Thích ứng & Tour Đêm Hoàng thành Thăng Long",
    slug: "bao-ton-thich-ung-tour-dem-hoang-thanh-thang-long",
    location: "Ba Đình, Hà Nội",
    category: "Không gian Di sản",
    status: "Đang vận hành",
    imageUrl:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&h=750&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&h=500&q=80",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&h=500&q=80",
    ],
    economicMetrics: {
      annualRevenue: "85 tỷ VNĐ",
      jobsCreated: 450,
      conservationFundShare: "35%",
    },
    description:
      "Mô hình khai thác kinh tế đêm 'Giải mã Hoàng thành Thăng Long' kết hợp công nghệ trình chiếu 3D mapping, nghệ thuật diễn xướng cung đình và khảo cổ học cộng đồng.",
    highlights: [
      "Doanh thu trích lập trực tiếp vào quỹ khai quật khảo cổ học",
      "Hệ thống diễn giải di sản và thuyết minh tự động đa ngôn ngữ",
      "Trải nghiệm tương tác khảo cổ thu hút giới trẻ và học sinh",
    ],
  },
  {
    id: "her_6",
    name: "Kinh tế Di sản Cộng đồng Bản Lác – Mai Châu",
    slug: "kinh-te-di-san-cong-dong-ban-lac-mai-chau",
    location: "Mai Châu, Hòa Bình",
    category: "Kinh tế & Cộng đồng",
    status: "Mở rộng đầu tư",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=750&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&h=500&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&h=500&q=80",
    ],
    economicMetrics: {
      annualRevenue: "95 tỷ VNĐ",
      jobsCreated: 1100,
      conservationFundShare: "14%",
    },
    description:
      "Bảo tồn nguyên vẹn kiến trúc nhà sàn người Thái, phát triển mô hình homestay cộng đồng gắn liền với nghề dệt thổ cẩm truyền thống và nông nghiệp sinh thái.",
    highlights: [
      "100% hộ dân địa phương làm chủ thể hưởng lợi du lịch",
      "Thành lập hợp tác xã bảo tồn điệu xòe Thái và nghề dệt váy hoa",
      "Mô hình kinh tế xanh tuần hoàn không rác thải nhựa",
    ],
  },
];
