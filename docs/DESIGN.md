# HỆ THỐNG THIẾT KẾ & QUY CHUẨN UI/UX (DESIGN SYSTEM GUIDELINES)
## DIỄN ĐÀN KINH TẾ DI SẢN (HERITAGE ECONOMY FORUM - HEF)

> [!NOTE]
> File tài liệu thiết kế chính thức được lưu trữ tại file gốc ở thư mục gốc của repository: [`DESIGN.md`](../DESIGN.md).

Vui lòng tham khảo tài liệu chi tiết tại [`../DESIGN.md`](../DESIGN.md) để xem:
- **1. Triết Lý Thiết Kế:** Bản sắc di sản văn hiến kết hợp tư duy công nghệ đương đại.
- **2. Bảng Màu & Design Tokens:** Xanh Lục Bảo Di Sản (`#0D4838`), Vàng Hoàng Kim (`#C29B57`), Giấy Dó Ngà Voi (`#F7F5EE`), Mực Tàu Đen Than (`#132A24`), Viền Giấy Di Sản (`#DFD8C8`).
- **3. Typography & Subpixel Rendering:** Chống vỡ nét font trên Windows DirectWrite/ClearType (tuyệt đối không dùng `drop-shadow` lên font chữ, thay bằng nền kính mờ Frosted Glass).
- **4. Hệ Thống Lưới & Bố Cục:** Khung tràn viền Ultrawide Fullwidth (`max-w-[1840px] 2xl:max-w-[1920px]`).
- **5. Các Khối Giao Diện Chủ Đạo:**
  - Header bán trong suốt 20% khi ở đỉnh, 95% khi cuộn.
  - Hero Section video nền kèm 4 góc tròn concentric radial vignettes.
  - Khối Diễn Đàn & Các Phiên Nghị Sự (`EventHighlightSection`) với ảnh diễn giả 4:5, modal chi tiết khi click, tabs chọn phiên.
  - Hệ thống Icon chuẩn hóa `<HefIcon>` & `<BrandLogo>`.
- **6. Motion & Chuyển Động:** Quy tắc vi chuyển động từ `@/components/animations`.
- **7. Khả Năng Tiếp Cận (WCAG 2.1 AA).**
- **8. Checklist Kiểm Định Thiết Kế.**
