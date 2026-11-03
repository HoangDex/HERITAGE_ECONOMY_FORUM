/**
 * LAYER 1: DOMAIN TYPES & ENTITIES CHO MODULE GIỚI THIỆU (ABOUT)
 * Định nghĩa cấu trúc Person, Organization, Role, Council, Executive Board và Đối tác
 * Tuân thủ quy chuẩn tài liệu Đề án HEF (Mục 6: Giới thiệu - About)
 */

export type AcademicTitle =
  "GS.TS" | "PGS.TS" | "TS" | "ThS" | "KTS" | "Nhà nghiên cứu" | "Chuyên gia" | "Cử nhân";

export type CouncilRole =
  | "PRESIDENT" // Chủ tịch Hội đồng
  | "VICE_PRESIDENT" // Phó Chủ tịch Hội đồng
  | "COUNCIL_MEMBER" // Thành viên Hội đồng
  | "SCIENTIFIC_ADVISOR"; // Cố vấn khoa học

export type ExecutiveRole =
  | "HEAD" // Trưởng ban Điều hành
  | "DEPUTY_HEAD" // Phó Trưởng ban Điều hành
  | "MEMBER"; // Thành viên nhóm chuyên trách

export type ExecutiveDepartmentCode =
  | "ACADEMIC" // Nhóm Nội dung – Học thuật
  | "OPERATIONS" // Nhóm Tổ chức – Vận hành
  | "EXTERNAL_AFFAIRS" // Nhóm Đối ngoại – Hợp tác
  | "COMMUNICATIONS" // Nhóm Truyền thông
  | "PROJECTS" // Nhóm Dự án – Phát triển
  | "SECRETARIAT"; // Ban Thư ký

export type PartnerCategory =
  | "STEERING" // Cơ quan Chỉ đạo
  | "HOSTING" // Cơ quan Chủ trì
  | "ORGANIZING" // Đơn vị Tổ chức
  | "COMPANION" // Đối tác Đồng hành
  | "STRATEGIC" // Đối tác Chiến lược
  | "MEDIA"; // Đối tác Truyền thông

/**
 * Entity Person (Nhân sự: Hội đồng hoặc Ban Điều hành)
 * Ảnh chân dung chuẩn tỉ lệ 4:5
 */
export interface Person {
  id: string;
  fullName: string;
  academicTitle: AcademicTitle | string;
  councilRole?: CouncilRole;
  executiveRole?: ExecutiveRole;
  departmentCode?: ExecutiveDepartmentCode;
  positionTitle: string; // Tên chức danh hiển thị (ví dụ: "Chủ tịch Hội đồng Diễn đàn", "Trưởng ban Điều hành")
  organization: string; // Đơn vị công tác chính thức
  expertiseField: string; // Lĩnh vực chuyên môn
  avatarUrl: string; // Ảnh chân dung chuẩn tỉ lệ 4:5
  altText: string; // Mô tả ảnh chân dung phục vụ SEO & Accessibility
  bio: string; // Tiểu sử tóm tắt
  papers: string[]; // Danh sách các bài tham luận / công trình nghiên cứu liên quan
  email?: string;
  phone?: string;
  isApproved: boolean; // Chỉ công bố tên, chức danh và ảnh khi có xác nhận
  order: number; // Thứ tự sắp xếp theo chức vụ
  updatedAt: string; // Ngày cập nhật dữ liệu (định dạng GMT+7)
}

/**
 * Entity Bộ phận chuyên trách trong Ban Điều hành
 */
export interface ExecutiveDepartment {
  id: string;
  code: ExecutiveDepartmentCode;
  name: string;
  mission: string; // Mô tả nhiệm vụ theo bộ phận
  contactEmail: string;
  contactPhone: string;
  members: Person[];
}

/**
 * Entity Tổ chức Đối tác (Organization)
 */
export interface PartnerOrganization {
  id: string;
  name: string; // Tên chính thức
  shortName?: string;
  logoUrl: string; // Logo chính thức
  category: PartnerCategory;
  roleDescription: string; // Vai trò hợp tác
  websiteUrl: string;
  relatedEvents: string[]; // Kỳ diễn đàn / dự án liên quan
  order: number; // Vai trò và thứ tự hiển thị theo văn bản xác nhận hợp tác
  isApproved: boolean;
  updatedAt: string;
}

/**
 * Entity Tầm nhìn - Sứ mệnh - Giá trị cốt lõi
 */
export interface CoreValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface VisionMission {
  aboutPlatform: string;
  vision: string;
  mission: string;
  coreValues: CoreValue[];
}

/**
 * Dữ liệu tổng hợp toàn bộ trang Giới thiệu (About Page Data)
 */
export interface AboutPageData {
  visionMission: VisionMission;
  president: Person;
  vicePresidents: Person[];
  councilMembers: Person[];
  scientificAdvisors: Person[];
  executiveHead: Person;
  executiveDeputies: Person[];
  executiveDepartments: ExecutiveDepartment[];
  partners: PartnerOrganization[];
  lastUpdated: string;
}

/**
 * Interface cho Data Access Layer (Repository)
 */
export interface IAboutRepository {
  getVisionMission(): Promise<VisionMission>;
  getAllPersons(): Promise<Person[]>;
  getCouncilMembers(): Promise<Person[]>;
  getExecutiveMembers(): Promise<Person[]>;
  getExecutiveDepartments(): Promise<ExecutiveDepartment[]>;
  getPartners(category?: PartnerCategory): Promise<PartnerOrganization[]>;
  getPersonById(id: string): Promise<Person | null>;
}

/**
 * Interface cho Business Logic Layer (Service)
 */
export interface IAboutService {
  getAboutPageData(): Promise<AboutPageData>;
  getCouncilMembersGrouped(): Promise<{
    president: Person | null;
    vicePresidents: Person[];
    councilMembers: Person[];
    scientificAdvisors: Person[];
  }>;
  getExecutiveBoardGrouped(): Promise<{
    head: Person | null;
    deputies: Person[];
    departments: ExecutiveDepartment[];
  }>;
  getPartnersGrouped(): Promise<Record<PartnerCategory, PartnerOrganization[]>>;
  getPersonDetail(id: string): Promise<Person | null>;
}
