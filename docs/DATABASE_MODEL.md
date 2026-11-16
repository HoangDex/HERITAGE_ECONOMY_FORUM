# ĐẶC TẢ THIẾT KẾ CƠ SỞ DỮ LIỆU & KIẾN TRÚC BACKEND CMS
## DIỄN ĐÀN KINH TẾ DI SẢN (HERITAGE ECONOMY FORUM - HEF)

> **Tài liệu kỹ thuật**: Phiên bản 2.0 (Page-Centric Hybrid CMS Architecture)  
> **Áp dụng cho**: Toàn bộ hệ thống quản trị CMS, REST APIs, Server Actions và CSDL MariaDB / MySQL.

---

## 1. NGUYÊN LÝ THIẾT KẾ: KIẾN TRÚC TỐI ƯU HÓA (PAGE JSON-FIRST & COMPONENT-DRIVEN)

Hệ thống CMS Diễn đàn Kinh tế Di sản (HEF) áp dụng triệt để nguyên lý: **"Dữ liệu tĩnh/bán tĩnh gắn liền với giao diện lưu toàn bộ vào JSON của Page; chỉ dữ liệu nghiệp vụ biến động liên tục mới tạo bảng CSDL riêng"**:
- **Component xây dựng cứng theo giao diện (Component-Driven)**: Các khối UI như Phiên diễn đàn (4 Sessions), Diễn giả (Speakers), Trục thời gian (Timeline), Tiêu chí giải thưởng, Đối tác/Logo, Ban điều hành, FAQ... được xây dựng component cứng dựa trên wireframe/Figma. Toàn bộ nội dung của các component này được Admin chỉnh sửa trực tiếp thông qua **trường `sections: PageSection[]` (JSON)** của trang đó.
- **Không tạo bảng quan hệ thừa**: Loại bỏ hoàn toàn các bảng cồng kềnh không cần thiết (`forum_editions`, `forum_sessions`, `speakers`, `session_speakers`, `forum_resources`, `awards`, `award_categories`, `organizations`, `page_organizations`).
- **Chỉ 4 nhóm dữ liệu biến động cần lưu trữ CSDL riêng biệt**:
  1. **`User`** (`users`): Tài khoản Admin duy nhất đăng nhập dashboard quản trị CMS (`id`, `email`, `name`, `passwordHash`, `role`).
  2. **`Page`** (`pages`): Thực thể trang trung tâm lưu trữ toàn bộ cấu trúc khối giao diện và thuộc tính component (`sections Json`).
  3. **`Article` & `ArticleContent`** (`articles`, `article_contents`, `categories`): Báo chí tin tức dài hạn với CKEditor 1:1 (`contentJson`, `contentHtml`, `tableOfContents`). Cần bảng riêng vì bài viết phát sinh liên tục theo thời gian, có tìm kiếm, phân trang và danh mục.
  4. **`HeritageProject`** (`heritage_projects`): Danh mục dự án kinh tế di sản có trang chi tiết `/projects/[slug]` và các chỉ số kinh tế cần truy vấn thống kê (`annualRevenue`, `jobsCreated`, `conservationFundShare`).
  5. **`ContactSubmission`** (`contact_submissions`): Hồ sơ, đăng ký, đề cử, liên hệ do người dùng vãng lai gửi về qua các form CTA.

---

## 2. SƠ ĐỒ THỰC THỂ QUAN HỆ TINH GỌN (MERMAID ERD)

