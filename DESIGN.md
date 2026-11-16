# HỆ THỐNG THIẾT KẾ & QUY CHUẨN UI/UX (DESIGN SYSTEM GUIDELINES)
## DIỄN ĐÀN KINH TẾ DI SẢN (HERITAGE ECONOMY FORUM - HEF)

**Phiên bản:** 1.0 (Cập nhật 2026)  
**Nền tảng:** Next.js 15 (App Router), React 19, Tailwind CSS v4, shadcn/ui, Lucide Icons  
**Tài liệu tham chiếu:** *Đề án Thiết kế & Nhận diện Thương hiệu Diễn đàn Kinh tế Di sản*

---

## 🏛️ 1. TRIẾT LÝ THIẾT KẾ (DESIGN PHILOSOPHY)

Hệ thống thiết kế của **Heritage Economy Forum (HEF)** là sự giao thoa hài hòa giữa:
1. **Tính Tôn Nghiêm & Bản Sắc Di Sản (Heritage & Solemnity):** Tôn vinh các giá trị văn hiến nghìn năm, chiều sâu triết lý phát triển bền vững và trầm tích văn hóa Việt Nam.
2. **Tính Hiện Đại & Đột Phá Quốc Tế (Contemporary & Visionary):** Áp dụng ngôn ngữ thiết kế phẳng, kính mờ (frosted glassmorphism), bố cục tràn viền mở rộng (ultrawide fullwidth), chuyển động vi mô mượt mà (fluid micro-interactions) và tối ưu hóa khả năng đọc trên màn hình kỹ thuật số độ phân giải cao (Retina, 4K).
3. **Tính Học Thuật & Minh Bạch (Academic & Institutional Trust):** Giao diện định hình như một cổng thông tin đối ngoại cấp quốc gia, phục vụ chính phủ, chuyên gia, nhà khoa học, doanh nghiệp đầu tư và cộng đồng quốc tế.

---

## 🎨 2. HỆ THỐNG MÀU SẮC & DESIGN TOKENS (COLOR PALETTE)

### 2.1. Bảng Màu Nhận Diện Cốt Lõi (Core Brand Tokens)

