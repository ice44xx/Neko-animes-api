import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';

@Injectable()
export class LikesCommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create() {}

  async update() {}

  async remove() {}
}
