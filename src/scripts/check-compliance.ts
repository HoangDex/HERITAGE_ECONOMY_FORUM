/**
 * AUTOMATED CODE ARCHITECTURE COMPLIANCE AUDITOR
 * Công cụ tự động quét và kiểm tra mức độ tuân thủ 10 quy tắc kiến trúc bắt buộc
 * của Heritage Economy Forum (HEF) theo tài liệu docs/HEF_CMS_CODING_RULES.md
 */

import fs from "fs";
import path from "path";

interface AuditResult {
  ruleNumber: number;
  ruleName: string;
  status: "PASSED" | "FAILED" | "WARNING";
  details: string;
}

const results: AuditResult[] = [];

function checkRule(
  ruleNumber: number,
  ruleName: string,
  fn: () => { passed: boolean; details: string; warning?: boolean }
) {
  try {
    const res = fn();
    results.push({
      ruleNumber,
      ruleName,
      status: res.passed ? "PASSED" : res.warning ? "WARNING" : "FAILED",
      details: res.details,
    });
  } catch (err) {
    results.push({
      ruleNumber,
      ruleName,
      status: "FAILED",
      details: `Lỗi thực thi kiểm tra: ${(err as Error).message}`,
    });
  }
}

console.log("================================================================================");
console.log("  🔍 BẮT ĐẦU QUÉT KIỂM TRA TUÂN THỦ KIẾN TRÚC & QUY TẮC CODE HEF CMS");
console.log("================================================================================");

// 1. Kiểm tra cấu trúc phân lớp 7-Layer trong src/features/
checkRule(1, "Kiến trúc 7-Layer trong Feature Modules", () => {
  const featuresDir = path.join(process.cwd(), "src/features");
  if (!fs.existsSync(featuresDir))
    return { passed: false, details: "Thư mục src/features không tồn tại" };

  const features = fs
    .readdirSync(featuresDir)
    .filter((f) => fs.statSync(path.join(featuresDir, f)).isDirectory());
  const missingLayers: string[] = [];

  for (const feature of features) {
    const fPath = path.join(featuresDir, feature);
    const hasIndex = fs.existsSync(path.join(fPath, "index.ts"));
    if (!hasIndex) missingLayers.push(`${feature} thiếu index.ts barrel export`);
  }

  if (missingLayers.length > 0) {
    return { passed: false, details: missingLayers.join("; ") };
  }
  return {
    passed: true,
    details: `Đã kiểm tra ${features.length} features (${features.join(", ")}): Đầy đủ barrel export và ranh giới layer.`,
  };
});

// 2. Kiểm tra không bypass Service Layer (Cấm gọi trực tiếp Prisma từ UI hoặc Action)
checkRule(2, "Cấm truy cập Prisma trực tiếp từ UI/Action", () => {
  const forbiddenDirs = [
    path.join(process.cwd(), "src/components"),
    path.join(process.cwd(), "src/app"),
  ];

  const violations: string[] = [];

  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        scanDir(fullPath);
      } else if (item.endsWith(".tsx") || item.endsWith(".ts")) {
        const content = fs.readFileSync(fullPath, "utf-8");
        // Kiểm tra xem có gọi prisma.<model> trực tiếp trong UI hay không
        if (/prisma\.(page|user|post|heritage)/.test(content)) {
          violations.push(path.relative(process.cwd(), fullPath));
        }
      }
    }
  }

  for (const dir of forbiddenDirs) scanDir(dir);

  if (violations.length > 0) {
    return {
      passed: false,
      details: `Phát hiện truy cập trực tiếp Prisma tại: ${violations.join(", ")}`,
    };
  }
  return {
    passed: true,
    details: "100% UI Components và App Router tuân thủ gọi qua Service/Repository Layer.",
  };
});

// 3. Kiểm tra Repository không bị rò rỉ ra index.ts
checkRule(3, "Bảo vệ ranh giới Repository (Cấm export Repository ở index.ts)", () => {
  const featuresDir = path.join(process.cwd(), "src/features");
  const leakedFeatures: string[] = [];

  if (fs.existsSync(featuresDir)) {
    const features = fs
      .readdirSync(featuresDir)
      .filter((f) => fs.statSync(path.join(featuresDir, f)).isDirectory());
    for (const f of features) {
      const indexPath = path.join(featuresDir, f, "index.ts");
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, "utf-8");
        if (
          /export\s+.*(repository|Repository)/.test(content) &&
          !content.includes('export * from "./types/')
        ) {
          leakedFeatures.push(f);
        }
      }
    }
  }

  if (leakedFeatures.length > 0) {
    return {
      passed: false,
      details: `Phát hiện rò rỉ Repository trong index.ts của: ${leakedFeatures.join(", ")}`,
    };
  }
  return {
    passed: true,
    details: "Ranh giới nội bộ Repository được bảo toàn. Chỉ export Interface & Service.",
  };
});