```mermaid
erDiagram
    %% BẢNG TRUNG TÂM GỐC
    PAGES ||--o{ NEWS : "quản lý tin tức qua pageSlug"
    PAGES ||--o{ HERITAGE_PROJECTS : "quản lý dự án qua pageSlug"
    PAGES ||--o{ FORUM_EDITIONS : "quản lý kỳ diễn đàn qua pageSlug"
    PAGES ||--o{ AWARDS : "quản lý kỳ giải thưởng qua pageSlug"
    PAGES ||--o{ PAGE_ORGANIZATIONS : "liên kết đối tác qua pageSlug"
    PAGES ||--o{ CONTACT_SUBMISSIONS : "nhận form CTA qua pageSlug"

    %% BÁO CHÍ TIN TỨC DÀI HẠN (CKEDITOR)
    CATEGORIES ||--o{ NEWS : "phân loại danh mục"
    NEWS ||--|| NEWS_CONTENTS : "nội dung chi tiết 1:1"

    %% KỲ DIỄN ĐÀN & PHIÊN NGHỊ SỰ
    FORUM_EDITIONS ||--o{ FORUM_SESSIONS : "gồm các phiên"
    FORUM_EDITIONS ||--o{ FORUM_RESOURCES : "tài liệu & kỷ yếu"
    FORUM_SESSIONS ||--o{ SESSION_SPEAKERS : "phân công"
    SPEAKERS ||--o{ SESSION_SPEAKERS : "trình bày"

    %% GIẢI THƯỞNG PHÁT TRIỂN BỀN VỮNG
    AWARDS ||--o{ AWARD_CATEGORIES : "gồm hạng mục"
    AWARD_CATEGORIES ||--o{ AWARD_NOMINATIONS : "hồ sơ đề cử"

    %% ĐỐI TÁC HIỂN THỊ
    ORGANIZATIONS ||--o{ PAGE_ORGANIZATIONS : "hiển thị trên trang"

    PAGES {
        string id PK "CUID"
        string slug UK "slug: home, about, forum, awards, news, projects, contact"
        string name "Tên trang quản trị"
        string title "Tiêu đề trang web"
        text description "Mô tả SEO trang"
        json seoProps "metaTitle, metaDesc, ogImage, keywords"
        json sections "Toàn bộ dữ liệu của các component giao diện (Sessions, Speakers, Timeline, Partners, FAQs...)"
        boolean isPublished "Trạng thái công khai"
        int order "Thứ tự sắp xếp menu"
        datetime publishedAt "Ngày công khai"
    }

    USERS {
        string id PK "CUID"
        string email UK "Email đăng nhập Admin"
        string name "Tên quản trị viên"
        string passwordHash "Mật khẩu mã hóa"
        string role "ADMIN / EDITOR"
        string organization "Đơn vị công tác"
        string avatarUrl "Ảnh đại diện"
        text bio "Tiểu sử vắn tắt"
    }

    CATEGORIES {
        string id PK "CUID"
        string name "Tên danh mục tin"
        string slug UK "slug-danh-muc"
        text description "Mô tả chuyên mục"
    }

    NEWS {
        string id PK "CUID"
        string pageSlug FK "Slug trang CMS liên kết (/news, /)"
        string pageName "Tên trang CMS liên kết ('Tin tức', 'Trang chủ')"
        string title "Tiêu đề bài viết"
        string slug UK "slug-bai-viet"
        text excerpt "Tóm tắt ngắn (1-2 đoạn)"
        string coverImageUrl "Ảnh bìa đại diện"
        string authorName "Tác giả"
        string categoryId FK "Khóa ngoại categories"
        string status "DRAFT / PUBLISHED / ARCHIVED"
        boolean isFeatured "Ghim nổi bật"
        int viewsCount "Lượt đọc"
        datetime publishedAt "Ngày xuất bản"
    }

    NEWS_CONTENTS {
        string id PK "CUID"
        string newsId FK "Khóa ngoại 1:1 news"
        json contentJson "Cây khối JSON xuất từ CKEditor"
        longtext contentHtml "HTML biên dịch sẵn cho SEO"
        json tableOfContents "Mục lục tự động [{ anchor, title, level }]"
        json footnotes "Chú thích nguồn cuối bài"
    }

    HERITAGE_PROJECTS {
        string id PK "CUID"
        string pageId FK "Thuộc trang CMS (/projects)"
        string name "Tên mô hình/dự án di sản"
        string slug UK "slug-du-an"
        string location "Địa phương triển khai"
        string category "Phân loại di sản"
        string status "Đang vận hành / Kế hoạch / Hoàn thành"
        text description "Mô tả tổng quan"
        json highlights "Điểm nổi bật / Thành tựu"
        string thumbnailUrl "Ảnh đại diện"
        string annualRevenue "Doanh thu đóng góp ước tính"
        int jobsCreated "Số việc làm tạo ra"
        string conservationFundShare "Trích quỹ bảo tồn"
    }

    CONTACT_SUBMISSIONS {
        string id PK "CUID"
        string pageId FK "Nộp từ trang nào (/forum, /awards, /contact...)"
        string type "ATTENDANCE / SPONSORSHIP / PARTNERSHIP / PROJECT_PROPOSAL / AWARD_NOMINATION / GENERAL"
        string fullName "Họ và tên người gửi"
        string email "Email liên hệ"
        string phone "Số điện thoại"
        string organization "Cơ quan / Doanh nghiệp"
        string position "Chức vụ"
        text message "Nội dung thông điệp / Đề xuất"
        string attachmentUrl "Đường dẫn file hồ sơ đính kèm"
        string status "NEW / IN_REVIEW / CONTACTED / RESOLVED"
    }
```
        datetime publishedAt "Ngày xuất bản"
    }

    USERS {
        string id PK "CUID"
        string email UK "Tên đăng nhập Admin"
        string name "Tên quản trị viên"
        string passwordHash "Mật khẩu mã hóa"
        string role "ADMIN | EDITOR | SUPER_ADMIN"
        datetime createdAt
        datetime updatedAt
    }

    ARTICLES {
        string id PK "CUID"
        string pageId FK "Thuộc Page nào (/news, /home...)"
        string categoryId FK "Thuộc Chuyên mục"
        string slug UK "Đường dẫn bài báo"
        string title "Tiêu đề bài viết"
        text excerpt "Sapo mở đầu bài báo"
        string coverImageUrl "Ảnh đại diện bài báo"
        string imageCaption "Chú thích ảnh bìa"
        string authorName "Tên tác giả / chuyên gia"
        string authorTitle "Chức danh tác giả"
        string status "DRAFT | PUBLISHED | ARCHIVED"
        boolean isFeatured "Ghim tiêu điểm"
        int viewsCount "Lượt đọc"
        int readingTimeMinutes "Thời lượng đọc (phút)"
        datetime publishedAt "Ngày xuất bản GMT+7"
    }

    ARTICLE_CONTENTS {
        string id PK "CUID"
        string articleId FK "Khóa ngoại 1:1 sang Article"
        json contentJson "Cây khối JSON từ CKEditor"
        longtext contentHtml "HTML render sẵn cho SEO"
        json tableOfContents "Mục lục tự động H2/H3"
        json footnotes "Chú thích chân trang"
        datetime updatedAt
    }

    HERITAGE_PROJECTS {
        string id PK "CUID"
        string pageId FK "Thuộc Page nào (/projects, /home...)"
        string slug UK "Slug dự án"
        string name "Tên dự án di sản"
        string location "Địa điểm triển khai"
        string category "Phân loại di sản"
        string status "OPERATIONAL | PLANNING..."
        text description "Mô tả dự án"
        string thumbnailUrl "Ảnh bìa đại diện"
        json galleryUrls "Bộ sưu tập ảnh"
        string annualRevenue "Doanh thu hàng năm"
        int jobsCreated "Việc làm tạo ra"
        string conservationFundShare "Tỷ lệ quỹ bảo tồn"
        string ownerOrg "Đơn vị chủ quản"
        string websiteUrl "Website dự án"
    }

    FORUM_EDITIONS {
        string id PK "CUID"
        string pageId FK "Thuộc Page nào (/forum)"
        int year UK "Năm tổ chức: 2026, 2025"
        string slug UK "Slug kỳ: 2026"
        string title "Tên kỳ diễn đàn"
        string theme "Chủ đề chính"
        datetime startDate "Khai mạc"
        datetime endDate "Bế mạc"
        string venueName "Địa điểm"
        string venueAddress "Địa chỉ"
        string status "UPCOMING | ONGOING | CONCLUDED"
        boolean isDateConfirmed "Đã chốt lịch"
        text outcomesSummary "Tổng kết kết quả"
        string declarationUrl "PDF Tuyên bố chung"
    }

    FORUM_SESSIONS {
        string id PK "CUID"
        string editionId FK "Mã kỳ diễn đàn"
        int sessionNumber "Phiên số: 1, 2, 3, 4"
        string title "Tên phiên nghị sự"
        datetime startTime "Giờ bắt đầu"
        datetime endTime "Giờ kết thúc"
        string locationRoom "Phòng họp / Hội trường"
        text summary "Tóm tắt phiên"
        int order "Thứ tự sắp xếp"
    }

    SPEAKERS {
        string id PK "CUID"
        string name "Họ tên diễn giả"
        string slug UK "Đường dẫn hồ sơ"
        string degree "Học vị: GS.TS, PGS.TS"
        string title "Chức vụ"
        string organization "Cơ quan / Đơn vị"
        string avatarUrl "Ảnh chân dung"
        text bio "Tiểu sử tóm tắt"
    }

    FORUM_RESOURCES {
        string id PK "CUID"
        string editionId FK "Mã kỳ diễn đàn"
        string title "Tên tài liệu / Kỷ yếu"
        string fileUrl "Link tải file"
        string fileType "PDF | DOCX | ZIP"
        int fileSizeBytes "Dung lượng (bytes)"
        int downloadCount "Số lượt tải"
    }

    AWARDS {
        string id PK "CUID"
        string pageId FK "Thuộc Page nào (/awards)"
        int year UK "Năm tổ chức giải"
        string name "Tên giải thưởng"
        string theme "Chủ đề giải thưởng"
        datetime nominationDeadline "Hạn chót đề cử"
        string rulesUrl "Quy chế giải thưởng PDF"
        boolean isOpen "Mở cổng nhận hồ sơ"
    }

    AWARD_CATEGORIES {
        string id PK "CUID"
        string awardId FK "Mã kỳ giải thưởng"
        string name "Tên hạng mục vinh danh"
        string slug UK "Slug hạng mục"
        text description "Tiêu chuẩn xét tặng"
        json criteria "Mảng tiêu chí chấm điểm"
    }

    AWARD_NOMINATIONS {
        string id PK "CUID"
        string categoryId FK "Mã hạng mục đề cử"
        string applicantName "Tên đơn vị / Cá nhân đề cử"
        string applicantOrg "Tổ chức đề cử"
        string email "Email liên hệ"
        string phone "Số điện thoại"
        string projectName "Tên công trình / Dự án"
        string dossierUrl "Hồ sơ đính kèm PDF"
        string status "SUBMITTED | IN_REVIEW | AWARDED"
    }

    PAGE_ORGANIZATIONS {
        string id PK "CUID"
        string pageId FK "Trang hiển thị đối tác"
        string organizationId FK "Đơn vị đối tác"
        string roleLabel "Nhãn vai trò Legend (NTT, BTC...)"
        int displayOrder "Thứ tự hiển thị"
    }

    ORGANIZATIONS {
        string id PK "CUID"
        string name "Tên cơ quan / Tập đoàn"
        string shortName "Tên viết tắt (VCHA, VTV...)"
        string category "STEERING | HOSTING | STRATEGIC..."
        string logoUrl "Logo PNG sắc nét"
        string websiteUrl "Website chính thức"
    }

    CONTACT_SUBMISSIONS {
        string id PK "CUID"
        string pageId FK "Nộp từ Page nào (Home, Forum, Contact...)"
        string type "ATTENDANCE | SPONSORSHIP | PROPOSAL..."
        string fullName "Họ tên người gửi"
        string email "Email liên hệ"
        string phone "Số điện thoại"
        string organization "Cơ quan / Đơn vị"
        string position "Chức danh"
        text message "Nội dung gửi"
        string attachmentUrl "File hồ sơ đính kèm"
        string status "NEW | IN_REVIEW | RESOLVED"
        datetime createdAt "Thời điểm nộp form GMT+7"
    }
