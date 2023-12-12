import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CommentsService } from '../../services/comments/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll() {}

  @Post()
  async create() {}

  @Put()
  async update() {}

  @Delete()
  async remove() {}
}
