/**
 * DỮ LIỆU FALLBACK / MOCK IN-MEMORY CHO TRANG TIN TỨC (NEWS PAGE)
 * Tách biệt hoàn toàn khỏi Repository để đảm bảo không bị dính Prisma/Node.js vào Client Bundle.
 * Đầy đủ 11 bài viết chuyên sâu phục vụ các chuyên mục theo Đề án Mục 09 HEF.
 */

import type { NewsCategory, NewsItem } from "../types/news.types";

export const CATEGORIES: NewsCategory[] = [
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
    description: "Báo cáo đề xuất cơ chế, chính sách di sản",
  },
  {
    slug: "kinh-te-di-san",
    name: "Kinh tế Di sản",
    description: "Mô hình sinh kế, tài chính di sản và phát triển bền vững",
  },
  {
    slug: "dau-an-thanh-tuu",
    name: "Dấu ấn & Thành tựu",
    description: "Câu chuyện thành công và kết nối cộng đồng",
  },
  {
    slug: "truyen-thong",
    name: "Truyền thông & Báo chí",
    description: "Tin báo chí, phóng sự và tư liệu truyền thông",
  },
];

export const MOCK_NEWS_ARTICLES: NewsItem[] = [
  // =========================================================================
  // 5 BÀI VIẾT MASTER DATA TỪ TRANG CHỦ & ĐỀ ÁN TRỌNG TÂM
  // =========================================================================
  {
    id: "news_feat_1",
    slug: "cong-bo-khung-huong-dan-ppp-di-san",
    title: "Công bố Khung Hướng Dẫn Quốc Gia Về Đầu Tư Theo Phương Thức PPP Trong Bảo Tồn Di Sản Kiến Trúc",
    sapo: "Văn kiện quan trọng tháo gỡ nút thắt về vốn và cơ chế chuyển nhượng quyền khai thác dịch vụ di sản có thời hạn, bảo đảm quyền giám sát của nhà nước và cộng đồng.",
    content: `
## 1. Nhu cầu cấp thiết về khung pháp lý đối tác công - tư (PPP) trong lĩnh vực di sản

Tại phiên thảo luận chuyên đề của Diễn đàn Kinh tế Di sản (HEF), các chuyên gia đầu ngành đã chỉ rõ rằng ngân sách nhà nước dành cho công tác tu bổ, tôn tạo các di tích lịch sử - văn hóa hiện chỉ đáp ứng được khoảng 25-30% nhu cầu thực tế trên cả nước. Hàng nghìn công trình kiến trúc cổ kính đang đứng trước nguy cơ xuống cấp nghiêm trọng do thiếu hụt nguồn lực duy tu định kỳ.

Việc hoàn thiện và công bố **Khung Hướng Dẫn Quốc Gia Về Đầu Tư Theo Phương Thức Hợp Tác Công – Tư (PPP)** được kỳ vọng là bước đột phá thể chế, tạo hành lang pháp lý minh bạch và an toàn để thu hút nguồn vốn tư nhân vào công cuộc gìn giữ hồn cốt dân tộc.

> "Bảo tồn di sản không thể chỉ là gánh nặng của ngân sách nhà nước. Khi thiết lập được cơ chế chia sẻ rủi ro và lợi ích công bằng giữa Nhà nước, Doanh nghiệp và Cộng đồng, di sản sẽ trở thành tài sản sinh lợi bền vững." — *GS.TS. Trần Quốc Vượng, Chủ tịch Hội đồng Diễn đàn.*

### 2. Các nguyên tắc cốt lõi của Khung Hướng Dẫn PPP Di Sản

Khung hướng dẫn mới tập trung vào ba trụ cột chiến lược nhằm cân bằng giữa mục tiêu bảo tồn nguyên bản và khai thác kinh tế có trách nhiệm:

1. **Bảo tồn tính xác thực và tính toàn vẹn:** Mọi phương án đầu tư, khai thác dịch vụ tại di tích phải tuân thủ nghiêm ngặt Luật Di sản Văn hóa và các công ước quốc tế của UNESCO. Tuyệt đối không được phép làm biến dạng cấu trúc gốc và cảnh quan lịch sử.
2. **Cơ chế nhượng quyền khai thác dịch vụ có thời hạn (Concession):** Doanh nghiệp đầu tư vốn tu bổ và được quyền kinh doanh các dịch vụ phụ trợ (lưu trú văn hóa, ẩm thực di sản, trải nghiệm số) trong thời gian xác định, sau đó bàn giao lại nguyên vẹn cho cơ quan quản lý nhà nước.
3. **Trích lập Quỹ tái đầu tư di sản và sinh kế bản địa:** Tối thiểu 15-20% doanh thu thuần từ hoạt động dịch vụ tại di tích bắt buộc phải được tái phân bổ vào quỹ bảo tồn thường xuyên và hỗ trợ việc làm cho cộng đồng cư dân sở tại.

### 3. Lộ trình triển khai thử nghiệm (Sandbox) tại các đô thị trọng điểm

Trong giai đoạn 2026 - 2028, khung hướng dẫn sẽ được áp dụng thí điểm tại 05 cụm không gian di sản tiêu biểu:
- Quần thể không gian lịch sử phố cổ Hà Nội & Hoàng thành Thăng Long.
- Hệ thống nhà cổ và không gian làng nghề truyền thống Hội An (Quảng Nam).
- Các biệt thự kiến trúc Pháp cổ tại Đà Lạt và Hải Phòng.
- Quần thể danh thắng Cố đô Huế.

Các kết quả thí điểm sẽ là cơ sở thực tiễn quan trọng để Diễn đàn kiến nghị hoàn thiện Nghị định của Chính phủ về cơ chế tài chính đặc thù trong quản lý di sản văn hóa.
    `,
    category: "nghien-cuu-chinh-sach",
    categoryName: "Nghiên cứu & Chính sách",
    coverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=675&q=80",
    imageCaption: "Khung hướng dẫn PPP mở đường cho các dự án hợp tác công tư bảo tồn di sản bền vững.",
    author: {
      name: "Hội đồng Khoa học HEF",
      title: "Ban Thư ký Chiến lược Thể chế",
      organization: "Heritage Economy Forum",
    },
    publishedAt: "2026-11-04T08:30:00+07:00",
    isFeatured: true,
    readingMinutes: 6,
    tags: ["PPP", "Thể chế", "Bảo tồn kiến trúc", "Chính sách đầu tư"],
  },
  {
    id: "news_lat_1",
    slug: "unesco-danh-gia-cao-mo-hinh-trang-an",
    title: "UNESCO Đánh Giá Cao Mô Hình Kinh Tế Sinh Kế Tại Quần Thể Danh Thắng Tràng An",
    sapo: "Hơn 10.000 người dân vùng lõi di sản được đào tạo và làm việc trực tiếp trong ngành dịch vụ sinh thái, minh chứng cho sức mạnh cộng đồng làm chủ thể phát triển.",
    content: `
## 1. Tràng An – Điểm sáng toàn cầu về quản trị di sản kép

Tại kỳ họp thường niên của Ủy ban Di sản Thế giới UNESCO, phái đoàn chuyên gia quốc tế đã dành sự ghi nhận đặc biệt cho Quần thể Danh thắng Tràng An (Ninh Bình) như một mô hình mẫu mực về việc cân bằng giữa bảo tồn nghiêm ngặt cảnh quan Karst nhiệt đới và phát triển kinh tế du lịch sinh thái bền vững.

Tràng An là Di sản Thế giới hỗn hợp đầu tiên của Việt Nam và Đông Nam Á sở hữu cả giá trị văn hóa và thiên nhiên nổi bật toàn cầu. Tuy nhiên, thách thức lớn nhất trong quản lý di sản kép chính là bài toán sinh kế của hàng chục nghìn cư dân sinh sống ngay trong vùng lõi.

> "Tràng An đã chứng minh rằng khi người dân địa phương trở thành người thụ hưởng chính và người bảo vệ trực tiếp, di sản không chỉ được giữ gìn nguyên vẹn mà còn bừng nở sức sống mới." — *Đại diện Phái đoàn UNESCO tại Việt Nam.*

### 2. Mô hình hợp tác Ba Nhà: Nhà nước – Doanh nghiệp – Người dân

Sự thành công của Tràng An bắt nguồn từ cơ chế phối hợp chặt chẽ:
1. **Chuyển đổi nghề nghiệp bền vững:** Hơn 10.000 nông dân thuần túy trước đây đã được đào tạo nghiệp vụ chèo đò, hướng dẫn viên di sản và cung cấp dịch vụ ẩm thực bản địa với thu nhập ổn định và chế độ bảo hiểm đầy đủ.
2. **Quy tắc ứng xử văn minh và đạo đức di sản:** Người dân địa phương tự giác giữ gìn vệ sinh môi trường, không chèo kéo du khách và trở thành những đại sứ văn hóa kể câu chuyện lịch sử hàng nghìn năm của quê hương.
3. **Kiểm soát sức chứa du lịch bằng công nghệ:** Ứng dụng hệ thống vé điện tử và điều tiết thuyền bè theo luồng tuyến thông minh, đảm bảo không gian yên tĩnh cho hệ sinh thái động thực vật tự nhiên.

### 3. Bài học nhân rộng cho các vùng di sản Việt Nam

Từ thực tiễn Tràng An, Diễn đàn Kinh tế Di sản đang phối hợp với các tỉnh thành nhằm chuyển giao bộ chỉ số đo lường tác động kinh tế - xã hội, giúp các khu di sản khác như Phong Nha - Kẻ Bàng, Vịnh Hạ Long và Cao nguyên đá Đồng Văn xây dựng mô hình sinh kế bản địa hài hòa.
    `,
    category: "kinh-te-di-san",
    categoryName: "Kinh tế Di sản",
    coverImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=675&q=80",
    imageCaption: "Mô hình du lịch sinh thái cộng đồng tại Quần thể Danh thắng Tràng An.",
    author: {
      name: "Ban Thư ký Khoa học HEF",
      title: "Tổ Hợp tác Quốc tế",
      organization: "Heritage Economy Forum",
    },
    publishedAt: "2026-11-03T14:15:00+07:00",
    readingMinutes: 5,
    tags: ["UNESCO", "Tràng An", "Kinh tế sinh kế", "Cộng đồng bản địa"],
  },
  {
    id: "news_lat_2",
    slug: "hop-bao-khoi-dong-toa-dam-thu-cong",
    title: "Họp Báo Khởi Động Chuỗi Tọa Đàm 'Kinh Tế Sáng Tạo Từ Di Sản Thủ Công Mỹ Nghệ'",
    sapo: "Quy tụ 20 nghệ nhân tiêu biểu và các nhà thiết kế trẻ đương đại cùng giải bài toán thương mại hóa bản sắc văn hóa Việt Nam.",
    content: `
## 1. Đưa tinh hoa thủ công truyền thống vào dòng chảy kinh tế đương đại

Sáng ngày 02/11/2026, tại Hà Nội, Ban Thường trực Diễn đàn Kinh tế Di sản đã tổ chức buổi họp báo chính thức công bố chuỗi tọa đàm chuyên đề mang tên **"Kinh Tế Sáng Tạo Từ Di Sản Thủ Công Mỹ Nghệ"**. Sự kiện thu hút sự tham dự của hơn 60 cơ quan thông tấn báo chí, đại diện các hiệp hội làng nghề truyền thống và nhiều nhà thiết kế quốc tế.

Chuỗi tọa đàm là hoạt động học thuật và kết nối thương mại quan trọng nằm trong khuôn khổ chương trình chuẩn bị cho Kỳ Diễn đàn Thường niên 2026.

> "Thủ công truyền thống Việt Nam không thiếu sự tài hoa và chiều sâu văn hóa, nhưng chúng ta đang thiếu năng lực kết nối với tư duy thiết kế đương đại và chuỗi cung ứng toàn cầu." — *KTS. Lê Hoàng Phương, Ủy viên Thường trực Diễn đàn.*

### 2. Nội dung các phiên đối thoại trọng điểm

Chuỗi sự kiện bao gồm 03 phiên bàn tròn chuyên sâu:
1. **Thiết kế đương đại đối thoại với kỹ nghệ cổ:** Kết nối các nghệ nhân gốm Chu Đậu, thêu Quất Động, sơn mài Hạ Thái với các nhà thiết kế công nghiệp trẻ để tạo ra các dòng sản phẩm ứng dụng cao cấp.
2. **Bảo hộ chỉ dẫn địa lý và bản quyền số:** Giải pháp đăng ký thương hiệu di sản làng nghề trên các nền tảng thương mại điện tử xuyên biên giới và chống hàng giả, hàng nhái.
3. **Thúc đẩy du lịch trải nghiệm làng nghề:** Xây dựng mô hình homestay di sản, tour workshop chế tác trực tiếp dành cho du khách quốc tế.

Ban Tổ chức cho biết, kết quả của chuỗi tọa đàm sẽ được đúc kết thành Sách Trắng về Làng Nghề Thủ Công Việt Nam 2026 và công bố tại phiên toàn thể diễn đàn.
    `,
    category: "hoat-dong",
    categoryName: "Hoạt động Diễn đàn",
    coverImage:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&h=675&q=80",
    imageCaption: "Họp báo khởi động chuỗi tọa đàm Kinh tế sáng tạo từ Di sản Thủ công mỹ nghệ.",
    author: {
      name: "Ban Truyền thông HEF",
      title: "Bộ phận Sự kiện & Báo chí",
      organization: "Heritage Economy Forum",
    },
    publishedAt: "2026-11-02T10:00:00+07:00",
    readingMinutes: 4,
    tags: ["Làng nghề", "Thủ công mỹ nghệ", "Kinh tế sáng tạo", "Tọa đàm"],
  },
  {
    id: "news_lat_3",
    slug: "ung-dung-ban-do-so-gis-di-san",
    title: "Ứng Dụng Bản Đồ Số Di Sản GIS Phục Vụ Quy Hoạch Và Thu Hút Đầu Tư Du Lịch",
    sapo: "Số hóa hơn 3.000 điểm di tích xếp hạng cấp quốc gia trên nền tảng bản đồ số tương tác mở, tạo hạ tầng dữ liệu đồng bộ cho kinh tế di sản.",
    content: `
## 1. Hạ tầng dữ liệu không gian – Nền móng của Kinh tế Di sản số

Trong kỷ nguyên số hóa, việc thiếu dữ liệu không gian chuẩn xác là một trong những rào cản lớn nhất khiến các nhà đầu tư gặp khó khăn khi tiếp cận các dự án du lịch văn hóa. Nhằm giải quyết căn cơ bài toán này, Nhóm Chuyên trách Di sản Số thuộc HEF đã chính thức ra mắt phiên bản thử nghiệm của **Hệ thống Bản đồ Số Di sản Văn hóa Việt Nam (Heritage GIS)**.

Dự án sử dụng công nghệ GIS đa tầng kết hợp ảnh vệ tinh độ phân giải cao và mô hình quét 3D LiDAR, cho phép tích hợp dữ liệu đa chiều về vị trí địa lý, hiện trạng pháp lý, lịch sử tôn tạo và chỉ số kinh tế xung quanh mỗi di tích.

> "Dữ liệu mở là chìa khóa mở đường cho các sáng kiến kinh tế. Khi một nhà đầu tư có thể nhìn thấy bức tranh tổng thể về kết nối giao thông, sức chứa và dòng khách du lịch qua bản đồ GIS, quyết định đầu tư sẽ nhanh chóng và chuẩn xác hơn rất nhiều." — *TS. Nguyễn Thị Thu Hà, Chuyên gia Kinh tế Sáng tạo.*

### 2. Các tính năng nổi bật của nền tảng Heritage GIS

1. **Số hóa không gian 3.000+ di tích:** Cung cấp thông tin ranh giới khoanh vùng bảo vệ (Khu vực I và II), giúp các nhà quy hoạch đô thị tránh các sai phạm xâm lấn di sản.
2. **Bản đồ nhiệt dòng khách và dịch vụ:** Thể hiện trực quan mật độ du khách theo mùa, các điểm dịch vụ ẩm thực, lưu trú và doanh thu bình quân tại từng tiểu vùng.
3. **Cổng thông tin xúc tiến đầu tư công - tư:** Đăng tải danh mục các công trình di sản đang kêu gọi vốn xã hội hóa kèm hồ sơ khả thi và khung pháp lý tương ứng.

Dự kiến, hệ thống sẽ mở quyền truy cập miễn phí cho các cơ quan quản lý, viện nghiên cứu và sinh viên trên toàn quốc từ quý I năm 2027.
    `,
    category: "kinh-te-di-san",
    categoryName: "Kinh tế Di sản",
    coverImage:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&h=675&q=80",
    imageCaption: "Giao diện Hệ thống Bản đồ số Di sản GIS phục vụ xúc tiến đầu tư văn hóa.",
    author: {
      name: "Nhóm Dự án Công nghệ Di sản",
      title: "Tổ Kỹ thuật Bản đồ Số",
      organization: "Heritage Economy Forum",
    },
    publishedAt: "2026-11-01T16:45:00+07:00",
    readingMinutes: 5,
    tags: ["GIS", "Bản đồ số", "Chuyển đổi số", "Quy hoạch du lịch"],
  },
  {
    id: "news_lat_4",
    slug: "chinh-sach-khuyen-khich-doanh-nghiep-di-san",
    title: "Chính Sách Khuyến Khích Doanh Nghiệp Tư Nhân Đầu Tư Vào Không Gian Di Sản",
    sapo: "Hoàn thiện hành lang pháp lý về hợp tác công tư (PPP) trong bảo tồn và khai thác giá trị di tích lịch sử, kích hoạt nguồn vốn xã hội hóa.",
    content: `
## 1. Mở rộng không gian kinh tế cho các doanh nghiệp văn hóa

Tại tọa đàm chính sách thường niên, các đại biểu Quốc hội, chuyên gia tài chính và đại diện cộng đồng doanh nghiệp đã cùng phân tích các rào cản khiến khối tư nhân còn e dè khi tham gia vào các dự án bảo tồn di sản. Mặc dù nhiều doanh nghiệp có tiềm lực tài chính và mong muốn cống hiến cho văn hóa, nhưng việc thiếu cơ chế ưu đãi thuế và thủ tục cấp phép phức tạp đang là rào cản lớn.

Báo cáo nghiên cứu mới nhất của HEF đề xuất gói chính sách khuyến khích toàn diện gồm 4 đòn bẩy kinh tế thiết thực.

> "Doanh nghiệp đầu tư vào di sản không chỉ tìm kiếm lợi nhuận đơn thuần, họ đang cùng Nhà nước gánh vác trách nhiệm bảo tồn lịch sử. Chính sách phải đối xử với họ như những đối tác chiến lược phụng sự cộng đồng." — *ThS. Lê Quốc Vinh, Ủy viên Hội đồng HEF.*

### 2. Bốn đòn bẩy chính sách trọng tâm

1. **Ưu đãi thuế thu nhập doanh nghiệp:** Cho phép giảm trừ chi phí tài trợ hoặc đầu tư trực tiếp vào trùng tu di tích được xếp hạng khi tính thuế thu nhập doanh nghiệp.
2. **Kéo dài thời hạn thuê và nhượng quyền sử dụng đất:** Đảm bảo chu kỳ thuê đất di sản từ 30 đến 50 năm để doanh nghiệp an tâm đầu tư hạ tầng đồng bộ và có thời gian thu hồi vốn dài hạn.
3. **Cơ chế một cửa liên thông:** Thành lập tổ công tác liên ngành (Văn hóa - Kế hoạch - Xây dựng - Môi trường) để thẩm định nhanh các đề án bảo tồn thích ứng trong vòng 45 ngày làm việc.
4. **Hỗ trợ lãi suất vay vốn cho dự án bảo tồn di sản xanh:** Liên kết với các ngân hàng thương mại để triển khai các gói tín dụng xanh và trái phiếu văn hóa với lãi suất ưu đãi.

Bản kiến nghị chính sách chi tiết đã được gửi tới các bộ ngành liên quan để phục vụ quá trình sửa đổi, bổ sung Luật Di sản Văn hóa trong kỳ họp Quốc hội tới.
    `,
    category: "nghien-cuu-chinh-sach",
    categoryName: "Nghiên cứu & Chính sách",
    coverImage:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&h=675&q=80",
    imageCaption: "Tọa đàm chính sách khuyến khích doanh nghiệp tư nhân đầu tư vào di sản.",
    author: {
      name: "Hội đồng Khoa học HEF",
      title: "Tổ Tư vấn Chính sách Thể chế",
      organization: "Heritage Economy Forum",
    },
    publishedAt: "2026-10-31T09:30:00+07:00",
    readingMinutes: 5,
    tags: ["Chính sách", "Doanh nghiệp", "Thuế di sản", "Bảo tồn thích ứng"],
  },

  // =========================================================================
  // 6 BÀI VIẾT BỔ TRỢ HỌC THUẬT & TRUYỀN THÔNG (MOCK ORIGINAL)
  // =========================================================================
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
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&h=675&q=80",
    imageCaption: "Hội nghị phát triển công nghiệp văn hóa và kinh tế hóa di sản bền vững.",
    author: {
      name: "Ban Thư ký Khoa học HEF",
      title: "Bộ phận Phân tích Chiến lược",
      organization: "Heritage Economy Forum",
    },
    publishedAt: "2026-11-02T08:30:00+07:00",
    isFeatured: false,
    readingMinutes: 6,
    tags: ["Kinh tế di sản", "Chính sách", "Công nghiệp văn hóa", "Bảo tồn thích ứng"],
  },
  {
    id: "news-2",
    slug: "chinh-thuc-cong-bo-chuong-trinh-nghi-su-dien-dan-2026-tai-ha-noi",
    title: "Chính thức công bố Chương trình Nghị sự Kỳ Diễn đàn Kinh tế Di sản 2026",
    sapo: "Với chủ đề 'Di sản kiến tạo giá trị – Phát triển hướng tương lai', sự kiện quy tụ hơn 800 đại biểu trong nước và quốc tế tại Hoàng thành Thăng Long.",
    content: `
## 1. Sự kiện thường niên quy mô quốc gia về Kinh tế Di sản

Ban Tổ chức Diễn đàn Kinh tế Di sản (HEF) vừa chính thức công bố lịch trình và chương trình nghị sự chi tiết của Kỳ Diễn đàn Thường niên 2026. Sự kiện sẽ diễn ra từ ngày 15 đến 17 tháng 11 năm 2026 tại Trung tâm Hội nghị Quốc tế và Hoàng thành Thăng Long, Thủ đô Hà Nội.

Với sự tham gia của hơn 800 đại biểu đại diện cho các ban bộ ngành trung ương, đại sứ quán các nước, các tổ chức quốc tế (UNESCO, ICOMOS), các viện nghiên cứu và hơn 300 lãnh đạo doanh nghiệp hàng đầu, đây là diễn đàn đối thoại chính sách và xúc tiến đầu tư di sản quy mô lớn nhất trong năm.

> "Diễn đàn 2026 không chỉ là nơi bàn luận học thuật, mà là sàn kết nối thực chất giữa các địa phương nắm giữ di sản và các nhà đầu tư chiến lược." — *TS. Phạm Thanh Nga, Trưởng Ban Điều hành HEF.*

### 2. Bốn phiên nghị sự chuyên sâu

1. **Phiên Toàn Thể (Sáng 15/11):** Định vị Kinh tế Di sản trong Chiến lược Quốc gia và công bố Báo cáo thường niên HEF 2026.
2. **Phiên Chuyên Đề 1 (Chiều 15/11):** Đối tác Công Tư (PPP) trong bảo tồn thích ứng và phát triển hạ tầng văn hóa.
3. **Phiên Chuyên Đề 2 (Sáng 16/11):** Chuyển đổi số, Bảo tàng ảo và Ứng dụng Bản đồ GIS Di sản.
4. **Phiên Chuyên Đề 3 (Chiều 16/11):** Sinh kế cộng đồng bản địa và chuỗi giá trị thủ công mỹ nghệ làng nghề.
    `,
    category: "hoat-dong",
    categoryName: "Hoạt động Diễn đàn",
    coverImage:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&h=500&q=80",
    imageCaption: "Hoàng thành Thăng Long – địa điểm đăng cai phiên toàn thể Kỳ Diễn đàn 2026.",
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
    content: `
## 1. Bài học quốc tế về huy động vốn tư nhân vào di sản

Tại phiên đối thoại bàn tròn do Diễn đàn tổ chức, PGS.TS. Trần Đình Quang đã chia sẻ các mô hình thành công tại Ý, Nhật Bản và Pháp trong việc áp dụng hợp đồng đối tác công tư để bảo tồn lâu đài, phố cổ và bảo tàng tư nhân.

Mấu chốt để doanh nghiệp mặn mà với di sản nằm ở tính dự báo được của chính sách và sự minh bạch trong việc phân chia doanh thu bán vé, dịch vụ thương mại.

> "Khi nhà nước đóng vai trò kiến tạo và giám sát chất lượng bảo tồn, doanh nghiệp sẽ mang lại tính năng động, sáng tạo và sự phục vụ chuyên nghiệp cho du khách." — *PGS.TS. Trần Đình Quang.*

### 2. Ba khuyến nghị chính sách tài chính

1. **Thành lập Quỹ Hạt giống Di sản Quốc gia (Heritage Seed Fund):** Cung cấp vốn đối ứng ban đầu cho các dự án PPP khả thi.
2. **Quy chuẩn hợp đồng mẫu nhượng quyền (BOT/BTO văn hóa):** Giảm thiểu chi phí đàm phán pháp lý giữa chính quyền địa phương và nhà đầu tư.
3. **Cơ chế chia sẻ rủi ro mùa vụ:** Giảm tiền thuê mặt bằng trong mùa thấp điểm du lịch để doanh nghiệp yên tâm duy trì chất lượng dịch vụ.
    `,
    category: "goc-chuyen-gia",
    categoryName: "Góc chuyên gia",
    coverImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&h=500&q=80",
    imageCaption: "Hội thảo bàn tròn đối thoại giải pháp tài chính di sản.",
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
    content: `
## 1. Đưa lò bầu cổ Bát Tràng vào không gian Metaverse

Dự án số hóa làng gốm cổ Bát Tràng (Gia Lâm, Hà Nội) do Viện Kinh tế Sáng tạo phối hợp với HEF triển khai đã hoàn thành giai đoạn 1 với việc quét 3D toàn bộ hệ thống lò bầu cổ thế kỷ XIX và phục dựng bảo tàng gốm ảo tương tác 360 độ.

Du khách từ bất kỳ đâu trên thế giới đều có thể tham quan lò nung cổ, tương tác trực tiếp với các dòng men lam, men rạn truyền thống và đặt mua sản phẩm độc bản có chứng nhận xác thực số NFT.

> "Công nghệ số không làm mất đi hồn cốt thủ công, mà trái lại mở ra đôi cánh mới đưa tinh hoa gốm Việt đến với các bảo tàng và nhà sưu tập quốc tế." — *Ông Hoàng Minh Đức, Chuyên gia Di sản Số.*

### 2. Hiệu quả kinh tế thực tế

Trong 6 tháng thử nghiệm, mô hình showroom ảo đã ghi nhận:
- Hơn 150.000 lượt tham quan trực tuyến từ 35 quốc gia.
- Mức tăng trưởng doanh thu sản phẩm tinh hoa cao cấp đạt 35%.
- Đào tạo kỹ năng số cho 120 nghệ nhân trẻ tại làng nghề.
    `,
    category: "kinh-te-di-san",
    categoryName: "Kinh tế Di sản",
    coverImage:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&h=500&q=80",
    imageCaption: "Bảo tàng ảo và số hóa sản phẩm gốm Bát Tràng.",
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
    content: `
## 1. Tôn vinh các điển hình dung hòa di sản và kinh tế

Giải thưởng Thường niên HEF "Phát Triển Bền Vững Chủ Động" năm 2026 đã chính thức mở cổng tiếp nhận hồ sơ từ ngày 20/10/2026 đến hết ngày 30/10/2026. Đây là giải thưởng uy tín nhằm tôn vinh các tổ chức, doanh nghiệp, kiến trúc sư và cộng đồng địa phương có đóng góp xuất sắc trong việc biến di sản thành động lực phát triển bền vững.

Hội đồng Giải thưởng gồm các nhà khoa học, chuyên gia bảo tồn quốc tế và đại diện cơ quan quản lý văn hóa sẽ đánh giá theo 4 tiêu chí cốt lõi: tính nguyên bản, hiệu quả kinh tế, tác động xã hội và tính sáng tạo nhân rộng.

> "Chúng tôi không tìm kiếm những dự án hào nhoáng, mà trân trọng những mô hình tạo ra việc làm bền vững cho người dân và trích lợi nhuận nuôi dưỡng lại di tích." — *Ban Thư ký Giải thưởng HEF.*

### 2. Các hạng mục trao giải tiêu biểu

1. Dự án Bảo tồn thích ứng xuất sắc nhất.
2. Mô hình Kinh tế Sinh kế Bản địa bền vững nhất.
3. Sáng kiến Ứng dụng Công nghệ & Số hóa Di sản.
4. Doanh nghiệp Đồng hành & Tài trợ Văn hóa tiêu biểu.
    `,
    category: "dau-an-thanh-tuu",
    categoryName: "Dấu ấn & Thành tựu",
    coverImage:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&h=500&q=80",
    imageCaption: "Biểu trưng Giải thưởng Phát triển Bền vững Chủ động HEF.",
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
    content: `
## 1. Thiết lập Liên minh Hành động Kinh tế Di sản

Hôm nay, tại Hà Nội, Ban Thường trực Diễn đàn Kinh tế Di sản (HEF) đã ký kết thỏa thuận hợp tác chiến lược nhiều bên cùng các tổ chức đối tác văn hóa trong nước và quốc tế.

Biên bản ghi nhớ tập trung vào 3 trọng tâm phối hợp:
1. Xây dựng Khung tiêu chuẩn Quốc gia đo lường chỉ số đóng góp của di sản văn hóa vào GDP.
2. Đào tạo nâng cao năng lực quản trị di sản cho cán bộ địa phương và ban quản lý di tích.
3. Tổ chức chuỗi diễn đàn đối thoại thường niên kết nối đầu tư văn hóa có trách nhiệm.

Thỏa thuận này đánh dấu bước chuyển mình quan trọng của HEF từ một diễn đàn thảo luận hướng tới một mạng lưới hành động thực chất và hiệu quả.
    `,
    category: "truyen-thong",
    categoryName: "Truyền thông",
    coverImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&h=500&q=80",
    imageCaption: "Lễ ký kết biên bản ghi nhớ hợp tác chiến lược đa phương.",
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