```

---

## 3. BẢNG ĐẶC TẢ CHI TIẾT CÁC TABLE TRONG CSDL

### 3.1. Bảng `pages` (Bảng trung tâm hệ thống CMS)

| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Ý Nghĩa Nghiệp Vụ |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | **PK**, CUID | Mã định danh duy nhất của trang. |
| `slug` | VARCHAR(150) | **UNIQUE**, INDEX | Đường dẫn trang: `/`, `about`, `forum`, `awards`, `news`, `projects`, `contact`. |
| `name` | VARCHAR(150) | NOT NULL | Tên quản trị trong Dashboard (VD: "Trang chủ", "Kỳ diễn đàn 2026"). |
| `title` | VARCHAR(255) | NOT NULL | Thẻ `<title>` hiển thị trên trình duyệt. |
| `description` | TEXT | NULL | Tóm tắt mô tả trang phục vụ SEO Google. |
| `seoProps` | **JSON** | NULL | Cấu hình SEO: `{ metaTitle, metaDescription, keywords, ogImage, canonicalUrl }`. |
| `sections` | **JSON** | NOT NULL | Toàn bộ mảng Sections và Props cấu hình giao diện của trang. |
| `authorId` | VARCHAR(30) | **FK** $\rightarrow$ `users.id` | Quản trị viên phụ trách trang. |
| `isPublished` | BOOLEAN | DEFAULT false, INDEX | Trạng thái bật/tắt trang trên môi trường Production. |
| `order` | INT | DEFAULT 0 | Thứ tự sắp xếp vị trí hiển thị trên Menu chính. |
| `publishedAt` | DATETIME | NULL | Thời điểm xuất bản trang (Asia/Ho_Chi_Minh). |
| `createdAt` | DATETIME | DEFAULT now() | Thời gian tạo trang. |
| `updatedAt` | DATETIME | ON UPDATE now() | Thời gian cập nhật nội dung gần nhất. |

---

### 3.2. Bảng `users` (Tài khoản Admin CMS – Tinh gọn)

| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Ý Nghĩa Nghiệp Vụ |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | **PK**, CUID | Mã định danh quản trị viên. |
| `email` | VARCHAR(191) | **UNIQUE**, NOT NULL | Tên đăng nhập vào trang Admin (`/admin`). |
| `name` | VARCHAR(150) | NOT NULL | Tên hiển thị của quản trị viên. |
| `passwordHash` | VARCHAR(255) | NULL | Mật khẩu mã hóa bảo mật. |
| `role` | ENUM | DEFAULT 'ADMIN' | Phân quyền: `SUPER_ADMIN`, `ADMIN`, `EDITOR`. |
| `createdAt` | DATETIME | DEFAULT now() | Thời gian tạo tài khoản. |
| `updatedAt` | DATETIME | ON UPDATE now() | Thời gian cập nhật thông tin. |

---

### 3.3. Nhánh Tin Tức & Bài Báo CKEditor (`articles`, `article_contents`, `categories`)

#### Bảng `articles` (Thẻ bài báo nhẹ - Phục vụ danh sách, phân trang, lọc nhanh)

| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Ý Nghĩa Nghiệp Vụ |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | **PK**, CUID | Mã bài viết. |
| `pageId` | VARCHAR(30) | **FK** $\rightarrow$ `pages.id` | **Liên kết trực tiếp tới trang CMS** (`/news` hoặc bài tiêu điểm `/`). |
| `categoryId` | VARCHAR(30) | **FK** $\rightarrow$ `categories.id` | Chuyên mục bài báo. |
| `slug` | VARCHAR(255) | **UNIQUE**, INDEX | Đường dẫn bài báo `/news/[slug]`. |
| `title` | VARCHAR(255) | NOT NULL | Tiêu đề chính thức của bài báo. |
| `excerpt` | TEXT | NOT NULL | Sapo bài báo (150–200 từ) hiển thị trên danh mục. |
| `coverImageUrl` | VARCHAR(255) | NULL | File ảnh bìa đại diện bài báo. |
| `imageCaption` | VARCHAR(255) | NULL | Chú thích ảnh bìa chuẩn báo chí. |
| `authorName` | VARCHAR(150) | NULL | Tên phóng viên / chuyên gia viết bài. |
| `authorTitle` | VARCHAR(150) | NULL | Chức vụ / Học vị tác giả. |
| `status` | ENUM | DEFAULT 'DRAFT', INDEX | `DRAFT`, `PUBLISHED`, `ARCHIVED`. |
| `isFeatured` | BOOLEAN | DEFAULT false | Ghim làm bài báo tiêu điểm trang tin. |
| `viewsCount` | INT | DEFAULT 0 | Lượt xem bài báo. |
| `readingTimeMinutes` | INT | DEFAULT 5 | Thời gian đọc ước tính. |
| `publishedAt` | DATETIME | NULL, INDEX | Thời điểm phát hành bài báo (GMT+7). |

#### Bảng `article_contents` (Nội dung bài báo dài - Quan hệ 1:1)

| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Ý Nghĩa Nghiệp Vụ |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | **PK**, CUID | Mã bản ghi nội dung. |
| `articleId` | VARCHAR(30) | **FK, UNIQUE**, CASCADE | Khóa ngoại 1:1 liên kết với `articles.id`. |
| `contentJson` | **JSON** | NOT NULL | Cây khối JSON xuất từ CKEditor (Headings, Paragraphs, Blockquotes, Figures, Tables). |
| `contentHtml` | **LONGTEXT** | NOT NULL | HTML sạch biên dịch sẵn phục vụ SEO Googlebot và hiển thị tức thì. |
| `tableOfContents` | **JSON** | NULL | Mục lục tự động trích xuất từ các thẻ H2, H3: `[{ anchor, title, level }]`. |
| `footnotes` | JSON | NULL | Chú thích nguồn tài liệu tham khảo cuối bài. |

---

### 3.4. Bảng `heritage_projects` (Dự Án Di Sản & Kinh Tế)

| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Ý Nghĩa Nghiệp Vụ |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | **PK**, CUID | Mã dự án. |
| `pageId` | VARCHAR(30) | **FK** $\rightarrow$ `pages.id` | **Liên kết trực tiếp tới trang CMS** (`/projects`). |
| `slug` | VARCHAR(255) | **UNIQUE**, INDEX | Đường dẫn chi tiết dự án `/projects/[slug]`. |
| `name` | VARCHAR(255) | NOT NULL | Tên đầy đủ của dự án di sản. |
| `location` | VARCHAR(150) | NOT NULL, INDEX | Tỉnh / Thành phố triển khai dự án. |
| `category` | VARCHAR(100) | NOT NULL, INDEX | Lĩnh vực: Di tích, Làng nghề, Du lịch, Ẩm thực... |
| `status` | ENUM | DEFAULT 'OPERATIONAL' | `PLANNING`, `OPERATIONAL`, `EXPANDING`, `COMPLETED`. |
| `description` | TEXT | NOT NULL | Nội dung mô tả mô hình kinh tế di sản. |
| `thumbnailUrl` | VARCHAR(255) | NOT NULL | Ảnh đại diện dự án. |
| `galleryUrls` | JSON | NULL | Danh sách hình ảnh thực tế của dự án. |
| `annualRevenue` | VARCHAR(100) | NULL | Doanh thu tạo ra hàng năm (VD: "420 tỷ VNĐ / năm"). |
| `jobsCreated` | INT | DEFAULT 0 | Số việc làm tạo ra cho cộng đồng bản địa. |
| `conservationFundShare`| VARCHAR(50)| NULL | Tỷ lệ đóng góp quỹ bảo tồn (VD: "12%"). |
| `ownerOrg` | VARCHAR(255) | NULL | Doanh nghiệp / Tổ chức vận hành. |
| `websiteUrl` | VARCHAR(255) | NULL | Website chính thức của dự án. |

---

### 3.5. Nhánh Kỳ Diễn Đàn & Phiên Nghị Sự (`forum_editions`, `forum_sessions`, `speakers`, `forum_resources`)

#### Bảng `forum_editions`

| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Ý Nghĩa Nghiệp Vụ |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | **PK**, CUID | Mã kỳ diễn đàn. |
| `pageId` | VARCHAR(30) | **FK** $\rightarrow$ `pages.id` | **Liên kết trực tiếp tới trang CMS** (`/forum`). |
| `year` | INT | **UNIQUE**, INDEX | Năm diễn đàn (2026, 2025, 2024...). |
| `slug` | VARCHAR(50) | **UNIQUE** | Đường dẫn URL (VD: `2026`). |
| `title` | VARCHAR(255) | NOT NULL | Tên sự kiện (VD: "Diễn đàn Kinh tế Di sản 2026"). |
| `theme` | VARCHAR(255) | NOT NULL | Chủ đề trọng tâm của kỳ diễn đàn. |
| `startDate` | DATETIME | NOT NULL | Thời gian bắt đầu (Asia/Ho_Chi_Minh). |
| `endDate` | DATETIME | NOT NULL | Thời gian kết thúc (Asia/Ho_Chi_Minh). |
| `venueName` | VARCHAR(255) | NOT NULL | Địa điểm tổ chức chính thức. |
| `venueAddress` | VARCHAR(255) | NOT NULL | Địa chỉ chi tiết. |
| `status` | ENUM | DEFAULT 'UPCOMING' | `UPCOMING`, `ONGOING`, `CONCLUDED`. |
| `isDateConfirmed`| BOOLEAN | DEFAULT false | Xác nhận lịch chính thức (EventScheduled). |
| `outcomesSummary`| TEXT | NULL | Tóm tắt kết quả (hiển thị khi kỳ kết thúc). |
| `declarationUrl` | VARCHAR(255) | NULL | File PDF Tuyên bố chung kỳ diễn đàn. |

#### Bảng `forum_sessions`
- Khóa ngoại `editionId` $\rightarrow$ `forum_editions.id`.
- Quản lý 4 phiên nghị sự: Phiên 1 (Khai mạc), Phiên 2 (Tham luận), Phiên 3 (Đối thoại), Phiên 4 (Tổng kết & Dấu ấn).

#### Bảng `speakers` & `session_speakers`
- Quản lý hồ sơ diễn giả, phân công diễn giả vào từng phiên với vai trò (`KEYNOTE`, `PANELIST`, `MODERATOR`).

#### Bảng `forum_resources`
- Quản lý thư viện file tải về: Kỷ yếu ISBN, Báo cáo tham luận, Video, Ảnh sự kiện.

---

### 3.6. Nhánh Giải Thưởng Phát Triển Bền Vững (`awards`, `award_categories`, `award_nominations`)

| Tên Bảng | Khóa Ngoại Kết Nối | Ý Nghĩa Nghiệp Vụ |
| :--- | :--- | :--- |
| **`awards`** | `pageId` $\rightarrow$ `pages.id` | **Liên kết trực tiếp tới trang CMS** (`/awards`), quản lý kỳ giải thưởng theo năm. |
| **`award_categories`** | `awardId` $\rightarrow$ `awards.id` | Quản lý 6 hạng mục vinh danh kèm tiêu chuẩn xét tặng. |
| **`award_nominations`** | `categoryId` $\rightarrow$ `award_categories.id` | Tiếp nhận hồ sơ đề cử ứng viên từ form trực tuyến. |

---

### 3.7. Bảng `page_organizations` & `organizations` (Đối tác & Ban Tổ Chức theo Trang)

> **Mô hình kết nối**: Một tổ chức đối tác có thể hiển thị trên nhiều trang (`Page`) khác nhau với vai trò khác nhau (Trang Chủ hiển thị nhóm Nhà tài trợ, Trang Diễn Đàn hiển thị Ban tổ chức).

| Tên Cột trong `page_organizations` | Kiểu Dữ Liệu | Ràng Buộc | Ý Nghĩa Nghiệp Vụ |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | **PK**, CUID | Mã liên kết. |
| `pageId` | VARCHAR(30) | **FK** $\rightarrow$ `pages.id` | Thuộc trang nào (`/`, `/about`, `/forum`). |
| `organizationId` | VARCHAR(30) | **FK** $\rightarrow$ `organizations.id` | Đơn vị đối tác. |
| `roleLabel` | VARCHAR(150) | NOT NULL | Vai trò trên trang đó (`<legend>`: "Cơ quan Chủ trì", "Nhà Tài trợ Chiến lược"...). |
| `displayOrder` | INT | DEFAULT 1 | Thứ tự hiển thị trong nhóm. |

---

### 3.8. Bảng `contact_submissions` (Tiếp Nhận CTA Chuyển Đổi Theo Trang)

| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Ý Nghĩa Nghiệp Vụ |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | **PK**, CUID | Mã bản ghi form. |
| `pageId` | VARCHAR(30) | **FK** $\rightarrow$ `pages.id` | **Nguồn gốc chuyển đổi**: Xác định form được nộp từ trang nào (`/forum` đăng ký tham dự, `/awards` nộp đề cử, `/projects` gửi dự án, `/contact` liên hệ). |
| `type` | ENUM | NOT NULL, INDEX | `ATTENDANCE`, `SPONSORSHIP`, `PARTNERSHIP`, `PROJECT_PROPOSAL`, `AWARD_NOMINATION`, `GENERAL`. |
| `fullName` | VARCHAR(150) | NOT NULL | Họ và tên người gửi. |
| `email` | VARCHAR(191) | NOT NULL, INDEX | Email liên hệ. |
| `phone` | VARCHAR(50) | NULL | Số điện thoại liên hệ. |
| `organization`| VARCHAR(255)| NULL | Đơn vị công tác. |
| `position` | VARCHAR(150) | NULL | Chức danh. |
| `message` | TEXT | NOT NULL | Nội dung đề xuất. |
| `attachmentUrl`| VARCHAR(255)| NULL | Đường dẫn file hồ sơ đính kèm. |
| `status` | ENUM | DEFAULT 'NEW', INDEX | `NEW`, `IN_REVIEW`, `CONTACTED`, `RESOLVED`. |
| `createdAt` | DATETIME | DEFAULT now() | Thời gian gửi form (GMT+7). |

---

## 4. MÃ NGUỒN PRISMA 7 SCHEMA CHÍNH THỨC (`src/prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
}

