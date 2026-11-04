/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE TIN TỨC
 */

import type {
  NewsCategory,
  NewsItem,
  NewsPageData,
  INewsRepository,
  NewsCategorySlug,
} from "../types/news.types";

const CATEGORIES: NewsCategory[] = [
  {
    slug: "hoat-dong",
    name: "Hoạt động Diễn đàn",
    description: "Sự kiện, thông báo và lịch trình nghị sự",
  },
  {
    slug: "goc-chuyen-gia",
    name: "Góc chuyên gia",
    description: "Phỏng vấn, nhận định và góc nhìn học thuật",
  },
  {
    slug: "nghien-cuu-chinh-sach",
    name: "Nghiên cứu & Chính sách",
    description: "Báo cáo, công trình và kiến nghị thể chế",
  },
  {
    slug: "kinh-te-di-san",
    name: "Kinh tế Di sản",
    description: "Mô hình thực hành, thị trường và sản phẩm văn hóa",
  },
  {
    slug: "dau-an-thanh-tuu",
    name: "Dấu ấn & Thành tựu",
    description: "Tôn vinh các điển hình và dự án tiêu biểu",
  },
  {
    slug: "truyen-thong",
    name: "Truyền thông",
    description: "Thông cáo báo chí, hình ảnh và tư liệu số",
  },
];

