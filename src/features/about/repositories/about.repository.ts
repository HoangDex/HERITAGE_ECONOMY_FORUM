/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE ABOUT
 * Lưu trữ & truy xuất dữ liệu Hội đồng Diễn đàn, Ban Điều hành và Đối tác
 * Hỗ trợ Graceful In-Memory Fallback khi CSDL chưa khởi chạy
 */

import type {
  IAboutRepository,
  Person,
  ExecutiveDepartment,
  PartnerOrganization,
  VisionMission,
  PartnerCategory,
} from "../types/about.types";

/**
 * Dữ liệu tôn chỉ, tầm nhìn, sứ mệnh chuẩn Đề án Diễn đàn Kinh tế Di sản (Mục 6.1)
 */
const fallbackVisionMission: VisionMission = {
  aboutPlatform:
    "Diễn đàn Kinh tế Di sản là nền tảng kết nối liên ngành nhằm nghiên cứu, nhận diện và phát huy các giá trị di sản trong phát triển kinh tế, văn hóa và xã hội. Diễn đàn thúc đẩy đối thoại, hợp tác và các mô hình thực hành có trách nhiệm, lấy di sản làm nguồn lực sáng tạo và cộng đồng làm chủ thể phát triển.",
  vision: "Trở thành nền tảng đối thoại và kết nối có uy tín về kinh tế di sản tại Việt Nam.",
  mission: "Kết nối tri thức và nguồn lực để phát huy giá trị di sản một cách bền vững.",
  coreValues: [
    {
      id: "val_respect",
      title: "Tôn trọng di sản",
      description:
        "Bảo tồn tính nguyên bản, tôn vinh chiều sâu lịch sử và giá trị văn hóa dân tộc.",
      iconName: "ShieldCheck",
    },
    {
      id: "val_interdisciplinary",
      title: "Liên ngành",
      description:
        "Quy tụ các nhà hoạch định chính sách, học giả, doanh nhân, kiến trúc sư và cộng đồng.",
      iconName: "Layers",
    },
    {
      id: "val_innovation",
      title: "Đổi mới",
      description:
        "Ứng dụng chuyển đổi số, công nghệ và tư duy kinh tế sáng tạo vào không gian di sản.",
      iconName: "Lightbulb",
    },
    {
      id: "val_cooperation",
      title: "Hợp tác",
      description: "Liên kết chuỗi giá trị công – tư – cộng đồng (PPP), mở rộng mạng lưới quốc tế.",
      iconName: "Handshake",
    },
    {
      id: "val_community",
      title: "Phụng sự cộng đồng",
      description:
        "Lấy người dân bản địa làm chủ thể gìn giữ, hưởng lợi trực tiếp từ kinh tế di sản.",
      iconName: "HeartHandshake",
    },
  ],
};

/**
 * Danh sách Nhân sự (Hội đồng & Ban Điều hành) chuẩn tỉ lệ 4:5
 */