// ==========================================
// 1. ENUMS HỆ THỐNG
// ==========================================

enum Role {
  SUPER_ADMIN
  ADMIN
  EDITOR
  USER
}

enum ArticleStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum ProjectStatus {
  PLANNING
  OPERATIONAL
  EXPANDING
  COMPLETED
}

enum EventStatus {
  UPCOMING
  ONGOING
  CONCLUDED
}

enum SpeakerRoleType {
  KEYNOTE
  PANELIST
  MODERATOR
  GUEST
}

enum PartnerCategory {
  STEERING      // Cơ quan Chỉ đạo
  HOSTING       // Cơ quan Chủ trì & Đăng cai
  ORGANIZING    // Đơn vị Thường trực Tổ chức
  COMPANION     // Đối tác Học thuật & Đồng hành Quốc tế
  STRATEGIC     // Nhà Tài trợ Chiến lược
  MEDIA         // Bảo trợ Truyền thông & Báo chí
}

enum SubmissionType {
  ATTENDANCE
  SPONSORSHIP
  PARTNERSHIP
  PROJECT_PROPOSAL
  AWARD_NOMINATION
  GENERAL
}

enum SubmissionStatus {
  NEW
  IN_REVIEW
  CONTACTED
  RESOLVED
}

// ==========================================
// 2. USER QUẢN TRỊ ADMIN (TINH GỌN)
// ==========================================

