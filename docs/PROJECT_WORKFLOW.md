# ĐẶC TẢ TOÀN BỘ LUỒNG DỰ ÁN (PROJECT END-TO-END WORKFLOW)

## HỆ THỐNG QUẢN TRỊ NỘI DUNG CMS - DIỄN ĐÀN KINH TẾ DI SẢN (HERITAGE ECONOMY FORUM - HEF)

**Phiên bản:** 1.0 (Áp dụng từ 03/11/2026)  
**Tài liệu liên quan:** [`docs/HEF_CMS_CODING_RULES.md`](./HEF_CMS_CODING_RULES.md)  
**Sơ đồ kiến trúc Archify tương tác:** [`docs/architecture/hef-architecture.html`](./architecture/hef-architecture.html)  
**Sơ đồ luồng dự án Archify tương tác:** [`docs/architecture/hef-project-flow.html`](./architecture/hef-project-flow.html)

---

## 1. TỔNG QUAN VÒNG ĐỜI NGHIỆP VỤ (END-TO-END PROJECT FLOW)

Vòng đời vận hành toàn bộ hệ thống Diễn đàn Kinh tế Di sản trải qua 4 giai đoạn khép kín:

```mermaid
flowchart LR
    Phase1["Giai Đoạn 1\nĐịnh Danh SSO\n(VNeID / CQNN / Entra)"] --> Phase2["Giai Đoạn 2\nQuản Trị CMS Động\n(Kéo Thả Section JSON)"]
    Phase2 --> Phase3["Giai Đoạn 3\nKiểm Định & Lưu Trữ\n(Prisma 7 Pool + Fallback)"]
    Phase3 --> Phase4["Giai Đoạn 4\nXuất Bản Web Public\n(SSR Dynamic Sections)"]
    Phase4 -.->|Đại biểu bình chọn & tham luận| Phase2
```

---

## 2. FLOW 1: ĐỊNH DANH & XÁC THỰC ĐƠN ĐIỂM (SSO AUTHENTICATION FLOW)

```mermaid
sequenceDiagram
    autonumber
    actor User as Đại Biểu / Quản Trị Viên
    participant Web as Login UI (/login)
    participant IdP as Identity Provider (VNeID / CQNN / Entra)
    participant AuthGuard as SSO & RBAC Guard
    participant Session as Session Store (JWT)

    User->>Web: Truy cập cổng /login
    Web->>User: Hiển thị 3 cổng SSO (VNeID, Cơ quan Nhà nước, Enterprise)
    User->>Web: Nhấp chọn "VNeID / Dịch Vụ Công Quốc Gia"
    Web->>IdP: Redirect tới IdP kèm Client ID, State, Code Challenge (PKCE)
    User->>IdP: Quét mã QR VNeID / Xác thực sinh trắc học
    IdP->>Web: Callback về /api/auth/callback với Auth Code & State
    Web->>AuthGuard: Đổi Code lấy Token (OAuth 2.0 Token Exchange)
    AuthGuard->>IdP: Verify Signature & Claims (Họ tên, CCCD, Đơn vị, Vai trò)
    AuthGuard->>Session: Khởi tạo Session Cookie (HttpOnly, Secure, SameSite=Lax)
    Session-->>Web: Trả về trạng thái xác thực thành công
    Web->>User: Chuyển hướng vào /admin/dashboard (hoặc trang chuyên đề)
```

---

## 3. FLOW 2: QUẢN TRỊ TRANG & CẤU HÌNH KHỐI SECTION ĐỘNG (ADMIN CMS FLOW)

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Content Admin / Ban Thư Ký
    participant AdminUI as Admin CMS (/admin/pages/[id])
    participant Action as Server Action (reorderSectionsAction)
    participant Service as PageService
    participant Repo as PageRepository
    participant DB as MariaDB (Table: pages)

    Admin->>AdminUI: Kéo thả thay đổi thứ tự Section (ví dụ: HERO -> AWARDS -> PILLARS)
    AdminUI->>Action: Gửi mảng ID mới: reorderSectionsAction(pageId, ["sec_hero", "sec_awards", ...])
    Action->>Action: Zod SafeParse payload (ReorderSectionsSchema)
    Action->>Service: Gọi pageService.reorderSections(pageId, sectionIds)
    Service->>Service: Sắp xếp lại thuộc tính `order` (1, 2, 3...) và kiểm tra tính toàn vẹn
    Service->>Repo: Gọi pageRepository.updateSections(pageId, reorderedSections)
    Repo->>DB: UPDATE pages SET sections = JSON_ARRAY(...) WHERE id = pageId
    DB-->>Repo: Xác nhận cập nhật bản ghi thành công
    Repo-->>Service: Trả về PageEntity mới nhất
    Service-->>Action: Trả về ServiceResult success
    Action->>Action: Kích hoạt revalidatePath("/") & revalidatePath("/dien-dan")
    Action-->>AdminUI: Phản hồi Toast: "Cập nhật thứ tự khối thành công"
    AdminUI->>Admin: Cập nhật giao diện quản trị tức thời (Optimistic UI)
