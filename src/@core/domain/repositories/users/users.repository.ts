import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.users.findMany({
      select: {
        id: true,
        userName: true,
        email: true,
        birthday: true,
        profile: true,
        title: true,
        color: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    const formattedUsers = users.map((user) => ({
      ...user,
      role: user.role.name,
    }));

    return formattedUsers;
  }

  async findById(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        userName: true,
        email: true,
        password: true,
        birthday: true,
        profile: true,
        title: true,
        color: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      ...user,
      role: user.role.name,
    };
  }

  async findByUserName(name: string) {
    const users = await this.prisma.users.findMany({
      where: {
        userName: {
          contains: name,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        userName: true,
        email: true,
        password: true,
        birthday: true,
        profile: true,
        title: true,
        color: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    const modifiedUsers = users.map((user) => ({
      ...user,
      role: user.role.name,
    }));

    return modifiedUsers;
  }

  async findByUserNameUnique(name: string) {
    return await this.prisma.users.findUnique({ where: { userName: name } });
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async create(data: Prisma.UsersCreateInput) {
    return this.prisma.users.create({ data });
  }

  async update(id: number, data: Prisma.UsersUpdateInput) {
    return this.prisma.users.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.users.delete({ where: { id } });
  }
}
