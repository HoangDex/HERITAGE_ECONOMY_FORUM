import { prisma } from "../lib/prisma";
import { INITIAL_POSTS, INITIAL_HERITAGE_PROJECTS } from "../lib/mock-data";

async function main() {
  console.log("🌱 Bắt đầu gieo mầm dữ liệu mẫu (Seeding Database)...");

  // 1. Tạo Users mẫu
  const user1 = await prisma.user.upsert({
    where: { email: "chuyengia.hue@disan.vn" },
    update: {},
    create: {
      email: "chuyengia.hue@disan.vn",
      name: "TS. Lê Quang Đạt",
      role: "EXPERT",
      organization: "Hội Kiến trúc sư Di sản",
      bio: "Chuyên gia bảo tồn kiến trúc nhà rường và di tích cố đô Huế với hơn 20 năm kinh nghiệm.",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "congnghe@disan.vn" },
    update: {},
    create: {
      email: "congnghe@disan.vn",
      name: "Trần Minh Thảo",
      role: "EXPERT",
      organization: "Trung tâm Đổi mới Sáng tạo Văn hóa",
      bio: "Nghiên cứu Digital Twin, AR/VR và số hóa di sản phi vật thể.",
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: "chinhsach@disan.vn" },
    update: {},
    create: {
      email: "chinhsach@disan.vn",
      name: "Bà Nguyễn Thu Trang",
      role: "POLICYMAKER",
      organization: "Viện Nghiên cứu Quản lý Kinh tế Trung ương",
      bio: "Tư vấn chính sách ưu đãi thuế, tín dụng xanh cho doanh nghiệp di sản.",
    },
  });

  console.log(`✅ Đã tạo ${[user1, user2, user3].length} người dùng mẫu.`);

  // 2. Tạo Posts mẫu
  for (const post of INITIAL_POSTS) {
    let authorId = user1.id;
    if (post.author.name.includes("Thảo")) authorId = user2.id;
    if (post.author.name.includes("Trang")) authorId = user3.id;

    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        category: post.category,
        tags: post.tags,
        upvotesCount: post.upvotes,
        commentsCount: post.commentsCount,
        viewsCount: post.views,
        isPinned: post.isPinned || false,
        authorId,
        comments: {
          create: [
            {
              content:
                "Đề xuất rất khả thi, chúng tôi đang chuẩn bị áp dụng thử nghiệm tại địa phương.",
              authorId: user3.id,
            },
          ],
        },
      },
    });
  }
  console.log(`✅ Đã tạo ${INITIAL_POSTS.length} bài thảo luận diễn đàn mẫu.`);

  // 3. Tạo Heritage Projects mẫu
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