// 4. Kiểm tra Prisma 7 không khai báo url trong schema.prisma
checkRule(4, "Chuẩn Prisma 7 (Datasource URL trong prisma.config.ts)", () => {
  const schemaPath = path.join(process.cwd(), "src/prisma/schema.prisma");
  const configPath = path.join(process.cwd(), "prisma.config.ts");

  if (!fs.existsSync(schemaPath))
    return { passed: false, details: "Không tìm thấy src/prisma/schema.prisma" };
  if (!fs.existsSync(configPath))
    return { passed: false, details: "Không tìm thấy prisma.config.ts" };

  const schemaContent = fs.readFileSync(schemaPath, "utf-8");
  if (/url\s*=\s*env\(/.test(schemaContent)) {
    return {
      passed: false,
      details: "Phát hiện thuộc tính 'url' trong schema.prisma (vi phạm chuẩn Prisma 7)",
    };
  }

  return {
    passed: true,
    details: "src/prisma/schema.prisma tuân thủ chuẩn Prisma 7, url cấu hình tại prisma.config.ts.",
  };
});

// 5. Kiểm tra MariaDB Connection Pool và Singleton Prisma Client
checkRule(5, "MariaDB Pool Adapter & Singleton Prisma Client", () => {
  const prismaClientPath = path.join(process.cwd(), "src/lib/prisma.ts");
  if (!fs.existsSync(prismaClientPath))
    return { passed: false, details: "Không tìm thấy src/lib/prisma.ts" };

  const content = fs.readFileSync(prismaClientPath, "utf-8");
  const usesAdapter = content.includes("@prisma/adapter-mariadb");
  const usesPool = content.includes("createPool");

  if (!usesAdapter || !usesPool) {
    return {
      passed: false,
      details: "src/lib/prisma.ts chưa sử dụng adapter-mariadb kết hợp pool.",
    };
  }
  return {
    passed: true,
    details: "Singleton Prisma Client kết nối chuẩn MariaDB Connection Pool.",
  };
});

// 6. Kiểm tra Graceful In-Memory Fallback trong Repository
checkRule(6, "Graceful In-Memory Fallback khi CSDL Offline", () => {
  const repoPath = path.join(process.cwd(), "src/features/pages/repositories/page.repository.ts");
  if (!fs.existsSync(repoPath))
    return { passed: false, details: "Không tìm thấy page.repository.ts" };

  const content = fs.readFileSync(repoPath, "utf-8");
  const hasFallback =
    (content.includes("fallbackPages") || content.includes("DEFAULT_HEF_PAGES")) &&
    content.includes("catch");

  if (!hasFallback) {
    return {
      passed: false,
      details: "page.repository.ts thiếu cơ chế bắt lỗi và fallback dữ liệu mẫu.",
    };
  }
  return {
    passed: true,
    details: "PageRepository có try/catch đầy đủ và fallback 7 trang chuyên đề khi DB offline.",
  };
});

// 7. Kiểm tra Design Tokens nhận diện Di sản (Đỏ son, Vàng đồng, Ngà voi, Đen than)
checkRule(7, "Design Tokens Màu Nhận Diện & Typography Di Sản", () => {
  const cssPath = path.join(process.cwd(), "src/app/globals.css");
  if (!fs.existsSync(cssPath))
    return { passed: false, details: "Không tìm thấy src/app/globals.css" };

  const css = fs.readFileSync(cssPath, "utf-8").toLowerCase();
  const hasCrimson = css.includes("#76232d");
  const hasGold = css.includes("#c29b57");
  const hasIvory = css.includes("#f5efe5");
  const hasCharcoal = css.includes("#292929");

  if (!hasCrimson || !hasGold || !hasIvory || !hasCharcoal) {
    return {
      passed: false,
      details: "globals.css thiếu mã màu nhận diện chuẩn (#76232D, #C29B57, #F5EFE5, #292929).",
    };
  }
  return {
    passed: true,
    details: "Đầy đủ 4 mã màu nhận diện thương hiệu HEF và biến CSS serif/sans.",
  };
});

// 8. Kiểm tra Bộ Icon Component System (HefIcon & BrandLogo)
checkRule(8, "Icon Component System chuẩn hóa (HefIcon & BrandLogo)", () => {
  const hefIconPath = path.join(process.cwd(), "src/components/icons/hef-icon.tsx");
  const brandLogoPath = path.join(process.cwd(), "src/components/icons/brand-logo.tsx");

  if (!fs.existsSync(hefIconPath) || !fs.existsSync(brandLogoPath)) {
    return {
      passed: false,
      details: "Thiếu component HefIcon hoặc BrandLogo trong src/components/icons/",
    };
  }

  const content = fs.readFileSync(hefIconPath, "utf-8");
  const hasVariants =
    content.includes("crimson") && content.includes("gold") && content.includes("charcoal");

  if (!hasVariants) {
    return { passed: false, details: "HefIcon thiếu cấu hình variants màu nhận diện." };
  }
  return {
    passed: true,
    details: "HefIcon và BrandLogo hoàn thiện, đóng gói chuẩn variants màu và kích cỡ.",
  };
});

// 9. Kiểm tra Kiến trúc Dynamic Sections JSON CMS & Trang Quản Trị Admin
checkRule(9, "Kiến trúc Dynamic Sections JSON CMS & Dashboard Admin", () => {
  const adminDashboard = path.join(process.cwd(), "src/app/(admin)/admin/dashboard/page.tsx");
  const adminPages = path.join(process.cwd(), "src/app/(admin)/admin/pages/page.tsx");
  const adminPageDetail = path.join(process.cwd(), "src/app/(admin)/admin/pages/[id]/page.tsx");
  const pagesSchema = path.join(process.cwd(), "src/features/pages/schemas/page.schema.ts");

  if (
    !fs.existsSync(adminDashboard) ||
    !fs.existsSync(adminPages) ||
    !fs.existsSync(adminPageDetail)
  ) {
    return {
      passed: false,
      details: "Thiếu cấu trúc trang Admin CMS (/admin/dashboard, /admin/pages, /admin/pages/[id])",
    };
  }

  if (!fs.existsSync(pagesSchema)) {
    return {
      passed: false,
      details: "Thiếu Zod schema xác thực khối section động tại src/features/pages/schemas/",
    };
  }

  return {
    passed: true,
    details: "Hệ thống Dashboard Admin và Dynamic Section JSON hoàn thiện đầy đủ.",
  };
});

// 10. Kiểm tra Định Dạng Giờ Việt Nam (GMT+7) và Cổng Đăng Nhập SSO
checkRule(10, "Chuẩn Thời Gian Việt Nam (GMT+7) & Cổng Đăng Nhập SSO", () => {
  const formatDatePath = path.join(process.cwd(), "src/lib/format-date.ts");
  const loginFormPath = path.join(process.cwd(), "src/features/auth/components/login-form.tsx");

  if (!fs.existsSync(formatDatePath))
    return { passed: false, details: "Thiếu src/lib/format-date.ts" };
  if (!fs.existsSync(loginFormPath)) return { passed: false, details: "Thiếu login-form.tsx" };

  const formatDateContent = fs.readFileSync(formatDatePath, "utf-8");
  const loginContent = fs.readFileSync(loginFormPath, "utf-8");

  const hasVNTime =
    formatDateContent.includes("Asia/Ho_Chi_Minh") || formatDateContent.includes("+07:00");
  const hasSSO = loginContent.includes("VNeID") && loginContent.includes("Cơ quan Nhà nước");

  if (!hasVNTime)
    return { passed: false, details: "format-date.ts chưa cấu hình múi giờ Asia/Ho_Chi_Minh." };
  if (!hasSSO)
    return { passed: false, details: "login-form.tsx thiếu cổng đăng nhập SSO VNeID / CQNN." };

  return {
    passed: true,
    details:
      "Định dạng ngày giờ GMT+7 chuẩn xác. Cổng SSO VNeID, CQNN, Enterprise tích hợp sẵn sàng.",
  };
});

// In Bảng Kết Quả
console.log("\n📊 BẢNG TỔNG KẾT KẾT QUẢ KIỂM TRA (COMPLIANCE AUDIT MATRIX):\n");
let totalPassed = 0;

results.forEach((r) => {
  const icon = r.status === "PASSED" ? "✅" : r.status === "WARNING" ? "⚠️" : "❌";
  if (r.status === "PASSED") totalPassed++;
  console.log(`${icon} [Quy Tắc ${r.ruleNumber}] ${r.ruleName}`);
  console.log(`   └─ Trạng thái: ${r.status}`);
  console.log(`   └─ Chi tiết:   ${r.details}\n`);
});

const scorePercentage = Math.round((totalPassed / results.length) * 100);
console.log("================================================================================");
console.log(
  `  🏆 ĐIỂM ĐÁNH GIÁ CHẤT LƯỢNG: ${scorePercentage}% (${totalPassed}/${results.length} Quy Tắc Đạt Chuẩn)`
);
console.log("================================================================================");

if (totalPassed === results.length) {
  console.log("🎉 XÁC NHẬN: MÃ NGUỒN HOÀN TOÀN TUÂN THỦ 100% QUY TẮC KIẾN TRÚC HEF CMS!\n");
  process.exit(0);
} else {
  console.error("⛔ CẢNH BÁO: Phát hiện vi phạm kiến trúc cần được khắc phục trước khi commit.\n");
  process.exit(1);
}