const fallbackPersons: Person[] = [
  // 1. CHỦ TỊCH HỘI ĐỒNG
  {
    id: "person_council_pres",
    fullName: "GS.TS. Trần Quốc Vượng",
    academicTitle: "GS.TS",
    councilRole: "PRESIDENT",
    positionTitle: "Chủ tịch Hội đồng Diễn đàn",
    organization: "Hội Di sản Văn hóa Việt Nam / Nguyên Viện trưởng Viện Khảo cổ học",
    expertiseField: "Lịch sử – Khảo cổ học & Kinh tế Văn hóa Di sản",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung GS.TS Trần Quốc Vượng - Chủ tịch Hội đồng Diễn đàn Kinh tế Di sản",
    bio: "Hơn 40 năm kinh nghiệm nghiên cứu và tư vấn chiến lược di sản văn hóa quốc gia; chủ trì nhiều chương trình hợp tác quốc tế với UNESCO và các trường đại học hàng đầu khu vực.",
    papers: [
      "Định lượng hóa giá trị kinh tế của di sản kiến trúc đô thị tại Việt Nam (2024)",
      "Mô hình đối tác công tư trong bảo tồn và phát huy di sản thế giới (2025)",
      "Kinh tế sáng tạo gắn với di sản phi vật thể đồng bằng Bắc Bộ (2026)",
    ],
    email: "president@hef.vn",
    isApproved: true,
    order: 1,
    updatedAt: "03/11/2026 09:00:00",
  },
  // 2. PHÓ CHỦ TỊCH HỘI ĐỒNG
  {
    id: "person_council_vp1",
    fullName: "PGS.TS. Đặng Hoàng Lan",
    academicTitle: "PGS.TS",
    councilRole: "VICE_PRESIDENT",
    positionTitle: "Phó Chủ tịch Hội đồng Phụ trách Khoa học & Đào tạo",
    organization: "Đại học Quốc gia Hà Nội – Khoa Các khoa học liên ngành",
    expertiseField: "Chính sách Văn hóa & Quản trị Kinh tế Di sản",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung PGS.TS Đặng Hoàng Lan - Phó Chủ tịch Hội đồng Diễn đàn",
    bio: "Chuyên gia cố vấn chính sách thuộc Bộ Văn hóa, Thể thao và Du lịch; tác giả của nhiều công trình nghiên cứu kinh tế hóa di sản bền vững.",
    papers: [
      "Khung thể chế tài chính cho công nghiệp văn hóa dựa trên tài nguyên di sản (2024)",
      "Chỉ số bền vững kinh tế di sản tại các đô thị cổ Việt Nam (2025)",
    ],
    email: "lan.dang@hef.vn",
    isApproved: true,
    order: 2,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "person_council_vp2",
    fullName: "KTS. Hoàng Thúc Hào",
    academicTitle: "KTS",
    councilRole: "VICE_PRESIDENT",
    positionTitle: "Phó Chủ tịch Hội đồng Phụ trách Quy hoạch & Kiến trúc",
    organization: "Hội Kiến trúc sư Việt Nam – Văn phòng 1+1>2",
    expertiseField: "Kiến trúc Hạnh phúc & Tái thiết Không gian Di sản",
    avatarUrl:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung KTS Hoàng Thúc Hào - Phó Chủ tịch Hội đồng Diễn đàn",
    bio: "Giải thưởng kiến trúc quốc tế UIA và Vassilis Sgoutas Prize; tiên phong trường phái kiến trúc gắn liền sinh kế và cảnh quan di sản nông thôn.",
    papers: [
      "Tái cấu trúc làng nghề truyền thống gắn với du lịch trải nghiệm di sản (2025)",
      "Kiến trúc sinh thái và giải pháp vật liệu bản địa trong bảo tồn di tích (2026)",
    ],
    email: "hao.hoang@hef.vn",
    isApproved: true,
    order: 3,
    updatedAt: "03/11/2026 09:00:00",
  },
  // 3. THÀNH VIÊN HỘI ĐỒNG
  {
    id: "person_council_mem1",
    fullName: "TS. Nguyễn Thị Thu Hà",
    academicTitle: "TS",
    councilRole: "COUNCIL_MEMBER",
    positionTitle: "Ủy viên Hội đồng Diễn đàn",
    organization: "Viện Văn hóa Nghệ thuật Quốc gia Việt Nam (VICAS)",
    expertiseField: "Công nghiệp Sáng tạo & Chuỗi giá trị Di sản",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung TS Nguyễn Thị Thu Hà - Ủy viên Hội đồng",
    bio: "Chuyên gia điều phối các dự án Không gian Sáng tạo Hà Nội của UNESCO; tư vấn phát triển chuỗi giá trị thủ công mỹ nghệ di sản.",
    papers: ["Di sản sống và vai trò của giới trẻ trong kinh tế số (2025)"],
    isApproved: true,
    order: 4,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "person_council_mem2",
    fullName: "ThS. Lê Quốc Vinh",
    academicTitle: "ThS",
    councilRole: "COUNCIL_MEMBER",
    positionTitle: "Ủy viên Hội đồng Diễn đàn",
    organization: "Tập đoàn Truyền thông Lê Bros",
    expertiseField: "Định vị Thương hiệu & Truyền thông Di sản Văn hóa",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung ThS Lê Quốc Vinh - Ủy viên Hội đồng",
    bio: "Hơn 25 năm tư vấn thương hiệu quốc gia và truyền thông điểm đến di sản; cố vấn chiến lược các Festival di sản Huế, Hội An, Hà Giang.",
    papers: ["Chiến lược kể chuyện di sản (Storytelling) trong kỷ nguyên số (2025)"],
    isApproved: true,
    order: 5,
    updatedAt: "03/11/2026 09:00:00",
  },
  // 4. CỐ VẤN KHOA HỌC
  {
    id: "person_council_adv1",
    fullName: "GS. Michael DiGiovine",
    academicTitle: "GS",
    councilRole: "SCIENTIFIC_ADVISOR",
    positionTitle: "Cố vấn Khoa học Quốc tế",
    organization: "UNESCO / Đại học West Chester (Hoa Kỳ)",
    expertiseField: "Du lịch Di sản Toàn cầu & Nhân học Văn hóa",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung GS Michael DiGiovine - Cố vấn Khoa học Quốc tế",
    bio: "Thành viên ban biên tập các tạp chí nhân học di sản quốc tế; đồng hành với nhiều dự án bảo tồn di sản thế giới tại Đông Nam Á.",
    papers: ["The Heritage-scape: UNESCO World Heritage and Tourism Economy (2024)"],
    isApproved: true,
    order: 6,
    updatedAt: "03/11/2026 09:00:00",
  },
  // 5. TRƯỞNG BAN ĐIỀU HÀNH
  {
    id: "person_exec_head",
    fullName: "TS. Phạm Trung Dũng",
    academicTitle: "TS",
    executiveRole: "HEAD",
    positionTitle: "Trưởng ban Điều hành Diễn đàn",
    organization: "Ban Thư ký Diễn đàn Kinh tế Di sản (HEF)",
    expertiseField: "Quản trị Dự án Văn hóa & Hợp tác Công Tư",
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung TS Phạm Trung Dũng - Trưởng ban Điều hành",
    bio: "Chịu trách nhiệm toàn diện về công tác tổ chức, kết nối các tiểu ban chức năng và bảo đảm vận hành thông suốt các kỳ Diễn đàn thường niên.",
    papers: ["Mô hình vận hành Diễn đàn mở đa chủ thể tại Việt Nam (2025)"],
    email: "head@hef.vn",
    phone: "(+84) 24 3828 9999",
    isApproved: true,
    order: 10,
    updatedAt: "03/11/2026 09:00:00",
  },
  // 6. PHÓ TRƯỞNG BAN ĐIỀU HÀNH
  {
    id: "person_exec_dep1",
    fullName: "ThS. Đỗ Thùy Trang",
    academicTitle: "ThS",
    executiveRole: "DEPUTY_HEAD",
    positionTitle: "Phó Trưởng ban Điều hành Phụ trách Đối ngoại & Dự án",
    organization: "Ban Điều hành HEF",
    expertiseField: "Ngoại giao Văn hóa & Quan hệ Đối tác",
    avatarUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung ThS Đỗ Thùy Trang - Phó Trưởng ban Điều hành",
    bio: "Điều phối mạng lưới đối tác quốc tế, quỹ tài trợ bảo tồn và các địa phương đăng cai tổ chức các kỳ Diễn đàn.",
    papers: [],
    email: "trang.do@hef.vn",
    phone: "(+84) 912 345 678",
    isApproved: true,
    order: 11,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "person_exec_dep2",
    fullName: "ThS. Vũ Nam Phương",
    academicTitle: "ThS",
    executiveRole: "DEPUTY_HEAD",
    positionTitle: "Phó Trưởng ban Điều hành Phụ trách Vận hành & Truyền thông",
    organization: "Ban Điều hành HEF",
    expertiseField: "Vận hành Sự kiện Quy mô Lớn & Nền tảng Số",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung ThS Vũ Nam Phương - Phó Trưởng ban Điều hành",
    bio: "Quản lý hệ sinh thái truyền thông, cổng thông tin số và quy trình tiếp đón đại biểu cấp cao.",
    papers: [],
    email: "phuong.vu@hef.vn",
    phone: "(+84) 904 888 777",
    isApproved: true,
    order: 12,
    updatedAt: "03/11/2026 09:00:00",
  },
  // 7. THÀNH VIÊN CÁC NHÓM CHUYÊN TRÁCH
  {
    id: "person_exec_m_acad",
    fullName: "TS. Bùi Minh Trí",
    academicTitle: "TS",
    executiveRole: "MEMBER",
    departmentCode: "ACADEMIC",
    positionTitle: "Trưởng nhóm Nội dung – Học thuật",
    organization: "Viện Nghiên cứu Kinh thành",
    expertiseField: "Thẩm định Khoa học & Biên soạn Kỷ yếu",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung TS Bùi Minh Trí - Nhóm Nội dung Học thuật",
    bio: "Điều phối tổng hợp các phiên tham luận chuyên đề và thẩm định học thuật các đề tài báo cáo.",
    papers: ["Khảo cổ học di sản và phát triển du lịch tại Hoàng thành Thăng Long (2025)"],
    email: "academic@hef.vn",
    isApproved: true,
    order: 20,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "person_exec_m_ops",
    fullName: "Bà Nguyễn Mai Anh",
    academicTitle: "ThS",
    executiveRole: "MEMBER",
    departmentCode: "OPERATIONS",
    positionTitle: "Trưởng nhóm Tổ chức – Vận hành",
    organization: "Ban Vận hành HEF",
    expertiseField: "Hậu cần & Điều phối Nghi lễ Quốc gia",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung Bà Nguyễn Mai Anh - Nhóm Tổ chức Vận hành",
    bio: "Đảm bảo hạ tầng hội trường, âm thanh ánh sáng, an ninh và lễ tân cho hơn 500 đại biểu mỗi kỳ Diễn đàn.",
    papers: [],
    email: "operations@hef.vn",
    isApproved: true,
    order: 21,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "person_exec_m_ext",
    fullName: "Ông Trần Đức Hiếu",
    academicTitle: "ThS",
    executiveRole: "MEMBER",
    departmentCode: "EXTERNAL_AFFAIRS",
    positionTitle: "Trưởng nhóm Đối ngoại – Hợp tác",
    organization: "Ban Đối ngoại HEF",
    expertiseField: "Hợp tác Đa phương & Vận động Tài trợ",
    avatarUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung Ông Trần Đức Hiếu - Nhóm Đối ngoại Hợp tác",
    bio: "Phụ trách làm việc với các cơ quan ngoại giao, các viện văn hóa quốc tế và các nhà tài trợ chiến lược.",
    papers: [],
    email: "external@hef.vn",
    isApproved: true,
    order: 22,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "person_exec_m_comm",
    fullName: "Bà Lê Diệu Hương",
    academicTitle: "Cử nhân",
    executiveRole: "MEMBER",
    departmentCode: "COMMUNICATIONS",
    positionTitle: "Trưởng nhóm Truyền thông",
    organization: "Ban Truyền thông HEF",
    expertiseField: "Báo chí, Mạng xã hội & Quan hệ Công chúng (PR)",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung Bà Lê Diệu Hương - Nhóm Truyền thông",
    bio: "Chủ trì họp báo thường niên, xuất bản thông cáo báo chí và quản trị hệ thống kênh truyền thông số.",
    papers: [],
    email: "press@hef.vn",
    isApproved: true,
    order: 23,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "person_exec_m_proj",
    fullName: "KTS. Đặng Thanh Tùng",
    academicTitle: "KTS",
    executiveRole: "MEMBER",
    departmentCode: "PROJECTS",
    positionTitle: "Trưởng nhóm Dự án – Phát triển",
    organization: "Ban Dự án HEF",
    expertiseField: "Vườn ươm Dự án & Giải thưởng Di sản",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung KTS Đặng Thanh Tùng - Nhóm Dự án Phát triển",
    bio: "Thẩm định và ươm tạo các sáng kiến kinh tế di sản tại các địa phương; phụ trách hồ sơ Giải thưởng Di sản thường niên.",
    papers: [],
    email: "projects@hef.vn",
    isApproved: true,
    order: 24,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "person_exec_m_sec",
    fullName: "ThS. Hoàng Thị Minh Châu",
    academicTitle: "ThS",
    executiveRole: "MEMBER",
    departmentCode: "SECRETARIAT",
    positionTitle: "Chánh Văn phòng Ban Thư ký",
    organization: "Ban Thư ký Tổng hợp HEF",
    expertiseField: "Hành chính Tổng hợp & Quản trị Hồ sơ",
    avatarUrl:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&h=750&q=80",
    altText: "Chân dung ThS Hoàng Thị Minh Châu - Chánh Văn phòng Ban Thư ký",
    bio: "Đầu mối tiếp nhận công văn, điều phối lịch làm việc của Hội đồng và lưu trữ dữ liệu các kỳ Diễn đàn.",
    papers: [],
    email: "secretariat@hef.vn",
    phone: "(+84) 24 3828 8888",
    isApproved: true,
    order: 25,
    updatedAt: "03/11/2026 09:00:00",
  },
];

