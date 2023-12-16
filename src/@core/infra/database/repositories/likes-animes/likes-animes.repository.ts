import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LikesAnimesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create() {}

  async update() {}

  async remove() {}
}
