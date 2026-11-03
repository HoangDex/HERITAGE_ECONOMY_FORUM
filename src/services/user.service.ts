import { prisma } from "@/lib/prisma";
import type { Role } from "@prisma/client";

export interface CreateUserData {
  email: string;
  name: string;
  passwordHash?: string;
  role?: Role;
  organization?: string;
  avatarUrl?: string;
  bio?: string;
}

export class UserService {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true, comments: true },
        },
      },
    });
  }

  async create(data: CreateUserData) {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash: data.passwordHash,
        role: data.role || "USER",
        organization: data.organization,
        avatarUrl: data.avatarUrl,
        bio: data.bio,
      },
    });
  }

  async updateRole(id: string, role: Role) {
    return prisma.user.update({
      where: { id },
      data: { role },
    });
  }
}

export const userService = new UserService();