/**
 * 6 Nhóm chuyên trách của Ban Điều hành kèm nhiệm vụ & liên hệ (Mục 6.3)
 */
const fallbackDepartments: ExecutiveDepartment[] = [
  {
    id: "dept_academic",
    code: "ACADEMIC",
    name: "Nhóm Nội dung – Học thuật",
    mission:
      "Xây dựng chủ đề các phiên thảo luận, mời diễn giả, thẩm định và biên tập kỷ yếu tham luận khoa học, bảo đảm tính học thuật và chính sách của Diễn đàn.",
    contactEmail: "academic@hef.vn",
    contactPhone: "(+84) 24 3828 9991",
    members: [],
  },
  {
    id: "dept_operations",
    code: "OPERATIONS",
    name: "Nhóm Tổ chức – Vận hành",
    mission:
      "Chịu trách nhiệm tổng thể về địa điểm, kỹ thuật âm thanh – ánh sáng, hạ tầng số, điều phối an ninh và đón tiếp đại biểu chính thức theo nghi lễ trang trọng.",
    contactEmail: "operations@hef.vn",
    contactPhone: "(+84) 24 3828 9992",
    members: [],
  },
  {
    id: "dept_external",
    code: "EXTERNAL_AFFAIRS",
    name: "Nhóm Đối ngoại – Hợp tác",
    mission:
      "Kết nối các tổ chức quốc tế (UNESCO, ICOMOS), các bộ ngành, địa phương di sản và vận động các nguồn lực tài trợ, hợp tác công – tư (PPP).",
    contactEmail: "external@hef.vn",
    contactPhone: "(+84) 24 3828 9993",
    members: [],
  },
  {
    id: "dept_communications",
    code: "COMMUNICATIONS",
    name: "Nhóm Truyền thông",
    mission:
      "Xây dựng chiến lược truyền thông đa kênh, quan hệ báo chí truyền hình, phát triển nội dung số và lan tỏa thông điệp của Diễn đàn đến cộng đồng xã hội.",
    contactEmail: "press@hef.vn",
    contactPhone: "(+84) 24 3828 9994",
    members: [],
  },
  {
    id: "dept_projects",
    code: "PROJECTS",
    name: "Nhóm Dự án – Phát triển",
    mission:
      "Thực hiện thẩm định, hỗ trợ ươm tạo các mô hình kinh tế di sản tại địa phương và triển khai chu trình bình chọn Giải thưởng Phát triển Bền vững Chủ động.",
    contactEmail: "projects@hef.vn",
    contactPhone: "(+84) 24 3828 9995",
    members: [],
  },
  {
    id: "dept_secretariat",
    code: "SECRETARIAT",
    name: "Ban Thư ký Tổng hợp",
    mission:
      "Điều phối lịch làm việc, tổng hợp thông tin, chuẩn bị tài liệu kỳ họp, thực hiện thủ tục pháp lý và hỗ trợ trực tiếp Hội đồng Diễn đàn.",
    contactEmail: "secretariat@hef.vn",
    contactPhone: "(+84) 24 3828 9996",
    members: [],
  },
];