| Tên Màu | Mã HEX | Biến CSS / Tailwind Token | Ý Nghĩa Văn Hóa & Ứng Dụng |
| :--- | :--- | :--- | :--- |
| **Xanh Lục Bảo Di Sản (Deep Heritage Jade)** | `#0D4838` | `--hef-jade` / `text-[#0D4838]`, `bg-[#0D4838]` | Màu của ngọc bích, tán rừng di sản thiên nhiên, sự phát triển bền vững và trường tồn. Dùng làm màu thương hiệu chính trên giao diện Web, Header, nút bấm CTA chính. |
| **Đỏ Son Hoàng Gia (Imperial Crimson)** | `#76232D` | `--hef-crimson` | Màu son thếp vàng, cờ hội, triện ấn hoàng cung. Dùng cho các điểm nhấn quan trọng, quốc huy, sự kiện cấp nhà nước. |
| **Vàng Hoàng Kim (Heritage Imperial Gold)** | `#C29B57` | `--hef-gold` / `border-[#C29B57]`, `text-[#C29B57]` | Màu của trống đồng Đông Sơn, lụa cung đình, sắc phong cổ. Dùng cho đường viền trang trí, huy hiệu giải thưởng, ngôi sao và điểm nhấn kim loại cao cấp. |
| **Ngà Voi / Giấy Dó (Heritage Ivory Surface)** | `#F7F5EE` & `#F5EFE5` | `--hef-ivory` / `bg-[#F7F5EE]` | Màu nền giấy dó truyền thống, tạo sự êm dịu, không gây chói mắt như màu trắng tinh (#FFFFFF), mang lại cảm giác hoài cổ sang trọng. |
| **Đen Mực Nho (Deep Charcoal & Pine Ink)** | `#132A24` & `#292929` | `--hef-charcoal` / `text-[#132A24]` | Màu mực tàu viết văn bia, đá cổ trầm tích. Đảm bảo độ tương phản chữ tối ưu theo chuẩn WCAG AAA. |

### 2.2. Bảng Màu Phụ Trợ & Tấm Nền Kính (Surface & Glass Tokens)

- **Viền giấy dó tự nhiên:** `#DFD8C8` / `#E2DDCF` (dùng cho các đường phân chia thanh lịch, tránh viền đen thô ráp).
- **Màu chữ phụ (Subdued Body):** `#4A5E57` (độ tương phản cao trên nền giấy dó).
- **Màu chữ ghi chú (Muted Label):** `#5C6E67`.
- **Kính mờ di sản (Heritage Frosted Glass):**
  - Khối Hero: `bg-white/50 backdrop-blur-xl border border-white/60`
  - Thẻ thông tin Card: `bg-white/80 backdrop-blur-md border border-[#DFD8C8]`
  - Header trên đỉnh: `bg-[#F7F5EE]/20 backdrop-blur-xs border-b border-[#E2DDCF]/20`
  - Header khi cuộn: `bg-[#F7F5EE]/95 backdrop-blur-md border-b border-[#E2DDCF] shadow-xs`

---

## ✍️ 3. TYPOGRAPHY & QUY TẮC HIỂN THỊ CHỮ (SUBPIXEL RENDERING)

### 3.1. Phân Cấp Phông Chữ (Type Scale)

1. **Phông Tiêu Đề (Headings & Display Font):**
   - Phân loại: `font-serif` (Playfair Display / Cinzel / Merriweather).
   - Đặc tính: Cổ điển, văn hiến, tinh tế.
   - Quy tắc Tracking: `tracking-[0.01em]` đến `tracking-[0.02em]` (tránh kéo giãn quá rộng gây mất liên kết từ tiếng Việt có dấu).
   - Leading: `leading-[1.15]` đến `leading-[1.25]`.

2. **Phông Nội Dung (Body & Data UI Font):**
   - Phân loại: `font-sans` (`Be Vietnam Pro`, `Inter`, sans-serif).
   - Đặc tính: Rõ ràng, hỗ trợ đầy đủ bộ dấu tiếng Việt (Unicode Composite & Precomposed), sắc nét trên mọi mật độ điểm ảnh.
   - Quy tắc: `leading-relaxed` (1.6 - 1.7) để dễ đọc các văn bản học thuật và nghị quyết dài.

### 3.2. ⚠️ QUY TẮC CHỐNG VỠ NÉT CHỮ (Subpixel Antialiasing Rule)

> [!CAUTION]
> **TUYỆT ĐỐI KHÔNG SỬ DỤNG CSS `filter: drop-shadow(...)` TRÊN VĂN BẢN (TEXT SHADOW):**  
> Trên hệ điều hành Windows và các trình duyệt Chromium/Edge/Firefox, thuộc tính CSS `drop-shadow` sẽ làm tắt cơ chế khử răng cưa subpixel (DirectWrite / ClearType), dẫn đến hiện tượng chữ bị nhòe vỡ hạt pixel, răng cưa và tạo quầng hào quang bẩn.

**Giải pháp chuẩn UX/UI thay thế:**
- Sử dụng tấm nền kính mờ bảo vệ tương phản (Glassmorphism):
  ```tsx
  <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-8">
    <h1 className="font-serif font-bold text-[#0D4838]">
      DIỄN ĐÀN KINH TẾ DI SẢN
    </h1>
  </div>
  ```
- Hoặc sử dụng lớp phủ tối (Dark Overlay / Radial Vignette) đồng nhất phía sau video/hình ảnh.

---

## 📐 4. HỆ THỐNG LƯỚI & KHUNG BỐ CỤC (LAYOUT & GRID)

### 4.1. Khung Tràn Viền Cao Cấp (Ultrawide Fullwidth Container)
Dự án áp dụng quy chuẩn độ rộng màn hình hiện đại, tối ưu cho cả màn hình 24-32 inch 4K lẫn Laptop:
```tsx
// Container chuẩn toàn trang:
className="w-full max-w-[1840px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24"
```

### 4.2. Hệ Thống Bo Góc (Border Radius Scale)
- **Container lớn & Section Hero:** `rounded-3xl` (24px).
- **Thẻ Card & Khối nội dung:** `rounded-2xl` (16px) hoặc `rounded-xl` (12px).
- **Huy hiệu (Badges) & Tags:** `rounded-full` hoặc `rounded-md` (6px).
- **Nút bấm (Buttons):** `rounded-xl` (12px) hoặc `rounded-2xl` (16px).

---

## 🧩 5. CHI TIẾT CÁC THÀNH PHẦN GIAO DIỆN CHỦ ĐẠO (COMPONENT BLUEPRINTS)

### 5.1. Header Điều Hướng Thông Minh (Dynamic Opacity Header)
- **Khi ở đầu trang (`scrollY <= 20`):** Opacity 20% trong suốt nhẹ nhàng, không che lấp video Hero nền:
  ```tsx
  className="bg-[#F7F5EE]/20 backdrop-blur-xs border-b border-[#E2DDCF]/20 shadow-none"
  ```
- **Khi cuộn xuống (`scrollY > 20`):** Chuyển sang nền ngà voi mờ 95%, đổ bóng nhẹ để đọc menu rõ nét:
  ```tsx
  className="bg-[#F7F5EE]/95 backdrop-blur-md border-b border-[#E2DDCF] shadow-xs"
  ```

### 5.2. Hero Section với Video Nền & 4 Góc Vignette Tròn (Concentric Circular Vignettes)
- Video nền tốc độ cao, muted, loop vô tận: `public/videos/heritage-bg.mp4`.
- **Lớp phủ 4 góc tròn:** Sử dụng `radial-gradient(circle at ...)` tại 4 góc thay vì linear-gradient 45° (để không tạo góc chéo hình học thô cứng):
  ```tsx
  // Lớp phủ 4 góc mờ tự nhiên:
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: `
        radial-gradient(circle at 0% 0%, rgba(13, 72, 56, 0.45) 0%, transparent 45%),
        radial-gradient(circle at 100% 0%, rgba(13, 72, 56, 0.45) 0%, transparent 45%),
        radial-gradient(circle at 0% 100%, rgba(13, 72, 56, 0.45) 0%, transparent 45%),
        radial-gradient(circle at 100% 100%, rgba(13, 72, 56, 0.45) 0%, transparent 45%)
      `,
    }}
  />
  ```
- **Không có đường kẻ viền vàng đáy** cắt ngang khung hình.

### 5.3. Khối Kỳ Diễn Đàn & Các Phiên Nghị Sự (`EventHighlightSection`)
- **Tên kỳ & Mô tả:** Trình bày tiêu đề lớn, thời gian, địa điểm, quy mô đại biểu và hạn nộp bài.
- **Tabs chọn phiên:** Chuyển đổi linh hoạt giữa *Tất cả các phiên* hoặc từng phiên riêng biệt.
- **Thẻ Diễn Giả (Speaker Cards):**
  - Tỉ lệ ảnh chân dung chuẩn 4:5 có huy hiệu học hàm/học vị (`GS.TS`, `TS`, `KTS`).
  - Tên, học hàm, cơ quan công tác, trích dẫn chủ đề tham luận chính.
  - Hover chuyển động nhẹ nhàng, trỏ chuột dạng nút bấm tương tác (`role="button"`).
- **Cửa sổ Thông tin Diễn giả (Speaker Detail Dialog):**
  - Click vào bất kỳ diễn giả nào sẽ hiển thị Modal chi tiết bao gồm ảnh chân dung sắc nét, huy hiệu xác thực chính thức, tiểu sử chuyên môn, tóm tắt bài nghiên cứu và CTA đăng ký tham dự.

### 5.4. Hệ Thống Biểu Tượng Chuẩn Hóa (`HefIcon` & `BrandLogo`)
- Tuyệt đối không import icon tùy tiện từ thư viện bên ngoài. Mọi icon phải dùng thông qua component thống nhất:
  ```tsx
  <HefIcon name="Layers" size="md" variant="gold" />
  <BrandLogo size="lg" />
  ```
- Các biến thể variant chuẩn: `jade`, `crimson`, `gold`, `charcoal`, `muted`, `current`.

---

## ⚡ 6. QUY TẮC HIỆU ỨNG & CHUYỂN ĐỘNG (MOTION & ANIMATION)

- **Nguyên tắc chuyển động:** Tinh tế, có chủ đích, không lạm dụng chuyển động giật cục hoặc quá nhanh.
- **Các thành phần hoạt họa từ `@/components/animations`:**
  - `<FadeIn direction="up" delay={...}>`: Xuất hiện nhẹ nhàng từ dưới lên khi cuộn tới màn hình.
  - `<StaggerContainer>` & `<StaggerItem>`: Xuất hiện so le tự nhiên giữa các danh sách thẻ card.
  - `<AnimatedCounter to={500} suffix="+">`: Hiệu ứng đếm số tăng dần cho các chỉ số thống kê quy mô.
- **Hỗ trợ tiếp cận (Accessibility):** Tự động tôn trọng cấu hình `prefers-reduced-motion` của hệ điều hành người dùng.

---

## ♿ 7. KHẢ NĂNG TIẾP CẬN & THÂN THIỆN NGƯỜI DÙNG (ACCESSIBILITY - A11Y)

1. **Độ Tương Phản (Color Contrast):**
   - Chữ văn bản chính `#0D4838` và `#132A24` trên nền giấy `#F7F5EE` đạt tỉ lệ tương phản vượt chuẩn WCAG 2.1 AA (đạt tỉ lệ > 7:1).
2. **Hỗ Trợ Bàn Phím (Keyboard Navigation):**
   - Toàn bộ thẻ diễn giả, nút bấm và tab điều hướng đều có `tabIndex={0}`, hỗ trợ phím `Enter` và `Space` để kích hoạt.
   - Thẻ modal có `role="dialog"`, `aria-modal="true"`, và nút đóng `aria-label="Đóng cửa sổ"`.
3. **Thẻ Ngữ Nghĩa HTML5 (Semantic HTML):**
   - Phân tách rõ ràng: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.

---

## 📱 8. BẢNG CHECKLIST KIỂM ĐỊNH THIẾT KẾ (DESIGN AUDIT CHECKLIST)

Khi tạo mới hoặc cập nhật bất kỳ giao diện nào trong dự án, lập trình viên và AI cần đối chiếu:

- [x] Đã sử dụng mã màu chuẩn nhận diện (`#0D4838`, `#C29B57`, `#F7F5EE`, `#132A24`).
- [x] Tiêu đề dùng `font-serif`, nội dung dùng `font-sans`.
- [x] Không sử dụng `drop-shadow` trực tiếp lên văn bản (tránh vỡ nét font trên Windows ClearType).
- [x] Lớp phủ video dùng radial circular vignette 4 góc, không dùng góc chéo 45°.
- [x] Khung viền sử dụng `#DFD8C8` hoặc `#C29B57/40`, không dùng viền đen đậm.
- [x] Header có hiệu ứng trong suốt 20% khi ở đỉnh và 95% khi cuộn trang.
- [x] Icon đi qua component `<HefIcon>` hoặc `<BrandLogo>`.
- [x] Thẻ Card diễn giả có ảnh chân dung tỉ lệ 4:5 và modal chi tiết khi click.
- [x] Giao diện hiển thị hoàn hảo trên cả Mobile (360px), Laptop (1440px) và Màn hình lớn (1920px+).