```

---

## 4. FLOW 3: PHÂN PHỐI & HIỂN THỊ TRANG WEB ĐỘNG (DYNAMIC SSR DELIVERY FLOW)

```mermaid
flowchart TD
    Req([Độc Giả truy cập https://disan.vn/dien-dan]) --> AppRouter[Next.js App Router: src/app/dien-dan/page.tsx]
    AppRouter --> FetchData[Gọi pageService.getPageBySlug 'dien-dan']
    FetchData --> TryDB{Kết nối MariaDB Pool?}

    TryDB -- Thành công --> ReadDB[(MariaDB: Đọc cột sections JSON)]
    TryDB -- Sự cố / Timeout --> ReadFallback[Kích hoạt Graceful Fallback: DEFAULT_HEF_PAGES]

    ReadDB --> ParseJSON[Trích xuất mảng PageSection[] đã sắp xếp]
    ReadFallback --> ParseJSON

    ParseJSON --> LoopSections{Duyệt từng Section trong mảng}
    LoopSections -->|type: HERO| R1["Render &lt;HeroSection props={...} /&gt;"]
    LoopSections -->|type: PILLARS_5| R2["Render &lt;Pillars5Section props={...} /&gt;"]
    LoopSections -->|type: EVENT_HIGHLIGHT| R3["Render &lt;EventHighlightSection props={...} /&gt;"]
    LoopSections -->|type: AWARDS_SHOWCASE| R4["Render &lt;AwardsShowcaseSection props={...} /&gt;"]
    LoopSections -->|type: PROJECT_GRID| R5["Render &lt;ProjectGridSection props={...} /&gt;"]
    LoopSections -->|type: NEWS_FEED| R6["Render &lt;NewsFeedSection props={...} /&gt;"]

    R1 --> Assemble[Tổng hợp HTML Layout với Design Tokens Di Sản]
    R2 --> Assemble
    R3 --> Assemble
    R4 --> Assemble
    R5 --> Assemble
    R6 --> Assemble

    Assemble --> InjectTheme["Áp dụng Đỏ son #76232D, Vàng đồng #C29B57, Ngà voi #F5EFE5"]
    InjectTheme --> ClientBrowser([Truyền tải HTML về Trình duyệt Độc giả])
```

---

## 5. FLOW 4: VÒNG ĐỜI HỒ SƠ GIẢI THƯỞNG & BÌNH CHỌN (AWARDS LIFECYCLE)

```mermaid
stateDiagram-v2
    [*] --> DRAFT: Doanh nghiệp / Địa phương tạo hồ sơ dự thi
    DRAFT --> SUBMITTED: Nộp chính thức qua cổng /giai-thuong
    SUBMITTED --> UNDER_REVIEW: Hội đồng Giám khảo thẩm định chuyên môn
    UNDER_REVIEW --> PUBLIC_VOTING: Đạt tiêu chí, mở cổng bình chọn công khai
    PUBLIC_VOTING --> VOTING_CLOSED: Hết thời hạn bình chọn theo thể lệ
    VOTING_CLOSED --> AWARDED: Ban Tổ chức công bố & Vinh danh tại Lễ trao giải
    AWARDED --> ARCHIVED: Lưu trữ vào Thư viện Di sản số vĩnh viễn
```

---

## 6. SƠ ĐỒ TRỰC QUAN HÓA ARCHIFY MULTI-VIEW

Toàn bộ các luồng trên đã được biên dịch thành công cụ tương tác trực quan:

- **File HTML tương tác**: [`docs/architecture/hef-architecture.html`](./architecture/hef-architecture.html)
- Có thể chuyển đổi qua lại giữa **Modular Architecture** và **Project End-to-End Flow**.
- Lệnh biên dịch lại sơ đồ:
  ```bash
  pnpm archify:generate
  ```