/**
 * Danh sách Đối tác (Mục 6.4) phân chia 6 nhóm chính thức
 */
const fallbackPartners: PartnerOrganization[] = [
  // 1. CHỈ ĐẠO
  {
    id: "partner_steer_1",
    name: "Bộ Văn hóa, Thể thao và Du lịch",
    shortName: "BVHTTDL",
    logoUrl: "/images/partners/bvhttdl.svg",
    category: "STEERING",
    roleDescription: "Cơ quan chỉ đạo định hướng chiến lược quốc gia về phát triển kinh tế di sản",
    websiteUrl: "https://bvhttdl.gov.vn",
    relatedEvents: ["Kỳ Diễn đàn Thường niên 2024 - 2026"],
    order: 1,
    isApproved: true,
    updatedAt: "03/11/2026 09:00:00",
  },
  // 2. CHỦ TRÌ
  {
    id: "partner_host_1",
    name: "Hội Di sản Văn hóa Việt Nam",
    shortName: "VCHA",
    logoUrl: "/images/partners/vcha.svg",
    category: "HOSTING",
    roleDescription: "Đơn vị chủ trì chuyên môn và thẩm định học thuật các chương trình Diễn đàn",
    websiteUrl: "https://hoidisan.vn",
    relatedEvents: ["Toàn bộ các kỳ Diễn đàn & Giải thưởng"],
    order: 2,
    isApproved: true,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "partner_host_2",
    name: "Ủy ban Nhân dân Thành phố Hà Nội",
    shortName: "UBND TP Hà Nội",
    logoUrl: "/images/partners/hanoi.svg",
    category: "HOSTING",
    roleDescription:
      "Đơn vị đồng chủ trì và đăng cai tổ chức tại không gian Hoàng thành Thăng Long",
    websiteUrl: "https://hanoi.gov.vn",
    relatedEvents: ["Kỳ Diễn đàn Hà Nội 2026"],
    order: 3,
    isApproved: true,
    updatedAt: "03/11/2026 09:00:00",
  },
  // 3. TỔ CHỨC
  {
    id: "partner_org_1",
    name: "Viện Nghiên cứu Kinh tế Di sản & Phát triển Bền vững",
    shortName: "HEI",
    logoUrl: "/images/partners/hei.svg",
    category: "ORGANIZING",
    roleDescription: "Đơn vị thường trực tổ chức và quản trị nền tảng số HEF",
    websiteUrl: "https://hef.vn",
    relatedEvents: ["Toàn bộ chuỗi hoạt động 2026"],
    order: 4,
    isApproved: true,
    updatedAt: "03/11/2026 09:00:00",
  },
  // 4. ĐỒNG HÀNH
  {
    id: "partner_comp_1",
    name: "Văn phòng UNESCO tại Hà Nội",
    shortName: "UNESCO Hanoi",
    logoUrl: "/images/partners/unesco.svg",
    category: "COMPANION",
    roleDescription: "Tổ chức quốc tế đồng hành về chuyên môn và bảo tồn di sản bền vững",
    websiteUrl: "https://unesco.org",
    relatedEvents: ["Kỳ Diễn đàn 2024, 2025, 2026"],
    order: 5,
    isApproved: true,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "partner_comp_2",
    name: "Đại học Quốc gia Hà Nội",
    shortName: "VNU",
    logoUrl: "/images/partners/vnu.svg",
    category: "COMPANION",
    roleDescription: "Đối tác đồng hành học thuật, nghiên cứu và cung cấp chuyên gia phản biện",
    websiteUrl: "https://vnu.edu.vn",
    relatedEvents: ["Chuỗi tọa đàm khoa học liên ngành"],
    order: 6,
    isApproved: true,
    updatedAt: "03/11/2026 09:00:00",
  },
  // 5. CHIẾN LƯỢC
  {
    id: "partner_strat_1",
    name: "Tập đoàn Sovico",
    shortName: "Sovico Group",
    logoUrl: "/images/partners/sovico.svg",
    category: "STRATEGIC",
    roleDescription: "Đối tác chiến lược bảo trợ tài chính và phát triển dự án di sản đô thị",
    websiteUrl: "https://sovicogroup.com",
    relatedEvents: ["Giải thưởng Phát triển Bền vững Chủ động 2026"],
    order: 7,
    isApproved: true,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "partner_strat_2",
    name: "Tập đoàn Vingroup – Quỹ Thiện Tâm",
    shortName: "Vingroup",
    logoUrl:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=300&h=150&q=80",
    category: "STRATEGIC",
    roleDescription: "Đối tác chiến lược tài trợ công tác số hóa di sản 3D quốc gia",
    websiteUrl: "https://vingroup.net",
    relatedEvents: ["Chương trình Số hóa Di sản 2025 - 2027"],
    order: 8,
    isApproved: true,
    updatedAt: "03/11/2026 09:00:00",
  },
  // 6. TRUYỀN THÔNG
  {
    id: "partner_media_1",
    name: "Đài Truyền hình Việt Nam",
    shortName: "VTV",
    logoUrl: "/images/partners/vtv.svg",
    category: "MEDIA",
    roleDescription: "Đối tác bảo trợ truyền hình và truyền thông đa phương tiện chính thức",
    websiteUrl: "https://vtv.vn",
    relatedEvents: ["Truyền hình trực tiếp Lễ khai mạc và Lễ trao giải"],
    order: 9,
    isApproved: true,
    updatedAt: "03/11/2026 09:00:00",
  },
  {
    id: "partner_media_2",
    name: "Báo Nhân Dân",
    shortName: "Báo Nhân Dân",
    logoUrl:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=300&h=150&q=80",
    category: "MEDIA",
    roleDescription: "Đối tác bảo trợ báo chí chính trị và chuyên trang Di sản & Phát triển",
    websiteUrl: "https://nhandan.vn",
    relatedEvents: ["Chuyên trang Kỷ yếu Diễn đàn 2026"],
    order: 10,
    isApproved: true,
    updatedAt: "03/11/2026 09:00:00",
  },
];

