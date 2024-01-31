import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ResponsesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.commentResponses.findUnique({ where: { id } });
  }

  async create(data: Prisma.CommentResponsesCreateInput) {
    return this.prisma.commentResponses.create({ data });
  }

  async remove(id: number) {
    return this.prisma.commentResponses.delete({ where: { id } });
  }
}
