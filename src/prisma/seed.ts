import { prisma, prismaService } from "./prisma.service";
import { INITIAL_HERITAGE_PROJECTS } from "../lib/mock-data";
import { DEFAULT_HEF_PAGES } from "../features/pages/data/default-pages.data";

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

  // 2. Tạo ProjectCategory (id Int tự tăng, chỉ gồm id và name) & Projects mẫu
  const projectCategoryMap = new Map<string, number>();
  let pcatCounter = 1;
  for (const proj of INITIAL_HERITAGE_PROJECTS) {
    if (!projectCategoryMap.has(proj.category)) {
      const catId = pcatCounter++;
      const projectCat = await prisma.projectCategory.upsert({
        where: { id: catId },
        update: { name: proj.category },
        create: {
          id: catId,
          name: proj.category,
        },
      });
      projectCategoryMap.set(proj.category, projectCat.id);
    }
  }

  for (const proj of INITIAL_HERITAGE_PROJECTS) {
    const slug =
      proj.slug ||
      proj.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-");

    const projectCatId = projectCategoryMap.get(proj.category) ?? 1;

    await prisma.project.upsert({
      where: { slug },
      update: {
        name: proj.name,
        location: proj.location,
        categoryId: projectCatId,
        status: proj.status,
        description: proj.description,
        highlights: proj.highlights,
        thumbnailUrl: proj.imageUrl,
        annualRevenue: proj.economicMetrics.annualRevenue,
        jobsCreated: proj.economicMetrics.jobsCreated,
        conservationFundShare: proj.economicMetrics.conservationFundShare,
      },
      create: {
        id: proj.id,
        name: proj.name,
        slug,
        location: proj.location,
        categoryId: projectCatId,
        status: proj.status,
        description: proj.description,
        highlights: proj.highlights,
        thumbnailUrl: proj.imageUrl,
        annualRevenue: proj.economicMetrics.annualRevenue,
        jobsCreated: proj.economicMetrics.jobsCreated,
        conservationFundShare: proj.economicMetrics.conservationFundShare,
      },
    });
  }
  console.log(`✅ Đã tạo ${INITIAL_HERITAGE_PROJECTS.length} dự án kinh tế di sản mẫu (model Project & ProjectCategory).`);

  // 3. Khởi tạo Danh mục Đối tác & Tổ chức (Organizations)
  const organizationsData = [
    {
      id: "p_1",
      name: "Bộ Văn hóa, Thể thao và Du lịch",
      shortName: "BVHTTDL",
      category: "STEERING" as const,
      logoUrl: "/images/partners/bvhttdl.png",
      websiteUrl: "https://bvhttdl.gov.vn",
    },
    {
      id: "p_2",
      name: "Ủy ban Quốc gia UNESCO Việt Nam",
      shortName: "UNESCO VN",
      category: "STEERING" as const,
      logoUrl: "/images/partners/unesco.png",
      websiteUrl: "https://unesco.org.vn",
    },
    {
      id: "p_3",
      name: "Hội Di sản Văn hóa Việt Nam",
      shortName: "VCHA",
      category: "HOSTING" as const,
      logoUrl: "/images/partners/vcha.png",
      websiteUrl: "https://hoidisan.vn",
    },
    {
      id: "p_4",
      name: "Ủy ban Nhân dân Thành phố Hà Nội",
      shortName: "UBND TP Hà Nội",
      category: "HOSTING" as const,
      logoUrl: "/images/partners/hanoi.png",
      websiteUrl: "https://hanoi.gov.vn",
    },
    {
      id: "p_5",
      name: "Đại học Quốc gia Hà Nội",
      shortName: "VNU",
      category: "HOSTING" as const,
      logoUrl: "/images/partners/vnu.png",
      websiteUrl: "https://vnu.edu.vn",
    },
    {
      id: "p_6",
      name: "Viện Nghiên cứu Kinh tế Di sản",
      shortName: "HEI",
      category: "ORGANIZING" as const,
      logoUrl: "/images/partners/hei.png",
      websiteUrl: "https://hef.vn",
    },
    {
      id: "p_7",
      name: "Trung tâm Bảo tồn Di sản Thăng Long - Hà Nội",
      shortName: "TL-HN",
      category: "ORGANIZING" as const,
      logoUrl: "/images/partners/thanglong.png",
      websiteUrl: "https://hoangthanhthanglong.vn",
    },
    {
      id: "p_8",
      name: "Trung tâm Bảo tồn Di tích Cố đô Huế",
      shortName: "HMCC",
      category: "ORGANIZING" as const,
      logoUrl: "/images/partners/hue.png",
      websiteUrl: "https://hueworldheritage.org.vn",
    },
    {
      id: "p_9",
      name: "Tập đoàn Sovico",
      shortName: "Sovico Group",
      category: "STRATEGIC" as const,
      logoUrl: "/images/partners/sovico.png",
      websiteUrl: "https://sovicogroup.com",
    },
    {
      id: "p_10",
      name: "Tập đoàn Vingroup",
      shortName: "Quỹ Thiện Tâm",
      category: "STRATEGIC" as const,
      logoUrl: "/images/partners/vingroup.png",
      websiteUrl: "https://vingroup.net",
    },
    {
      id: "p_11",
      name: "Ngân hàng TMCP Ngoại thương Việt Nam",
      shortName: "Vietcombank",
      category: "STRATEGIC" as const,
      logoUrl: "/images/partners/vietcombank.png",
      websiteUrl: "https://vietcombank.com.vn",
    },
    {
      id: "p_12",
      name: "Đài Truyền hình Việt Nam",
      shortName: "VTV",
      category: "MEDIA" as const,
      logoUrl: "/images/partners/vtv.png",
      websiteUrl: "https://vtv.vn",
    },
    {
      id: "p_13",
      name: "Báo Nhân Dân",
      shortName: "Báo Nhân Dân",
      category: "MEDIA" as const,
      logoUrl: "/images/partners/nhandan.png",
      websiteUrl: "https://nhandan.vn",
    },
  ];

  for (const org of organizationsData) {
    await prisma.organization.upsert({
      where: { id: org.id },
      update: {
        name: org.name,
        shortName: org.shortName,
        category: org.category,
        logoUrl: org.logoUrl,
        websiteUrl: org.websiteUrl,
      },
      create: org,
    });
  }
  console.log(`✅ Đã khởi tạo ${organizationsData.length} Tổ chức/Đối tác dùng chung.`);

  // 4. Khởi tạo Chuyên mục & Tin tức (News & Categories - Category chỉ có id Int tự tăng và name)
  const catActivity = await prisma.category.upsert({
    where: { id: 1 },
    update: { name: "Hoạt Động Diễn Đàn" },
    create: {
      id: 1,
      name: "Hoạt Động Diễn Đàn",
    },
  });

  const catPolicy = await prisma.category.upsert({
    where: { id: 2 },
    update: { name: "Chính Sách & Nghiên Cứu" },
    create: {
      id: 2,
      name: "Chính Sách & Nghiên Cứu",
    },
  });

  const catPractice = await prisma.category.upsert({
    where: { id: 3 },
    update: { name: "Mô Hình & Thực Tiễn" },
    create: {
      id: 3,
      name: "Mô Hình & Thực Tiễn",
    },
  });

  const catResearch = catPolicy;
  void catActivity;

  const newsData = [
    {
      id: "news_feat_1",
      title:
        "Khung Thể Chế Đối Tác Công Tư (PPP) Trong Bảo Tồn Di Sản: Cơ Hội Cho Doanh Nghiệp Trách Nhiệm",
      slug: "cong-bo-khung-huong-dan-ppp-di-san",
      excerpt:
        "Văn kiện quan trọng tháo gỡ nút thắt về vốn và cơ chế chuyển nhượng quyền khai thác dịch vụ di sản có thời hạn, bảo đảm quyền giám sát của nhà nước và cộng đồng.",
      categoryId: catPolicy.id,
      authorName: "GS.TS. Trần Quốc Vượng",
      authorTitle: "Chủ tịch Hội đồng Khoa học HEF",
      readingTimeMinutes: 6,
      coverImageUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=500&q=80",
    },
    {
      id: "news_lat_1",
      title: "UNESCO Đánh Giá Cao Mô Hình Kinh Tế Sinh Kế Tại Quần Thể Danh Thắng Tràng An",
      slug: "unesco-danh-gia-cao-mo-hinh-trang-an",
      excerpt:
        "Hơn 10.000 người dân vùng lõi di sản được đào tạo và làm việc trực tiếp trong ngành dịch vụ sinh thái.",
      categoryId: catPractice.id,
      authorName: "Ban Thư ký HEF",
      authorTitle: "Viện Kinh tế Di sản",
      readingTimeMinutes: 5,
      coverImageUrl:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=400&q=80",
    },
    {
      id: "news_lat_2",
      title: "Họp Báo Khởi Động Chuỗi Tọa Đàm 'Kinh Tế Sáng Tạo Từ Di Sản Thủ Công Mỹ Nghệ'",
      slug: "hop-bao-khoi-dong-toa-dam-thu-cong",
      excerpt:
        "Quy tụ 20 nghệ nhân tiêu biểu và các nhà thiết kế trẻ đương đại cùng giải bài toán thương mại hóa bản sắc.",
      categoryId: catResearch.id,
      authorName: "KTS. Lê Hoàng Phương",
      authorTitle: "Chuyên gia Đô thị Di sản",
      readingTimeMinutes: 4,
      coverImageUrl:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&h=400&q=80",
    },
    {
      id: "news_lat_3",
      title: "Ứng Dụng Bản Đồ Số Di Sản GIS Phục Vụ Quy Hoạch Và Thu Hút Đầu Tư Du Lịch",
      slug: "ung-dung-ban-do-so-gis-di-san",
      excerpt:
        "Số hóa hơn 3.000 điểm di tích xếp hạng cấp quốc gia trên nền tảng bản đồ số tương tác mở.",
      categoryId: catResearch.id,
      authorName: "Nhóm Dự án HEF",
      authorTitle: "Trung tâm Dữ liệu Di sản",
      readingTimeMinutes: 5,
      coverImageUrl:
        "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&h=400&q=80",
    },
  ];

  for (const n of newsData) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: {
        title: n.title,
        excerpt: n.excerpt,
        categoryId: n.categoryId,
        authorName: n.authorName,
        authorTitle: n.authorTitle,
        readingTimeMinutes: n.readingTimeMinutes,
        status: "PUBLISHED",
        coverImageUrl: n.coverImageUrl,
        publishedAt: new Date(),
      },
      create: {
        id: n.id,
        title: n.title,
        slug: n.slug,
        excerpt: n.excerpt,
        categoryId: n.categoryId,
        authorName: n.authorName,
        authorTitle: n.authorTitle,
        readingTimeMinutes: n.readingTimeMinutes,
        status: "PUBLISHED",
        coverImageUrl: n.coverImageUrl,
        publishedAt: new Date(),
      },
    });
  }
  console.log(`✅ Đã khởi tạo ${newsData.length} Tin tức / Bài viết mẫu.`);

  // 5. Khởi tạo Khách mời / Diễn giả (Guests)
  const guestsData = [
    {
      id: 1,
      name: "GS.TS. Trần Quốc Vượng",
      title: "Chủ tịch Hội đồng Khoa học",
      organization: "Hội Di sản Văn hóa Việt Nam",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
      quote: "Chuyên gia đầu ngành về khảo cổ học và kinh tế di sản với hơn 40 năm cống hiến.",
    },
    {
      id: 2,
      name: "TS. Nguyễn Thị Bích Liên",
      title: "Viện trưởng",
      organization: "Viện Nghiên cứu Kinh tế Di sản (HEI)",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80",
      quote: "Chuyên gia tư vấn chính sách di sản cho UNESCO và các địa phương.",
    },
    {
      id: 3,
      name: "KTS. Lê Hoàng Phương",
      title: "Giám đốc Quy hoạch Di sản",
      organization: "Viện Quy hoạch Đô thị & Nông thôn Quốc gia",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
      quote: "Chủ trì nhiều đồ án bảo tồn di tích đô thị và làng cổ tại Việt Nam.",
    },
  ];

  for (const guest of guestsData) {
    await prisma.guest.upsert({
      where: { id: guest.id },
      update: {
        name: guest.name,
        title: guest.title,
        organization: guest.organization,
        avatar: guest.avatar,
        quote: guest.quote,
      },
      create: guest,
    });
  }
  console.log(`✅ Đã khởi tạo ${guestsData.length} Diễn giả / Khách mời mẫu.`);

  // 6. Khởi tạo Giải Thưởng Quốc Gia
  await prisma.award.upsert({
    where: { year: 2026 },
    update: {
      name: "Giải Thưởng Phát Triển Bền Vững Chủ Động 2026",
      theme: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
      nominationDeadline: new Date("2026-10-15T23:59:59.000Z"),
      isOpen: true,
      rulesUrl: "/awards/the-le-giai-thuong-2026.pdf",
    },
    create: {
      id: "award_2026",
      year: 2026,
      name: "Giải Thưởng Phát Triển Bền Vững Chủ Động 2026",
      theme: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
      nominationDeadline: new Date("2026-10-15T23:59:59.000Z"),
      isOpen: true,
      rulesUrl: "/awards/the-le-giai-thuong-2026.pdf",
    },
  });
  console.log("✅ Đã khởi tạo Giải thưởng 2026.");

  // 7. Khởi tạo 7 Pages cốt lõi cùng toàn bộ Section Props JSON vào CSDL
  for (const p of DEFAULT_HEF_PAGES) {
    await prisma.page.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        props: p.props as object,
        isPublished: p.isPublished,
      },
      create: {
        id: p.id,
        slug: p.slug,
        name: p.name,
        props: p.props as object,
        isPublished: p.isPublished,
      },
    });
  }
  console.log(
    `✅ Đã khởi tạo ${DEFAULT_HEF_PAGES.length} Trang CMS với cấu trúc props (JSON chia theo từng section và mảng ids).`
  );
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed dữ liệu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaService.disconnect();
  });