export class AboutRepository implements IAboutRepository {
  async getVisionMission(): Promise<VisionMission> {
    return fallbackVisionMission;
  }

  async getAllPersons(): Promise<Person[]> {
    try {
      // Khi đã kết nối DB, có thể query từ bảng Person nếu có.
      // Hiện tại trả về danh sách mock đạt chuẩn với lọc isApproved = true và sắp xếp order ASC
      return fallbackPersons.filter((p) => p.isApproved).sort((a, b) => a.order - b.order);
    } catch (error) {
      console.warn("[AboutRepository] Fallback to in-memory persons:", error);
      return fallbackPersons.filter((p) => p.isApproved).sort((a, b) => a.order - b.order);
    }
  }

  async getCouncilMembers(): Promise<Person[]> {
    const persons = await this.getAllPersons();
    return persons.filter((p) => p.councilRole !== undefined);
  }

  async getExecutiveMembers(): Promise<Person[]> {
    const persons = await this.getAllPersons();
    return persons.filter((p) => p.executiveRole !== undefined);
  }

  async getExecutiveDepartments(): Promise<ExecutiveDepartment[]> {
    const executiveMembers = await this.getExecutiveMembers();
    return fallbackDepartments.map((dept) => ({
      ...dept,
      members: executiveMembers.filter((m) => m.departmentCode === dept.code),
    }));
  }

  async getPartners(category?: PartnerCategory): Promise<PartnerOrganization[]> {
    try {
      let partners = fallbackPartners.filter((p) => p.isApproved);
      if (category) {
        partners = partners.filter((p) => p.category === category);
      }
      return partners.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.warn("[AboutRepository] Fallback to in-memory partners:", error);
      return fallbackPartners.filter((p) => p.isApproved).sort((a, b) => a.order - b.order);
    }
  }

  async getPersonById(id: string): Promise<Person | null> {
    const persons = await this.getAllPersons();
    return persons.find((p) => p.id === id) || null;
  }
}

export const aboutRepository = new AboutRepository();