model User {
  id           String       @id @default(cuid())
  email        String       @unique @db.VarChar(191)
  name         String       @db.VarChar(150)
  passwordHash String?      @db.VarChar(255)
  role         Role         @default(ADMIN)
  pages        Page[]       // Các trang phụ trách biên tập
  posts        Post[]
  comments     Comment[]
  upvotes      PostUpvote[]
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt

  @@map("users")
}

// ==========================================
// 3. BẢNG TRUNG TÂM: CMS PAGE ENGINE
// ==========================================

model Page {
  id          String              @id @default(cuid())
  slug        String              @unique @db.VarChar(150)
  name        String              @db.VarChar(150)
  title       String              @db.VarChar(255)
  description String?             @db.Text
  seoProps    Json?               // { metaTitle, metaDescription, ogImage, keywords }
  sections    Json                // Array of PageSection: [{ id, type, title, subtitle, props, order, isVisible }]
  authorId    String?
  author      User?               @relation(fields: [authorId], references: [id], onDelete: SetNull)
  isPublished Boolean             @default(false)
  order       Int                 @default(0)
  publishedAt DateTime?

  // LIÊN KẾT TRỰC TIẾP TỚI CÁC DỮ LIỆU NGHIỆP VỤ CMS
  articles    Article[]           // Bài báo thuộc trang này (/news, /)
  projects    HeritageProject[]   // Dự án thuộc trang này (/projects)
  editions    ForumEdition[]      // Kỳ diễn đàn thuộc trang này (/forum)
  awards      Award[]             // Kỳ giải thưởng thuộc trang này (/awards)
  partners    PageOrganization[]  // Đối tác hiển thị trên trang này
  submissions ContactSubmission[] // CTA nộp form từ trang này

  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt

  @@index([slug])
  @@index([isPublished])
  @@map("pages")
}

