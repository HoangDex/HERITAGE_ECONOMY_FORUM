import { prismaService, userService, postService, heritageService } from "@/services";

/**
 * Script mẫu kiểm thử và minh họa toàn bộ Prisma 7 Services + MySQL Pool
 * Chạy bằng lệnh: pnpm exec tsx src/scripts/demo-prisma.ts
 */
async function runPrismaDemo() {
  console.log("==================================================");
  console.log("🚀 DEMO PRISMA 7 & MYSQL CONNECTION POOL SERVICES");
  console.log("==================================================\n");

  // 1. Kiểm tra trạng thái kết nối MySQL Pool
  console.log("1️⃣  Kiểm tra kết nối Pool Database:");
  const health = await prismaService.healthCheck();
  console.log(
    "   - Trạng thái kết nối:",
    health.connected ? "✅ Thành công" : "⚠️ Chưa kết nối MySQL Server"
  );
  console.log("   - Thông số Pool:", health.poolStatus);
  if (health.error) {
    console.log("   - Ghi chú lỗi:", health.error);
    console.log(
      "   👉 Vui lòng khởi động MySQL và cấu hình DATABASE_URL trong .env để chạy các bước tiếp theo.\n"
    );
    return;
  }

  // 2. Thử nghiệm UserService
  console.log("\n2️⃣  Thử nghiệm UserService (Tạo & truy vấn User):");
  const testEmail = `expert_${Date.now()}@disan.vn`;
  const newUser = await userService.create({
    email: testEmail,
    name: "Chuyên gia Mẫu",
    role: "EXPERT",
    organization: "Trung tâm Bảo tồn Di sản Cố đô",
  });
  console.log("   - Đã tạo user:", { id: newUser.id, email: newUser.email, role: newUser.role });

  // 3. Thử nghiệm PostService
  console.log("\n3️⃣  Thử nghiệm PostService (Tạo bài viết & upvote):");
  const testSlug = `thao-luan-mau-${Date.now()}`;
  const newPost = await postService.create({
    title: "Mô hình số hóa 3D lăng tẩm và khai thác vé tham quan ảo",
    slug: testSlug,
    content: "Đề xuất quy trình scan laser 3D và bán vé trải nghiệm không gian số hóa...",
    category: "technology",
    tags: ["Digital Twin", "3D Scanning", "Bảo tồn"],
    authorId: newUser.id,
  });
  console.log("   - Đã tạo post:", { id: newPost.id, title: newPost.title });

  // Upvote thử nghiệm
  const updatedPost = await postService.upvote(newPost.id, newUser.id);
  console.log("   - Đã upvote bài viết, số lượt thích mới:", updatedPost.upvotesCount);

  // 4. Thử nghiệm HeritageService
  console.log("\n4️⃣  Thử nghiệm HeritageService (Thống kê chỉ số kinh tế):");
  const stats = await heritageService.getSummaryMetrics();
  console.log("   - Tổng dự án di sản:", stats.totalProjects);
  console.log("   - Tổng việc làm tạo ra:", stats.totalJobs);

  console.log("\n==================================================");
  console.log("🎉 Hoàn tất kiểm thử demo Prisma 7 thành công!");
  console.log("==================================================");
}

runPrismaDemo()
  .catch((err) => {
    console.error("❌ Lỗi trong quá trình demo:", err);
  })
  .finally(async () => {
    await prismaService.disconnect();
  });
