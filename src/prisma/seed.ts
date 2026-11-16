import { prisma } from "./prisma.service";
import { INITIAL_HERITAGE_PROJECTS } from "../lib/mock-data";

async function main() {
  console.log("🌱 Bắt đầu gieo mầm dữ liệu mẫu (Seeding Database)...");

  // 1. Tạo 1 Admin duy nhất quản lý website CMS HEF
  const admin = await prisma.user.upsert({
    where: { email: "admin@hef.vn" },
    update: {},
    create: {
      email: "admin@hef.vn",
      name: "Ban Quản Trị Hệ Thống HEF",
      role: "ADMIN",
      organization: "Hội Di sản Văn hóa Việt Nam & HEI",
      bio: "Quản trị viên chuyên trách hệ thống CMS Diễn đàn Kinh tế Di sản Việt Nam.",
    },
  });

  console.log(`✅ Đã tạo tài khoản Admin duy nhất: ${admin.email} (${admin.name}).`);

  // 2. Tạo Heritage Projects mẫu
  for (const proj of INITIAL_HERITAGE_PROJECTS) {
    const slug = proj.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-");

    await prisma.heritageProject.upsert({
      where: { slug },
      update: {},
      create: {
        name: proj.name,
        slug,
        location: proj.location,
        category: proj.category,
        status: proj.status,
        description: proj.description,
        highlights: proj.highlights,
        annualRevenue: proj.economicMetrics.annualRevenue,
        jobsCreated: proj.economicMetrics.jobsCreated,
        conservationFundShare: proj.economicMetrics.conservationFundShare,
      },
    });
  }
  console.log(`✅ Đã tạo ${INITIAL_HERITAGE_PROJECTS.length} dự án kinh tế di sản mẫu.`);
  console.log("🎉 Seeding hoàn tất thành công!");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed dữ liệu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