// ==========================================
// 4. TIN TỨC & BÀI BÁO CKEDITOR (1:1 SPLIT)
// ==========================================

model Category {
  id          String    @id @default(cuid())
  name        String    @db.VarChar(100)
  slug        String    @unique @db.VarChar(100)
  description String?   @db.Text
  articles    Article[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@map("categories")
}

model Article {
  id                 String          @id @default(cuid())
  pageId             String?         // Thuộc trang CMS nào
  page               Page?           @relation(fields: [pageId], references: [id], onDelete: SetNull)
  title              String          @db.VarChar(255)
  slug               String          @unique @db.VarChar(255)
  excerpt            String          @db.Text
  coverImageUrl      String?         @db.VarChar(255)
  imageCaption       String?         @db.VarChar(255)
  authorName         String?         @db.VarChar(150)
  authorTitle        String?         @db.VarChar(150)
  categoryId         String
  category           Category        @relation(fields: [categoryId], references: [id])
  status             ArticleStatus   @default(DRAFT)
  isFeatured         Boolean         @default(false)
  viewsCount         Int             @default(0)
  readingTimeMinutes Int             @default(5)
  contentDetail      ArticleContent? // Quan hệ 1:1 sang bảng nội dung nặng
  publishedAt        DateTime?
  createdAt          DateTime        @default(now())
  updatedAt          DateTime        @updatedAt

  @@index([slug])
  @@index([pageId])
  @@index([categoryId])
  @@index([status, publishedAt])
  @@map("articles")
}

model ArticleContent {
  id              String   @id @default(cuid())
  articleId       String   @unique
  article         Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  contentJson     Json     // Cây khối JSON xuất từ CKEditor (Headings, Paragraphs, Quotes, Figures)
  contentHtml     String   @db.LongText // HTML biên dịch sẵn cho SEO
  tableOfContents Json?    // Mục lục tự động [{ anchor, title, level }]
  footnotes       Json?    // Chú thích cuối bài
  updatedAt       DateTime @updatedAt

  @@map("article_contents")
}

// ==========================================
// 5. DỰ ÁN DI SẢN & KINH TẾ (PROJECTS)
// ==========================================

model HeritageProject {
  id                    String        @id @default(cuid())
  pageId                String?       // Thuộc trang CMS nào (/projects)
  page                  Page?         @relation(fields: [pageId], references: [id], onDelete: SetNull)
  name                  String        @db.VarChar(255)
  slug                  String        @unique @db.VarChar(255)
  location              String        @db.VarChar(150)
  category              String        @db.VarChar(100)
  status                ProjectStatus @default(OPERATIONAL)
  description           String        @db.Text
  highlights            Json?
  thumbnailUrl          String        @db.VarChar(255)
  galleryUrls           Json?
  annualRevenue         String?       @db.VarChar(100)
  jobsCreated           Int           @default(0)
  conservationFundShare String?       @db.VarChar(50)
  ownerOrg              String?       @db.VarChar(255)
  websiteUrl            String?       @db.VarChar(255)
  isFeatured            Boolean       @default(false)
  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt

  @@index([slug])
  @@index([pageId])
  @@index([category])
  @@map("heritage_projects")
}

// ==========================================
// 6. KỲ DIỄN ĐÀN, PHIÊN & DIỄN GIẢ (FORUM)
// ==========================================

model ForumEdition {
  id              String          @id @default(cuid())
  pageId          String?         // Thuộc trang CMS nào (/forum)
  page            Page?           @relation(fields: [pageId], references: [id], onDelete: SetNull)
  year            Int             @unique
  slug            String          @unique @db.VarChar(50)
  title           String          @db.VarChar(255)
  theme           String          @db.VarChar(255)
  startDate       DateTime
  endDate         DateTime
  venueName       String          @db.VarChar(255)
  venueAddress    String          @db.VarChar(255)
  status          EventStatus     @default(UPCOMING)
  isDateConfirmed Boolean         @default(false)
  organizer       String          @default("Hội Di sản Văn hóa Việt Nam & HEI") @db.VarChar(255)
  coverImageUrl   String?         @db.VarChar(255)
  outcomesSummary String?         @db.Text
  declarationUrl  String?         @db.VarChar(255)
  sessions        ForumSession[]
  resources       ForumResource[]
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  @@index([year])
  @@index([pageId])
  @@map("forum_editions")
}

model ForumSession {
  id            String           @id @default(cuid())
  editionId     String
  edition       ForumEdition     @relation(fields: [editionId], references: [id], onDelete: Cascade)
  sessionNumber Int
  title         String           @db.VarChar(255)
  startTime     DateTime
  endTime       DateTime
  locationRoom  String?          @db.VarChar(100)
  summary       String?          @db.Text
  order         Int              @default(1)
  speakers      SessionSpeaker[]
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt

  @@index([editionId])
  @@map("forum_sessions")
}

model Speaker {
  id           String           @id @default(cuid())
  name         String           @db.VarChar(150)
  slug         String           @unique @db.VarChar(150)
  degree       String?          @db.VarChar(50)
  title        String           @db.VarChar(150)
  organization String           @db.VarChar(255)
  avatarUrl    String           @db.VarChar(255)
  bio          String?          @db.Text
  sessions     SessionSpeaker[]
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt

  @@index([slug])
  @@map("speakers")
}

model SessionSpeaker {
  sessionId String
  speakerId String
  role      SpeakerRoleType @default(PANELIST)
  session   ForumSession    @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  speaker   Speaker         @relation(fields: [speakerId], references: [id], onDelete: Cascade)

  @@id([sessionId, speakerId])
  @@map("session_speakers")
}

model ForumResource {
  id            String       @id @default(cuid())
  editionId     String
  edition       ForumEdition @relation(fields: [editionId], references: [id], onDelete: Cascade)
  title         String       @db.VarChar(255)
  fileUrl       String       @db.VarChar(255)
  fileType      String       @db.VarChar(50)
  fileSizeBytes Int          @default(0)
  isPublic      Boolean      @default(true)
  downloadCount Int          @default(0)
  createdAt     DateTime     @default(now())

  @@index([editionId])
  @@map("forum_resources")
}

// ==========================================
// 7. GIẢI THƯỞNG PHÁT TRIỂN BỀN VỮNG (AWARDS)
// ==========================================

model Award {
  id                 String          @id @default(cuid())
  pageId             String?         // Thuộc trang CMS nào (/awards)
  page               Page?           @relation(fields: [pageId], references: [id], onDelete: SetNull)
  year               Int             @unique
  name               String          @db.VarChar(255)
  theme              String          @db.VarChar(255)
  nominationDeadline DateTime
  rulesUrl           String?         @db.VarChar(255)
  isOpen             Boolean         @default(true)
  categories         AwardCategory[]
  createdAt          DateTime        @default(now())
  updatedAt          DateTime        @updatedAt

  @@index([pageId])
  @@map("awards")
}

model AwardCategory {
  id          String            @id @default(cuid())
  awardId     String
  award       Award             @relation(fields: [awardId], references: [id], onDelete: Cascade)
  name        String            @db.VarChar(255)
  slug        String            @unique @db.VarChar(100)
  description String            @db.Text
  criteria    Json?
  nominations AwardNomination[]
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  @@index([awardId])
  @@map("award_categories")
}

model AwardNomination {
  id            String        @id @default(cuid())
  categoryId    String
  category      AwardCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  applicantName String        @db.VarChar(150)
  applicantOrg  String        @db.VarChar(255)
  email         String        @db.VarChar(191)
  phone         String        @db.VarChar(50)
  projectName   String        @db.VarChar(255)
  dossierUrl    String?       @db.VarChar(255)
  status        String        @default("SUBMITTED") @db.VarChar(50)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@index([categoryId])
  @@map("award_nominations")
}

// ==========================================
// 8. ĐỐI TÁC HIỂN THỊ THEO TRANG (PAGE ORGANIZATIONS)
// ==========================================

model Organization {
  id         String              @id @default(cuid())
  name       String              @db.VarChar(255)
  shortName  String?             @db.VarChar(100)
  category   PartnerCategory
  logoUrl    String              @db.VarChar(255)
  websiteUrl String?             @db.VarChar(255)
  pages      PageOrganization[]  // Đối tác này hiển thị ở những Page nào
  createdAt  DateTime            @default(now())
  updatedAt  DateTime            @updatedAt

  @@map("organizations")
}

model PageOrganization {
  id             String       @id @default(cuid())
  pageId         String
  page           Page         @relation(fields: [pageId], references: [id], onDelete: Cascade)
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  roleLabel      String       @db.VarChar(150) // "Cơ quan Chủ trì & Đăng cai", "Nhà Tài trợ Chiến lược"
  displayOrder   Int          @default(1)

  @@unique([pageId, organizationId])
  @@index([pageId])
  @@map("page_organizations")
}

// ==========================================
// 9. LIÊN HỆ, ĐĂNG KÝ THEO TRANG (CONTACT SUBMISSIONS)
// ==========================================

model ContactSubmission {
  id            String           @id @default(cuid())
  pageId        String?          // Nộp từ trang nào (/forum, /awards, /contact...)
  page          Page?            @relation(fields: [pageId], references: [id], onDelete: SetNull)
  type          SubmissionType   @default(GENERAL)
  fullName      String           @db.VarChar(150)
  email         String           @db.VarChar(191)
  phone         String?          @db.VarChar(50)
  organization  String?          @db.VarChar(255)
  position      String?          @db.VarChar(150)
  message       String           @db.Text
  attachmentUrl String?          @db.VarChar(255)
  status        SubmissionStatus @default(NEW)
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt

  @@index([pageId])
  @@index([type])
  @@index([status])
  @@map("contact_submissions")
}
```

---

## 5. CẤU TRÚC MODULAR SCHEMA MULTI-FILE (PRISMA 7 SCHEMA FOLDER)

Hệ thống được thiết kế chuyên biệt cho **1 người dùng duy nhất là Admin quản trị website CMS**, không có người dùng client bên ngoài và không có tính năng bình luận (`Comment`). Toàn bộ Prisma Schema được chia tách theo cấu trúc:
- **`src/prisma/schema.prisma`**: File gốc chỉ giữ vai trò **khởi tạo Prisma Client & Datasource** (`generator client`, `datasource db`).
- **`src/prisma/schema/*.prisma`**: Chứa toàn bộ Models và Enums phân rã theo nhóm module.

| Vị Trí File | Phân Hệ Nghiệp Vụ | Nội Dung & Models Trực Thuộc |
|---|---|---|
| `src/prisma/schema.prisma` | **Khởi tạo Core** | `generator client`, `datasource db` |
| `src/prisma/schema/user.prisma` | Quản trị Admin CMS (1 Admin) | `Role` (ADMIN, EDITOR), `User` |
| `src/prisma/schema/page.prisma` | Central Hub CMS | `Page` (Root Entity liên kết mọi bảng nghiệp vụ) |
| `src/prisma/schema/news.prisma` | Tin tức & Báo chí CKEditor | `NewsStatus`, `Category`, `News`, `NewsContent` |
| `src/prisma/schema/project.prisma` | Dự án Di sản & Kinh tế | `ProjectStatus`, `HeritageProject` |
| `src/prisma/schema/forum.prisma` | Kỳ Diễn đàn & Phiên hội thảo | `EventStatus`, `SpeakerRoleType`, `ForumEdition`, `ForumSession`, `Speaker`, `SessionSpeaker`, `ForumResource` |
| `src/prisma/schema/award.prisma` | Giải thưởng Phát triển Bền vững | `Award`, `AwardCategory`, `AwardNomination` |
| `src/prisma/schema/partner.prisma` | Đối tác, Cơ quan & Ban tổ chức | `PartnerCategory`, `Organization`, `PageOrganization` |
| `src/prisma/schema/contact.prisma` | Liên hệ & Hồ sơ Nộp theo Trang | `SubmissionType`, `SubmissionStatus`, `ContactSubmission` |

Cấu hình tại `prisma.config.ts` (Prisma 7 tự động quét đệ quy thư mục `src/prisma` nạp toàn bộ các file `.prisma`):
```ts
export default defineConfig({
  schema: "src/prisma",
  datasource: {
    url: process.env.DATABASE_URL || "mysql://root:root@localhost:3306/heritage_economy_forum_db",
  },
});
```

Hệ thống cung cấp sẵn lớp dịch vụ kết nối Connection Pool MariaDB / MySQL Adapter tại `src/prisma/prisma.service.ts`:
```ts
import { prisma, prismaService, mysqlPool } from "@/prisma";

// Kiểm tra sức khỏe kết nối pool
const health = await prismaService.healthCheck();
```

