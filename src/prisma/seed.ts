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

  // 2. Khởi tạo 7 Pages cốt lõi cùng toàn bộ Sections JSON vào CSDL
  for (const p of DEFAULT_HEF_PAGES) {
    await prisma.page.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        title: p.title,
        description: p.description,
        sections: p.sections as object,
        isPublished: p.isPublished,
        order: p.order,
      },
      create: {
        id: p.id,
        slug: p.slug,
        name: p.name,
        title: p.title,
        description: p.description,
        sections: p.sections as object,
        isPublished: p.isPublished,
        order: p.order,
        publishedAt: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      },
    });
  }
  console.log(`✅ Đã khởi tạo ${DEFAULT_HEF_PAGES.length} Trang CMS cùng toàn bộ Sections JSON (Home 8 sections, About 5 sections).`);

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

  // 4. Khởi tạo Danh mục Đối tác & Tổ chức (Organizations)
  const organizationsData = [
    {
      id: "org_bvhttdl",
      name: "Bộ Văn hóa, Thể thao và Du lịch",
      shortName: "BVHTTDL",
      category: "STEERING" as const,
      logoUrl: "/images/partners/bvhttdl.png",
      websiteUrl: "https://bvhttdl.gov.vn",
      pages: [
        { pageSlug: "home", pageName: "Trang chủ", roleLabel: "Cơ quan Chỉ đạo", displayOrder: 1 },
        { pageSlug: "forum", pageName: "Diễn đàn", roleLabel: "Cơ quan Chỉ đạo", displayOrder: 1 },
      ],
    },
    {
      id: "org_unesco",
      name: "Ủy ban Quốc gia UNESCO Việt Nam",
      shortName: "UNESCO VN",
      category: "STEERING" as const,
      logoUrl: "/images/partners/unesco.png",
      websiteUrl: "https://unesco.org.vn",
      pages: [
        { pageSlug: "home", pageName: "Trang chủ", roleLabel: "Cơ quan Đồng hành Quốc tế", displayOrder: 2 },
        { pageSlug: "about", pageName: "Giới thiệu", roleLabel: "Đối tác Quốc tế", displayOrder: 1 },
      ],
    },
    {
      id: "org_vcha",
      name: "Hội Di sản Văn hóa Việt Nam",
      shortName: "VCHA",
      category: "HOSTING" as const,
      logoUrl: "/images/partners/vcha.png",
      websiteUrl: "https://hoidisan.vn",
      pages: [
        { pageSlug: "home", pageName: "Trang chủ", roleLabel: "Cơ quan Chủ trì Học thuật", displayOrder: 3 },
        { pageSlug: "about", pageName: "Giới thiệu", roleLabel: "Đơn vị Chủ trì", displayOrder: 2 },
      ],
    },
    {
      id: "org_vnu",
      name: "Đại học Quốc gia Hà Nội",
      shortName: "VNU",
      category: "HOSTING" as const,
      logoUrl: "/images/partners/vnu.png",
      websiteUrl: "https://vnu.edu.vn",
      pages: [
        { pageSlug: "home", pageName: "Trang chủ", roleLabel: "Cơ quan Phối hợp Nghiên cứu", displayOrder: 4 },
        { pageSlug: "about", pageName: "Giới thiệu", roleLabel: "Đối tác Học thuật", displayOrder: 3 },
      ],
    },
    {
      id: "org_thanglong",
      name: "Trung tâm Bảo tồn Di sản Thăng Long - Hà Nội",
      shortName: "Hoàng Thành",
      category: "ORGANIZING" as const,
      logoUrl: "/images/partners/thanglong.png",
      websiteUrl: "https://hoangthanhthanglong.vn",
      pages: [
        { pageSlug: "home", pageName: "Trang chủ", roleLabel: "Đơn vị Đăng cai Tổ chức", displayOrder: 5 },
        { pageSlug: "forum", pageName: "Diễn đàn", roleLabel: "Địa điểm Đăng cai", displayOrder: 2 },
      ],
    },
    {
      id: "org_sovico",
      name: "Tập đoàn Sovico",
      shortName: "Sovico Group",
      category: "STRATEGIC" as const,
      logoUrl: "/images/partners/sovico.png",
      websiteUrl: "https://sovicogroup.com",
      pages: [
        { pageSlug: "home", pageName: "Trang chủ", roleLabel: "Nhà Tài trợ Chiến lược", displayOrder: 6 },
        { pageSlug: "awards", pageName: "Giải thưởng", roleLabel: "Nhà Đồng hành Giải thưởng", displayOrder: 1 },
      ],
    },
    {
      id: "org_vietcombank",
      name: "Ngân hàng TMCP Ngoại thương Việt Nam",
      shortName: "Vietcombank",
      category: "STRATEGIC" as const,
      logoUrl: "/images/partners/vietcombank.png",
      websiteUrl: "https://vietcombank.com.vn",
      pages: [
        { pageSlug: "home", pageName: "Trang chủ", roleLabel: "Đối tác Tài chính Di sản", displayOrder: 7 },
        { pageSlug: "projects", pageName: "Mô hình & Dự án", roleLabel: "Tín dụng Xanh", displayOrder: 1 },
      ],
    },
  ];

  for (const org of organizationsData) {
    const createdOrg = await prisma.organization.upsert({
      where: { id: org.id },
      update: {
        name: org.name,
        shortName: org.shortName,
        category: org.category,
        logoUrl: org.logoUrl,
        websiteUrl: org.websiteUrl,
      },
      create: {
        id: org.id,
        name: org.name,
        shortName: org.shortName,
        category: org.category,
        logoUrl: org.logoUrl,
        websiteUrl: org.websiteUrl,
      },
    });

    for (const p of org.pages) {
      await prisma.pageOrganization.upsert({
        where: {
          pageSlug_organizationId: {
            pageSlug: p.pageSlug,
            organizationId: createdOrg.id,
          },
        },
        update: {
          roleLabel: p.roleLabel,
          displayOrder: p.displayOrder,
          pageName: p.pageName,
        },
        create: {
          pageSlug: p.pageSlug,
          pageName: p.pageName,
          organizationId: createdOrg.id,
          roleLabel: p.roleLabel,
          displayOrder: p.displayOrder,
        },
      });
    }
  }
  console.log(`✅ Đã khởi tạo ${organizationsData.length} Tổ chức/Đối tác dùng chung và thiết lập liên kết tái sử dụng các trang.`);

  // 5. Khởi tạo Chuyên mục & Tin tức (News & Categories)
  const catPolicy = await prisma.category.upsert({
    where: { slug: "chinh-sach-the-che" },
    update: {},
    create: {
      name: "Chính Sách & Thể Chế",
      slug: "chinh-sach-the-che",
      description: "Nghiên cứu khung pháp lý và chính sách PPP trong bảo tồn di sản",
    },
  });

  const catResearch = await prisma.category.upsert({
    where: { slug: "nghien-cuu-du-lieu" },
    update: {},
    create: {
      name: "Nghiên Cứu & Dữ Liệu",
      slug: "nghien-cuu-du-lieu",
      description: "Số liệu lượng hóa kinh tế di sản và báo cáo thường niên",
    },
  });

  const catPractice = await prisma.category.upsert({
    where: { slug: "thuc-tien-mo-hinh" },
    update: {},
    create: {
      name: "Thực Tiễn & Mô Hình",
      slug: "thuc-tien-mo-hinh",
      description: "Kinh nghiệm thực địa và mô hình sinh kế bản địa",
    },
  });

  const newsData = [
    {
      title: "Khung Thể Chế Đối Tác Công Tư (PPP) Trong Bảo Tồn Di Sản: Cơ Hội Cho Doanh Nghiệp Trách Nhiệm",
      slug: "khung-the-che-doi-tac-cong-tu-ppp-trong-bao-ton-di-san",
      excerpt: "Bảo tồn di sản không thể chỉ dựa vào ngân sách nhà nước hạn hẹp. Cần một hành lang pháp lý minh bạch cho các hợp đồng PPP.",
      categoryId: catPolicy.id,
      pageSlug: "home",
      pageName: "Trang chủ",
      authorName: "GS.TS. Trần Quốc Vượng",
      authorTitle: "Chủ tịch Hội đồng Khoa học HEF",
      isFeatured: true,
      coverImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=500&q=80",
    },
    {
      title: "Công Bố Báo Cáo Kinh Tế Di Sản Việt Nam 2026: Đóng Góp 3,8% GDP Toàn Quốc",
      slug: "cong-bo-bao-cao-kinh-te-di-san-viet-nam-2026",
      excerpt: "Lần đầu tiên một bộ chỉ số toàn diện lượng hóa doanh thu từ dịch vụ phụ trợ di sản, bất động sản văn hóa và sản phẩm sáng tạo.",
      categoryId: catResearch.id,
      pageSlug: "news",
      pageName: "Tin tức & Báo chí",
      authorName: "Ban Nội dung HEF",
      authorTitle: "Viện Kinh tế Di sản",
      isFeatured: false,
      coverImageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400&q=80",
    },
    {
      title: "Kinh Nghiệm Phục Hồi Đô Thị Di Sản Từ Kyoto: Bài Học Cho Phố Cổ Hà Nội & Hội An",
      slug: "kinh-nghiem-phuc-hoi-do-thi-di-san-kyoto-va-ha-noi",
      excerpt: "Phân tích cơ chế ưu đãi thuế chuyển nhượng quyền phát triển (TDR) giúp duy trì những dãy nhà cổ mà không kìm hãm phát triển.",
      categoryId: catPractice.id,
      pageSlug: "home",
      pageName: "Trang chủ",
      authorName: "KTS. Lê Hoàng Phương",
      authorTitle: "Chuyên gia Đô thị Di sản",
      isFeatured: false,
      coverImageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&h=400&q=80",
    },
  ];

  for (const n of newsData) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: {
        title: n.title,
        excerpt: n.excerpt,
        categoryId: n.categoryId,
        pageSlug: n.pageSlug,
        pageName: n.pageName,
        authorName: n.authorName,
        authorTitle: n.authorTitle,
        isFeatured: n.isFeatured,
        status: "PUBLISHED",
        coverImageUrl: n.coverImageUrl,
        publishedAt: new Date(),
      },
      create: {
        title: n.title,
        slug: n.slug,
        excerpt: n.excerpt,
        categoryId: n.categoryId,
        pageSlug: n.pageSlug,
        pageName: n.pageName,
        authorName: n.authorName,
        authorTitle: n.authorTitle,
        isFeatured: n.isFeatured,
        status: "PUBLISHED",
        coverImageUrl: n.coverImageUrl,
        publishedAt: new Date(),
      },
    });
  }
  console.log(`✅ Đã khởi tạo ${newsData.length} Tin tức / Bài viết mẫu có liên kết tái sử dụng các trang.`);

  // 6. Khởi tạo Diễn giả & Kỳ Diễn Đàn (Speakers & Forum)
  const speakersData = [
    {
      name: "GS.TS. Trần Quốc Vượng",
      slug: "gs-ts-tran-quoc-vuong",
      degree: "Giáo sư, Tiến sĩ",
      title: "Chủ tịch Hội đồng Khoa học",
      organization: "Hội Di sản Văn hóa Việt Nam",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Chuyên gia đầu ngành về khảo cổ học và kinh tế di sản với hơn 40 năm cống hiến.",
    },
    {
      name: "TS. Nguyễn Thị Bích Liên",
      slug: "ts-nguyen-thi-bich-lien",
      degree: "Tiến sĩ",
      title: "Viện trưởng",
      organization: "Viện Nghiên cứu Kinh tế Di sản (HEI)",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Chuyên gia tư vấn chính sách di sản cho UNESCO và các địa phương.",
    },
    {
      name: "KTS. Lê Hoàng Phương",
      slug: "kts-le-hoang-phuong",
      degree: "Kiến trúc sư",
      title: "Giám đốc Quy hoạch Di sản",
      organization: "Viện Quy hoạch Đô thị & Nông thôn Quốc gia",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Chủ trì nhiều đồ án bảo tồn di tích đô thị và làng cổ tại Việt Nam.",
    },
  ];

  for (const spk of speakersData) {
    await prisma.speaker.upsert({
      where: { slug: spk.slug },
      update: spk,
      create: spk,
    });
  }
  console.log(`✅ Đã khởi tạo ${speakersData.length} Diễn giả Diễn đàn mẫu.`);

  // 7. Khởi tạo Giải Thưởng Quốc Gia & Hạng Mục (Awards)
  const award2026 = await prisma.award.upsert({
    where: { year: 2026 },
    update: {
      name: "Giải Thưởng Phát Triển Bền Vững Chủ Động 2026",
      theme: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
      pageSlug: "awards",
      pageName: "Giải thưởng",
      nominationDeadline: new Date("2026-10-15T23:59:59.000Z"),
      isOpen: true,
      rulesUrl: "/awards/the-le-giai-thuong-2026.pdf",
    },
    create: {
      year: 2026,
      name: "Giải Thưởng Phát Triển Bền Vững Chủ Động 2026",
      theme: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
      pageSlug: "awards",
      pageName: "Giải thưởng",
      nominationDeadline: new Date("2026-10-15T23:59:59.000Z"),
      isOpen: true,
      rulesUrl: "/awards/the-le-giai-thuong-2026.pdf",
    },
  });

  const awardCategories = [
    {
      name: "Bảo Tồn Thích Ứng Xuất Sắc",
      slug: "bao-ton-thich-ung-xuat-sac",
      description: "Tôn vinh các dự án trùng tu, thích ứng di sản kiến trúc kết hợp công năng mới hiệu quả.",
    },
    {
      name: "Mô Hình Sinh Kế Di Sản Bản Địa",
      slug: "mo-hinh-sinh-ke-di-san-ban-dia",
      description: "Dành cho các cộng đồng, hợp tác xã tạo sinh kế bền vững dựa trên tài nguyên văn hóa.",
    },
    {
      name: "Đổi Mới Sáng Tạo & Số Hóa Di Sản",
      slug: "doi-moi-sang-tao-so-hoa-di-san",
      description: "Ứng dụng công nghệ thực tế ảo, AI và số hóa dữ liệu phục vụ nghiên cứu và trải nghiệm.",
    },
    {
      name: "Doanh Nghiệp Tiên Phong Vì Di Sản",
      slug: "doanh-nghiep-tien-phong-vi-di-san",
      description: "Ghi nhận các doanh nghiệp tài trợ, đầu tư có trách nhiệm vào di sản văn hóa Việt Nam.",
    },
  ];

  for (const ac of awardCategories) {
    await prisma.awardCategory.upsert({
      where: { slug: ac.slug },
      update: {
        name: ac.name,
        description: ac.description,
        awardId: award2026.id,
      },
      create: {
        name: ac.name,
        slug: ac.slug,
        description: ac.description,
        awardId: award2026.id,
      },
    });
  }
  console.log(`✅ Đã khởi tạo Giải thưởng 2026 và ${awardCategories.length} Hạng mục giải thưởng tái sử dụng.`);
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed dữ liệu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaService.disconnect();
  });