const MOCK_NEWS_ARTICLES: NewsItem[] = [
  {
    id: "news-1",
    slug: "kinh-te-hoa-di-san-dong-luc-phat-trien-cong-nghiep-van-hoa-viet-nam",
    title: "Kinh tế hóa Di sản: Động lực mới phát triển các ngành Công nghiệp Văn hóa Việt Nam",
    sapo: "Báo cáo nghiên cứu thường niên của Diễn đàn Kinh tế Di sản nhận diện nguồn vốn văn hóa và cơ chế chuyển hóa giá trị di tích thành sản phẩm gia tăng.",
    content: `
## 1. Bối cảnh mới của Kinh tế Di sản

Tại Hội nghị Văn hóa Toàn quốc, yêu cầu phát triển các ngành công nghiệp văn hóa tương xứng với tiềm năng dân tộc đã được đặt ra như một nhiệm vụ chiến lược. Di sản không còn là một thực thể tĩnh chỉ trông đợi vào bầu sữa ngân sách để duy tu, mà hoàn toàn có thể trở thành nguồn lực đầu vào sống động cho chuỗi giá trị kinh tế sáng tạo.

> "Bảo tồn không đối lập với phát triển. Một di sản thực sự bền vững khi nó nuôi dưỡng được cộng đồng cư dân bản địa và tạo ra dòng tiền tái đầu tư tự thân." — *GS.TS. Nguyễn Văn Thịnh, Chủ tịch Hội đồng Khoa học HEF.*

### 2. Ba trụ cột chuyển hóa giá trị di sản

1. **Chuỗi cung ứng du lịch trải nghiệm có trách nhiệm:** Thay vì du lịch đại chúng xâm lấn cảnh quan, chuyển dịch sang trải nghiệm văn hóa bản địa chất lượng cao với sức chứa được kiểm soát nghiêm ngặt.
2. **Kinh tế số và bảo tàng thực tế ảo:** Số hóa 3D các cổ vật, di tích quốc gia đặc biệt để tạo tác quyền số, phát triển các tour tham quan thực tế ảo và giáo dục di sản xuyên biên giới.
3. **Thương mại hóa thủ công mỹ nghệ cao cấp:** Kết nối nghệ nhân các làng nghề truyền thống với các nhà thiết kế đương đại để đưa sản phẩm di sản vào phân khúc quà tặng ngoại giao và tiêu dùng quốc tế.
    `,
    category: "nghien-cuu-chinh-sach",
    categoryName: "Nghiên cứu & Chính sách",
    coverImage:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&h=675&q=80",
    author: {
      name: "Ban Thư ký Khoa học HEF",
      title: "Bộ phận Phân tích Chiến lược",
      organization: "Heritage Economy Forum",
    },
    publishedAt: "2026-11-02T08:30:00+07:00",
    isFeatured: true,
    readingMinutes: 6,
    tags: ["Kinh tế di sản", "Chính sách", "Công nghiệp văn hóa", "Bảo tồn thích ứng"],
  },
  {
    id: "news-2",
    slug: "chinh-thuc-cong-bo-chuong-trinh-nghi-su-dien-dan-2026-tai-ha-noi",
    title: "Chính thức công bố Chương trình Nghị sự Kỳ Diễn đàn Kinh tế Di sản 2026",
    sapo: "Với chủ đề 'Di sản kiến tạo giá trị – Phát triển hướng tương lai', sự kiện quy tụ hơn 800 đại biểu trong nước và quốc tế tại Hoàng thành Thăng Long.",
    content:
      "Diễn đàn 2026 sẽ diễn ra từ ngày 18 đến 20 tháng 11 năm 2026 với 04 phiên nghị sự trọng tâm, bàn tròn đối thoại công tư và lễ vinh danh giải thưởng.",
    category: "hoat-dong",
    categoryName: "Hoạt động Diễn đàn",
    coverImage:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "TS. Phạm Thanh Nga",
      title: "Trưởng Ban Điều hành",
      organization: "Heritage Economy Forum",
    },
    publishedAt: "2026-11-01T14:15:00+07:00",
    readingMinutes: 4,
    tags: ["Sự kiện 2026", "Nghị sự", "Hoàng thành Thăng Long"],
  },
  {
    id: "news-3",
    slug: "doi-thoai-chuyen-gia-giai-phap-tai-chinh-ppp-cho-khong-gian-di-san",
    title: "Đối thoại Chuyên gia: Khung cơ chế Hợp tác Công – Tư (PPP) trong bảo tồn di tích",
    sapo: "Phân tích kinh nghiệm quốc tế và đề xuất cơ chế thử nghiệm tài chính (sandbox) giúp doanh nghiệp tham gia đầu tư vào hạ tầng dịch vụ di sản.",
    content:
      "Nhiều chuyên gia tài chính và di sản nhận định hợp đồng đối tác công tư sẽ giải quyết bài toán thiếu hụt vốn đầu tư công nếu có quy chế phân chia doanh thu rành mạch.",
    category: "goc-chuyen-gia",
    categoryName: "Góc chuyên gia",
    coverImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "PGS.TS. Trần Đình Quang",
      title: "Chuyên gia Kinh tế Du lịch",
      organization: "Đại học Quốc gia Hà Nội",
    },
    publishedAt: "2026-10-28T09:00:00+07:00",
    readingMinutes: 5,
    tags: ["PPP", "Đầu tư", "Cơ chế thử nghiệm"],
  },
  {
    id: "news-4",
    slug: "so-hoa-3d-di-san-lang-nghe-gom-bat-trang-tren-ban-do-kinh-te-so",
    title: "Số hóa 3D và Bảo tàng ảo: Hướng đi mới nâng tầm thương hiệu Gốm Bát Tràng",
    sapo: "Mô hình kết hợp công nghệ thực tế ảo và thương mại điện tử giúp nghệ nhân làng gốm tiếp cận trực tiếp thị trường sưu tập mỹ thuật toàn cầu.",
    content:
      "Dự án số hóa làng gốm Bát Tràng đã ghi nhận mức tăng trưởng doanh thu sản phẩm tinh hoa lên tới 35% trong giai đoạn thử nghiệm.",
    category: "kinh-te-di-san",
    categoryName: "Kinh tế Di sản",
    coverImage:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Ông Hoàng Minh Đức",
      title: "Chuyên gia Di sản Số",
      organization: "Viện Kinh tế Sáng tạo",
    },
    publishedAt: "2026-10-25T16:30:00+07:00",
    readingMinutes: 4,
    tags: ["Làng nghề", "Gốm Bát Tràng", "Di sản số"],
  },
  {
    id: "news-5",
    slug: "khoi-dong-giai-thuong-phat-trien-ben-vung-chu-dong-nam-2026",
    title: "Khởi động tiếp nhận đề cử Giải thưởng Phát triển Bền vững Chủ động 2026",
    sapo: "Hội đồng Diễn đàn chính thức mở cổng tiếp nhận hồ sơ xét chọn với 08 hạng mục tôn vinh các sáng kiến và doanh nghiệp tiêu biểu.",
    content:
      "Giải thưởng hướng tới ghi nhận những đóng góp thiết thực vì sự phát triển bền vững và phụng sự cộng đồng.",
    category: "dau-an-thanh-tuu",
    categoryName: "Dấu ấn & Thành tựu",
    coverImage:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Ban Thư ký Giải thưởng",
      title: "Tổ xét duyệt hồ sơ",
      organization: "Heritage Economy Forum",
    },
    publishedAt: "2026-10-20T10:00:00+07:00",
    readingMinutes: 3,
    tags: ["Giải thưởng", "Đề cử 2026"],
  },
  {
    id: "news-6",
    slug: "thong-cao-bao-chi-ky-ket-hop-tac-chien-luoc-voi-unesco-viet-nam",
    title: "Thông cáo Báo chí: Ký kết hợp tác chiến lược giữa HEF và các tổ chức đối tác văn hóa",
    sapo: "Thiết lập mạng lưới liên minh hành động nhằm chia sẻ dữ liệu và xây dựng khung tiêu chuẩn đo lường chỉ số tác động kinh tế di sản.",
    content: "Biên bản ghi nhớ hợp tác xác định 5 lĩnh vực ưu tiên trong giai đoạn 2026-2030.",
    category: "truyen-thong",
    categoryName: "Truyền thông",
    coverImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&h=500&q=80",
    author: {
      name: "Bộ phận Đối ngoại & Truyền thông",
      title: "Văn phòng Thường trực",
      organization: "Heritage Economy Forum",
    },
    publishedAt: "2026-10-15T11:00:00+07:00",
    readingMinutes: 3,
    tags: ["Thông cáo", "Hợp tác đối tác"],
  },
];

export class NewsRepository implements INewsRepository {
  async getNewsPageData(): Promise<NewsPageData> {
    const featured = MOCK_NEWS_ARTICLES.find((a) => a.isFeatured) || MOCK_NEWS_ARTICLES[0];
    const topSide = MOCK_NEWS_ARTICLES.filter((a) => a.id !== featured.id).slice(0, 3);
    const latest = MOCK_NEWS_ARTICLES.filter((a) => a.id !== featured.id);

    return {
      featuredArticle: featured,
      topSideArticles: topSide,
      latestArticles: latest,
      categories: CATEGORIES,
    };
  }

  async getArticleBySlug(slug: string): Promise<NewsItem | null> {
    const article = MOCK_NEWS_ARTICLES.find((a) => a.slug === slug);
    return article || null;
  }

  async getRelatedArticles(currentSlug: string, category: NewsCategorySlug): Promise<NewsItem[]> {
    return MOCK_NEWS_ARTICLES.filter(
      (a) => a.slug !== currentSlug && a.category === category
    ).slice(0, 3);
  }
}

export const newsRepository = new NewsRepository();
